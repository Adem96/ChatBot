var express = require("express");
var router = express.Router();
var User = require("../models/user.js");
var ChoixSpecialite = require("../models/choixSpecialite");
var specialiteController = require("../controller/specialites.js");

router.post("/affectation", (req, res) => {
  var specilaite = new specialiteController();
  User.find((err, users) => {
    if (err) res.json(err);
    else {
          var tabAffectation = [{_id : "" , specialite : ""}]
          var tabScores = specilaite.calculScoreStudents(users);
          var compteurTwin = 0 ;
          var compteurGl = 0 ;
          var compteurSim = 0;
          var compteurDs = 0;
          for (var i in tabScores){
            tabScores[i].choix.map((m,index) => {
             
              // switch(m){
              //   case "Téchnologies du web et de l'internet" :
              //   for(var k in tabAffectation){
              //     if(tabAffectation[k]._id !== tabScores[i].id){
              //       tabAffectation.push({_id : tabScores[i].id , specialite : "Téchnologies du web et de l'internet"})
              //     }
              //   }
                  
              //     // if(tabScores[i].scores.twin >= 10){
              //     //   var valeur = tabScores[i].scores.twin
                   
              //     //   for (var j in tabScores){
              //     //     if(tabScores[j].scores.twin > valeur && tabScores[j].choix[index] === "Téchnologies du web et de l'internet"){
              //     //       compteurTwin ++ ;
              //     //     }
              //     //   }
              //     //   console.log(compteur)
              //     //   if(compteurTwin < 2){
              //     //     tabAffectation.push({id:tabScores[i].id , specialite : tabScores[i].choix[0] , score : valeur})
                    
              //     //   }
              //     // }
              //   break;
              //   case "Génie logiciel" :
              //   for(var k in tabAffectation){
              //     if(tabAffectation[k]._id !== tabScores[i].id){
              //       tabAffectation.push({_id : tabScores[i].id , specialite : "Génie logiciel"})
              //     }
              //   }
                  
              //   break;
              //   case "Systemes d'information mobile":
              //   for(var k in tabAffectation){
              //     if(tabAffectation[k]._id !== tabScores[i].id){
              //       tabAffectation.push({_id : tabScores[i].id , specialite : "Systemes d'information mobile"})
              //     }
              //   }
              //   break;
              //   case "Data Science":
              //   for(var k in tabAffectation){
              //     if(tabAffectation[k]._id !== tabScores[i].id){
              //       tabAffectation.push({_id : tabScores[i].id , specialite : "Data Science"})
              //     }
              //   }
              //   break;
              // }
            })
            // if(tabScores[i].choix[0] === "Téchnologies du web et de l'internet" && tabScores[i].scores.twin >= 10){
            //   var valeur = tabScores[i].scores.twin
            //   var compteur = 0 
            //   for(var j in tabScores){
            //       if(tabScores[j].scores.twin > valeur){
            //           compteur ++;
            //       }
            //   }
            //   if(compteur < 60){
            //       tabAffectation.push({id:tabScores[i].id , specialite : tabScores[i].choix[0] , score : valeur})
            //   }
            // }
          }
   
        }
  res.json(tabScores)
      })
});
router.post("/ajouterNote", (req, res) => {
  var note = {
    matiere: req.body.matiere,
    note: req.body.note
  };
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) res.json(err);
    if (!user) res.json({ error: "User n'existe pas" });
    else {
      user.notes.push(note);
      user.save((err, user) => {
        if (err) res.json(err);
        else res.json(user);
      });
    }
  });
});
module.exports = router;
