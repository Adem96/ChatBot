var express = require("express");
var router = express.Router();
var Specialite = require("../models/specialite.js");
var specialiteController = require("../controller/specialites.js");
var User = require("../models/user");
var chatbotConnect = require("../api/chatbotConnect.js");
var brain = require("brain.js");
var input = require("../notes.json");


router.post("/", (req, res) => {
  var specialite = new Specialite(req.body);
  specialite.save((err, specialite) => {
    if (err) res.json(err);
    else res.json(specialite);
  });
});
router.get("/", (req, res) => {
  Specialite.findOne({ nom: "TWIN" }, (err, specialite) => {
    if (err) res.json(err);
    else res.json(specialite);
  });
});
router.get("/calculScore", (req, res) => {
  var specilaite = new specialiteController();
  specilaite.CalculScore(req.body.id).then(response => {
    res.json(response);
  });
});
router.post("/quiz", function(req,res) {
  var msg = req.body.msg
  chatbotConnect(msg)
  .then(function(response) {
    console.log()
    if(response[0].queryResult.intent.displayName === "firstQ"){
      if(response[0].queryResult.parameters.fields.firstq.stringValue === "math"){
        
      }
      if(response[0].queryResult.parameters.fields.firstq.stringValue === "developpement"){

      }
      if(response[0].queryResult.parameters.fields.firstq.stringValue === "reseaux"){

      }
      res.json(response[0].queryResult.parameters.fields.firstq.stringValue)
    }
  })
 
})
router.post("/specialites", function(req, res, next) {
  var msg = req.body.msg;
  var id = req.body.id;
  console.log(id);
  chatbotConnect(msg)
    .then(function(response) {
      switch (response[0].queryResult.intent.displayName) {
        case "listSpecialites":
          var specilaite = new specialiteController();
          // console.log(response[0].queryResult.parameters.fields.Specialite.stringValue)
          specilaite
            .getSpecialite(
              response[0].queryResult.parameters.fields.Specialite.stringValue
            )
            .then(response => {
              res.json({ intent: "detailsSpecialite", response });
            });
          break;
        case "Specialites":
          var specialite = new specialiteController();
          specialite.getAllSpecialites().then(response => {
            res.json({ intent: "Specialite", response });
          });
          break;
        case "moduleSpecialite":
          var specialite = new specialiteController();
          specialite
            .getModulesSpecialite(
              response[0].queryResult.parameters.fields.Specialite.stringValue
            )
            .then(response => {
              res.json({ intent: "ModuleSpecialite", response });
            });
          break;
        case "recommandationSpecialite":
          var net = new brain.NeuralNetwork();
          net.train(input);
          User.findOne({ _id: id }, (err, user) => {
            if (err) res.json({ error: err });
            if (!user) res.json({ error: "User n'exsite pas" });
            else {
              for (var i = 0; i < user.notes.length; i++) {
                if (user.notes[i].matiere === "Langage de Modélisation (UML)") {
                  var umlNote = user.notes[i].note;
                }
                if (
                  user.notes[i].matiere ===
                  "Conception par Objet et Programmation Java"
                ) {
                  var javaNote = user.notes[i].note;
                }
                if (user.notes[i].matiere === "Génie logiciel & atelier GL") {
                  var glNote = user.notes[i].note;
                }
                if (user.notes[i].matiere === "Technologies Web 2.0") {
                  var webNote = user.notes[i].note;
                }
                if (
                  user.notes[i].matiere ===
                  "Programmation des terminaux mobiles"
                ) {
                  var mobileNote = user.notes[i].note;
                }
                if (user.notes[i].matiere === "Projet développement Web Java") {
                  var piNote = user.notes[i].note;
                }
                if (
                  user.notes[i].matiere ===
                  "Sys. De Gestion de Bases de Données"
                ) {
                  var bddNote = user.notes[i].note;
                }
                if (user.notes[i].matiere === "Compléments de Mathématique") {
                  var math1Note = user.notes[i].note;
                }
                if (user.notes[i].matiere === "Analyse de Fourrier") {
                  var math2Note = user.notes[i].note;
                }
                if (user.notes[i].matiere === "Analyse numérique") {
                  var math3Note = user.notes[i].note;
                }
                if (user.notes[i].matiere === "Probabilité & Statistique") {
                  var probaNote = user.notes[i].note;
                }
              }
              // outputForTwin = net.run({
              //   "Sys. De Gestion de Bases de Données": 18 / 20,
              //   "Technologies Web 2.0": 18 / 20,
              //   "Projet développement Web Java": 18 / 20
              // });
              // outputForGl = net.run({
              //   "Langage de Modélisation (UML)": 18 / 20,
              //   "Conception par Objet et Programmation Java": javaNote / 20,
              //   "Génie logiciel & atelier GL": 18 / 20,
              //   "Technologies Web 2.0": 18 / 20
              // });
              // outputForSim = net.run({
              //   "Projet développement Web Java": piNote / 20,
              //   "Conception par Objet et Programmation Java": javaNote / 20,
              //   "Programmation des terminaux mobiles": mobileNote / 20
              // });
              // outputForDs = net.run({
              //   "Sys. De Gestion de Bases de Données": 18 / 20,
              //   "Compléments de Mathématique": math1Note / 20,
              //   "Analyse de Fourrier": math2Note / 20,
              //   "Analyse numérique": math3Note / 20,
              //   "Probabilité & Statistique": probaNote / 20,
              //   "Projet développement Web Java": 18 / 20
              // });

              output = net.run({
                "Sys. De Gestion de Bases de Données": bddNote / 20,
                "Compléments de Mathématique": math1Note / 20,
                "Analyse de Fourrier": math2Note / 20,
                "Analyse numérique": math3Note / 20,
                "Probabilité & Statistique": probaNote / 20,
                "Projet développement Web Java": piNote / 20,
                "Conception par Objet et Programmation Java": javaNote / 20,
                "Programmation des terminaux mobiles": mobileNote / 20,
                "Génie logiciel & atelier GL": glNote / 20,
                "Technologies Web 2.0": webNote / 20,
                "Langage de Modélisation (UML)": umlNote / 20
              });
              var glValue = output["gl"];
              var twinValue = output["twin"];
              var simValue = output["sim"];
              var dsValue = output["ds"];
              var twinDsValue = output["twinDs"];
              var twinSimValue = output["twinSim"];
              var simGlValue = output["simGl"];
              var twinGlValue = output["twinGl"];
              var twinSimGlValue = output["twinSimGl"];
              var results = [];
              results.push(
                glValue,
                twinValue,
                simValue,
                dsValue,
                twinDsValue,
                twinSimValue,
                simGlValue,
                twinGlValue,
                twinSimGlValue
              );
              var maxValue = Math.max(...results);

              for (var i = 0; i < results.length; i++) {
                if (results[i] === maxValue) {
                  var position = i;
                }
              }
              switch (position) {
                case 0:
                  var maxSpecialite = "gl";
                  break;
                case 1:
                  var maxSpecialite = "twin";
                  break;
                case 2:
                  var maxSpecialite = "sim";
                  break;
                case 3:
                  var maxSpecialite = "ds";
                  break;
                case 4:
                  var maxSpecialite = "twinDs";
                  break;
                case 5:
                  var maxSpecialite = "twinSim";
                  break;
                case 6:
                  var maxSpecialite = "simGl";
                  break;
                case 7:
                  var maxSpecialite = "twinGl";
                  break;
                case 8:
                  var maxSpecialite = "twinSimGl";
                  break;
              }
              var specialite = new specialiteController();
              specialite.getNotesUser(id).then(user => {
                var tabNotes = [];
                switch (maxSpecialite) {
                  case "twin":
                    for (var i in user.notes) {
                      if (
                        user.notes[i].matiere ===
                        "Sys. De Gestion de Bases de Données"
                      ) {
                        var obj = {
                          matiere: "Sys. De Gestion de Bases de Données",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Projet développement Web Java"
                      ) {
                        var obj = {
                          matiere: "Projet développement Web Java",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (user.notes[i].matiere === "Technologies Web 2.0") {
                        var obj = {
                          matiere: "Technologies Web 2.0",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                    }

                    break;
                  case "gl":
                    for (var i in user.notes) {
                      if (
                        user.notes[i].matiere ===
                        "Langage de Modélisation (UML)"
                      ) {
                        var obj = {
                          matiere: "Langage de Modélisation (UML)",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Conception par Objet et Programmation Java"
                      ) {
                        var obj = {
                          matiere: "Conception par Objet et Programmation Java",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (user.notes[i].matiere === "Technologies Web 2.0") {
                        var obj = {
                          matiere: "Technologies Web 2.0",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere === "Génie logiciel & atelier GL"
                      ) {
                        var obj = {
                          matiere: "Génie logiciel & atelier GL",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                    }
                    break;
                  case "sim":
                    for (var i in user.notes) {
                      if (
                        user.notes[i].matiere ===
                        "Programmation des terminaux mobiles"
                      ) {
                        var obj = {
                          matiere: "Programmation des terminaux mobiles",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Conception par Objet et Programmation Java"
                      ) {
                        var obj = {
                          matiere: "Conception par Objet et Programmation Java",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Projet développement Web Java"
                      ) {
                        var obj = {
                          matiere: "Projet développement Web Java",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                    }
                    break;
                  case "ds":
                    for (var i in user.notes) {
                      if (
                        user.notes[i].matiere === "Probabilité & Statistique"
                      ) {
                        var obj = {
                          matiere: "Probabilité & Statistique",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere === "Compléments de Mathématique"
                      ) {
                        var obj = {
                          matiere: "Compléments de Mathématique",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (user.notes[i].matiere === "Analyse de Fourrier") {
                        var obj = {
                          matiere: "Analyse de Fourrier",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (user.notes[i].matiere === "Analyse numérique") {
                        var obj = {
                          matiere: "Analyse numérique",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Sys. De Gestion de Bases de Données"
                      ) {
                        var obj = {
                          matiere: "Sys. De Gestion de Bases de Données",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Projet développement Web Java"
                      ) {
                        var obj = {
                          matiere: "Projet développement Web Java",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                    }
                    break;
                  case "twinDs":
                    for (var i in user.notes) {
                      if (
                        user.notes[i].matiere === "Probabilité & Statistique"
                      ) {
                        var obj = {
                          matiere: "Probabilité & Statistique",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere === "Compléments de Mathématique"
                      ) {
                        var obj = {
                          matiere: "Compléments de Mathématique",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (user.notes[i].matiere === "Analyse de Fourrier") {
                        var obj = {
                          matiere: "Analyse de Fourrier",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (user.notes[i].matiere === "Analyse numérique") {
                        var obj = {
                          matiere: "Analyse numérique",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Sys. De Gestion de Bases de Données"
                      ) {
                        var obj = {
                          matiere: "Sys. De Gestion de Bases de Données",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Projet développement Web Java"
                      ) {
                        var obj = {
                          matiere: "Projet développement Web Java",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (user.notes[i].matiere === "Technologies Web 2.0") {
                        var obj = {
                          matiere: "Technologies Web 2.0",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                    }
                    break;
                  case "twinSim":
                    for (var i in user.notes) {
                      if (
                        user.notes[i].matiere ===
                        "Programmation des terminaux mobiles"
                      ) {
                        var obj = {
                          matiere: "Programmation des terminaux mobiles",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Conception par Objet et Programmation Java"
                      ) {
                        var obj = {
                          matiere: "Conception par Objet et Programmation Java",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Sys. De Gestion de Bases de Données"
                      ) {
                        var obj = {
                          matiere: "Sys. De Gestion de Bases de Données",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Projet développement Web Java"
                      ) {
                        var obj = {
                          matiere: "Projet développement Web Java",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (user.notes[i].matiere === "Technologies Web 2.0") {
                        var obj = {
                          matiere: "Technologies Web 2.0",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                    }
                    break;
                  case "simGl":
                    for (var i in user.notes) {
                      if (
                        user.notes[i].matiere ===
                        "Programmation des terminaux mobiles"
                      ) {
                        var obj = {
                          matiere: "Programmation des terminaux mobiles",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Conception par Objet et Programmation Java"
                      ) {
                        var obj = {
                          matiere: "Conception par Objet et Programmation Java",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Projet développement Web Java"
                      ) {
                        var obj = {
                          matiere: "Projet développement Web Java",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (user.notes[i].matiere === "Technologies Web 2.0") {
                        var obj = {
                          matiere: "Technologies Web 2.0",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Langage de Modélisation (UML)"
                      ) {
                        var obj = {
                          matiere: "Langage de Modélisation (UML)",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere === "Génie logiciel & atelier GL"
                      ) {
                        var obj = {
                          matiere: "Génie logiciel & atelier GL",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                    }
                    break;
                  case "twinGl":
                    for (var i in user.notes) {
                      if (
                        user.notes[i].matiere ===
                        "Langage de Modélisation (UML)"
                      ) {
                        var obj = {
                          matiere: "Langage de Modélisation (UML)",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Conception par Objet et Programmation Java"
                      ) {
                        var obj = {
                          matiere: "Conception par Objet et Programmation Java",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (user.notes[i].matiere === "Technologies Web 2.0") {
                        var obj = {
                          matiere: "Technologies Web 2.0",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere === "Génie logiciel & atelier GL"
                      ) {
                        var obj = {
                          matiere: "Génie logiciel & atelier GL",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Sys. De Gestion de Bases de Données"
                      ) {
                        var obj = {
                          matiere: "Sys. De Gestion de Bases de Données",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Projet développement Web Java"
                      ) {
                        var obj = {
                          matiere: "Projet développement Web Java",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                    }
                    break;
                  case "twinSimGl":
                    for (var i in user.notes) {
                      if (
                        user.notes[i].matiere ===
                        "Sys. De Gestion de Bases de Données"
                      ) {
                        var obj = {
                          matiere: "Sys. De Gestion de Bases de Données",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Projet développement Web Java"
                      ) {
                        var obj = {
                          matiere: "Projet développement Web Java",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (user.notes[i].matiere === "Technologies Web 2.0") {
                        var obj = {
                          matiere: "Technologies Web 2.0",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Programmation des terminaux mobiles"
                      ) {
                        var obj = {
                          matiere: "Programmation des terminaux mobiles",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Conception par Objet et Programmation Java"
                      ) {
                        var obj = {
                          matiere: "Conception par Objet et Programmation Java",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere ===
                        "Langage de Modélisation (UML)"
                      ) {
                        var obj = {
                          matiere: "Langage de Modélisation (UML)",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                      if (
                        user.notes[i].matiere === "Génie logiciel & atelier GL"
                      ) {
                        var obj = {
                          matiere: "Génie logiciel & atelier GL",
                          note: user.notes[i].note
                        };
                        tabNotes.push(obj);
                      }
                    }

                    break;
                }
                res.json({
                  intent: "recommandationSpecialite",
                  Specialite: maxSpecialite,
                  notes: tabNotes
                });
              });
            }
          });
          break;
        default:
          res.json({ error: "je ne comprend pas ce que vous dites" });
      }
    })
    .catch(function(err) {
      res.json(err);
    });
});

module.exports = router;
