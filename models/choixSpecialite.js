var mongoose = require('mongoose')
var User = require('../models/user').schema

var choixSpecialiteSchema = mongoose.Schema({
    user : User,
    listChoix : [String]
})

module.exports = mongoose.model('choixSpecialite',choixSpecialiteSchema)