import React, {Component} from "react";
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
import {
    MDBContainer,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBInput,
    MDBDropdown,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBDropdownToggle
} from 'mdbreact';


class Scolarite extends Component {
    constructor() {
        super();
        this.state = {
            isconnect: false,
            matiere: null,
            contenu: "",
            isShowing: false,
            modal: false,
            message:""
        };
    }





    componentWillMount() {
        if (localStorage.token !== undefined) {
            this.setState({
                isConnect: true
            });
        }
    }


    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }


    isconnect() {
        if (localStorage.token !== undefined) {
            return <IsConnect disconnect={this.disconnect.bind(this)}/>;
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

    addReclamation(e) {
        e.preventDefault();
        if (localStorage.getItem("token") !== null) {
            var id = jwt_decode(localStorage.token).user._id
        }
        console.log(this.refs.contenu.value)
        const bod = {
            id: id,
            matiere: this.refs.matiere.value,
            contenu: this.refs.contenu.value

        };
        axios.post("http://localhost:4000/faq/reclamation", bod).then(res => {
            console.log('succes')
        });
    }



    apiFAQ(e){

        console.log('hh')
        e.preventDefault();
        if(this.refs.message.value.includes('calendrier')){

            this.props.history.push({
                pathname: "/CalendarEtudiant"
            })
        }
    }


    suiviReclamation(e) {
        console.log('suivi')
        e.preventDefault();
        axios.get("http://localhost:4000/faq/reclamations").then(res => {
            console.log(res.data)
            this.props.history.push({

                pathname: "/ListReclamation",
                state: {reclamations: res.data}
            })


        })
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

                                <MDBDropdown>
                                    <MDBDropdownToggle caret color="danger">
                                        Réclamation
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu color="danger">
                                        <MDBDropdownItem onClick={this.toggle}>Déposer réclamation</MDBDropdownItem>
                                        <MDBDropdownItem onClick={this.suiviReclamation.bind(this)}>Suivi réclamation</MDBDropdownItem>

                                    </MDBDropdownMenu>
                                </MDBDropdown>
                                <MDBContainer>
                                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                                        <MDBModalHeader toggle={this.toggle}>Réclamer note</MDBModalHeader>
                                        <MDBModalBody>
                                            <label
                                                htmlFor="defaultSelect"
                                                className="grey-text"
                                            >
                                                Veuillez choisir une matière
                                            </label>
                                            <div className="form-group">
                                                <select className="custom-select bMDBRowser-default" id="defaultSelect"
                                                        required ref="matiere">
                                                    {jwt_decode(localStorage.token).user.notes.map(note => {
                                                        return (
                                                            <option value={note.matiere}>{note.matiere}</option>
                                                        );
                                                    })}

                                                </select>
                                                <div className="invalid-feedback">
                                                    Example invalid custom select feedback
                                                </div>
                                            </div>


                                            <div className="form-group">
                                                <label
                                                    htmlFor="exampleFormControlTextarea1"
                                                    className="grey-text"
                                                >
                                                    Description
                                                </label>
                                                <textarea ref="contenu"
                                                          className="form-control"
                                                          id="exampleFormControlTextarea1"
                                                          rows="5"
                                                />
                                            </div>

                                        </MDBModalBody>
                                        <MDBModalFooter>
                                            <MDBBtn color="secondary" onClick={this.toggle}>Fermer</MDBBtn>
                                            <MDBBtn color="primary"
                                                    onClick={this.addReclamation.bind(this)}>Réclamer</MDBBtn>
                                        </MDBModalFooter>
                                    </MDBModal>
                                </MDBContainer>
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
                                        placeholder="Payement, Informations, Etablissement.."
                                        ref="message"
                                        onChange={this.onChangeMessage.bind(this)}
                                    />
                                </div>
                                {/* <button onClick={this.testerExpress.bind(this)}>Demander</button> */}
                                <img className="arrowRightS" src={arrowRight} alt="arrowBot" onClick={this.apiFAQ.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Scolarite;
