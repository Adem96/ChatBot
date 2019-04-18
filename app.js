var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var chatbotConnect = require("./api/chatbotConnect.js");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var users = require('./api/users.js')
var specialites = require('./api/specialites.js')
var moduleSpecialite = require('./api/modulesSpecialite.js')
var admin = require('./api/admin')
var covRouter = require('./api/covoiturage')
var revRouter = require('./api/revision')
var pfeRouter = require('./api/pfe')

var revRouter = require('./api/revision')
var pfeRouter = require('./api/pfe')

var faqRouter = require('./api/faq')


var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
io.on("connect", function(socket){
  console.log("socket connect")
  // socket.emit("helloServer","Bonjour ceci est un test sur vos préférences afin de savoir quel spécialité vous convient le mieux")
  socket.on("fromClient" , function(msg) {
    chatbotConnect(msg)
    .then(function(response) {
      console.log()
      if(response[0].queryResult.intent.displayName === "firstQ"){
        if(response[0].queryResult.parameters.fields.firstq.stringValue === "math"){
            socket.emit("fromServer", "math") 
        }
        if(response[0].queryResult.parameters.fields.firstq.stringValue === "developpement"){
          socket.emit("fromServer", "Si vous deviez choisir un métier lequel feriez vous ?")
        }
        if(response[0].queryResult.parameters.fields.firstq.stringValue === "reseaux"){
          socket.emit("fromServer", "reseau") 
        }
      }
      console.log(response[0].queryResult.intent.displayName)
      if(response[0].queryResult.intent.displayName === "secondeQ"){
        console.log(response[0].queryResult.parameters.fields.devOptions.stringValue)
        if(response[0].queryResult.parameters.fields.devOptions.stringValue === "jeuVideo"){
          console.log("jeu")
            socket.emit("fromServer" , "jeuVide")
        }
        if(response[0].queryResult.parameters.fields.devOptions.stringValue === "developpeur"){
          console.log("site")
            socket.emit("fromServer" , "site web")
        }
        if(response[0].queryResult.parameters.fields.devOptions.stringValue === "Architect"){
          console.log("architect")
          socket.emit("fromServer" , "Architect SI")
        }
      }
    })
       
  })
  // socket.emit("firstQuiz","Pour vous qu'est ce que vous preferez le plus")
})
app.use(function(req, res, next){
  res.io = io;
  next();
 });

var db = require('./models/db')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', users);
app.use('/admin',admin)
app.use('/options',specialites);
app.use('/modulesSpecialite',moduleSpecialite)
app.use('/cov',covRouter)
app.use('/revision',revRouter)
app.use('/pfe',pfeRouter)
app.use('/faq',faqRouter)


const expressip = require('express-ip');
app.use(expressip().getIpInfoMiddleware);
app.get('/abc', function (req, res) {
  const ipInfo = req.ipInfo;
  console.log(req.ipInfo)
  var message = `Hey, you are browsing from ${ipInfo.city}, ${ipInfo.country},`;
  res.send(message);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app:app, server:server};