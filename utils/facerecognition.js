const fs = require('fs');
const path = require('path');
const cv = require('opencv4nodejs');
const TestUser = require('../models/testuser');
const User = require('../models/user');
class Facerecognition {



     recognition(imgcamera)
    {

      let userid;
     //   const detector = fr.FaceDetector()
     //   const targetSize = 80
       // const faceImages = detector.detectFaces(imagecam, targetSize)

//imagecam.bgrToGray();
//imagecam.getFaceImage;
//imagecam.resize(80,80);

//const imagecamera = imagecam;

const basePath = '../chatbot/data/face-recognition/';
const imgsPath = path.resolve(basePath, 'imgs');
const nameMappings = ['daryl', 'rick', 'negan','mehdi','taher'];

const imgFiles = fs.readdirSync(imgsPath);

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);
const getFaceImage = (grayImg) => {
  const faceRects = classifier.detectMultiScale(grayImg).objects;
  if (!faceRects.length) {
    throw new Error('failed to detect faces');
  }
  return grayImg.getRegion(faceRects[0]);
};



const images = imgFiles
  // get absolute file path
  .map(file => path.resolve(imgsPath, file))
  // read image
  .map(filePath => cv.imread(filePath))
  // face recognizer works with gray scale images
  .map(img => img.bgrToGray())
  // detect and extract face
  .map(getFaceImage)
  // face images must be equally sized
  .map(faceImg => faceImg.resize(80,80));

const isImageFour = (_, i) => imgFiles[i].includes('4');
const isNotImageFour = (_, i) => !isImageFour(_, i);
// use images 1 - 3 for training
const trainImages = images.filter(isNotImageFour);
// use images 4 for testing
const testImages = images.filter(isImageFour);
// make labels
const labels = imgFiles
  .filter(isNotImageFour)
  .map(file => nameMappings.findIndex(name => file.includes(name)));

  const runPrediction = (recognizer) => {
    testImages.forEach((img) => {
      const result = recognizer.predict(img);
      console.log('predicted: %s, confidence: %s', nameMappings[result.label], result.confidence);
      cv.imshowWait('face', img);
      cv.destroyAllWindows();
    });
  };


  const runPrediction2 = (recognizer) => {
    const faceRects = classifier.detectMultiScale(imgcamera).objects;
    
 
       const result = recognizer.predict(imgcamera.bgrToGray().getRegion(faceRects[0]).resize(80,80));
       console.log('predicted: %s, confidence: %s', nameMappings[result.label], result.confidence);
       console.log(nameMappings[result.label]);
     
     console.log("iciiiiiiiiiiiiii");
    var testusers=[];

    User.find(function(err,user ){

console.log(user);
if(user.prenom=nameMappings[result.label])
{
  //this.userid=user._id;
  console.log("trouve");
  TestUser.find(function(err,testuser)
{

testuser.forEach(element=> {
  console.log(element.user);
  console.log(user._id)

if(element.user="5cb8fbd21c91ce4b48b84f14")
{


  console.log("encoretrouve");

  var newTest = {

    reconaissanceFaciale:true,


  }


  TestUser.findByIdAndUpdate(element._id, {$set: newTest}, function (err, user) {
      if (err) return next(err);
      else {
          console.log(user);
        
      }
    
  });

}

})

})

}

    }
  
  
  )

  /*
    TestUser.find(function (err, testuser) {
    
          testusers=testuser;
          console.log("TOUS LES USER TEST:"+testuser.user);

        testuser.forEach(element => {
            
            console.log();
            var utilisateur=User.findById(element.user)

          console.log("lurtilisaisaizedzadaz:"+utilisateur);
        if(utilisateur.prenom=nameMappings[result.label])
        {

       
                console.log("TROUVE");
            var newTest = {

              reconaissanceFaciale:true,


            }


            TestUser.findByIdAndUpdate(element._id, {$set: newTest}, function (err, user) {
                if (err) return next(err);
                else {
                    console.log(user);
                  
                }
              
            });
            
            
        }

        })


    })*/
  


       
       cv.imshowWait('face', imgcamera.bgrToGray().resize(80,80));
       cv.destroyAllWindows();
  
 
   };


const eigen = new cv.EigenFaceRecognizer();
const fisher = new cv.FisherFaceRecognizer();
const lbph = new cv.LBPHFaceRecognizer();
eigen.train(trainImages, labels);
fisher.train(trainImages, labels);
lbph.train(trainImages, labels);


//console.log('eigen2:');
//runPrediction2(eigen);
//console.log('fisher2:');
//runPrediction2(fisher);
console.log('lbph:');
runPrediction2(lbph);


//console.log('eigen:');
//runPrediction(eigen);

//console.log('fisher:'); 
//runPrediction(fisher);

//console.log('lbph:');
//runPrediction(lbph);



}


}

module.exports = new Facerecognition();