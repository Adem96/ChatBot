const mongoose = require("mongoose");
var User = require('./user').schema;
let Schema = mongoose.Schema;


var listquestion = mongoose.Schema({
    question:String,
    reponse1: String,
    reponse2: String,
    reponse3: String,
    reponse4:String,
    correctAnswer:String,
    reponse: Boolean
    
})

const TestuserSchema = mongoose.Schema({
    user: [{ type: Schema.ObjectId, ref: 'User' }],
    test: [{ type: Schema.ObjectId, ref: 'Test' }],
    noteOral: {type:Number}, 
    noteEcrit: {type:Number},
    reconaissanceFaciale:{type:Boolean},
    listquestions : [listquestion],
    passageEcrit: {type:Boolean},
    jury:[User],
    result: { type: String },
    classe : {type: String},
});

module.exports = mongoose.model("Testuser", TestuserSchema);
