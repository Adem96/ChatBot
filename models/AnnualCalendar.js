var mongoose = require('mongoose')
var marks = require("./marks.js").schema



var AnnualCalendarSchema = mongoose.Schema({
    start : {type:Date,trim : true},
    end : {type : Date , trim : true},
    name:{type:String},
})

module.exports = mongoose.model('AnnualCalendar',AnnualCalendarSchema)