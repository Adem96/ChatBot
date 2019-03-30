import React, { Component } from "react";
import './CSS/header.css'
import logo from "../images/logo_esprit_original.png";
import { NavLink } from "react-router-dom"

class Header extends Component {
  render() {
    return (
      <div className="container-fluid containerHeader">
        <div className="row">
          <div className="col-lg-12 headerNavBar">
            <div className="logoEsprit">
              <img src={logo} alt="logoEsprit" />
            </div>
            <nav className="navbar navbar-expand-sm">
              <ul className="navbar-nav">
                <li className="nav-item"><NavLink className="NavLink" to="/Specialites"> Spécialités</NavLink> </li>
                <li className="nav-item">Link 2</li>
                <li className="nav-item">Link 3</li>
                <li className="nav-item">Link 4</li>
                <li className="nav-item">Link 5</li>
              </ul>
            </nav>
            <div className="logout">LogOut</div>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
