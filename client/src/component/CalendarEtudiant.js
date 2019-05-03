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
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import './CSS/dayGrid.css'
import './CSS/main.css'
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


class CalendarEtudiant extends Component {
    calendarComponentRef = React.createRef()
    constructor() {
        super();
        this.state = {
            listEvents:[],
            calendarWeekends: true,
            calendarEvents: [

            ],
            isconnect: false,
        };

    }


    componentDidMount() {




    }



    componentWillMount(){
        if (localStorage.token !== undefined) {
            this.setState({
                isConnect: true
            });
        }

        var listCal = this.props.location.state.cals.response
        console.log(listCal);
        var listVar = [];
        listCal.map(e=>{

            var obj = {
                title : e.title,
                start : e.start

            }

            listVar.push(obj)

        })

        this.setState({

            calendarEvents : listVar


        })


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
    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        });
    }




  render() {
    return (
        <>
            <Header/>
            <div hidden={!this.state.isConnect}>{this.isconnect()}</div>
            <div className="container-fluid containerBodyS">
        <div className="row">
          <div className="col-lg-11 colBodyS">
            <p><span><img className="arrow" src={arrow} alt="arrow"/></span>Calendrier annuel</p>
              <div>
              </div>


                <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                    ref={ this.calendarComponentRef }
                    weekends={ this.state.calendarWeekends }
                    events={ this.state.calendarEvents }
                />

              {/* <button onClick={this.testerExpress.bind(this)}>Demander</button> */}
            </div>
          </div>
        </div>
            </>
    );
  }
}
export default CalendarEtudiant;
