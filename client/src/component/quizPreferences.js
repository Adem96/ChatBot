import React, { Component } from "react";
import Header from "../component/header";
import IsConnect from "../component/isConnect"
import "./CSS/quizPreferences.css"
import socketIOClient from "socket.io-client";
class QuizPreferences extends Component {
  constructor() {
    super();
    this.state = {
      isconnect: false,
      endpoint : "http://127.0.0.1:4000",
      msgServer : "",
      tab : [],
      key : 0
    };
  }

  componentWillMount() {
    if (localStorage.token !== undefined) {
      this.setState({
        isConnect: true
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

        var socket = socketIOClient(this.state.endpoint);
        socket.on("helloServer" , data => {

          this.setState({
            msgServer : data
          })
          let tab = this.state.tab         
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
    return (
      <>
        <Header />
        <div hidden={!this.state.isConnect}>{this.isconnect()}</div>
        <div className="quiz">
          <div className="tabQuiz">
                <div className="chat">
                    <div className="chatHeader">

                    </div>
                    <div className="chatBody">
                       <ul>
                       <li className="liRight">Bonjour ceci est un test sur vos préférences afin de savoir quel spécialité vous convient le mieux</li>
                         {this.state.tab.map((t,i) => {
                            if(i % 2 === 0 ){
                              return(<li className="liLeft">left</li>)
                            }else {
                              return(<li className="liRight">right</li>)
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

export default QuizPreferences;
