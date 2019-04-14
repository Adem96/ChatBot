var mongoose = require('mongoose')
var user = require('./user').schema;

var Skill = new mongoose.Schema({
    "nom" : {type : String},

})

var stagePFESchema = mongoose.Schema({
    Societe :{type : String},
    description : {type:String },
    etudiant : user,
    Skills: [Skill]

})

module.exports = mongoose.model('stagePFE',stagePFESchema)