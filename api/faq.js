var express = require("express");
var router = express.Router();
var Faq = require("../models/faq.js");
var Reclamation = require("../models/reclamation.js");
var Calendar = require("../models/AnnualCalendar.js");
var faqController = require("../controller/faq.js");
var Subject = require("../models/subject.js");
const notifier = require('node-notifier');
var User = require("../models/user");


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
    var reclamations = {

        contenu: req.body.contenu,
        matiere: req.body.matiere

    }


    var rec = new Reclamation(reclamations);
    rec.save((err, f) => {
        if (err) res.json(err);
        else res.json(f);
        notifier.notify('Votre réclamation a été bien déposée et ESPRIT assurera le suivi')
    });
    console.log(reclamations)
    var id = req.body.id
    console.log(id);
    User.findOne({_id: id}, (err, user) => {

            user.reclamations.push(reclamations)
            user.save()
        }
    );


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

router.post("/CanvasNotes", function (req, res, next) {
    var msg = req.body.msg;
    chatbotConnect(msg)
        .then(function (response) {

            switch (response[0].queryResult.intent.displayName) {
                case "Graphes":
                    var faq = new faqController();
                    faq.getCalendar(response[0].queryResult.parameters.fields.Notes.stringValue).then(response => {
                        res.json({intent: "Graphes", response});
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


router.get("/reclamations", function (req, res, next) {
    var faq = new faqController();
    faq.getAllReclamations().then(response => {
        res.json(response);
    });
});


router.post("/treatRec",async function (req, res, next) {

    // var user = await User.findOne({_id: req.body.idU})
    // console.log(user)
    // var rec = user.reclamations
    // console.log(rec)
    // for(var i in rec){
    //
    //     if(rec[i]._id===req.body.idR){
    //
    //         rec[i].etat = 'Traitée'
    //
    //     }
    //
    // }
    // user.save();
    // res.json('Traitée')


    User.findOne({_id:req.body.idU},(err,user)=>{

        user.reclamations.map(req=>{
            req.etat = 'Traitée'


        })
        notifier.notify('Réclamation traitée avec succès')

        user.save();


    })

});


module.exports = router;