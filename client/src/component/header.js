import React, { Component } from "react";
import "./CSS/header.css";
import logo from "../images/logo_esprit_original.png";
import robot from "../images/robot.png";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isConnect: false,
      path: ""
    };
  }
  componentWillMount() {
    if (localStorage.token !== undefined) {
      this.setState({
        isConnect: true
      });
    }
  }

  actionOnLogo() {
    if (localStorage.getItem("token") !== null) {
      this.setState({
        path: "/profile",
      });
    } else {
      this.setState({
        path: "/"
      });
    }
  }
  render() {
    return (
      <div className="container-fluid containerHeader">
        <div className="row">
          <div className="col-lg-12 headerNavBar">
            <div className="logoEsprit">
              <NavLink to={localStorage.getItem("token") !== null ? "/Profile" : "/"}>
                <img src={logo} alt="logoEsprit" />
              </NavLink>
            </div>
            <nav className="navbar navbar-expand-sm">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="NavLink" to="/Specialites">
                    Spécialités
                  </NavLink>
                </li>
                <li className="nav-item">Scolarité</li>
                <li className="nav-item">
                  <NavLink className="NavLink" to="/AideAdmission">
                    Admission
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="NavLink" to="/Entraid">
                    Entraide
                  </NavLink>
                </li>
                <li hidden={!this.state.isConnect} className="nav-item">
                  <NavLink className="NavLink" to="/Profile">
                    Profile
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className="robot">
              <img className="robotImage" src={robot} alt="robotIA" />
            </div>
            <p className="pRobot"> Une platforme basée sur IA</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
