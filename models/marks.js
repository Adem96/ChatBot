var mongoose = require('mongoose')
var marksSchema = mongoose.Schema({
    cc : {type:Number,trim : true},
    tp : {type : Number , trim : true},
    exam : {type : Number , trim : true},
})

module.exports = marksSchema