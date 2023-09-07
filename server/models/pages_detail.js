const mongoose = require('mongoose');


const pageDetailsSchema = new mongoose.Schema({
    date:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    upload:{
        type: String,
    },
    group:{
        type:Number,
        required: true,
    },
    files:[{
        type : String,
    }]
})

module.exports = mongoose.model("PageDetails",pageDetailsSchema);