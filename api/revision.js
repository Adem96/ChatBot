var express = require("express");
var router = express.Router();
var Revision = require("../models/revision.js");
var user = require("../models/user.js")
var revController = require("../controller/revision.js");
var chatbotConnect = require("../api/chatbotConnect.js");


router.post("/ajouter", (req, res) => {
    var rev = new Revision(req.body);
    rev.save((err, c) => {
        if (err) res.json(err);
        else res.json(c);
    });
});

router.post("/accepter/:id", (req, res) => {
    var x = true;
    user.findOne({nom: "ben fadhel"}, (err, u) => {
        Revision.findOne({_id: req.params.id}, (err, c) => {
            console.log(c.etudiants.includes(u))
         //   c.placeDispo--;
            c.etudiants.forEach(function (ee) {
                if(ee.id==u.id){
                    x=false;
                    console.log(x+"  "+ee.id)
                  }

            })
            if(x==false)
                res.json({info :"tu est deja inscrit"})
            else{

            c.etudiants.push(u)
            console.log(c)
            c.save(function (err) {
                if (err)
                    console.log('error')
                else
                    res.json(c)
            });}
        });
    });
})

router.post("/accueil/:id", (req, res) => {
    var revs = []
    var mesMat= [];
    user.findOne({_id: req.params.id}, (err, u) => {
        u.notes.forEach(function(e) {
            if (e.note < 10)
                mesMat.push(e.matiere)
        })

        if(mesMat.length==0)
                res.json({info : "tres bien contunue comme ca"})
        else {
            var text = ""

            var rev = new revController();

            mesMat.forEach(function (ee) {
                text = text.concat(ee + ", ")
                rev.getRevisions(ee).then(response => {
                   revs.push(response)

                    console.log("1"+revs)
                })
            })
            console.log("2"+revs)
            res.json({ info:"tu a besouin d'un groupe de revision "+ text+"?" })
        }});
})



var i=0;
router.post("/rechercher", function(req, res, next) {

    var msg = req.body.msg;
    chatbotConnect(msg)
        .then(function(response) {

            switch (response[0].queryResult.intent.displayName) {
                case "revision_req":
                    var rev = new revController();
                    console.log(response[0].queryResult.parameters.fields.matieres.stringValue);
                    if(response[0].queryResult.parameters.fields.matieres.stringValue=="" && i==0){
                        i++;
                        console.log(i);
                        res.json({info : "choisissez une matiere ?"})
                    }
                    else if(response[0].queryResult.parameters.fields.matieres.stringValue=="" && i >0  )
                        res.json({info : "pas de groupe pour cette matiere, réessayez"})
                    else
                    {
                        rev.getRevisions(response[0].queryResult.parameters.fields.matieres.stringValue).then(response => {
                            i=0;
                            res.json({ intent: "revision_req", response });
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