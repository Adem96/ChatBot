var express = require("express");
var router = express.Router();
var Specialite = require("../models/specialite.js");
var specialiteController = require("../controller/specialites.js");

var chatbotConnect = require("../api/chatbotConnect.js");

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
          switch (
            response[0].queryResult.parameters.fields.Specialite.stringValue
          ) {
            case "TWIN":
              var specilaite = new specialiteController();
              specilaite.getSpecialite("TWIN").then(response => {
                res.json({ intent: "detailsSpecialite", response });
              });
              break;
            case "GL":
              var specialite = new specialiteController();
              specialite.getSpecialite("GL").then(response => {
                res.json({ intent: "detailsSpecialite", response });
              });
              break;
            case "SIM":
              var specialite = new specialiteController();
              specialite.getSpecialite("SIM").then(response => {
                res.json({ intent: "detailsSpecialite", response });
              });
              break;
            case "ERP":
              var specialite = new specialiteController();
              specialite.getSpecialite("ERPBI").then(response => {
                res.json({ intent: "detailsSpecialite", response });
              });
              break;
            case "InFini":
              var specialite = new specialiteController();
              specialite.getSpecialite("INFINI").then(response => {
                res.json({ intent: "detailsSpecialite", response });
              });
              break;
            case "SIGMA":
              var specialite = new specialiteController();
              specialite.getSpecialite("SIGMA").then(response => {
                res.json({ intent: "detailsSpecialite", response });
              });
              break;
            case "NIDS":
              var specialite = new specialiteController();
              specialite.getSpecialite("NIDS").then(response => {
                res.json({ intent: "detailsSpecialite", response });
              });
              break;
            case "SLEAM":
              var specialite = new specialiteController();
              specialite.getSpecialite("SLEAM").then(response => {
                res.json({ intent: "detailsSpecialite", response });
              });
              break;
            case "ArTic":
              var specialite = new specialiteController();
              specialite.getSpecialite("ARTIC").then(response => {
                res.json({ intent: "detailsSpecialite", response });
              });
              break;
            default:
              res.json("error");
          }
          break;
        case "Specialites":
          var specialite = new specialiteController();
          specialite.getAllSpecialites().then(response => {
            res.json({ intent: "Specialite", response });
          });
          break;
        case "moduleSpecialite":
          var specialite = new specialiteController();
        console.log(response[0].queryResult.parameters.fields.Specialite.stringValue)
            specialite.getModulesSpecialite(
              response[0].queryResult.parameters.fields.Specialite.stringValue
              )
              .then(response => {
                res.json({ intent: "ModuleSpecialite", response });
              });
        

          break;
       
        default:
          res.json("je ne comprend pas ce que vous dites");
      }
    })
    .catch(function(err) {
      res.json(err);
    });
});

module.exports = router;
