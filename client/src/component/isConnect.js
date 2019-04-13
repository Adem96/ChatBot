import React, { Component } from "react";
import "./CSS/isConnect.css"
import jwt_decode from "jwt-decode";
class IsConnect extends Component{

    constructor(){
        super()
        this.state = {
            nom : '',
            prenom : '',
        }
    }
    componentWillMount(){
        var user = jwt_decode(localStorage.token).user   
        this.setState({
            nom : user.nom,
            prenom : user.prenom
        }) 
    }
    render(){
        return(
            <div className="container-fluid isConnect">
                <ul>
                    <li>{this.state.nom} {this.state.prenom}</li>
                    <li>Déconnexion</li>
                </ul>
            </div>
        )
    }
}

export default IsConnect