var express = require("express");
var router = express.Router();
var Covoiturage = require("../models/specialite.js");
var covoiturageController = require("../controller/covoiturage.js");


var chatbotConnect = require("../api/chatbotConnect.js");

router.post("/", (req, res) => {
    var cov = new Covoiturage(req.body);
    cov.save((err, c) => {
        if (err) res.json(err);
        else res.json(c);
    });
});

router.post("/recherche", function(req, res, next) {
    var msg = req.body.msg;
    chatbotConnect(msg)
        .then(function(response) {

            switch (response[0].queryResult.intent.displayName) {
                case "covoiturage_req":
                    var covoiturage = new covoiturageController();
                    covoiturage.getCovoiturage(response[0].queryResult.parameters.fields.Specialite.stringValue).then(response => {
                        res.json({ intent: "covoiturage_req", response });
                    });
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