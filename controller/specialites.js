var Specialite = require("../models/specialite.js");
var modulesSpecialite = require("../models/modulesSpecialite.js");
var User = require("../models/user.js")

function specialites() {

  this.calculScoreStudents = (users) =>{
    var tab =[]
    for (var key in users){
      var user = users[key]
      var score
      var moyenneGenrale = 0
      for(var key in user.notes){
        if (user.notes[key].matiere === "Génie logiciel & atelier GL"){
          var glNote = user.notes[key].note
        }
        if (user.notes[key].matiere === "Langage de Modélisation (UML)") {
          var umlNote = user.notes[key].note
        }
        if(user.notes[key].matiere === "Conception par Objet et Programmation Java"){
          var javaNote = user.notes[key].note
        }
        if(user.notes[key].matiere === "Technologies Web 2.0"){
          var webNote = user.notes[key].note
        }
        if(user.notes[key].matiere === "Communication, Culture et Citoyenneté  A3"){
          var enNote = user.notes[key].note
        }
        if(user.notes[key].matiere === "Analyse et Décisions Financières"){
          var manageNote = user.notes[key].coef
        }
        if(user.notes[key].matiere === "Projet développement Web Java"){
          var piNote = user.notes[key].coef
        }
        if(user.notes[key].matiere === "Programmation des terminaux mobiles"){
          var mobileNote = user.notes[key].coef
        }
        if(user.notes[key].matiere === "Compléments de Mathématique"){
          var math1Note = user.notes[key].coef
        }
        if(user.notes[key].matiere === "Analyse de Fourrier"){
          var math2Note = user.notes[key].coef
        }
        if(user.notes[key].matiere === "Analyse numérique"){
          var math3Note = user.notes[key].coef
        }
        if(user.notes[key].matiere === "Probabilité & Statistique"){
          var probaNote = user.notes[key].coef
        }
        if(user.notes[key].matiere === "Sys. De Gestion de Bases de Données"){
          var bddNote = user.notes[key].coef
        }
        score = (user.notes[key].note) * (user.notes[key].coef)
        if (!isNaN(score)) {
          moyenneGenrale = moyenneGenrale + score
        }
                 
      }

      var scoreGl = (moyenneGenrale/60)*0.4 + manageNote*0.1 + enNote*0.1 
      + umlNote*0.1 + glNote*0.1 + javaNote*0.1 + webNote*0.1   

      var scoreTwin = (moyenneGenrale/60)*0.4 + manageNote*0.1 + enNote*0.1 
       + piNote*0.2 + webNote*0.2  

      var scoreSim = (moyenneGenrale/60)*0.4 + manageNote*0.1 + enNote*0.1 
       + piNote*0.1 + javaNote*0.1 + mobileNote*0.2

      var scoreDs = (moyenneGenrale/60)*0.4 + manageNote*0.1 + enNote*0.1 
       + piNote*0.1 +  bddNote*0.2 + math1Note * 0.05 + math2Note * 0.05 + math3Note *  0.05 + probaNote * 0.05

      var obj = {id:user._id , twin: scoreTwin , gl : scoreGl , sim : scoreSim , ds : scoreDs}
      tab.push(obj)
      
    }
    return tab
  } 
  this.CalculScore = (id) => {
    return new Promise(function(resolve,reject){
      User.findOne({_id:id} , (err,user)=> {
        if(err) reject(err)
        else {
          var score
          var moyenneGenrale = 0
          for(var key in user.notes){
            if (user.notes[key].matiere === "Génie logiciel & atelier GL"){
              var glNote = user.notes[key].note
            }
            if (user.notes[key].matiere === "Langage de Modélisation (UML)") {
              var umlNote = user.notes[key].note
            }
            if(user.notes[key].matiere === "Conception par Objet et Programmation Java"){
              var javaNote = user.notes[key].note
            }
            if(user.notes[key].matiere === "Technologies Web 2.0"){
              var webNote = user.notes[key].note
            }
            if(user.notes[key].matiere === "Communication, Culture et Citoyenneté  A3"){
              var enNote = user.notes[key].note
            }
            if(user.notes[key].matiere === "Analyse et Décisions Financières"){
              var manageNote = user.notes[key].coef
            }
            if(user.notes[key].matiere === "Projet développement Web Java"){
              var piNote = user.notes[key].coef
            }
            if(user.notes[key].matiere === "Programmation des terminaux mobiles"){
              var mobileNote = user.notes[key].coef
            }
            if(user.notes[key].matiere === "Compléments de Mathématique"){
              var math1Note = user.notes[key].coef
            }
            if(user.notes[key].matiere === "Analyse de Fourrier"){
              var math2Note = user.notes[key].coef
            }
            if(user.notes[key].matiere === "Analyse numérique"){
              var math3Note = user.notes[key].coef
            }
            if(user.notes[key].matiere === "Probabilité & Statistique"){
              var probaNote = user.notes[key].coef
            }
            if(user.notes[key].matiere === "Sys. De Gestion de Bases de Données"){
              var bddNote = user.notes[key].coef
            }
            score = (user.notes[key].note) * (user.notes[key].coef)
            if (!isNaN(score)) {
              moyenneGenrale = moyenneGenrale + score
            }
                     
          }
          var scoreGl = (moyenneGenrale/60)*0.4 + manageNote*0.1 + enNote*0.1 
                          + umlNote*0.1 + glNote*0.1 + javaNote*0.1 + webNote*0.1   

          var scoreTwin = (moyenneGenrale/60)*0.4 + manageNote*0.1 + enNote*0.1 
                           + piNote*0.2 + webNote*0.2  

          var scoreSim = (moyenneGenrale/60)*0.4 + manageNote*0.1 + enNote*0.1 
                           + piNote*0.1 + javaNote*0.1 + mobileNote*0.2

          var scoreDs = (moyenneGenrale/60)*0.4 + manageNote*0.1 + enNote*0.1 
                           + piNote*0.1 +  bddNote*0.2 + math1Note * 0.05 + math2Note * 0.05 + math3Note *  0.05 + probaNote * 0.05

          resolve({twin : scoreTwin.toFixed(2) , gl : scoreGl.toFixed(2) , sim : scoreSim.toFixed(2) , ds : scoreDs.toFixed(2)})
        }
      })
    })
  }

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
      
      Specialite.findOne({ nom: msg.toLowerCase() }, (err, specialite) => {
        if (err) reject(err);
        else 
          resolve(specialite);
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
