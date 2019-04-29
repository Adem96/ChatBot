var subject = require('./subject.js')
var user = require('./user.js')
const mongoose = require('mongoose'), Schema = mongoose.Schema;


var reclamationSchema = mongoose.Schema({
    contenu:{type:String,trim : true},
    matiere:{type:String,trim : true},
    date:{type:Date,default: Date.now()},
    etat:{type:String,default:'En Attente'}

})

module.exports = mongoose.model('Reclamation',reclamationSchema)