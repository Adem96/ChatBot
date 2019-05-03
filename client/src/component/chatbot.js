import React, { Component } from "react";
import Header from "../component/header";
import IsConnect from "../component/isConnect"
import "./CSS/quizPreferences.css"
import socketIOClient from "socket.io-client";
import axios from "axios";
import speechRecognition from "./speechRecognition";
import { Redirect } from 'react-router-dom'
import { isNull } from "util";
import Card from "./card"
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer } from "mdbreact";


class Chatbot extends Component {
  constructor() {
    super();
    this.state = {
      isconnect: false,
      endpoint : "http://127.0.0.1:4000",
      msgServer : "",
      input : "",
      tab : [],
      key : 0,
      index : 0,
      test:false,
      testEtat:false,
      
    };

    /*
    axios.post("http://localhost:4000/test/sms").then(res=>{

      console.log(res);
      
      })*/
  


  }


  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/Reconaissance' />
    }
  }

  componentWillMount() {
    if (localStorage.token !== undefined) {
      this.setState({
        isConnect: true
      });

 

      axios.get("http://localhost:4000/test/etatTest/5cb8fbd21c91ce4b48b84f14").then(res=>{


        console.log("etatTest:"+res.data)
        if(res.data==="Test passed")
        {
            this.setState({
               
                testPasse:res.data,
                testEtat:true,

        })

  
        }

        else if (res.data==="Test non passed")
        {

            this.setState({
                testPasse:res.data,
                testEtat:false,

        })
        }
  
      })

      
      axios.get("http://localhost:4000/user/findusertest").then(res => {
         
         
        console.log("res:"+res.data.speech);
         this.setState({
    
                textExiste:res.data.speech,
                test:true,
         })
 
       });


    }



    let tab = this.state.tab 
    // tab.push("Bonjour ceci est un test sur vos préférences afin de savoir quel spécialité vous convient le mieux")
    this.setState({
      tab : tab,
      key : 1
    })
    
  }
  isconnect() {
    if (localStorage.token !== undefined) {
      return <IsConnect disconnect={this.disconnect.bind(this)} />;
    } else {
      return <></>;
    }
  }

  disconnect() {
    this.props.history.push({
      pathname: "/"
    });
  }
  chat(e){
    if(e.key === 'Enter'){
        this.setState({
          input : e.target.value
        })

        const msg = {
            msg: this.refs.message.value,
            
          };

        var socket = socketIOClient(this.state.endpoint);
        console.log("ici");
        console.log(this.refs.message.value);
        axios.post("http://localhost:4000/test/test", msg).then(res => {
         
         
           console.log("ici::"+res.data.speech);
             socket.emit("fromClient" ,res.data.speech)
             
          });
  
        socket.on("fromServer" , data => {

          this.setState({
            msgServer : data
          })

          let tab = this.state.tab   
          tab.push(this.state.input)    
          tab.push(this.state.msgServer)
          this.setState({
            tab : tab,
          })
        })
        
        this.refs.message.value = ""
        
      
     console.log(this.state.tab.length)   
    }

  }

  render() {

    var stylee={

       paddingLeft:'20px',
       color:'White',


    }

    var divStyle = {
        width: '200px',
        top:'200px',  
        right:'500px',   
        marginLeft:"670px",
        marginTop:"40px",
     
      };
    let isrealuser;






   let {testExiste,test,testEtat,testPasse} = this.state;


   if(testPasse!=isNull && testEtat===true)
   {

    isrealuser= <MDBContainer>
    <MDBCard style={{ width: "22rem", marginTop: "1rem" , marginLeft:"400px"}}>
      <MDBCardHeader color="primary-color" tag="h3">
        Votre Test
      </MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>Vous avez passé votre test</MDBCardTitle>
        <MDBCardText>
         En attente de passage du test oral
        </MDBCardText>
      
      </MDBCardBody>    
    </MDBCard>
  </MDBContainer>


   }

    if(testExiste!==isNull && test===true && testPasse==="Test non passed")
    {
    isrealuser= <> <Card/>
    <div>{this.renderRedirect()}
    <button className="btn btn-default" style={divStyle} onClick={this.setRedirect}>Passer le test</button>
    </div>
    </>
    }

    return (
      <>
        <Header />
        <speechRecognition/>
        <div hidden={!this.state.isConnect}>{this.isconnect()}</div>
        <div className="quiz">
        {isrealuser}
          <div className="tabQuiz">
                <div className="chat">
              
                    <div className="chatHeader">
                    <h3 style={stylee}>Test d'admission</h3>
                    </div>
                    <div className="chatBody">
                       <ul>
                       <li className="liRight">Vous avez des questions?</li>
                         {this.state.tab.map((t,i) => {
                            if(i % 2 === 0 ){
                              return(<li className="liLeft">{t}</li>)
                            }else {
                              return(<li className="liRight">{t}</li>)
                            }
                         })}
                         
                       </ul> 
                    </div>
                    <div className="chatInput">
                        <input onKeyDown={this.chat.bind(this)} type="text" placeholder="Ecrivez un message.." autoComplete="off" ref="message"/>
                    </div>
                    
                </div>
               
          </div>
    
        </div>
      </>
    );
  }
}
export default Chatbot;