var express = require("express");
var router = express.Router();
var Specialite = require("../models/specialite.js");
var specialiteController = require("../controller/specialites.js");
const account = require('../controller/account/lib.js');
const Test = require('../models/test.js');
const TestUser = require('../models/testuser.js');
const User = require('../models/user.js');
var chatbotConnect = require("../api/chatbotConnect.js");
const Question = require('../models/question.js')

var TousLesTests=[];

router.post("/", (req, res) => {
    var specialite = new Specialite(req.body);
    specialite.save((err, specialite) => {
      if (err) res.json(err);
      else res.json(specialite);
    });
  });
  router.get("/", (req, res) => {
    Specialite.findOne({ nom: "TWIN" }, (err, specialite) => {
      if (err) res.json(err);
      else res.json(specialite);
    });
  });


  router.post("/sms",(req,res)=>

{

    const accountSid = 'AC594142d336a446a8e7673b85b6d6f59f';
    const authToken = 'b3a2d3613cd74b992bb71931a3d00ff8';
    const client = require('twilio')(accountSid, authToken);
    

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
          test: element.test,
          noteOral: element.noteOral, 
          noteEcrit: element.noteEcrit,
          result: element.result
           }
        )
        var testfinal = Test.findById(testrecherche.test).exec((err,test)=>{

            var d = new Date();
            //addDays(d,1);
            console.log(formatDate(d))
            d=addDays(d,1);
            console.log(formatDate(d))  
    
                    if(formatDate(test.date)==formatDate(d))
               {
                    
                        
                    
                

            console.log("resultat test:"+testrecherche);
            var textResponse = `Vous avez un test demain à ${test.heure}`;
      

            client.messages
            .create({
               body: textResponse,
               from: '+14045496245',
               to: '+21696585408'
             })
            .then(message => 
              res.send(message));
        
            }

        });


        }
     

    



        

        });


  

    



    })



        


}

)


  router.get("/etatTest/:idUser",(req,res)=>{

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
        if(element.user==req.params.idUser)
        {

        if(element.passageEcrit==true)
        {

            res.send("Test passed");

            
        }

        else {

            res.send("Test non passed");
        }
            
        }

        });


    });


  })


  router.post("/passageDuTest/:idUser", (req, res) => {

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
        if(element.user==req.params.idUser)
        {

            var resultatFinal ;
            if((element.noteOral+req.body.noteEcrit)/2>=10)
            {
                resultatFinal="Admis"
                
            }
            else {
                resultatFinal="Refusé"
            }

            var newTest = {

noteEcrit:req.body.noteEcrit,
result: resultatFinal,
passageEcrit:true

            }
            TestUser.findByIdAndUpdate(element._id, {$set: newTest}, function (err, user) {
                if (err) return next(err);
                else {
                    console.log(user);
                    res.send('User udpated.');
                }
              
            });
            
            
        }

        });


    });

    });
  
  
  
  router.post("/test", function(req, res, next) {
    var msg = req.body.msg;
    chatbotConnect(msg)
      .then(async function(response) {
        
           console.log(response[0]);

           if(response[0].queryResult.intent.displayName == "AnnulationTest")
           {

            var user= TestUser.find(function(err,testuser){

                if (err)
                res.send(err);
            if (!testuser)
                res.status(400).send();
            else
              testusers=testuser;
              console.log("TOUS LES USERs :"+user);
              
            testuser.forEach(element => {


                    if(element.user=="5cb8fbd21c91ce4b48b84f14")
                    {
                        TestUser.findByIdAndRemove(element._id, function (err) {
                            if (err) return next(err);
                            return res.json({
                                speech: "Votre test a été annulé avec succés",
                                type: 4,
                                displayText: 
                                "",
                                source: "webhook-echo-sample"
                              });
                            return;
                        })
                          

                    }


            });




            });




           }


           if(response[0].queryResult.intent.displayName == "ConnaitreInformationsTest")
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
               let laClasse;
               testrecherche= new TestUser(
                   {
                  user : element.user,
                  test : element.test,
                  classe : element.classe
                   }
                )
                }
             
        
                });
        

                 if(test){

                    if( response[0].queryResult.parameters.fields.Informations.stringValue=="date")
                    {
                        var testfinal = Test.findById(testrecherche.test).exec((err,test)=>{

                            console.log("resultat test:"+testrecherche);
                            var textResponse = `Votre ${ response[0].queryResult.parameters.fields.Informations.stringValue} de passage est: ${test.date}`;
                            return res.json({
                                speech: textResponse,
                                type: 4,
                                displayText: textResponse,
                                source: "webhook-echo-sample"
                              });

                        });
                
                    }

                    if( response[0].queryResult.parameters.fields.Informations.stringValue=="heure")
                    {
                        var testfinal = Test.findById(testrecherche.test).exec((err,test)=>{

                            console.log("resultat test:"+testrecherche);
                            var textResponse = `Votre ${ response[0].queryResult.parameters.fields.Informations.stringValue} de passage est: ${test.heure}`;
                            return res.json({
                                speech: textResponse,
                                type: 4,
                                displayText: textResponse,
                                source: "webhook-echo-sample"
                              });

                        });
                
                    }
                      if ( response[0].queryResult.parameters.fields.Informations.stringValue=="classe")
                      {
                        var testfinal = TestUser.find().exec((err,test)=>{
                              test.forEach(element => {

                                    if (element.test === testrecherche.test)
                                    {

                                         laClasse=element.classe;

                                    }


                              })

                          //  console.log("resultat test:"+testrecherche);
                            var textResponse = `Votre ${ response[0].queryResult.parameters.fields.Informations.stringValue} est: ${testrecherche.classe}`;
                            return res.json({
                                speech: textResponse,
                                type: 4,
                                displayText: textResponse,
                                source: "webhook-echo-sample"
                              });

                        });



                      }


                      if ( response[0].queryResult.parameters.fields.Informations.stringValue=="note")
                      {

                        var textResponse = `Votre ${ response[0].queryResult.parameters.fields.Informations.stringValue} est: ${testrecherche.noteEcrit} pour l'écrit et ${testrecherche.noteOral} pour le test oral `;
                        return res.json({
                            speech: textResponse,
                            type: 4,
                            displayText: textResponse,
                            source: "webhook-echo-sample"
                          });


                      }

                
                 }

                 
                });


           }
           
        if(response[0].queryResult.intent.displayName == "ResultatTest")
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
                  test: element.test,
                  noteOral: element.noteOral, 
                  noteEcrit: element.noteEcrit,
                  result: element.result
                   }
                )
                }
             
        
                });
        

                 if(test){
                    
                    console.log("resultat test:"+testrecherche);
                    var textResponse = `Le résultat de votre test : Note Ecrit:${testrecherche.noteEcrit} - Note Oral :${testrecherche.noteOral} - Résultat final : ${testrecherche.result}`;
                    return res.json({
                        speech: textResponse,
                        type: 4,
                        displayText: textResponse,
                        source: "webhook-echo-sample"
                      });

                
                 }

                 else {
                    var textResponse = `Vous n'avez pas de test`;
                    return res.json({
                        speech: textResponse,
                        type: 4,
                        displayText: textResponse,
                        source: "webhook-echo-sample"
                      });

                 }
        
        
        
            })

        }


           if(response[0].queryResult.intent.displayName == "ChoixDuTest")
           {
            //let testex1=false;
            
               var userid; 
               var testid;
               var classechoisie;
               //var user = User.findById(userid); 
               var test = Test.findById(testid);
             
               var user = User.findById("5cb8fbd21c91ce4b48b84f14").exec((err,todo)=>{
           
                 console.log("les test:"+TousLesTests)
                 console.log(todo._id)
                 userid=todo._id;
             
             //console.log(req.result.resolvedQuery);
             console.log(response[0].queryResult.parameters.fields.number.stringValue)
             console.log(TousLesTests[0]);
             let nombrechoisis = response[0].queryResult.queryText-1;
           
             if (response[0].queryResult.queryText == "le premier")
             {
                 nombrechoisis=0;
             }
             if (response[0].queryResult.queryText == "le deuxieme")
             {
                 nombrechoisis=1;
             }
             if (response[0].queryResult.queryText == "le troisieme")
             {
                 nombrechoisis=2;
             }
             if (response[0].queryResult.queryText == "le quatrieme")
             {
                 nombrechoisis=3;
             }
         
             if (nombrechoisis>=TousLesTests.length || nombrechoisis==-1)
             {
                var textResponse = `Vous ne pouvez pas selectionner ce test`;
                return res.json({
              speech: textResponse,
              type: 4,
              displayText: textResponse,
              source: "webhook-echo-sample"
            });

             }

             else {
              
                 var test = Test.findById(TousLesTests[nombrechoisis]._id).exec((err,todo)=>{
                    var testex1=false;

                     console.log(todo._id)
                     testid=todo._id;
                      var stop=false;
                     todo.listClasses.forEach(element => {

                    //    if (element.nombreDePlaces>Object.keys(todo.listUser).length)
                      //  {
                            if(false!==true)
                            {
                             
                                element.listUser.push(user);
                                Test.findByIdAndUpdate(todo._id, {$set: todo});
                            classechoisie=element;
                         
                                stop=true;
                            }

                        //}
                     })
           
                     let testuser = new TestUser(
                         {
                             user: userid,
                             test: testid,
                             noteOral: 15, 
                             noteEcrit: 0,
                             result: "En attente de passage",
                             classe: classechoisie.numero,
                             reconaissanceFaciale:false,
                         }
                     );

                    
                     
        let question1 = new Question(
            {
                question: "Demain, ... le plombier",
                    
                reponse1: "j'appelerai",
                reponse2: "j'apellerai",
                reponse3: "j'appellerai",
                reponse4: "j'appélerai",
                correctAnswer:"1"

            })

            let question2 = new Question(
                {
                    question: "« Les skis bien ... », répète le moniteur",
                        
                    reponse1: "parrallèles",
                    reponse2: "parallèles",
                    reponse3: "paraléles",
                    reponse4: "paralèles",
                    correctAnswer:"2"
    
                })

                let question3 = new Question(
                    {
                        question: "Lequel de ces verbes n’est pas un verbe attributif ?",
                            
                        reponse1: "Rester",
                        reponse2: "Paraître",
                        reponse3: "Revenir",
                        reponse4: "Devenir",
                        correctAnswer:"3"
        
                    })


                    let question4 = new Question(
                        {
                            question: "«Quelle est la fonction du terme « Louis » dans la phrase « Le livre de Louis » ?",
                                
                            reponse1: "Complément de nom",
                            reponse2: "Complément d'attribution",
                            reponse3: "Complément d'objet direct",
                            reponse4: "Complément d'objet indirect",
                            correctAnswer:"3"
            
                        })


                        let question5 = new Question(
                            {
                                question: "«Dans laquelle des propositions ci-dessous, le verbe, conjugué à la première personne du singulier et au présent de l’indicatif, est-il incorrect ?",
                                    
                                reponse1: "Je comprends",
                                reponse2: "Je résouds",
                                reponse3: "Je réponds",
                                reponse4: "Je perds",
                                correctAnswer:"2"
                
                            })

                            let question6 = new Question(
                                {
                                    question: "«Ce nom est l'intrus à cause de son genre. Quel est ce mot ?",
                                        
                                    reponse1: "Centime",
                                    reponse2: "Indice",
                                    reponse3: "Pétale",
                                    reponse4: "Astuce",
                                    correctAnswer:"4"
                    
                                })


                                let question7 = new Question(
                                    {
                                        question: "«Quel est le verbe intrus ?",
                                            
                                        reponse1: "Grandir",
                                        reponse2: "Ramolir",
                                        reponse3: "Dormir",
                                        reponse4: "Finir",
                                        correctAnswer:"3"
                        
                                    })



                                    let question8 = new Question(
                                        {
                                            question: "Quel nom est l'intrus ?",
                                                
                                            reponse1: "Septembre",
                                            reponse2: "Décembre",
                                            reponse3: "Gingembre",
                                            reponse4: "Novembre",
                                            correctAnswer:"3"
                            
                                        })




                                        let question9 = new Question(
                                            {
                                                question: "Quel mot est l'intrus ?",
                                                    
                                                reponse1: "Magie",
                                                reponse2: "Splendide",
                                                reponse3: "Féérie",
                                                reponse4: "Merveille",
                                                correctAnswer:"2"
                                
                                            })


                                            let question10 = new Question(
                                                {
                                                    question: "Quel adverbe est l'intrus ?",
                                                        
                                                    reponse1: "Ailleurs",
                                                    reponse2: "Autour",
                                                    reponse3: "Avant",
                                                    reponse4: "Assez",
                                                    correctAnswer:"4"
                                    
                                                })

                
        testuser.listquestions.push(question1);
        testuser.listquestions.push(question2);
        testuser.listquestions.push(question3);
        testuser.listquestions.push(question4);
        testuser.listquestions.push(question5);
        testuser.listquestions.push(question6);
        testuser.listquestions.push(question7);
        testuser.listquestions.push(question8);
        testuser.listquestions.push(question9);
        testuser.listquestions.push(question10);
    
                         
                   var testexis=false;
                     

                 
             testuser.save(function (err) {
               if (err) {
            return next(err);
              }
              var textResponse = `Votre test a été reservé !  `;
              return res.json({
            speech: textResponse,
            type: 4,
            displayText: textResponse,
            source: "webhook-echo-sample"
          });
    })



           /* if (tests[i].user=="5c924f3917244c4690956ef6")
             {
                 
                  testexis = true;
                 console.log("existe deja");
            console.log(testexis);

       
            var textResponse = `Vous avez deja reservé !  `;

            return res.json({
                speech: textResponse,
                type: 4,
                displayText: textResponse,
                source: "webhook-echo-sample"
              });
            

                 }*/
                 

              
                    
                    
                 
                 })


                }

              
        
             
                 
   
   
           });
       }

       /*
      if (response[0].queryResult.intent.displayName=="ReserverDateTest" && response[0].queryResult.fulfillmentText!="votre date est" && response[0].queryResult.parameters.fields.date.stringValue!="NaN-NaN-NaN")
       {

        console.log("date:"+response[0].queryResult.parameters.fields.date.stringValue)
       console.log("pas de date")
        if(response[0].queryResult.parameters.fields.date.stringValue!=null )
        {
          let LesTests= [];

          let str="";
    
            console.log(response[0].queryResult.parameters.fields.date.stringValue)
            {
              Test.find(function (err, tests) {
                  if (err)
                      res.send(err);
                  if (!tests)
                      res.status(400).send();
                  else
              var d = new Date();
              //addDays(d,1);
              console.log(formatDate(d))
             // d=addDays(d,1);
              console.log(formatDate(d))  
              tests.forEach(element => {
                      if(formatDate(element.date)==formatDate(response[0].queryResult.parameters.fields.date.stringValue))
                 
                       LesTests.push(element)
                          
                      
                  }) 
                  TousLesTests = LesTests;
                  console.log(LesTests)
                
                  for (var i=0;i<LesTests.length;i++)
                  {
                  console.log("4:"+LesTests[i].class);
                  
                  }
          
                  for (var i=0;i<LesTests.length;i++)
          {
          str=str+(i+1+':'+'Classe:'+LesTests[i].class+' Date:'+formatDate(LesTests[i].date)+'Heure:'+LesTests[i].heure);
          console.log(str);
          
          }
          
          var textResponse = `Pour ${formatDate(response[0].queryResult.parameters.fields.date.stringValue)} ceci est la liste des tests disponibles :${str} choisis un !  `;
          
           res.send({
              speech: textResponse,
              type: 1,
              displayText: textResponse,
              source: "webhook"
           });
          
          })}
      
          return;
        }  

       }
       
*/

        if (response[0].queryResult.intent.displayName == "ReserverDateTest" && response[0].queryResult.fulfillmentText!="votre date est") {
         
          console.log("ici");

          //console.log("date"+response[0].queryResult.parameters.fields.date.stringValue)
 
        

            res.send({
            speech: response[0].queryResult.fulfillmentText,
            type: 4,
            displayText: response[0].queryResult.fulfillmentText,
            source: "webhook-echo-sample"
          })

          return;
        
            
          
        
    
    }

  


    if (response[0].queryResult.fulfillmentText=="votre date est")
    {   
        let date = response[0].queryResult.parameters.fields.DateTest.stringValue
       console.log(date);
        
       let LesTests= [];

let str="";

Test.find(function (err, tests) {
    if (err)
        res.send(err);
    if (!tests)
        res.status(400).send();
    else

       if(date=="aujourd'hui")
       {
         tests.forEach(element => {
             if(formatDate(element.date)==formatDate(Date.now()) )
        
              LesTests.push(element)
                 
             
         }) 
         
           TousLesTests = LesTests;
            console.log(LesTests)
            for (var i=0;i<LesTests.length;i++)
            {
            str=str+(i+1+':'+'Classe:'+LesTests[i].class+' Date:'+formatDate(LesTests[i].date)+"\n");
            console.log(str);
            
            }
            var textResponse = `Pour ${date} ceci est la liste des tests disponibles :${str} choisis un ! `;

             res.send({
             speech: textResponse,
             type: 4,
             displayText: textResponse,
             source: "webhook-echo-sample"
           });

         if(isNan(req.body.result.resolvedQuery))
         {
            var textResponse = `ce n'est pas un nombre `;

            res.send({
            speech: textResponse,
            type: 4,
            displayText: textResponse,
            source: "webhook-echo-sample"
          });          }

           
     else  {
         

         console.log("c'est un nombre");
     }

     }


     if(date=="la semaine prochaine")
     {
         var d1 = new Date();
         var d2 = new Date();
         addDays(d1,7);
         addDays(d2,14);
         console.log(formatDate(d1))
        // d=addDays(d,1);
         console.log(formatDate(d2))  
         tests.forEach(element => {
                 if(formatDate(d1)<=formatDate(element.date)<=formatDate(d2))
            
                  LesTests.push(element)
                     
                 
             }) 
             TousLesTests = LesTests;
             console.log(LesTests)
           
             for (var i=0;i<LesTests.length;i++)
             {
             console.log("4:"+LesTests[i].class);
             
             }
     
             for (var i=0;i<LesTests.length;i++)
     {
     str=str+(i+1+':'+'Classe:'+LesTests[i].class+' Date:'+formatDate(LesTests[i].date)+' Heure:'+LesTests[i].heure+"\n");
     console.log(str);
     
     }
     
     var textResponse = `Pour ${date} ceci est la liste des tests disponibles :${str} choisis un !  `;
     
      res.send({
         speech: textResponse,
         type: 1,
         displayText: textResponse,
         source: "webhook"
      });
     
     }

     
if(date=="demain")
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
        TousLesTests = LesTests;
        console.log(LesTests)
      
        for (var i=0;i<LesTests.length;i++)
        {
        console.log("4:"+LesTests[i].class);
        
        }

        for (var i=0;i<LesTests.length;i++)
{
str=str+(i+1+': '+'Classe: '+LesTests[i].class+' Date:'+formatDate(LesTests[i].date)+' Heure: '+LesTests[i].heure+"\n");
console.log(str);

}

var textResponse = `Pour ${date} ceci est la liste des tests disponibles :${str} choisis un !  `;

 res.send({
    speech: textResponse,
    type: 1,
    displayText: textResponse,
    source: "webhook"
 });

}

if(date=="ce mois")
{
    var d = new Date();
    var datemaintenant = new Date();
    //addDays(d,1);
    console.log(formatDate(d))
    d=addDays(d,30);
    console.log(formatDate(d))  
    tests.forEach(element => {
            if(formatDate(element.date)<formatDate(d) && formatDate(element.date)>formatDate(datemaintenant))
       
             LesTests.push(element)
                
            
        }) 
        TousLesTests = LesTests;
        console.log(LesTests)
      
        for (var i=0;i<LesTests.length;i++)
        {
        console.log("4:"+LesTests[i].class);
        
        }

        for (var i=0;i<LesTests.length;i++)
{
str=str+(i+1+':'+'Classe:'+LesTests[i].class+' Date:'+formatDate(LesTests[i].date)+'Heure:'+LesTests[i].heure+"\n");
console.log(str);

}

var textResponse = `Pour ${date} ceci est la liste des tests disponibles :${str} choisis un !  `;

 res.send({
    speech: textResponse,
    type: 1,
    displayText: textResponse,
    source: "webhook"
 });

}


if(date=="cette semaine")
{
    var d = new Date();
    var datemaintenant = new Date();
    //addDays(d,1);
    console.log(formatDate(d))
    d=addDays(d,7);
    console.log(formatDate(d))  
    tests.forEach(element => {
            if(formatDate(element.date)<formatDate(d) && formatDate(element.date)>formatDate(datemaintenant))
       
             LesTests.push(element)
                
            
        }) 
        TousLesTests = LesTests;
        console.log(LesTests)
      
        for (var i=0;i<LesTests.length;i++)
        {
        console.log("4:"+LesTests[i].class);
        
        }

        for (var i=0;i<LesTests.length;i++)
{
str=str+(i+1+':'+'Classe:'+LesTests[i].class+' Date:'+formatDate(LesTests[i].date)+'Heure:'+LesTests[i].heure+"\n");
console.log(str);

}

var textResponse = `Pour ${date} ceci est la liste des tests disponibles :${str} choisis un !  `;

 res.send({
    speech: textResponse,
    type: 1,
    displayText: textResponse,
    source: "webhook"
 });

}


if(date=="cette année")
{
    var d = new Date();
    var datemaintenant = new Date();
    //addDays(d,1);
    console.log(formatDate(d))
    d=addDays(d,365);
    console.log(formatDate(d))  
    tests.forEach(element => {
            if(formatDate(element.date)<formatDate(d) && formatDate(element.date)>formatDate(datemaintenant))
       
             LesTests.push(element)
                
            
        }) 
        TousLesTests = LesTests;
        console.log(LesTests)
      
        for (var i=0;i<LesTests.length;i++)
        {
        console.log("4:"+LesTests[i].class);
        
        }

        for (var i=0;i<LesTests.length;i++)
{
str=str+(i+1+':'+'Classe:'+LesTests[i].class+' Date:'+formatDate(LesTests[i].date)+'Heure:'+LesTests[i].heure+"\n");
console.log(str);

}

var textResponse = `Pour ${date} ceci est la liste des tests disponibles :${str} choisis un !  `;

 res.send({
    speech: textResponse,
    type: 1,
    displayText: textResponse,
    source: "webhook"
 });

}

    }


)}
  
if (response[0].queryResult.intent.displayName == "Default Fallback Intent" ) {
         
    console.log("ici");

    //console.log("date"+response[0].queryResult.parameters.fields.date.stringValue)

  

      res.send({
      speech: response[0].queryResult.fulfillmentText,
      type: 4,
      displayText: response[0].queryResult.fulfillmentText,
      source: "webhook-echo-sample"
    })

  
      
    
  

}
      
  })



  });

  
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


  module.exports = router;
  