import React, { Component } from "react";
import HeaderAdmin from "../component/headerAdmin";
import IsConnect from "../component/isConnect";
import jwt_decode from "jwt-decode";
import "./CSS//profile.css";
class Profile extends Component {
  constructor(){
    super()
    this.state = {
      endpoint: "http://127.0.0.1:4000"
    }
  }
  componentWillMount() {

   
  }
  disconnect() {
    this.props.history.push({
      pathname: "/"
    });
  }
  test(){
  
  }
  render() {
    return (
      <>
        <HeaderAdmin />
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
              
              </tbody>
            </table>
          </div>
        
        </div>
    
      </>
    );
  }
}

export default Profile;
