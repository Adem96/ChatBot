var mongoose = require('mongoose')
var marks = require("./marks.js").schema



var examCalendarSchema = mongoose.Schema({
    start : {type:Date,trim : true},
    end : {type : Date , trim : true},
    name:{type:String},
    notes:[marks],
})

module.exports = mongoose.model('ExamCalendar',examCalendarSchema)