var express = require("express");
var router = express.Router();
var Specialite = require("../models/specialite.js");
var specialiteController = require("../controller/specialites.js");
var User = require('../models/user')
var chatbotConnect = require("../api/chatbotConnect.js");
var brain = require("brain.js")
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
             specilaite.getSpecialite(response[0].queryResult.parameters.fields.Specialite.stringValue).then(response => {
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
            specialite.getModulesSpecialite(
              response[0].queryResult.parameters.fields.Specialite.stringValue
              )
              .then(response => {
                res.json({ intent: "ModuleSpecialite", response });
              });
          break;
        // case "recommandationSpecialite" :
        // // 1er etape : recuperer les informations de l'utilisateur qui demande
        // var emailUser = req.body.email
        //       User.findOne({email : emailUser},(err,user)=>{
        //         // 2em etape developper un algorithme qui calcul 
        //       })
              
        // break;
        case "recommandationSpecialite" :
              
        break;
        default:
          res.json({error : "je ne comprend pas ce que vous dites"});
      }
    })
    .catch(function(err) {
      res.json(err);
    });
});

module.exports = router;
