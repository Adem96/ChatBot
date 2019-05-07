import React, { Component } from "react";
import "./CSS/scolarite.css"
import axios from "axios";
import arrow from "../images/arrow.png";
import logo1 from "../images/1.png";
import logo2 from "../images/3.png";
import arrowRight from "../images/arrowRight.png";
import Header from "../component/header";
import IsConnect from "../component/isConnect";
import jwt_decode from "jwt-decode"
import close from "../images/close.png";
import user from "../images/user.png";
import password from "../images/password.png";
import Modal from "react-modal";
import "./CSS/foyer.css"
import sim from "../images/sim.png";



class FoyerForm extends Component {
    constructor() {
        super();
        this.state = {
            isconnect: false,
            isShowing: false,
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    openModal() {
        this.setState({ modalIsOpen: true });
    }
    closeModal() {
        this.setState({ modalIsOpen: false });
    }


    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    }

    closeModalHandler = () => {
        this.setState({
            isShowing: false
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
            <p><span><img className="arrow" src={arrow} alt="arrow"/></span>Foyer</p>
              <div className="divFoyer">

                  <h1>Grille tarifaire Année universitaire 2018/2019 « Etudiants internationaux»</h1>
                  <img className="imgFoyer1" src={logo1} alt="imgFoyer1" />
                  <h1>Grille tarifaire Année universitaire 2018/2019 « Etudiants Tunisiens »</h1>
                  <img className="imgFoyer1" src={logo2} alt="imgFoyer1" />



              </div>
              {/* <button onClick={this.testerExpress.bind(this)}>Demander</button> */}
            </div>
          </div>
        </div>
            </>
    );
  }
}
export default FoyerForm;
