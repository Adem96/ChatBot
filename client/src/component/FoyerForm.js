import React, { Component } from "react";
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

  testerExpress(e) {
    e.preventDefault();
    console.log(this.state.message)
    const msg = {
      msg : this.state.message
    }
    axios.post("http://localhost:4000/faq",msg).then(res => {
      console.log(res.data.intent)
      if(res.data.intent === "Specialite"){
        this.props.history.push({
          pathname : '/TousSpecialites',
          state : { specialites : res.data.response}
        })
      }else if(res.data.intent === "detailsSpecialite"){
        this.props.history.push({
          pathname : '/DetailsSpecialite',
          state : { specialite : res.data.response}
        })
      }
    });
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
              <img className="arrowRightS" src={arrowRight} alt="arrowBot" onClick={this.testerExpress.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
            </>
    );
  }
}
export default FoyerForm;
