var express = require('express')
var router = express.Router()
var User = require('../models/user.js')

router.post("/",(req,res)=>{
    var user = new User(req.body)
    user.save((err,user)=>{
        if(err) res.json(err);
        else res.json(user);
    })
})

router.get("/",(req,res)=>{
    User.find((err,users)=>{
        if(err) res.json(err)
        else res.json(users)
    })
})


module.exports = router