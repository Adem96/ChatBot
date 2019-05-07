import React, { Component } from "react";
import "./CSS/scolarite.css"

import arrow from "../images/arrow.png";

import Header from "../component/header";
import IsConnect from "../component/isConnect";
import jwt_decode from "jwt-decode"

import "./CSS/foyer.css"

import CanvasJSReact from "../assets/canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;



class CanvasNotes extends Component {
    constructor() {
        super();
        this.state = {
            isconnect: false,
            isShowing: false,
            modalIsOpen: false,
            optCan:[]
        };

    }
    componentWillMount(){
        if (localStorage.token !== undefined) {
            this.setState({
                isConnect: true
            });
        }

        var notes = jwt_decode(localStorage.token).user.notes
        console.log(notes)
        var notesTab = []
        notes.map(e=>{

            var obj = {

                y : e.note,
                label:e.matiere

            }
        notesTab.push(obj)

        })

        this.setState({

            optCan:notesTab

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



      const options = {
          animationEnabled: true,
          exportEnabled: true,
          theme: "light1", // "light1", "dark1", "dark2"
          title:{
              text: ""
          },
          data: [{
              type: "pie",
              indexLabel: "{label}: {y}",
              startAngle: -90,
              dataPoints: this.state.optCan
          }]
      }





      return (
        <>
            <Header/>
            <div hidden={!this.state.isConnect}>{this.isconnect()}</div>
            <div className="container-fluid containerBodyS">
        <div className="row">
          <div className="col-lg-11 colBodyS">
            <p><span><img className="arrow" src={arrow} alt="arrow"/></span>Notes</p>
              <div>
                  <CanvasJSChart options = {options}
                  />
              </div>
              {/* <button onClick={this.testerExpress.bind(this)}>Demander</button> */}
            </div>
          </div>
        </div>
            </>
    );
  }
}
export default CanvasNotes;
