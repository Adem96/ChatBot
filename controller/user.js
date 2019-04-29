const account = require('./account/lib.js');
const Test = require('../models/test.js');
const TestUser = require('../models/testuser.js');
const User = require('../models/user.js');


module.exports = function (app) {

     var TousLesTests=[];
    

    app.post('/login',account.login);
    app.get('/verificationReconaissance',account.verifier_reconaissance);
    app.post('/signup',account.signup);
    app.delete('/:id/deletetestuser',account.testuser_delete);
    app.get('/alluser',account.user_all);
    app.get('/findusertest',account.testuser_find);
    //app.get('/getuserresult',account.getUserTestResult);
    app.get('/alltest',account.test_all);
    app.get('/allusertest',account.testUser_all);
    app.post('/addusertest/:iduser/:idtest',account.testuser_create);
    app.post('/create',account.test_create);
    app.get('/getuserQuestions',account.getuserQuestions);
    app.post('/dateTest', function(req, res, next) {
        console.log(req.body);
        console.log("Les tests:"+TousLesTests);

        if(req.body.result.metadata.intentName=="SelectNumber")
        {

          
            var userid; 
            var testid;
            //var user = User.findById(userid); 
            var test = Test.findById(testid);
          
            var user = User.findById("5cb8fbd21c91ce4b48b84f14").exec((err,todo)=>{
          
              console.log(todo._id)
              userid=todo._id;
          
          //console.log(req.result.resolvedQuery);
          console.log(TousLesTests[0]);
              var test = Test.findById(TousLesTests[req.body.result.resolvedQuery-1]._id).exec((err,todo)=>{
          
                  console.log(todo._id)
                  testid=todo._id;
          
                  let testuser = new TestUser(
                      {
                          user: userid,
                          test: testid
                      }
                  );
              
              
                  testuser.save(function (err) {
                      if (err) {
                          return next(err);
                      }
                      var textResponse = `Your test has been reserved `;
                      return res.json({
                          speech: textResponse,
                          type: 4,
                          displayText: textResponse,
                          source: "webhook-echo-sample"
                        });
                  })
              
              })
          
              


        });
    }



        if(req.body.result.fulfillment.speech=="Result of admission test")
        {
            let testrecherche;
            let test=false;
            var testusers=[];
            TestUser.find(function (err, testuser) {
                if (err)
                    res.send(err);
                if (!testuser)
                    res.status(400).send();
                else
                  testusers=testuser;
                  console.log("TOUS LES USER TEST:"+testuser);
                  
                testuser.forEach(element => {
                    
                    console.log(element);
                if(element.user=="5cb8fbd21c91ce4b48b84f14")
                {
                  
                  test=true;
               // testrecherche=element;
               console.log("ici");
               testrecherche= new TestUser(
                   {
                  user : element.user,
                  test : element.test
                   }
                )
                }
             
        
                });
        

                 if(test){
                    
                    console.log("resultat test:"+testrecherche);
                    var textResponse = `We found your test : ${testrecherche}`;
                    return res.json({
                        speech: textResponse,
                        type: 4,
                        displayText: textResponse,
                        source: "webhook-echo-sample"
                      });

                
                 }

                 else {
                    var textResponse = `We didn't found your test `;
                    return res.json({
                        speech: textResponse,
                        type: 4,
                        displayText: textResponse,
                        source: "webhook-echo-sample"
                      });

                 }
        
        
        
            })

        }



        if(req.body.result.parameters["date"]!=null)
        {
        console.log(Date.now());
        let date = req.body.result.parameters["date"];
let LesTests= [];

let str="";

        Test.find(function (err, tests) {
            if (err)
                res.send(err);
            if (!tests)
                res.status(400).send();
            else
          // LesTests=tests;
          if(date=="today")
          {
            tests.forEach(element => {
                if(formatDate(element.date)==formatDate(Date.now()) )
           
                 LesTests.push(element)
                    
                
            }) 
              TousLesTests = LesTests;
               console.log(LesTests)
               for (var i=0;i<LesTests.length;i++)
               {
               str=str+(i+1+':'+'Classe:'+LesTests[i].class+' Date:'+formatDate(LesTests[i].date));
               console.log(str);
               
               }
               var textResponse = `For ${date} this is the list of the tests available :${str} select a test`;

               return res.json({
                speech: textResponse,
                type: 4,
                displayText: textResponse,
                source: "webhook-echo-sample"
              });

            if(isNan(req.body.result.resolvedQuery))
            {
                 console.log("ce n'est pas un nombre");            }

              
        else  {
            

            console.log("c'est un nombre");
        }

        }

        if(date=="tomorrow")
        {
            var d = new Date();
            //addDays(d,1);
            console.log(formatDate(d))
            d=addDays(d,1);
            console.log(formatDate(d))  
            tests.forEach(element => {
                    if(formatDate(element.date)==formatDate(d))
               
                     LesTests.push(element)
                        
                    
                }) 

                console.log(LesTests);
                for (var i=0;i<LesTests.length;i++)
                {
                console.log("4:"+LesTests[i].class);
                
                }

                for (var i=0;i<LesTests.length;i++)
        {
        str=str+(i+1+':'+'Classe:'+LesTests[i].class+' Date:'+formatDate(LesTests[i].date));
        console.log(str);
        
        }

        var textResponse = `For ${date} this is the list of the tests available :${str} `;

        return res.json({
            speech: textResponse,
            type: 4,
            displayText: textResponse,
            source: "webhook-echo-sample"
          });
        }



        })



        
         

    
      

     
   
        }













      });
    


      
      function createTextResponse(textResponse){
        let response = {
          "fulfillmentText": "This is a text response",
          "fulfillmentMessages": [
            {
              "text": {
                "text": [
                  textResponse
                ]
              }
            }
          ],
          "source": "example.com",
          "payload": {
            "google": {
              "expectUserResponse": true,
              "richResponse": {
                "items": [
                  {
                    "simpleResponse": {
                      "textToSpeech": "this is a simple response"
                    }
                  }
                ]
              }
            },
            "facebook": {
              "text": "Hello, Facebook!"
            },
            "slack": {
              "text": "This is a text response for Slack."
            }
          }
        }
        return response;
      }



      function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }


    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
      }

}