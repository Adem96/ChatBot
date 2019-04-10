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

router.post("/specialites", function(req, res, next) {
  var msg = req.body.msg;
  chatbotConnect(msg)
    .then(function(response) {
      switch (response[0].queryResult.intent.displayName) {
        case "listSpecialites":
          var specilaite = new specialiteController();
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
          //localStorag.token
          User.findOne({ _id: "5cade60f508d2b323875b09f" }, (err, user) => {
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
              outputForTwin = net.run({
                "Sys. De Gestion de Bases de Données": 18 / 20,
                "Technologies Web 2.0": 18 / 20,
                "Projet développement Web Java": piNote / 20
              });
              outputForGl = net.run({
                "Langage de Modélisation (UML)": umlNote / 20,
                "Conception par Objet et Programmation Java": javaNote / 20,
                "Génie logiciel & atelier GL": glNote / 20,
                "Technologies Web 2.0": 18 / 20
              });
              outputForSim = net.run({
                "Projet développement Web Java": piNote / 20,
                "Conception par Objet et Programmation Java": javaNote / 20,
                "Programmation des terminaux mobiles": mobileNote / 20
              });
              outputForDs = net.run({
                "Sys. De Gestion de Bases de Données": bddNote / 20,
                "Compléments de Mathématique": math1Note / 20,
                "Analyse de Fourrier": math2Note / 20,
                "Analyse numérique": math3Note / 20,
                "Probabilité & Statistique": probaNote / 20,
                "Projet développement Web Java": piNote / 20
              });
              
              if(outputForTwin.twinMax > outputForTwin.twinMoy && outputForTwin.twinMax > outputForTwin.twinMin){
                var resTwin = {"twinMax" : outputForTwin.twinMax}
              }else if(outputForTwin.twinMoy > outputForTwin.twinMin){
                var resTwin = {"twinMoy" : outputForTwin.twinMoy}
              }else {
                var resTwin = {"twinMin" : outputForTwin.twinMin}
              }   

              if(outputForGl.glMax > outputForGl.glMoy && outputForGl.glMax > outputForGl.glMin){
                var resGl = {"glMax" : outputForGl.glMax}
              }else if(outputForGl.glMoy > outputForGl.glMin){
                var resGl = {"glMoy" : outputForGl.glMoy}
              }else {
                var resGl = {"glMin" : outputForGl.glMin}
              }            

              res.json({resTwin , resGl})

            }
          });
          break;
        case "recommandationSpecialite":
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
