var subject = require('./subject.js')
var user = require('./user.js')
const mongoose = require('mongoose'), Schema = mongoose.Schema;


var reclamationSchema = mongoose.Schema({
    titre : {type:String,trim : true},
    contenu:{type:String,trim : true},
    matiere:{type:Schema.Types.ObjectId, ref:'Subject'},
    user:{type:Schema.Types.ObjectId, ref:'User'}

})

module.exports = mongoose.model('Reclamation',reclamationSchema)