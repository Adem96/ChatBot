import React from 'react';
import axios from "axios";
import facialrecogniton from './facialrecognition';
import Header from "../header";
import { Redirect } from 'react-router-dom'

class Popup extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            time: 'start',
            title: 'Test admission',
            text: 'Bienvenue au test d admission vous avez une heure pour terminer le test' ,
            buttonText: 'Commencer le test',
            testCam:true
        };
        
        this.popupHandle = this.popupHandle.bind(this);
    }
    

    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/AideAdmission' />
        }
      }


    popupHandle() {
        let { time } = this.state;
        
        
        if(time === 'start'){
            this.setState({
                time: 'end',
                title: 'Terminé !',
                buttonText: 'Terminer',
                testCam: false
            });
            
            this.props.startQuiz();
        } else {  
                      
            //location.reload();// restart the application
           
        }
    }
    
    componentWillReceiveProps(nextProps) {
     
        this.setState({
            text: 'Vous avez terminé le test <br /> vous avez: <strong>' + this.props.score + '</strong> / <strong>' +this.props.total +'</strong>.'
        })


        let testrecherche=(
            {
        
           noteEcrit: this.props.score*2,
           
            }
        )
console.log("score: "+this.props.score);
        axios.post("http://localhost:4000/test/passageDuTest/5cb8fbd21c91ce4b48b84f14",testrecherche).then(response => {

            console.log(response);
            
          })
        
    }
    
    createMarkup(text) {
        return {__html: text};
    }
    
    
    render() {
       
        let { title, text,buttonText,testCam,time} = this.state;
        let testexiste;
        let { style } = this.props;
        let boutton;

         if(time==='end')
         {

            
            boutton= <div>{this.renderRedirect()}
          <button className="fancy-btn" onClick={this.setRedirect}>{buttonText}</button>
            </div>


         }

         else {

            text = "Bienvenue au test d admission vous avez une heure pour terminer le test"
            title= "Test admission"
            boutton=<button className="fancy-btn" onClick={this.popupHandle}>{buttonText}</button>

         }

        if(testCam) {
            testexiste=  facialrecogniton 
               }

        return (
            <>
       
            <facialrecogniton/>
            <div className="popup-container" style={style}>
           
                <div className="container">
                
                    <div className="col-md-8 col-md-offset-2">
                    {testexiste}
                        <div className="popup">
                            <h1>{title}</h1>
                            <p dangerouslySetInnerHTML={this.createMarkup(text)} />
                            {boutton}
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}

export default Popup