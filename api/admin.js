var express = require("express");
var router = express.Router();
var User = require("../models/user.js");
var specialiteController = require("../controller/specialites.js");

router.post("/affectation", (req,res) => {
    var specilaite = new specialiteController();
    User.find((err,users) => {
     if (err) res.json(err)
     else {
       res.json(specilaite.calculScoreStudents(users))  
     }
   })


})
router.post("/ajouterNote", (req, res) => {
  var note = {
    matiere: req.body.matiere,
    note: req.body.note
  };
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) res.json(err);
    if (!user) res.json({ error: "User n'existe pas" });
    else {
      user.notes.push(note);
      user.save((err, user) => {
        if (err) res.json(err);
        else res.json(user);
      });
    }
  });
});
module.exports = router;
