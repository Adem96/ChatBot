import React, {Component} from "react";
import "./CSS/scolarite.css"
import axios from "axios";
import arrow from "../images/arrow.png";
import arrowRight from "../images/arrowRight.png";
import Header from "../component/header";
import IsConnect from "../component/isConnect";
import jwt_decode from "jwt-decode"
import close from "../images/close.png";
import user from "../images/user.png";
import password from "../images/password.png";
import Modal from "react-modal";
import {
    MDBContainer,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBInput,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownToggle
} from 'mdbreact';


class CalendarEtudiant extends Component {
    constructor() {
        super();
        this.state = {
            isconnect: false,
        };

    }
    componentWillMount(){
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
    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        });
    }




  render() {
    return (
        <>
            <Header/>
            <div hidden={!this.state.isConnect}>{this.isconnect()}</div>
            <div className="container-fluid containerBodyS">
        <div className="row">
          <div className="col-lg-11 colBodyS">
            <p><span><img className="arrow" src={arrow} alt="arrow"/></span>Scolarité</p>
              <div>
              </div>
            <div className="formEtudiantS">
              <p>
                <span>|</span> Vous avez des questions ?
              </p>
              <div className="inputDiv">
                <input
                  className="inputBotS"
                  type="text"
                  autoComplete="off"
                  placeholder="yop"
                  name="message"
                  onChange = {this.onChangeMessage.bind(this)}
                />
              </div>
              {/* <button onClick={this.testerExpress.bind(this)}>Demander</button> */}
              <img className="arrowRightS" src={arrowRight} alt="arrowBot" />
            </div>
          </div>
        </div>
      </div>
            </>
    );
  }
}
export default CalendarEtudiant;
