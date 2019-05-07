import React, {Component} from "react";
import HeaderAdmin from "../component/headerAdmin";
import IsConnect from "../component/isConnect";
import axios from "axios";


class AdminReclamation extends Component {
    constructor() {
        super();
        this.state = {
            isconnect: false,
            nbrStudents: 0,
            reclamations: [],
            endpoint: "http://127.0.0.1:4000",
            notifications: ""
        };
    }

    componentWillMount() {
        axios.get("http://localhost:4000/users").then(res => {
            console.log(res.data)

            this.setState({
                reclamations: res.data

            })


        })
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

    treatRec(id) {

        console.log(this.refs.idU)
        const obj = {
                idR:id.target.value,
                idU:this.refs.idU.value

        }

        axios.post("http://localhost:4000/faq/treatRec",obj).then(res => {
                console.log(res)

        })


    }

    render() {
        return (
            <>
                <HeaderAdmin/>
                <div hidden={!this.state.isConnect}>{this.isconnect()}</div>
                <div className="profile">
                    <div className="tabInfo">
                        <table className="table table-condensed">
                            <thead>
                            <tr>
                                <th>Etudiant</th>
                                <th>Matière</th>
                                <th>Contenu</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>

                            {this.state.reclamations.map((rec, index) => {
                                return (
                                    <>
                                        {rec.reclamations.map((recs, index) => {
                                            if(recs.etat !== 'Traitée'){

                                                return (
                                                    <tr>
                                                        <td> {rec.nom} </td>
                                                        <td>{recs.matiere} </td>
                                                        <td> {recs.contenu}</td>
                                                        <td> {recs.date} </td>
                                                        <input type="text" value={rec._id} hidden ref="idU"/>
                                                        <td><button className="btnValider" value={recs._id} onClick={this.treatRec.bind(this)}>Traiter</button></td>

                                                    </tr>
                                                )
                                            }

                                                })}
                                                </>
                                                )
                                                })}
                                                </tbody>
                                                </table>
                                            {/**/
                                            }
                                            {/*disabled={this.state.studentsChoix.length < this.state.nbrStudents ? false : false}>Affectation*/
                                            }
                                            {/*</button>*/
                                            }
                                        </div>
                                        </div>
                                        </>
                                        )
                                            ;
                                        }
                                        }

                                        export default AdminReclamation;
