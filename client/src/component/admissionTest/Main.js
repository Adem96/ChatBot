import React from 'react';
import data from '../../data/data.js';
import Answers from './Answers.js';
import Popup from './Popup.js';
import Footer from './Footer.js';
import Header from "../header";
import axios from "axios";


const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)
  

class Main extends React.Component {

  

    constructor(props) {
        super(props);
     
    

        this.state = {
            nr: 0,
           total: 10,
            showButton: false,
            questionAnswered: false,
            score: 0,
            displayPopup: 'flex',
           questions:false,
           secondsElapsed: 0, 
           laps: [],
           lastClearedIncrementer: null,
           arretTest:false,
           testEtat:false
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.handleShowButton = this.handleShowButton.bind(this);
        this.handleStartQuiz = this.handleStartQuiz.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
        this.incrementer = null;
        this.handleStartClick();
    }

    


    apiQuizz(e) {
        e.preventDefault();
    
      }

  

       getUserQuestion () {
        return axios.get('http://localhost:4000/user/getuserQuestions')
            .then(response => {
              this.response = response.data
              console.log(this.response)
              return this.response;
            })
        }   


    pushData(nr) {
        var self = this;
        console.log(this.score);
this.getUserQuestion().then(data=> 
{
console.log("data"+data[0].reponse1);
    self.setState({   question: data[nr].question,
        answers: [data[nr].reponse1,data[nr].reponse2,data[nr].reponse3,data[nr].reponse4 ],
        correct: parseInt(data[nr].correctAnswer, 10),
        nr: this.state.nr + 1,
    questions:true });

}

);


    }

    componentWillMount() {
        let { nr } = this.state;
     
        this.pushData(nr);


        axios.get("http://localhost:4000/test/etatTest/5cb8fbd21c91ce4b48b84f14").then(res=>{


            console.log("etatTest:"+res.data)
            if(res.data==="Test passed")
            {
                this.setState({
                   
                   
                    testEtat:true,
    
            })
    
      
            }
    
            else if (res.data==="Test non passed")
            {
    
                this.setState({
                  
                    testEtat:false,
    
            })
            }
      
          })

    }

    nextQuestion() {
        let { nr, total, score } = this.state;

        console.log(score);
        if(nr === total){
            this.setState({
                displayPopup: 'flex'
            });
        } else {
            this.pushData(nr);
            this.setState({
                showButton: false,
                questionAnswered: false
            });
        }

    }


    ArreterTest(){


        let { secondsElapsed,arretTest} = this.state;

        var finis=false;
        if (secondsElapsed==60 && arretTest==false)
        {
            
            this.props.history.push({
                pathname: "/AideAdmission"
              });

        }

        return finis;
    }

    handleShowButton() {
        this.setState({
            showButton: true,
            questionAnswered: true
        })
    }

    handleStartQuiz() {
        this.setState({
            displayPopup: 'none',
            nr: 1
        });
    }

    handleIncreaseScore() {
        this.setState({
            score: this.state.score + 1
        });
    }

    handleStartClick() {
        this.incrementer = setInterval( () =>
          this.setState({
            secondsElapsed: this.state.secondsElapsed + 1
          })
        , 1000);
      }
      
      handleStopClick() {
        clearInterval(this.incrementer);
        this.setState({
          lastClearedIncrementer: this.incrementer
        });
      }
      
      handleResetClick() {
        clearInterval(this.incrementer);
        this.setState({
          secondsElapsed: 0,
          laps: []
        });
      }
      
      handleLabClick() {
        this.setState({
          laps: this.state.laps.concat([this.state.secondsElapsed])
        })
      }

    render() {
        var divStyle = {
            paddingTop: '45px',
            paddingLeft:'80px',
            height:'600px'
         
          };




        let { nr, testEtat,total, question, answers, correct, showButton, questionAnswered, displayPopup, score, questions} = this.state;
        let testexiste;
        if(questions) {
            testexiste=  <Answers answers={answers} correct={correct} showButton={this.handleShowButton} isAnswered={questionAnswered} increaseScore={this.handleIncreaseScore}/>   
               }

               if (this.ArreterTest())
               {

                console.log("fini");
               }

               if(testEtat===true)
               {
                this.props.history.push({
                    pathname: "/AideAdmission"
                  });

               }

        return (
            <>
            <Header />

             <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
   

        
        <ul className="stopwatch-laps">
          { this.state.laps.map((lap, i) =>
              <li className="stopwatch-lap"><strong>{i + 1}</strong>/ {formattedSeconds(lap)}</li>)
          }
        </ul>
      </div>

            <div className="container" style={divStyle} >
 <div>
      
      </div>


                <Popup style={{display: displayPopup}} score={score} total={total} startQuiz={this.handleStartQuiz}/>
                
                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1">
                        <div id="question">
                            <h4>Question {nr}/{total}</h4>
                            <p>{question}</p>
                     
                        </div>
                 
                    {testexiste}

                        <div id="submit">
                            {showButton ? <button className="fancy-btn" onClick={this.nextQuestion} >{nr===total ? 'Terminer le test' : 'Prochaine question'}</button> : null}
                        </div>
                    </div>
                </div>
                
            </div>
            </>
        );
    }
};

const Button = (props) =>
  <button type="button" {...props} className={"btn " + props.className } />;


export default Main