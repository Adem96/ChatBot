var subject = require('./subject.js')
var user = require('./user.js')
const mongoose = require('mongoose'), Schema = mongoose.Schema;


var reclamationSchema = mongoose.Schema({
    titre : {type:String,trim : true},
    contenu:{type:String,trim : true},
    user:{type:Schema.Types.ObjectId, ref:'User'},
    matiere:{type:String,trim : true},
    date:{type:Date,default: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')},
    etat:{type:String,default:'En Attente'}

})

module.exports = mongoose.model('Reclamation',reclamationSchema)