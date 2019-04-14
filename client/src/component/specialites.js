import React, { Component } from "react";
import axios from "axios";
import arrow from "../images/arrow.png";
import arrowRight from "../images/arrowRight.png";
import "./CSS/specialites.css";
import Header from "../component/header";
import IsConnect from "../component/isConnect";
import jwt_decode from "jwt-decode"
class Specialites extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      isConnect: false,
      alert : true
    };
  }

  componentWillMount() {
    if (localStorage.token !== undefined) {
      this.setState({
        isConnect: true
      });
    }
    console.log(localStorage.getItem("token"))
  }
  apiSpecialite(e) {
    e.preventDefault();
    console.log(this.state.message);
    if(localStorage.getItem("token") !== null){
      var id = jwt_decode(localStorage.token).user._id
    }
    const msg = {
      msg: this.state.message,
      id : id
    };
    axios.post("http://localhost:4000/options/specialites", msg).then(res => {
      console.log(res.data.intent);
      if (res.data.intent === "Specialite") {
        this.props.history.push({
          pathname: "/TousSpecialites",
          state: { specialites: res.data.response }
        });
      } else if (res.data.intent === "detailsSpecialite") {
        this.props.history.push({
          pathname: "/DetailsSpecialite",
          state: { specialite: res.data.response }
        });
      } else if (res.data.intent === "recommandationSpecialite") {
        this.props.history.push({
          pathname: "/suggestion",
          state: { suggestion: res.data.Specialite, notes: res.data.notes }
        });
      } else {
        this.setState({
          error: res.data.error,
          alert : false
        });
      }
    });
  }

  onChangeMessage(e) {
    this.setState({
      message: e.target.value
    });
  }
  disconnect() {
    this.props.history.push({
      pathname: "/"
    });
  }
  isconnect() {
    if (localStorage.token !== undefined) {
      return <IsConnect disconnect={this.disconnect.bind(this)} />;
    } else {
      return <></>;
    }
  }
  render() {
    return (
      <>
        <Header />
        <div hidden={!this.state.isConnect}>{this.isconnect()}</div>
        <div hidden={this.state.alert}className="alert alert-warning">
          <strong>Warning!</strong> {this.state.error}
        </div>
        <div className="container-fluid containerBodyS">
          <div className="row">
            <div className="col-lg-11 colBodyS">
              <p>
                <span>
                  <img className="arrow" src={arrow} alt="arrow" />
                </span>
                Spécialités
              </p>
              <div className="formEtudiantS">
                <p>
                  <span>|</span> Vous avez des questions ?
                </p>
                <div className="inputDiv">
                  <input
                    className="inputBotS"
                    type="text"
                    autoComplete="off"
                    placeholder="Options, Specialites, Modules.."
                    name="message"
                    onChange={this.onChangeMessage.bind(this)}
                  />
                </div>
                <img
                  className="arrowRightS"
                  src={arrowRight}
                  alt="arrowBot"
                  onClick={this.apiSpecialite.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Specialites;
