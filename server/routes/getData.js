const express = require('express');
const router = express.Router();
const PagesDetail = require('../models/pages_detail');
const CalendarEventsDB = require('../models/calendar_events');
const Users = require('../models/users');
const jwtMiddleware = require('../middleware/authorization');



 router.post('/api/getDate',jwtMiddleware ,  async (req, res) => {
    req.session.userData.DATE = req.body.date;
    res.status(200).json({ message: req.session.userData.DATE });
  });
  
  router.get('/api/getPosts', jwtMiddleware , async (req, res) => {
    try {
      const PageDetails = await PagesDetail.find({date: req.session.userData.DATE , group:req.session.userData.WhichUser});
      res.json(PageDetails || []);
    } catch (error) {
      console.error('Error retrieving posts:', error);
      res.status(500).json({ message: 'Error retrieving posts' });
    }
  });
  
  router.get('/api/getEvents',jwtMiddleware ,  async (req, res) => {
    try {
      const events = await CalendarEventsDB.find({group:req.session.userData.WhichUser});
      req.session.userData.CALENDAR_EVENTS = events.map(({ title, start, end }) => ({ title, start, end })); 
      res.json(req.session.userData.CALENDAR_EVENTS || []);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving posts' });
    }
  });

  router.get('/api/getUsers',jwtMiddleware , async (req, res) => {
    const users = await Users.find({});
    res.status(200).json({users : users});
  });


  module.exports = router;