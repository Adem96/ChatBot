var mongoose = require('mongoose')
var user = require('./user').schema;


var covoiturageSchema = mongoose.Schema({
    depart : {type:String},
    choffeur : {type:user , default : null},
    cotisation : {type:Number},
    placeDispo : {type:Number, maxValue:5 , minValue:0},
    passagers : [user]

})

module.exports = mongoose.model('covoiturage',covoiturageSchema)