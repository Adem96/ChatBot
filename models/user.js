var mongoose = require('mongoose')
var specialite = require('./specialite.js').schema;
//5cade60f508d2b323875b09f test
var notes = new mongoose.Schema({
    "matiere" : {type : String},
    "note" : {type : Number},
    "coef" : {type : Number}
})

var userSchema = new mongoose.Schema({
    nom : {type : String , trim : true},
    prenom : {type : String},
    password : {type:String , required : true},
    email : {type : String , required : true},
    age : {type : Number},
    specialite : {type : specialite , default : null},
    notes : [notes],
    role : {type : String , default : null}
})

module.exports = mongoose.model('User',userSchema)