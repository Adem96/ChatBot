import React, { Component } from "react";
import "./CSS/detailsSpecialite.css";
import arrow from "../images/arrow.png";
import Header from "../component/header";
import IsConnect from "../component/isConnect"
class DetailsSpecialite extends Component {
  constructor(){
    super();
    this.state = {
      isconnect: false
    };
  }
  componentWillMount() {
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
  render() {
    return (
      <>
        <Header />
        <div hidden={!this.state.isConnect}>{this.isconnect()}</div>
        <div className="container-fluid containerDetailsS">
          <div className="row">
            <div className="col-lg-11 colDetailsS">
              <p className="title">
                <span>
                  <img className="arrow" src={arrow} alt="arrow" />
                </span>
                {this.props.location.state.specialite.nom.toUpperCase()}
              </p>
              <div className="row elementRow">
                <div className="col-lg-11 elementCol">
                  <p>
                    | <span>Description</span>
                  </p>
                </div>
                <div className="col-lg-11 elementCol">
                  {this.props.location.state.specialite.description}
                </div>
              </div>
              <div className="row elementRow">
                <div className="col-lg-11 elementCol">
                  <p>
                    | <span>Objectifs</span>
                  </p>
                </div>
                <div className="col-lg-11 elementCol">
                  {this.props.location.state.specialite.objectif}
                </div>
              </div>
              {this.props.location.state.specialite.profile !== "" ? (
                <div className="row elementRow">
                  <div className="col-lg-11 elementCol">
                    <p>
                      | <span>Profile</span>
                    </p>
                  </div>
                  <div className="col-lg-11 elementCol">
                    {this.props.location.state.specialite.profile}
                  </div>
                </div>
              ) : null}
              <div className="row elementRow">
                <div className="col-lg-11 elementCol">
                  <p>
                    | <span>Metiers</span>
                  </p>
                </div>
                <div className="col-lg-11 elementCol">
                  {this.props.location.state.specialite.metiers.map(m => {
                    return <li key={m._id}>{m.nom}</li>;
                  })}
                </div>
              </div>
              <div className="row elementRow">
                <div className="col-lg-11 elementCol">
                  <p>
                    | <span>Modules</span>
                  </p>
                </div>
                <div className="col-lg-11 elementCol">
                  {this.props.location.state.specialite.modulesSpecialite.map(
                    m => {
                      return (
                        <li key={m._id}>
                          {m.nom}
                          <ul key={m._id}>
                            {m.listMatieres.map(mat => {
                              return <li key={mat._id}>{mat.nom}</li>;
                            })}
                          </ul>
                        </li>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default DetailsSpecialite;
