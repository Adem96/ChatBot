var mongoose = require('mongoose')


var listMatiersSchema = mongoose.Schema({
    nom :String,
    nbrHeures : Number,
    coef : Number
})
var modulesSpecialiteSchema = mongoose.Schema({
    semester : {type:String},
    nom : {type:String , trim : true},
    listMatieres : [listMatiersSchema],
})

module.exports = mongoose.model('ModulesSpecialite',modulesSpecialiteSchema)