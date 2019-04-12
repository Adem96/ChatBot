import React, { Component } from "react";
import "./CSS/body.css";
import arrow from "../images/arrow.png";
import arrowRight from "../images/arrowRight.png";
import bot from "../images/bot.png";
import nuage from "../images/nuage.png";
import Modal from "react-modal";
import user from "../images/user.png";
import password from "../images/password.png";
import close from "../images/close.png"
import axios from "axios"
import jwt_decode from "jwt-decode"

class Body extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentWillMount() {
    Modal.setAppElement('body');

}

  openModal() {
    this.setState({ modalIsOpen: true });
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  login(){
    
    const authentication = {
      email : this.refs.login.value,
      password: this.refs.password.value
    }
    axios.post("http://localhost:4000/users/login",authentication).then(res => {
      console.log(res.data)
      localStorage.setItem("token" , res.data)
      this.props.history.push({
        pathname : '/profile'
        
      })
    }).catch(err => {
      console.log(err)
    })
  }

  verif() {
  
    if(localStorage.getItem("token") === null){
      console.log("nexiste pas")
    }else {
      console.log(jwt_decode(localStorage.token))
    }
   
  }

  render() {
    return (
      
      <div className="container-fluid containerBody">
        <div className="row">
          <div className="col-lg-11 colBody">
            <p>
              <span>
                <img className="arrow" src={arrow} alt="arrow" />
              </span>
              Espace Intranet
            </p>
            <img className="botLogo" src={bot} alt="arrowBot" />
            <img className="nuageBot" src={nuage} alt="nuageBot" />
            <input
              className="inputBot"
              type="text"
              autoComplete="off"
              placeholder="Vous avez des questions ?"
            />
            <img className="arrowRight" src={arrowRight} alt="arrowBot" />
            <div className="formEtudiant">
              <p>
                <span>|</span> L'espace étudiant
              </p>
              <div>
                Renferme les informations qui vous permettront de bien organiser
                votre vie étudiante : horaires, documents de référence,
                plusieurs liens utiles, etc. Bonne navigation!
              </div>
              <button onClick={this.openModal}>Se Connecter</button>
            </div>
            <div className="formEtudiant">
              <p>
                <span>|</span> L'espace parent
              </p>
              <div>
                Est un endroit privilégié pour effectuer un suivi personnalisé
                du cheminement scolaire de votre enfant (résultats scolaires et
                absences).
              </div>
              <button onClick={this.verif.bind(this)}>Se Connecter</button>
            </div>
            <div className="formEtudiant">
              <p>
                <span>|</span> L'espace administration
              </p>
              <div>Est un endroit réservé aux directeurs.</div>
              <button>Se Connecter</button>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          className="modalClass"
          contentLabel="Example Modal"
        >
          
          <img className="closeBtn" src={close} alt="closeLogo" onClick={this.closeModal}/>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6  loginDiv">
                <div className="elementLogin">
                  <p>Login</p>
                  <div>
                    <span>
                      <img src={user} alt="userLogo" />{" "}
                      <input type="text" placeholder="Email" ref="login"/>
                    </span>
                  </div>
                  <div>
                    <span>
                      <img src={password} alt="passwordLogo" />{" "}
                      <input type="text" placeholder="Password" ref="password"/>
                    </span>
                  </div>
                  <button onClick={this.login.bind(this)}>Login</button>
                </div>
              </div>
              <div className="col-6 registerDiv">
                <div className="elementRegister" >
                  <p>Inscription</p>
                  <input type="text" placeholder="A"/>
                  <input type="text" placeholder="B"/>
                  <input type="text" placeholder="C"/>
                  <input type="text" placeholder="D"/>
                  <input type="text" placeholder="E"/>
                  <button>Inscription</button>
                </div>
              </div>
            </div>
          </div>
 
        </Modal>
      </div>
    );
  }
}
export default Body;
