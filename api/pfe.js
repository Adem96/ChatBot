var express = require("express");
var router = express.Router();
var pfe = require("../models/stagePFE.js");
var user = require("../models/user.js")
var pfeController = require("../controller/pfe.js");
var GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('../client_secret.json');
var doc = new GoogleSpreadsheet('1pAJx4bT1YPsIxM6wnzPz-_br5kEwvIRnZRP8itKuV88');
const brain = require('brain.js');


const request = require("request") // You have to run `npm install request` for this script to work
const json = {
    "output": "result-object",
    "argument": {
        "sessionCookie": "AQEDASSVMGIAcyJQAAABaVzpHhoAAAFqDpXce04AXLOaJDINcCjx_UAmziro844TPqXY7fwGGVAETKHu4LXI1Mitma7hLdwRaMsU_uqYpQfhuUqasUMQjXyZpeJbRL7ywbewy-SAhDx3yNcNPo9kN3pK",
        "spreadsheetUrl": "https://docs.google.com/spreadsheets/d/1pAJx4bT1YPsIxM6wnzPz-_br5kEwvIRnZRP8itKuV88",
        "emailChooser": "none",
        "numberOfAddsPerLaunch": 10,
        "saveImg": false,
        "takeScreenshot": false,
        "takePartialScreenshot": false
    }
}
const options = {
    url: "https://phantombuster.com/api/v1/agent/85300/launch",
    headers: { "X-Phantombuster-Key-1": "iOxYHkjuN1mijdRbR3KSlyyJdzShudzU" },
    json
}





var i = 0;
var chatbotConnect = require("../api/chatbotConnect.js");

router.post("/ajouter", (req, res) => {
    var stage = new pfe(req.body);
    stage.save((err, c) => {
        if (err) res.json(err);
        else res.json(c);
    });
});


router.post("/rechercher", function(req, res, next) {

    var msg = req.body.msg;
    chatbotConnect(msg)
        .then(function(response) {

            switch (response[0].queryResult.intent.displayName) {
                case "stgaePFE":
                    var pfe = new pfeController();
                    console.log(response[0].queryResult.parameters.fields.choixpfe.stringValue);
                    if(response[0].queryResult.parameters.fields.choixpfe.stringValue=="" && i==0){
                        i++;
                        console.log(i);
                        res.json({info : "passez nous votre profil linkedin ou passez un petit quizz en rependant profil ou quizz"})
                    }
                    else if(response[0].queryResult.parameters.fields.choixpfe.stringValue=="" && i >0  )
                        res.json({info : "je ne vous comprends pas , réponder par quizz ou profil"})
                    else
                    {   if(response[0].queryResult.parameters.fields.choixpfe.stringValue=="profil" )
                    res.redirect("/" +
                        "pfe/linkedin")
                    }
                    break;

                default:
                    res.json({error : "je ne comprend pas ce que vous dites"});
            }
        })
        .catch(function(err) {
            res.json(err);
        });
});

router.get("/linkedin", (req, res) => {


    doc.useServiceAccountAuth(creds, function (err) {


        // Get all of the rows from the spreadsheet.
        doc.getRows(1 , function (err, rows) {

            rows[0].del()
            console.log(rows);
        });
        doc.addRow(1, { linkedin: req.body.link}, function(err) {
            if(err) {
                console.log(err);
            }
        });

    });

    request.post(options, (err, httpResponse, body) => {
        res.send(err || JSON.stringify(body, null, "\t"))})

})

router.get("/pred", (req, res) => {
    const network = new brain.NeuralNetwork();
    network.train([
        { input: [1, 2], output: [1] }, // Team 2 wins
        { input: [1, 3], output: [1] }, // Team 3 wins
        { input: [2, 3], output: [0] }, // Team 2 wins
        { input: [2, 4], output: [1] }, // Team 4 wins
        { input: [1, 2], output: [0] }, // Team 1 wins
        { input: [1, 3], output: [0] }, // Team 1 wins
        { input: [3, 4], output: [0] } // Team 3 wins
    ]);

    const output = network.run([1, 4]);

    console.log(`Prob: ${output}`);

});

module.exports = router
