const mongoose = require('mongoose');


const calendarEvents = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    start:{
        type: Date,
        required: true,
    },
    end:{
        type: Date,
        required: true,
    },
    group:{
        type:Number,
        required: true,
    }
});

module.exports = mongoose.model("CalendarEvents",calendarEvents);