import React, { Component } from "react";
import './CSS/body.css'
import arrow from '../images/arrow.png'
import arrowRight from '../images/arrowRight.png'
import bot from '../images/bot.png'
import nuage from '../images/nuage.png'
class Body extends Component {

  render() {
    return (
      <div className="container-fluid containerBody">
        <div className="row">
          <div className="col-lg-11 colBody">
            <p><span><img className="arrow" src={arrow} alt="arrow"/></span>Espace Intranet</p> 
            <img className="botLogo" src={bot} alt="arrowBot" /> 
            <img className="nuageBot" src={nuage} alt="nuageBot" />
            <input className="inputBot" type="text" autoComplete="off" placeholder="Vous avez des questions ?"></input>
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
              <button>Se Connecter</button>
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
              <button>Se Connecter</button>
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
      </div>
    );
  }
}
export default Body;
