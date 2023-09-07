const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const DeleteOldFiles = require('../middleware/DeleteFiles');
const PagesDetail = require('../models/pages_detail');
const CalendarEventsDB = require('../models/calendar_events');

router.post('/api/createItem', upload.array('files'), async (req, res) => {
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

  module.exports = router;