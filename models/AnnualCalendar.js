var mongoose = require('mongoose')
var marks = require("./marks.js").schema



var AnnualCalendarSchema = mongoose.Schema({
    title:{type:String,trim : true},
    start : {type:Date,trim : true}
})

module.exports = mongoose.model('AnnualCalendar',AnnualCalendarSchema)