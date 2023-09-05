// import modules
const express = require('express');
const session = require('express-session');
require('dotenv').config(); // .env configuration
const cors = require('cors');
const mongoose = require('mongoose'); // MongoDB driver
const multer = require('multer'); // For handling file uploads
const path = require('path');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const jwtMiddleware = require('./Auth')
const DeleteOldFiles = require('./DeleteFiles');

//DB Schemas:
const Users = require('./models/users');
const PagesDetail = require('./models/pages_detail');
const CalendarEventsDB = require('./models/calendar_events');


const app = express();

//global variables
const PORT = process.env.PORT || 3000;
const frontendServer = 'https://shakedvirgantt.netlify.app';


mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true , useUnifiedTopology: true})
  .then(async (result) => {
    console.log("Connected to DB")
    app.listen(PORT);
    console.log(`Server is listening on port ${PORT}`)
  })
  .catch((err) => console.log(err))

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: frontendServer, 
  credentials: true
}));

app.use(express.json()); // Parse incoming JSON data

// Set up session middleware
app.use(session({
  genid: function(req) {
    return uuid.v4() // use UUIDs for session IDs
  },
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  httpOnly:false
}))
// Initialize the global variable for each user
app.use((req, res, next) => {
  if (req.session.userData == undefined) {
    req.session.userData = {
      CALENDAR_EVENTS: [],
      DATE: new Date(),
      WhichUser:0 ,
      IsAdmin:false
    };
  }
  next();
});
// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/')); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, req.session.userData.DATE + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });


app.post('/api/createItem', upload.array('files'), async (req, res) => {
  if(!req.session.userData.IsAdmin) return res.sendStatus(401); // No admin.

  const upload = req.body.time; // Time for upload
  const description = req.body.description; // description of the post
  const files = req.files.map((file) => file.filename); // Extract the files from the post.
  const option = req.body.option; // Post/Story/Reel/Hightlight
  try {
    DeleteOldFiles(files);
    const item = await PagesDetail.create({date:req.session.userData.DATE ,type:option ,  description:description,upload:upload ,group:req.session.userData.WhichUser ,files:files })
    console.log("Post saved successfully")
  } catch (error) {
    console.error(error)
    res.sendStatus(500);
  }

  
  eventTime = new Date(req.session.userData.DATE);
  eventTime.setHours(0,0,0);
  const foundEvent = req.session.userData.CALENDAR_EVENTS.find(event=>((+(event.start) === +eventTime) && event.title === option));
  console.log('similar event is : ' + foundEvent)

  if(!foundEvent) {
      req.session.userData.CALENDAR_EVENTS.push({
      title: option,
      start: eventTime,
      end: eventTime
    });
    try {
      const event = await CalendarEventsDB.create({title:option , start: eventTime , end:eventTime , group:req.session.userData.WhichUser})
      console.log("Event saved successfully")
    } catch (error) {
      console.error(error)
      res.sendStatus(500);
    }
  }
  res.sendStatus(200);
});


app.post('/api/getDate',jwtMiddleware ,  async (req, res) => {
  req.session.userData.DATE = req.body.date;
  res.status(200).json({ message: req.session.userData.DATE });
});

app.get('/api/getPosts', jwtMiddleware , async (req, res) => {
  try {
    const PageDetails = await PagesDetail.find({date: req.session.userData.DATE , group:req.session.userData.WhichUser});
    res.json(PageDetails || []);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ message: 'Error retrieving posts' });
  }
});

app.get('/api/getEvents',jwtMiddleware ,  async (req, res) => {
  try {
    const events = await CalendarEventsDB.find({group:req.session.userData.WhichUser});
    req.session.userData.CALENDAR_EVENTS = events.map(({ title, start, end }) => ({ title, start, end })); 
    res.json(req.session.userData.CALENDAR_EVENTS || []);
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
        const accessToken = jwt.sign({username:username}, process.env.ACCESS_TOKEN , {expiresIn:'24h'}) // seralize the username.
        if(username == "Shaked") // Only Shaked is Administrator.
        {
          req.session.userData.IsAdmin = true;
        }
        req.session.userData.WhichUser = DBuser.id; // update which user is logged in.
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


app.post('/api/register',jwtMiddleware , async (req, res) => {
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

app.put('/api/updateWhichUser',jwtMiddleware , (req, res) => {
  req.session.userData.WhichUser = req.body.userId;
  res.sendStatus(200)
});

app.get('/api/getUsers',jwtMiddleware , async (req, res) => {
  const users = await Users.find({});
  res.status(200).json({users : users});
});

app.get('/api/Authorize',jwtMiddleware , async (req, res) => {
  const user = await Users.findOne({id:req.session.userData.WhichUser})
  res.status(200).json({admin:req.session.userData.IsAdmin , user:user.username});
});

app.delete('/api/deleteItem',jwtMiddleware , async (req,res) => {
  const item = req.body.item;
  console.log(item)
  await PagesDetail.findOneAndDelete({date:item.date , type:item.type , group:item.group , description:item.description});
  const similarItem = await PagesDetail.findOne({date:item.date , type:item.type , group:item.group})
  console.log(similarItem)
  if(similarItem == null)
  {
    const eventTime = new Date(item.date)
    eventTime.setHours(0,0,0)
    await CalendarEventsDB.findOneAndDelete({title:item.type , start:eventTime , group:item.group})
  }
  res.sendStatus(200);
});
