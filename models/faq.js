var mongoose = require('mongoose')



var faqSchema = mongoose.Schema({
    titre : {type:String,trim : true},
    description:{type:String,trim : true},
})

module.exports = mongoose.model('faq',faqSchema)