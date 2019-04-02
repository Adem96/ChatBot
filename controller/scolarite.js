var Subject = require("../models/subject.js");

// function specialites() {
//
//
//   this.getSpecialite = msg => {
//     return new Promise(function(resolve, reject) {
//       Specialite.findOne({ nom: msg }, (err, specialite) => {
//         if (err) reject(err);
//         else resolve(specialite);
//       });
//     });
//   };
//   this.getAllSpecialites = () =>{
//     return new Promise(function(resolve,reject){
//       Specialite.find((err,specialites)=>{
//         if(err) reject(err)
//         else resolve(specialites)
//       })
//     })
//   }
//   this.getModulesSpecialite = (msg) => {
//     return new Promise(function(resolve,reject){
//       Specialite.findOne({nom:msg},(err,moduleS)=>{
//         if(err) reject(err)
//         else resolve(moduleS.modulesSpecialite)
//       })
//     })
//   }
// }
module.exports = scolarite;
