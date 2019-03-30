var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/chatbot',()=>{
    console.log('db connect')
});
