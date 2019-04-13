var Specialite = require("../models/specialite.js");
var modulesSpecialite = require("../models/modulesSpecialite.js");
var User = require("../models/user.js")

function specialites() {
  this.getNotesUser = (id) => {
    return new Promise(function(resolve, reject) {
        User.findOne({_id:id},(err,user)=>{
          if(err) reject(err)
          else resolve(user)
        })
    });
  };
  this.getSpecialite = msg => {
    return new Promise(function(resolve, reject) {
      Specialite.findOne({ nom: msg }, (err, specialite) => {
        if (err) reject(err);
        else resolve(specialite);
      });
    });
  };
  this.getAllSpecialites = () => {
    return new Promise(function(resolve, reject) {
      Specialite.find((err, specialites) => {
        if (err) reject(err);
        else resolve(specialites);
      });
    });
  };
  this.getModulesSpecialite = msg => {
    return new Promise(function(resolve, reject) {
      Specialite.findOne({ nom: msg }, (err, moduleS) => {
        if (err) reject(err);
        else resolve(moduleS.modulesSpecialite);
      });
    });
  };
}
module.exports = specialites;
