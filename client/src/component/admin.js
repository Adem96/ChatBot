import React, { Component } from "react";
import Header from "../component/header";
import IsConnect from "../component/isConnect";
import axios from "axios";
import socketIOClient from "socket.io-client";
class Admin extends Component {
  constructor() {
    super();
    this.state = {
      isconnect: false,
      nbrStudents: 0,
      studentsChoix: [],
      endpoint: "http://127.0.0.1:4000",
    };
  }

  componentWillMount() {
    console.log("will")
    if (localStorage.token !== undefined) {
      this.setState({
        isConnect: true
      });
    }
    // axios.get("http://localhost:4000/admin/allStudents").then(response => {
    
    //   this.setState({
    //     nbrStudents: response.data.length
    //   });
    // });
    axios.get("http://localhost:4000/admin/studentChoix").then(response => {
      this.setState({
        studentsChoix: response.data
      });
    });
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
  affectation(){
      axios.post("http://localhost:4000/admin/affectation").then(response => {
          if(response.data.msg === "Success"){
            var socket = socketIOClient(this.state.endpoint);
            socket.on("notification" , function(data) {
              console.log(data)
            })
            this.setState({
                studentsChoix : []
            })
          }else {
              console.log("error")
          }
      })
  }
  render() {
    return (
      <>
        <Header />

        <div hidden={!this.state.isConnect}>{this.isconnect()}</div>
        <div className="profile">
          <div className="tabInfo">
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>Etudiant</th>
                  <th>Email</th>
                  <th>Classe</th>
                </tr>
              </thead>
              <tbody>
                {this.state.studentsChoix.map((stChoix, index) => {
                  return (
                    <tr key= {index}>
                      <td> {stChoix.nom} {stChoix.prenom} </td>
                      <td> {stChoix.email}  </td>
                      <td> {stChoix.classe}  </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button className="btnValider" onClick={this.affectation.bind(this)} disabled={this.state.studentsChoix.length < this.state.nbrStudents ? false : false}>Affectation</button>
          </div>
        </div>
      </>
    );
  }
}

export default Admin;
