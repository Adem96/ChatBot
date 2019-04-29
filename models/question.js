const mongoose = require("mongoose");
let Schema = mongoose.Schema;


var questionSchema = mongoose.Schema({
    question :String,
    reponse1 : String,
    reponse2: String,
    reponse3: String,
    reponse4:String,
    correctAnswer:String,
    reponse: Boolean
    
})


module.exports = mongoose.model("Question", questionSchema);