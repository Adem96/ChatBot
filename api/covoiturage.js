var express = require("express");
var router = express.Router();
var Covoiturage = require("../models/covoiturage.js");
var user = require("../models/user.js")
var covoiturageController = require("../controller/covoiturage.js");





var i = 0;
var chatbotConnect = require("../api/chatbotConnect.js");

router.get("/location",(req, res, next) =>{
    const ipInfo = req.ipInfo;
    console.log(req.ipInfo)
    var message = `Hey, you are browsing from ${ipInfo.city}, ${ipInfo.country}`;
    res.send(message);
    });


router.post("/ajouter", (req, res) => {
    var cov = new Covoiturage(req.body);
    cov.save((err, c) => {
        if (err) res.json(err);
        else res.json(c);
    });
});

router.post("/accepter/:id", (req, res) => {
    var x = true

    user.findOne({nom: "ben fadhel"}, (err, u) => {
        Covoiturage.findOne({_id: req.params.id}, (err, c) => {

             c.passagers.forEach(function (ee) {
                if(ee.id==u.id){
                    x=false;
                    console.log(x+"  "+ee.id)
                }

            })


        if(x==false)
                res.json({info :"tu est deja inscrit"})
        else   if(c.placeDispo==0)
            res.json({error:"plus de place diponible"})
            else{
            c.placeDispo--;
            c.passagers.push(u)
            console.log(c)
            c.save(function (err) {
                if (err)
                    console.log('error')
                else
                    res.json('success')
            });
        }});
    });
})











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