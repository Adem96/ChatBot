const cv = require('opencv4nodejs');
const path = require('path');
const opencvrecognition = require('./facerecognition');
const TestUser = require('../models/testuser');


class OpencvHelpers {

	constructor() {
		this.camFps = 10;
		this.camInterval = Math.ceil(1000 / this.camFps)
		this.reco=false;
	}


	getDataFilePath(fileName) {
		return path.resolve(path.resolve(__dirname, '../data'), fileName);
	}

	drawRect(image, rect, color) {
		image.drawRectangle(
			rect,
			color,
			2,
			cv.LINE_4
		);
	}

	drawFaceBorder(image, rect) {
		this.drawRect(image, rect, new cv.Vec(0, 255, 0));
	}

	detectFace() {
		return new Promise( (resolve, reject) => {
			try {
				const image = cv.imread(this.getDataFilePath('g.r.l.jpeg'));
				const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_DEFAULT);

				// detect faces
				const {
					objects
				} = classifier.detectMultiScale(image.bgrToGray());

				if (!objects.length) {
					throw new Error('No faces detected!');
				}

				objects.forEach((rect, i) => {
					this.drawFaceBorder(image, rect);
				});
				
				this.saveFaceDetectedImage(image);
				
				resolve(cv.imencode('.jpg', image));

			} catch (error) {
				console.log(error);
				reject(null);
			}
		});
	}

	saveFaceDetectedImage(data) {
		cv.imwrite(this.getDataFilePath('g.r.l2.jpeg'), data)
	}

	grabFrames(videoFile, onFrame) {
		const cap = new cv.VideoCapture(videoFile);
		setInterval(() => {
			let frame = cap.read();
			// loop back to start on end of stream reached
		if (frame.empty) {
				cap.reset();
				frame = cap.read();
			}
			onFrame(frame);
		}, this.camInterval);
	}

	runVideoFaceDetection(src, detectFaces, callback) {
		this.grabFrames(src, (frame) => {
			const frameResized = frame.resizeToMax(320);
            
			// detect faces
			const faceRects = detectFaces(frameResized);
			if (faceRects.length) {
				// draw detection
				
				
				faceRects.forEach(faceRect => this.drawFaceBorder(frameResized, faceRect));
				//setTimeout(function () {
				//	this.reco=true;

				var testusers=[];
				TestUser.find(function (err, testuser) {
				
					  testusers=testuser;
					//  console.log("TOUS LES USER TEST:"+testuser);
			
					testuser.forEach(element => {
						
						//console.log(element);	
					if(element.user=="5cb8fbd21c91ce4b48b84f14")
					{
						
			
			
						if(element.reconaissanceFaciale!==true)
						
						{
							
							console.log("PAS ENCORE RECONNU");
							opencvrecognition.recognition(frame);
						}
						else {
							console.log("EFFECTUEE AVEC SUCCES");
							
						}
						
					}
			
					})
			
			
				})


					
				       
				//}, 5000);

			
			
			
			}
			callback(cv.imencode('.jpg', frameResized));
		});
	}
}

module.exports = new OpencvHelpers();
