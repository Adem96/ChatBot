import React, { Component } from "react";
import Header from "../component/header";
import IsConnect from "../component/isConnect";
import jwt_decode from "jwt-decode";
import "./CSS//profile.css";
class Profile extends Component {
  componentWillMount() {}
  disconnect() {
    this.props.history.push({
      pathname: "/"
    });
  }
  render() {
    return (
      <>
        <Header />
        <IsConnect disconnect={this.disconnect.bind(this)} />

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
