var mongoose = require('mongoose')
var specialite = require('./specialite.js').schema;

var userSchema = new mongoose.Schema({
    nom : {type : String , trim : true},
    prenom : {type : String},
    username : {type : String},
    password : {type:String},
    email : {type : String},
    age : {type : Number},
    specialite : specialite
})

module.exports = mongoose.model('User',userSchema)