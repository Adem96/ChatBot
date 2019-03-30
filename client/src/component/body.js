import React, { Component } from "react";
import './CSS/body.css'
class Body extends Component {

  render() {
    return (
      <div className="container-fluid containerBody">
        <div className="row">
          <div className="col-lg-11 colBody">
            <p>Espace Intranet</p>
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
