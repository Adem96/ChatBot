import React, { Component } from "react";
import './CSS/header.css'
import logo from "../images/logo_esprit_original.png";
import robot from "../images/robot.png"
import { NavLink } from "react-router-dom"

class Header extends Component {

  render() {
    return (
      <div className="container-fluid containerHeader">
        <div className="row">
          <div className="col-lg-12 headerNavBar">
            <div className="logoEsprit">
              <NavLink to="/">
                  <img src={logo} alt="logoEsprit"/>
              </NavLink>
            </div>
            <nav className="navbar navbar-expand-sm">
              <ul className="navbar-nav">
                <li className="nav-item"><NavLink className="NavLink" to="/Specialites"> Spécialités</NavLink> </li>
                <li className="nav-item">Scolarité</li>
                <li className="nav-item">Admission</li>
                <li className="nav-item">Entraide</li>
                <li hidden={true} className="nav-item">Profile</li>
              </ul>
            </nav>
            <div className="robot"> <img className="robotImage"src={robot} alt="robotIA"/> </div>
            <p className="pRobot"> Une platforme basé sur IA</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
