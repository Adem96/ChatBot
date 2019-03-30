var mongoose = require('mongoose')
var modulesSpecialite = require("./modulesSpecialite.js").schema

var metier = mongoose.Schema({
    nom :String
})

var specialiteSchema = mongoose.Schema({
    nom : {type:String,trim : true},
    description : {type : String , trim : true},
    objectif : {type : String , trim : true},
    profile : {type : String , trim : true},
    metiers : [metier],
    modulesSpecialite : [modulesSpecialite]
})

module.exports = mongoose.model('Specialite',specialiteSchema)