// import modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose'); // MongoDB driver
const multer = require('multer'); // For handling file uploads
const moment = require('moment'); // For handling date and time


const app = express();

//Variables
const PORT = process.env.PORT || 3000;
let CALENDER_EVENTS = [];
const TIME_FOR_CALENDER = "T10:00:00"
let PAGES_DETAILS = new Map();
let DATE;

app.use(express.urlencoded({ extended: true }));


// Middleware
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
  const images = req.files.map((file) => file.filename); // Extract the files from the post.
  const selectedTime = req.body.time; // Time for upload
  const post = { description, images, selectedTime }; // Create a new post object.
  if(PAGES_DETAILS.has(DATE)) {
    PAGES_DETAILS.get(DATE).push(post);
  }
  else {
    PAGES_DETAILS.set(DATE, post);
  }

  eventTime = moment(DATE+TIME_FOR_CALENDER).toDate();

  const foundEvent = CALENDER_EVENTS.find(event => 
    event.start === eventTime && event.title === "Post"
  );

  if(!foundEvent) {
    CALENDER_EVENTS.push({
      title: "Post",
      start: eventTime,
      end: eventTime
    });
  }

});

app.post('/api/createReelStory', upload.single('file'), async (req, res) => {
  const file = req.body.file;
  const selectedTime = req.body.time; // Time for upload
  const option = req.body.option; // reel/story.
  const item = { file, selectedTime , option }; // Create a new post object.
  if(PAGES_DETAILS.has(DATE)) {
    PAGES_DETAILS.get(DATE).push(item);
  }
  else {
    PAGES_DETAILS.set(DATE, item);
  }

  eventTime = moment(DATE+TIME_FOR_CALENDER).toDate();

  const foundEvent = CALENDER_EVENTS.find(event => 
    event.start === eventTime && event.title === option
  );

  if(!foundEvent) {
    CALENDER_EVENTS.push({
      title: option,
      start: eventTime,
      end: eventTime
    });
  }
});

app.post('/api/getDate', async (req, res) => {
  DATE = req.body.date;
  res.status(200).json({ message: DATE });
});

app.get('/api/getPosts', async (req, res) => {
  try {
    res.json(PAGES_DETAILS.get('18-08-2015') || []);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ message: 'Error retrieving posts' });
  }
});

app.get('/api/getEvents', async (req, res) => {
  try {
    res.json(CALENDER_EVENTS || []);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
