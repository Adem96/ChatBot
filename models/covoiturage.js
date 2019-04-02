var mongoose = require('mongoose')



var covoiturageSchema = mongoose.Schema({
    depart : {type:String},
    nom : {type:String , trim : true},

})

module.exports = mongoose.model('covoiturage',covoiturageSchema)