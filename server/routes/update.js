const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/authorization');



router.put('/api/updateWhichUser',jwtMiddleware , (req, res) => {
    req.session.userData.WhichUser = req.body.userId;
    res.sendStatus(200)
});
  

  router.delete('/api/deleteItem',jwtMiddleware , async (req,res) => {
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

  module.exports = router;