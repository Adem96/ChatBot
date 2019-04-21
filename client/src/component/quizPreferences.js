import React, { Component } from "react";
import Header from "../component/header";
import IsConnect from "../component/isConnect";
import "./CSS/quizPreferences.css";
import socketIOClient from "socket.io-client";
import { NavLink } from "react-router-dom"
class QuizPreferences extends Component {
  constructor() {
    super();
    this.state = {
      isconnect: false,
      endpoint: "http://127.0.0.1:4000",
      msgServer: "",
      input: "",
      tab: [],
      key: 0,
      index: 0,
      preference1 :"",
      preference2 :"",
      resultatPreferences : "",
      terminer : false
    };
  }

  componentWillMount() {
    if (localStorage.token !== undefined) {
      this.setState({
        isConnect: true
      });
    }

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
  chat(e) {
    if (e.key === "Enter") {
      this.setState({
        input: e.target.value
      });
      var socket = socketIOClient(this.state.endpoint);
      socket.emit("fromClient", this.refs.message.value);
   
      socket.on("fromServer", data => {
        if (data.metiers === undefined) {
          this.setState({
            msgServer: data.msg,
            preference2 : data.preference,
            terminer : true
          });
        } else {
          this.setState({
            msgServer:
              data.msg +
              " " +
              data.metiers[0] +
              " | " +
              data.metiers[1] +
              " | " +
              data.metiers[2],
              preference1 : data.preference
          });
        }

        let tab = this.state.tab;
        tab.push(this.state.input);
        tab.push(this.state.msgServer);
        this.setState({
          tab: tab
        });
      });

      this.refs.message.value = "";
    }
  }

  setPreference() {
    if(this.state.preference1 === "Developpement"){
      if(this.state.preference2 === "jeuVideo"){
          const resultat = "SIM"
          this.setState({
            resultatPreferences : resultat
          })
          localStorage.setItem("preference",resultat)
      }
      if(this.state.preference2 === "siteWeb"){
        const resultat = "TWIN"
        this.setState({
          resultatPreferences : resultat
        })
        localStorage.setItem("preference",resultat)
      }
      if(this.state.preference2 === "Architect SI"){
        const resultat = "GL"
        this.setState({
          resultatPreferences : resultat
        })
        localStorage.setItem("preference",resultat)
      }
    }
   
  }

  render() {
    return (
      <>
        <Header />
        <div hidden={!this.state.isConnect}>{this.isconnect()}</div>
        <div className="quiz">
          <div className="tabQuiz">
            <h3 className="title">
              Bonjour ceci est un test sur vos préférences afin de savoir quel
              spécialité vous convient le mieux
            </h3>
            <div className="chat">
              <div className="chatHeader" />
              <div className="chatBody">
                <ul>
                  <li className="liRight">
                    Pour vous qu'est ce que vous preferez le plus ? math,
                    developpement, reseau
                  </li>
                  {this.state.tab.map((t, i) => {
                    if (i % 2 === 0) {
                      return (
                        <li key={i} className="liLeft">
                          {t}
                        </li>
                      );
                    } else {
                      return (
                        <li key={i} className="liRight">
                          {t}
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
              <div className="chatInput">
                <input
                  onKeyDown={this.chat.bind(this)}
                  type="text"
                  placeholder="Ecrivez un message.."
                  autoComplete="off"
                  ref="message"
                />
              </div>
            </div>
            <NavLink className="NavLink" to="/ResultatPreferences"><div onClick={this.setPreference.bind(this)} hidden={!this.state.terminer} className="Suivant"><p>Suivant</p></div></NavLink>
          </div>
          <button onClick={this.test.bind(this)}>test</button>
        </div>
      </>
    );
  }
}

export default QuizPreferences;
