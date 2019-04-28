import React, { Component } from "react";
import "./CSS/isConnect.css";
import jwt_decode from "jwt-decode";
import notif from "../images/notif.png";
class IsConnect extends Component {
  constructor() {
    super();
    this.state = {
      nom: "",
      prenom: "",
      notification: "",
      notificationBool: false
    };
  }
  componentWillMount() {

   
      if(localStorage.notifications !== undefined ) {
        var notifications = JSON.parse(localStorage.notifications)
       
        for (var i in notifications){
            console.log(notifications[i])
            if(notifications[i].id === jwt_decode(localStorage.token).user._id){
                this.setState({
                    notificationBool : true
                })
                
            }
        }
      }
    
    var user = jwt_decode(localStorage.token).user;
    this.setState({
      nom: user.nom,
      prenom: user.prenom,
      classe: user.classe
    });
  }
  disconnect() {
    localStorage.removeItem("token");
    this.props.disconnect();
  }
  showNotification() {
    var notifications = JSON.parse(localStorage.notifications);

    for (var i in notifications) {
      if (notifications[i].id === jwt_decode(localStorage.token).user._id) {
        this.props.specialite(notifications[i].specialite)
        notifications.splice(i, 1);
      }
    }
    this.setState({
      notificationBool: false
    });
    localStorage.setItem("notifications", JSON.stringify(notifications));
    console.log(notifications);
  }
  render() {
    return (
      <div className="container-fluid isConnect">
        <ul>
          <li
            onClick={this.showNotification.bind(this)}
            hidden={!this.state.notificationBool}
            className="notification"
          >
            <img src={notif} alt="notification" />{" "}
          </li>
          <li>
            {this.state.nom}
            {this.state.prenom} - {this.state.classe}
          </li>
          <li onClick={this.disconnect.bind(this)}>Déconnexion</li>
        </ul>
      </div>
    );
  }
}

export default IsConnect;
