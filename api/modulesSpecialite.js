var express = require("express");
var router = express.Router();
var ModulesSpecialite = require("../models/modulesSpecialite.js");
var specialiteController = require("../controller/specialites.js");
var chatbotConnect = require("../api/chatbotConnect.js");

router.post("/",(req,res)=>{
    var moduleS = new ModulesSpecialite(req.body);
    moduleS.save((err,moduleS)=>{
        if (err) res.json(err)
        else res.json(moduleS)
    })
})

router.get("/",(req,res)=>{
       var specialite = new specialiteController();
       specialite.getModulesSpecialite("TWIN").then((response)=>{
           res.send(response)
       })
      
})


module.exports = router