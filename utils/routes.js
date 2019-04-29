'use strict';
const cv = require('opencv4nodejs');

const detectWebcamFace = require('./webcam-detect');
const opencvHelpers = require('./opencv-helpers');


class Routes{

	constructor(app,socket){
		this.app = app;
		this.io = socket;
			// Setting .html as the default template extension
		/*	this.app.set('view engine', 'html');

			// Initializing the ejs template engine
			this.app.engine('html', require('ejs').renderFile);
	
			// Telling express where it can find the templates
			this.app.set('views', (__dirname + 'views'));
	
			//Files 
			this.app.use(require('express').static(require('path').join('data')));*/
	}

	appRoutes() {

		this.app.post('/upload', async (req,res,next) => {
		
			try {


                     var response={

						fileData:req.body.fileData,
					 };



					 console.log("user sent photo information");

					 var data=response.fileData;

					 var imgData=data.replace(/data:image\/jpg;base64,/,"");
					 console.log(imgData);

					 require("fs").writeFile("data/face-recognition/imgs/output.jgp",imgData,"base64",function(err)
					
					{

                     console.log(err);

					});
				//	setTimeout(checkFace,500);
				/*  setTimeout(function()
				{

                        if(imgLabel=="taher"){

							console.log("C'est vous ");
						}

						else {


						console.log("ce n'est pas vous")
						}


				})*/

			}

			catch(e){

               next(e);

			}

 

		});
		 
		

		this.app.get('/', (request, response) => {
			response.render('index');
		});
         
		this.app.get('/image-face-detect', (request, response) => {
			response.render('image-face-detect');
		});

		this.app.get('/face-recognition', (request, response) => {
			detectWebcamFace.startFacialRecognition();
		});
		
		this.app.get('/webcam-face-detect', (request, response) => {
			response.render('webcam-face-detect');
		});

		this.app.get('/detect-faces', (request, response) => {
			opencvHelpers.detectFace()
				.then((result) => {
					response.statusCode = 200;
					response.send(result);
					response.end();
				}).catch((err) => {
					response.statusCode = 500;
					response.send(null);
					response.end();
				});
		});
	}

	socketEvents(){
		this.io.on('connection', (socket) => {
			console.log("socket face recognition");
	
			detectWebcamFace.startDetectFaces((buffers) => {
				this.io.emit('face', {
					buffer: buffers
				});
			
				this.io.on('disconnect', function(){
					console.log( socket.name + ' has disconnected from the chat.' + socket.id);
				});
				this.io.emit('name', {
					buffer: buffers
				});
			}); 
			this.io.on('end', function (){
				socket.disconnect(0);
			});
		});
	}

	routesConfig(){
		this.appRoutes();
		this.socketEvents();
	}
}
module.exports = Routes;