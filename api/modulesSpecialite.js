var express = require("express");
var router = express.Router();
var ModulesSpecialite = require("../models/modulesSpecialite.js");
var specialiteController = require("../controller/specialites.js");
var chatbotConnect = require("../api/chatbotConnect.js");
var User = require("../models/user");

router.post("/", (req, res) => {
  var moduleS = new ModulesSpecialite(req.body);
  moduleS.save((err, moduleS) => {
    if (err) res.json(err);
    else res.json(moduleS);
  });
});

router.get("/", (req, res) => {
  var specialite = new specialiteController();
  specialite.getModulesSpecialite("TWIN").then(response => {
    res.send(response);
  });
});
router.get("/all", (req, res) => {
  var specialite = new specialiteController();
  specialite.getAllSpecialites().then(response => {
    res.json(response);
  });
});

router.post("/choixSpecialite", (req, res) => {
  User.findOne({ _id: req.body.user._id }, (err, user) => {
    user.listChoix = req.body.listChoix
    user.specialiteUpdate = true
    user.save((err, u) => {
      if (err) res.json(err);
      else res.json(u);
    });
  });
});

module.exports = router;
