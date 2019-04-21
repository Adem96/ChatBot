import React, { Component } from "react";
import Header from "../component/header";
import IsConnect from "../component/isConnect";
import "./CSS/resultatPreferences.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { NavLink } from "react-router-dom";
class ResultatPreferences extends Component {
  constructor() {
    super();
    this.state = {
      isconnect: false,
      preference: "",
      twin: true,
      gl: true,
      sim: true,
      tabChoix: [],
      choix1: "",
      choix2: "",
      choix3: "",
      choix4: ""
    };
  }
  componentWillMount() {
    if (localStorage.preference === "TWIN") {
      this.setState({
        preference: "Téchnologies du web et de l'internet"
      });
    }
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

  addChoix(e) {
    if (e.target.id === "choix1") {
      this.setState({
        choix1: e.target.value
      });
    }
    if (e.target.id === "choix2") {
      this.setState({
        choix2: e.target.value
      });
    }
    if (e.target.id === "choix3") {
      this.setState({
        choix3: e.target.value
      });
    }
    if (e.target.id === "choix4") {
      this.setState({
        choix4: e.target.value
      });
    }
  }
  test() {
    console.log(this.state.tabChoix);
  }
  validerChoix() {
    let tabChoix = this.state.tabChoix;
    tabChoix.push(this.state.choix1);
    tabChoix.push(this.state.choix2);
    tabChoix.push(this.state.choix3);
    tabChoix.push(this.state.choix4);
    this.setState({
      tabChoix: tabChoix
    });
    const obj = {
      user: jwt_decode(localStorage.token).user,
      listChoix: tabChoix
    };
    axios
      .post("http://localhost:4000/modulesSpecialite/choixSpecialite", obj)
      .then(data => {
        console.log(data.data);
      });
  }
  render() {
    return (
      <>
        <Header />
        <div hidden={!this.state.isConnect}>{this.isconnect()}</div>
        <div className="Preferences">
          <div className="tabPreference">
            <h3 className="title"> Resultat Preferences</h3>
            <div className="resultat">
              <p>
                Suite au test de préférences votre spécialité est{" "}
                {this.state.preference}.
              </p>
            </div>

            <div className="tabInfo">
              <table className="table table-condensed">
                <thead>
                  <tr>
                    <th>Vos choix</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <select
                        id="choix1"
                        ref="choix1"
                        onChange={this.addChoix.bind(this)}
                      >
                        <option>------------------</option>
                        <option>Téchnologies du web et de l'internet</option>
                        <option>Génie logiciel</option>
                        <option>Systemes d'information mobile</option>
                        <option>Data Science</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <select
                        id="choix2"
                        ref="choix2"
                        onChange={this.addChoix.bind(this)}
                      >
                        <option>------------------</option>
                        <option>Téchnologies du web et de l'internet</option>
                        <option>Génie logiciel</option>
                        <option>Systemes d'information mobile</option>
                        <option>Data Science</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <select
                        id="choix3"
                        ref="choix3"
                        onChange={this.addChoix.bind(this)}
                      >
                        <option>------------------</option>
                        <option>Téchnologies du web et de l'internet</option>
                        <option>Génie logiciel</option>
                        <option>Systemes d'information mobile</option>
                        <option>Data Science</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <select
                        id="choix4"
                        ref="choix4"
                        onChange={this.addChoix.bind(this)}
                      >
                        <option>------------------</option>
                        <option>Téchnologies du web et de l'internet</option>
                        <option>Génie logiciel</option>
                        <option>Systemes d'information mobile</option>
                        <option>Data Science</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <NavLink className="NavLink" to="/Profile">
                <button
                  className="btnValider"
                  onClick={this.validerChoix.bind(this)}
                >
                  Valider vos choix
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ResultatPreferences;
