// import modules
const express = require('express');
const session = require('express-session');
require('dotenv').config(); // .env configuration
const cors = require('cors');
const mongoose = require('mongoose'); // MongoDB driver
const uuid = require('uuid');


const app = express();

//global variables
const PORT = process.env.PORT || 3000; // need to change this to "8080" for fly.io
const frontendServer = 'http://localhost:5173';

// import routes
const createItemRoute = require('./routes/createItem');
const authRoute = require('./routes/auth');
const getDataRoute = require('./routes/getData');
const updateItemsRoute = require('./routes/update');


mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true , useUnifiedTopology: true})
  .then(async (result) => {
    console.log("Connected to DB")
    app.listen(PORT);
    console.log(`Server is listening on port ${PORT}`)
  })
  .catch((err) => console.log(err))


app.use(express.static('public')); // static files
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

// use routes
app.use(createItemRoute);
app.use(authRoute);
app.use(getDataRoute);
app.use(updateItemsRoute);

app.get('/', (req, res) => {
  res.send("<h1>Welcome to ShakeDvirGantt API</h1>")
});