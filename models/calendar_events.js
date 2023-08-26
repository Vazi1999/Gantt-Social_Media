const mongoose = require('mongoose');


const calendarEvents = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    start:{
        type: String,
        required: true,
    },
    end:{
        type: String,
        required: true,
    },
    group:{
        type:Number,
        required: true,
    }
});

module.exports = mongoose.model("CalendarEvents",calendarEvents);