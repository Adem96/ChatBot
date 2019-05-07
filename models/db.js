var mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:admin0000@cluster0-va1jh.mongodb.net/chatbot?retryWrites=true',()=>{
    console.log('db connect')
});
