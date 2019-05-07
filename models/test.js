const mongoose = require("mongoose");
var User = require('./user').schema;


let Schema = mongoose.Schema;

var listJurySchema = mongoose.Schema({
    nom :String,
    prenom : String
    
})


var listClasses = mongoose.Schema({
    numero :{type:String},
    nombreDePlaces : {type:Number},
    listUser : [User]
    
})

const TestSchema = mongoose.Schema({
    date: { type: Date, require:true},
    class: { type: String},
    heure: {type:String},
    listJury : [User],
    listClasses:[listClasses]
});
module.exports = mongoose.model("Test", TestSchema);
