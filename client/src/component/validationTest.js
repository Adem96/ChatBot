import React, { Component } from "react";
import HeaderAdmin from "../component/headerAdmin";
import IsConnect from "../component/isConnect";
import axios from "axios";
import socketIOClient from "socket.io-client";
import Modal from "react-modal";

class ValidationTest extends Component {
  constructor() {
    super();
    this.state = {
      isconnect: false,
      modalIsOpen: false,
      nbrStudents: 0,
      tests: [],
      etudiant : [],
      id: 10,
      endpoint: "http://127.0.0.1:4000",
      notifications : ""
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    axios.get("http://localhost:4000/test/getListTests").then(response => {
      this.setState({
        etudiant: response.data.etudiant,
        tests: response.data.touslesuserstests
      });
   
      console.log(response.data);
      console.log(response.data.etudiant.prenom);
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
            this.setState({
                studentsChoix : []
            })
          }else {
              console.log("error")
          }
      })

      var socket = socketIOClient("http://127.0.0.1:4000");
      
      socket.on("notification", data => {
        console.log(data)
        if(localStorage.notifications !== undefined){
          var tabNotif = JSON.parse(localStorage.notifications)
          tabNotif.push.apply(tabNotif , data)
          localStorage.setItem("notifications" , JSON.stringify(tabNotif))
        }else {
          localStorage.setItem("notifications" , JSON.stringify(data))
        }

     });
    
    
     
  }


  UpdateNote() {
    const authentication = {
      noteOral: this.refs.note.value
   
    };


    axios
      .post("http://localhost:4000/test/updateTestUser/"+this.state.id, authentication);
  }




  Modal = (e, movie) => {
    e.preventDefault();

  this.setState({id:movie._id})
    console.log(movie);
    this.setState({ modalIsOpen: true });
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <>
        <HeaderAdmin />
        <div hidden={!this.state.isConnect}>{this.isconnect()}</div>
        <div className="profile">
          <div className="tabInfo">
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Classe</th>
                  <th> Note écrit </th>
                  <th> Note oral </th>
                  <th> Résultat </th>
                  <th> Action </th>
           
                </tr>
              </thead>
              <tbody>
                {this.state.tests.map((stChoix, index) => {
                  return (
                    <tr key= {index}>
                      <td> fendri </td>
                  <td> taher </td>
                  <td> A11 </td>
                  <td> {stChoix.noteEcrit} </td>
                  <td> {stChoix.noteOral} </td>
                  <td> {stChoix.result} </td>
                  <td>    <button type="submit" className="btn btn-default" onClick={e => this.Modal(e,stChoix)}>
              Noter
            </button></td>
                   
                   
                    </tr>
                  );
                })}
               
              </tbody>
            </table>
                 <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            className="modalClass"
            contentLabel="Example Modal"
          >
            <img
              className="closeBtn"
         
              alt="closeLogo"
              onClick={this.closeModal}
            />
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6  loginDiv">
                  <div className="elementLogin">
                    <p>Note</p>
                    <div>
                      <span>
                       
                        <input type="text" placeholder="Note" ref="note" />
                      </span>
                    </div>
                    <button onClick={this.UpdateNote.bind(this)}>Valider</button>
                   
                  </div>
                </div>
              </div>
            </div>
          </Modal>
          </div>
        </div>
      </>
    );
  }
}

export default ValidationTest;
