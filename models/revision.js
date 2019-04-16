var mongoose = require('mongoose')
var user = require('./user').schema;


var revisionSchema = mongoose.Schema({
    matiere :{type : String},
    placeDispo : {type:Number, maxValue:5 , minValue:0},
    etudiants : [user]

})

module.exports = mongoose.model('revision',revisionSchema)