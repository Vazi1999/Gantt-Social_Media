// import modules
const express = require('express');
require('dotenv').config(); // .env configuration
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // MongoDB driver
const multer = require('multer'); // For handling file uploads
const moment = require('moment'); // For handling date and time
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//DB Schemas:
const Users = require('./models/users');
const PagesDetail = require('./models/pages_detail');
const CalendarEventsDB = require('./models/calendar_events');


const app = express();


//Global Variables
const PORT = process.env.PORT || 3000;
let CALENDAR_EVENTS = [];
const TIME_FOR_CALENDAR = "T10:00:00"
//ISOLATE YOUR DATA
let DATE; // NEED TO FIGURE OUT HOW TO REPLACE THIS.
let WhichUser; // ID of the user. 


mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true , useUnifiedTopology: true})
  .then(async (result) => {
    console.log("Connected to DB")
    app.listen(PORT);
    console.log(`Server is listening on port ${PORT}`)
  })
  .catch((err) => console.log(err))


app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON data


// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploaded_files/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, DATE + '-' + file.originalname); // Use unique filenames
  },
});
const upload = multer({ storage: storage });


app.post('/api/createPost', upload.array('files'), async (req, res) => {
  const description = req.body.description; // description of the post
  const files = req.files.map((file) => file.filename); // Extract the files from the post.
  const upload = req.body.time; // Time for upload
  
  try {
    const post = await PagesDetail.create({date:DATE ,type:"Post" ,  description:description,upload:upload ,group:WhichUser ,files:files })
    console.log("Post saved successfully")
  } catch (error) {
    console.error(error)
    res.sendStatus(500);
  }

  
  eventTime = moment(DATE+''+TIME_FOR_CALENDAR).toDate();

  const foundEvent = CALENDAR_EVENTS.find(event=>((moment(event.start).toDate()).getTime() === eventTime.getTime()));
  
  if(!foundEvent) {
    CALENDAR_EVENTS.push({
      title: "Post",
      start: eventTime,
      end: eventTime
    });
    try {
      const event = await CalendarEventsDB.create({title:"Post" , start: eventTime , end:eventTime , group:WhichUser})
      console.log("Event saved successfully")
    } catch (error) {
      console.error(error)
      res.sendStatus(500);
    }
  }
  res.sendStatus(200);
});

app.post('/api/createReelStory', upload.single('file'), async (req, res) => {
  const files = req.body.file;
  const upload = req.body.time; // Time for upload
  const option = req.body.option; // reel/story.
  try {
    const item = await PagesDetail.create({date:DATE ,type:option , group:WhichUser ,upload:upload ,files:files })
    console.log(`${option} saved successfully`)
  } catch (error) {
    console.error(error)
    res.sendStatus(500);
  }

  eventTime = moment(DATE+''+TIME_FOR_CALENDAR).toDate();

  const foundEvent = CALENDAR_EVENTS.find(event=>((moment(event.start).toDate()).getTime() === eventTime.getTime() && event.title === option));

  if(!foundEvent) {
    CALENDAR_EVENTS.push({
      title: option,
      start: eventTime,
      end: eventTime
    });
    try {
      const event = await CalendarEventsDB.create({title:option , start: eventTime , end:eventTime, group:WhichUser})
      console.log("Event saved successfully")
    } catch (error) {
      console.error(error)
      res.sendStatus(500);
    }
  }
  res.sendStatus(200);
});

app.post('/api/getDate', async (req, res) => {
  DATE = req.body.date;
  res.status(200).json({ message: DATE });
});

app.get('/api/getPosts', async (req, res) => {
  try {
    const PageDetails = await PagesDetail.find({date: DATE , group:WhichUser});
    res.json(PageDetails || []);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ message: 'Error retrieving posts' });
  }
});

app.get('/api/getEvents', async (req, res) => {
  try {
    const events = await CalendarEventsDB.find({group:WhichUser});
    CALENDAR_EVENTS = events.map(({ title, start, end }) => ({ title, start, end })); 
    res.json(CALENDAR_EVENTS || []);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts' });
  }
});

app.post('/api/login', async (req, res) => {
  const {username , password} = req.body;
  const DBuser = await Users.findOne({username:username})
  if(DBuser == null) res.status(404).json({ message: "User not found" });
  else
  {
    try {
      if(await bcrypt.compare(password , DBuser.password))
      {
        // creating jwt token.
        const accessToken = jwt.sign({username:username}, process.env.ACCESS_TOKEN , {expiresIn:'15s'}) // seralize the username.
        if(username == "Shaked") // Only Shaked is Administrator.
        {
          IsAdmin = true;
        }
        WhichUser = DBuser.id; // update which user is logged in.
        res.status(200).json({accessToken :accessToken }); // returns the token
      }
      else{
        res.status(404).json({ message: "Wrong username or password" })
      }
    } catch (err) {
      console.log(err)
    }
  }
});


app.post('/api/register', async (req, res) => {
  const {username, password} = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password,10);
    const highestIdUser = await Users.findOne().sort('-id');
    const newId = highestIdUser ? highestIdUser.id + 1 : 1;
    const user = await Users.create({id:newId , username:username , password:hashedPassword});
    console.log("User created");
    res.status(200).json();
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Somthing went wrong.."});
  }
});

app.put('/api/updateWhichUser', (req, res) => {
  WhichUser = req.body.userId;
  console.log(req.body.userId)
  res.sendStatus(200)
});

app.get('/api/getUsers', async (req, res) => {
  const users = await Users.find({});
  res.status(200).json({users : users});
});

app.get('/api/Authorize', (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];
  if(token == null){
    return res.sendStatus(401)
  } 
  jwt.verify(token,process.env.ACCESS_TOKEN , (err,user)=>{
    if(err){
      return res.sendStatus(403)
    }
    res.status(200).json({user:user.username});
  })
});

app.get('/api/getUser', async (req, res) => {
  const user = await Users.findOne({id:WhichUser})
  console.log(user)
  console.log(user.username)
  res.status(200).json({username:user.username}) 
});
