var express = require("express");
var router = express.Router();
var Faq = require("../models/faq.js");
var faqController = require("../controller/faq.js");


var chatbotConnect = require("../api/chatbotConnect.js");

router.post("/", (req, res) => {
    var faq = new Faq(req.body);
    faq.save((err, f) => {
        if (err) res.json(err);
        else res.json(f);
    });
});

router.post("/recherche", function(req, res, next) {
    var msg = req.body.msg;
    chatbotConnect(msg)
        .then(function(response) {

            switch (response[0].queryResult.intent.displayName) {
                case "FAQ":
                    var faq = new faqController();
                    faq.getFaq(response[0].queryResult.parameters.fields.Faq.stringValue).then(response => {
                        res.json({ intent: "FAQ", response });
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