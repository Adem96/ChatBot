var express = require("express");
var router = express.Router();
var Covoiturage = require("../models/covoiturage.js");
var user = require("../models/user.js")
var covoiturageController = require("../controller/covoiturage.js");


var i = 0;
var chatbotConnect = require("../api/chatbotConnect.js");

router.post("/ajouter", (req, res) => {
    var cov = new Covoiturage(req.body);
    cov.save((err, c) => {
        if (err) res.json(err);
        else res.json(c);
    });
});

router.post("/accepter/:id", (req, res) => {
     user.findById("5c9b4f4c544d9a3d7cad21f0"), function(err, p) {
        if (!p){
            console.log(1)
            return next(new Error('Could not load Document'))}
        else {
            // do your updates here

             console.log(2)
            Covoiturage.findById(req.params.id), function(err, p2) {
                p2.placeDispo--;
                p2.passagers.push(p)
                console.log(p2)
                p2.save(function (err) {
                    if (err)
                        console.log('error')
                    else
                        res.json('success')
                });
            }}

        }})





router.post("/rechercher", function(req, res, next) {

    var msg = req.body.msg;
    chatbotConnect(msg)
        .then(function(response) {
    
            switch (response[0].queryResult.intent.displayName) {
                case "covoiturage_req":              
                    var covoiturage = new covoiturageController();
                    console.log(response[0].queryResult.parameters.fields.destination.stringValue);
                    if(response[0].queryResult.parameters.fields.destination.stringValue=="" && i==0){
                       i++;
                       console.log(i);
                        res.json({info : "pouvez vous specifier la ville ?"})
                    }
                    else if(response[0].queryResult.parameters.fields.destination.stringValue=="" && i >0  )
                        res.json({info : "pas de covoiturage pour cette ville, réessayez"})
                    else
                    {
                    covoiturage.getCovoiturage(response[0].queryResult.parameters.fields.destination.stringValue).then(response => {
                        i=0
                        res.json({ intent: "covoiturage_req", response });
                    })}
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