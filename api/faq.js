var express = require("express");
var router = express.Router();
var Faq = require("../models/faq.js");
var Reclamation = require("../models/reclamation.js");
var Calendar = require("../models/AnnualCalendar.js");
var faqController = require("../controller/faq.js");
var Subject = require("../models/subject.js");
const notifier = require('node-notifier');

var chatbotConnect = require("../api/chatbotConnect.js");

router.post("/", (req, res) => {
    var faq = new Faq(req.body);
    faq.save((err, f) => {
        if (err) res.json(err);
        else res.json(f);
    });
});


router.post("/subjectAdd", (req, res) => {
    var sub = new Subject(req.body);
    sub.save((err, f) => {
        if (err) res.json(err);
        else res.json(f);
    });
});


router.post("/calendarAdd", (req, res) => {
    var cal = new Calendar(req.body);
    cal.save((err, f) => {
        if (err) res.json(err);
        else res.json(f);
    });
});


router.post("/reclamation", (req, res) => {
    var rec = new Reclamation(req.body);
    rec.save((err, f) => {
        if (err) res.json(err);
        else res.json(f);
        notifier.notify('Votre réclamation a été bien déposée et ESPRIT assurera le suivi')
    });
});


router.post("/rechercheP", function (req, res, next) {
    var msg = req.body.msg;
    chatbotConnect(msg)
        .then(function (response) {

            switch (response[0].queryResult.intent.displayName) {
                case "FAQ":
                    var faq = new faqController();
                    faq.getFaq(response[0].queryResult.parameters.fields.Paiement.stringValue).then(response => {
                        res.json({intent: "FAQ", response});
                        notifier.notify(response);
                    });
                    var faq = new faqController();
                    faq.getFaq(response[0].queryResult.parameters.fields.Foyer.stringValue).then(response => {
                        res.json({intent: "FAQ", response});
                        notifier.notify(response);
                    });




                    break;

                default:
                    res.json({error: "je ne comprend pas ce que vous dites"});
            }
        })
        .catch(function (err) {
            res.json(err);
        });
});

router.post("/rechercheF", function (req, res, next) {
    var msg = req.body.msg;
    chatbotConnect(msg)
        .then(function (response) {

            switch (response[0].queryResult.intent.displayName) {
                case "FAQ":
                    var faq = new faqController();
                    faq.getFaq(response[0].queryResult.parameters.fields.Foyer.stringValue).then(response => {
                        res.json({intent: "FAQ", response});
                    });
                    break;


                default:
                    res.json({error: "je ne comprend pas ce que vous dites"});
            }
        })
        .catch(function (err) {
            res.json(err);
        });
});

router.post("/rechercheR", function (req, res, next) {
    var msg = req.body.msg;
    chatbotConnect(msg)
        .then(function (response) {

            switch (response[0].queryResult.intent.displayName) {
                case "FAQ":
                    var faq = new faqController();
                    faq.getFaq(response[0].queryResult.parameters.fields.Restaurant.stringValue).then(response => {
                        res.json({intent: "FAQ", response});
                    });
                    break;


                default:
                    res.json({error: "je ne comprend pas ce que vous dites"});
            }
        })
        .catch(function (err) {
            res.json(err);
        });
});


router.post("/notes", function (req, res, next) {
    var msg = req.body.msg;
    chatbotConnect(msg)
        .then(function (response) {

            switch (response[0].queryResult.intent.displayName) {
                case "Scolarite":
                    var faq = new faqController();
                    faq.getAllNotes(response[0].queryResult.parameters.fields.Notes.stringValue).then(response => {
                        res.json({intent: "Scolarite", response});
                    });
                    break;

                default:
                    res.json({error: "je ne comprend pas ce que vous dites"});
            }
        })
        .catch(function (err) {
            res.json(err);
        });
});



router.post("/calendrier", function (req, res, next) {
    var msg = req.body.msg;
    chatbotConnect(msg)
        .then(function (response) {

            switch (response[0].queryResult.intent.displayName) {
                case "Scolarite":
                    var faq = new faqController();
                    faq.getCalendar(response[0].queryResult.parameters.fields.Calendrier.stringValue).then(response => {
                        res.json({intent: "Scolarite", response});
                    });
                    break;

                default:
                    res.json({error: "je ne comprend pas ce que vous dites"});
            }
        })
        .catch(function (err) {
            res.json(err);
        });
});



module.exports = router;