var express = require("express");
var router = express.Router();
var User = require("../models/user.js");
var specialiteController = require("../controller/specialites.js");

router.get("/studentChoix", (req, res) => {
  User.find({ listChoix: { $exists: true, $ne: []} , specialite : {$eq : null}}, (err, users) => {
    if (err) res.json(err);
    else res.json(users);
  });
});

router.get("/allStudents", (req, res) => {
  User.find((err, users) => {
    if (err) res.json(err);
    else res.json(users);
  });
});
router.post("/affectation", (req, res) => {
  res.io.emit("notification" , "notification")
  var specilaite = new specialiteController();
  var tabAffectation = [];
  User.find((err, users) => {
    if (err) res.json(err);
    else {
      var tabScores = specilaite.calculScoreStudents(users);
  
      for (var i in tabScores) {
        var obj = null;
        tabScores[i].choix.map((m, index) => {
          if (obj === null) {
            switch (m) {
              case "Téchnologies du web et de l'internet":
                if (tabScores[i].scores.twin >= 10) {
                  obj = { _id: tabScores[i].id, choix: m };
                }
                break;
              case "Génie logiciel":
                if (tabScores[i].scores.gl >= 10) {
                  obj = { _id: tabScores[i].id, choix: m };
                }
                break;
              case "Systemes d'information mobile":
                if (tabScores[i].scores.sim >= 10) {
                  obj = { _id: tabScores[i].id, choix: m };
                }
                break;
              case "Data Science":
                if (tabScores[i].scores.ds >= 10) {
                  obj = { _id: tabScores[i].id, choix: m };
                }
                break;
            }
            tabAffectation.push(obj);
         
          }
        });
    
      }
    }

    for (i in tabAffectation) {
       
      if (tabAffectation[i] !== null) {
        var choix = tabAffectation[i].choix;
        console.log(choix)
        User.findOne({ _id: tabAffectation[i]._id }, (err, user) => { 
          user.specialite = choix;
          user.save()
        });
      }
    }
    res.json({msg : "Success"})

  });
});

router.post("/sendNotification" , (req,res) => {

})
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
