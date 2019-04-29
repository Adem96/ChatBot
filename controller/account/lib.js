const User = require('../../models/user.js');
const passwordHash = require("password-hash");
const TestUser = require('../../models/testuser.js');
const Test = require('../../models/test.js');
const Question = require('../../models/question.js');

exports.test_all=function(req,res) {
    
    Test.find(function (err, test) {
    if (err)
        res.send(err);
    if (!test)
        res.status(400).send();
    else
        res.json(test);
})
}



exports.testuser_find=function(req,res){
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
            var textResponse = `Le résultat de votre test : ${testrecherche}`;
            return res.json({
                speech: textResponse,
                type: 4,
                displayText: textResponse,
                source: "webhook-echo-sample"
              });

        
         }

       /*  else {
            var textResponse = `Vous n'avez pas de test`;
            return res.json({
                speech: textResponse,
                type: 4,
                displayText: textResponse,
                source: "webhook-echo-sample"
              });

         }*/



    })

}


exports.getuserQuestions=function (req,res)
{

    var testusers=[];
    TestUser.find(function (err, testuser) {
        if (err)
            res.send(err);
        if (!testuser)
            res.status(400).send();
        else
          testusers=testuser;
          console.log("TOUS LES USER TEST:"+testuser);

        testusers.forEach(element => {
            
            console.log(element);
        if(element.user=="5cb8fbd21c91ce4b48b84f14")
        {
            console.log("list:"+element.listquestions)
            res.send(element.listquestions);
           // return element.listquestions;

        }

        });




    })

 /*
   
 console.log(testusers);
  let object=TestUser;

for(var i=0;i<testusers.length;i++)
{
    if (testusers[i].user=="5c924f3917244c4690956ef6")
    {

         object= testusers[i];
         console.log(testuser[i].user);

    }

}

    return object.user;
  
*/




}


exports.user_all=function(req,res) {
    
    User.find(function (err, user) {
    if (err)
        res.send(err);
    if (!user)
        res.status(400).send();
    else
        res.json(user);
})
}

exports.testUser_all=function(req,res) {
    
    TestUser.find(function (err, testuser) {
    if (err)
        res.send(err);
    if (!testuser)
        res.status(400).send();
    else
        res.json(testuser);

})
}

function getUserTestResult (req,res)
{

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
            res.send(element);
            return element;

        }

        });




    })

 /*
   
 console.log(testusers);
  let object=TestUser;

for(var i=0;i<testusers.length;i++)
{
    if (testusers[i].user=="5c924f3917244c4690956ef6")
    {

         object= testusers[i];
         console.log(testuser[i].user);

    }

}

    return object.user;
  
*/

return "taher";


}


exports.verifier_reconaissance=function(req,res)
{


    
        var testusers=[];
        TestUser.find(function (err, testuser) {
        
              testusers=testuser;
           //   console.log("TOUS LES USER TEST:"+testuser);
    
            testuser.forEach(element => {
                
              //  console.log(element);
            if(element.user=="5cb8fbd21c91ce4b48b84f14")
            {
    
           
						if(element.reconaissanceFaciale==true)
						
						{
							res.send("Reconaissance faciale effectuée avec succés !");
                        }
                        else {

                            res.send("Utilisateur non reconnu");

                        }
                
                
            }
    
            })
    
    
        })
}



exports.testuser_delete = function (req, res) {
    TestUser.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
    
};



exports.testuser_create = function (req, res) {
  var userid; 
  var testid;
  //var user = User.findById(userid); 
  var test = Test.findById(testid);

  var user = User.findById(req.params.iduser).exec((err,todo)=>{

    console.log(todo._id)
    userid=todo._id;


    var test = Test.findById(req.params.idtest).exec((err,todo)=>{

        console.log(todo._id)
        testid=todo._id;

        
        let testuser = new TestUser(
            {
                user: userid,
                test: testid,
                result: "En attente"
                 
                
            }
        );
    

        let question1 = new Question(
            {
                text: "What town is Matt Armstrong from?",
                    
                reponse1: "3",
                reponse2: "1",
                reponse3: "15",
                reponse4: ""

            })

            let question2 = new Question(
                {
                    text: "What town is Matt Armstrong from?",
                        
                    reponse1: "3",
                    reponse2: "1",
                    reponse3: "15",
                    reponse4: ""
    
                })

        testuser.listquestions.push(question1);
        testuser.listquestions.push(question2);
    
        console.log("TEST USER:"+testuser);
        testuser.save(function (err) {
            if (err) {
                return next(err);
            }
            res.send('TestUser Created successfully')
        })
    
    })

    
})





console.log(userid);
console.log(testid);
//console.log(user._id);
//console.log(test._id);

};


exports.test_create = function (req, res) {
    let test = new Test(
        {
            date: req.body.date,
            class: req.body.class,
            heure: req.body.heure,
            jury: req.body.jury,
            listClasses:req.body.listClasses,
        }
    );

    test.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Test Created successfully')
    })
};


exports.test_details = function (req, res) {
    Test.findById(req.params.id, function (err, test) {
        if (err) return next(err);
        res.send(test);
    })
};






function signup(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        var user = {
            email: req.body.email,
            password: passwordHash.generate(req.body.password)
        }
        var findUser = new Promise(function (resolve, reject) {
            User.findOne({
                email: user.email
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        reject(204)
                    } else {
                        resolve(true)
                    }
                }
            })
        })

        findUser.then(function () {
            var _u = new User(user);
            _u.save(function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                } else {
                    res.status(200).json({
                        "text": "Succès",
                        "token": user.getToken()
                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        "text": "L'adresse email existe déjà"
                    })
                    break;
                default:
                    res.status(500).json({
                        "text": "Erreur interne"
                    })
            }
        })
    }
}


function login(req, res) {
    if (!req.body.email || !req.body.password) {
        //Le cas où l'email ou bien le password ne serait pas soumit ou nul
        res.status(400).json({
            "text": "Requête invalide"
        })
    } else {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.status(500).json({
                    "text": "Erreur interne"
                })
            }
            else if(!user){
                res.status(401).json({
                    "text": "L'utilisateur n'existe pas"
                })
            }
            else {
                if (user.authenticate(req.body.password)) {
                    res.status(200).json({
                        "token": user.getToken(),
                        "text": "Authentification réussi",
                        user: user
                    })
                }
                else{
                    res.status(401).json({
                        "text": "Mot de passe incorrect"
                    })
                }
            }
        })
    }
}

//On exporte nos deux fonctions

exports.login = login;
exports.signup = signup;
exports.getUserTestResult=getUserTestResult;