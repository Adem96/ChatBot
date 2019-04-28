import React, { Component } from "react";
import Header from "../component/header";
import IsConnect from "../component/isConnect";
import jwt_decode from "jwt-decode";
import "./CSS//profile.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://127.0.0.1:4000",
      specialiteHidden: true,
      specialite : "",
      notificationBool : false

    };
  }
  componentWillMount() {
 
    if (jwt_decode(localStorage.token).user.specialite !== null) {
      this.setState({
        specialiteHidden: false
      });
    }
  }
  disconnect() {
    this.props.history.push({
      pathname: "/"
    });
  }
  test() {}
  notifSpecialite(specialite){
    this.setState({
      specialite : specialite,
      notificationBool : true
    })
  }
  render() {
    return (
      <>
        <Header />
        <IsConnect disconnect={this.disconnect.bind(this)} specialite={this.notifSpecialite.bind(this)}/>
        <p className="alert alert-success" role="alert" hidden = {!this.state.notificationBool}>Vous etes affecter vers la spécialité {this.state.specialite}</p>
        <div className="profile">
          <div className="tabInfo">
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>
                    {jwt_decode(localStorage.token).user.nom}
                    {jwt_decode(localStorage.token).user.prenom}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Email : {jwt_decode(localStorage.token).user.email}</td>
                </tr>
                <tr>
                  <td>Age : {jwt_decode(localStorage.token).user.age}</td>
                </tr>
                <tr>
                  <td>Classe : {jwt_decode(localStorage.token).user.classe}</td>
                </tr>
                <tr id="specialite" hidden={this.state.specialiteHidden}>
                  <td>
                    Specialite :{" "}
                    {jwt_decode(localStorage.token).user.specialite}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="tabNotes">
            <h2>Notes des modules</h2>
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>DESIGNATION</th>
                  <th>COEF</th>
                  <th>NOTE</th>
                </tr>
              </thead>
              <tbody>
                {jwt_decode(localStorage.token).user.notes.map(note => {
                  return (
                    <tr key={note._id}>
                      <td>{note.matiere}</td>
                      <td>{note.coef}</td>
                      <td>{note.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
