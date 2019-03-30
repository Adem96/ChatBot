import React, { Component } from "react";
import axios from "axios";
import arrow from "../images/arrow.png"
import arrowRight from "../images/arrowRight.png"
import "./CSS/specialites.css";
class Specialites extends Component {
  constructor() {
    super();
    this.state = {
      message: ""
    };
  }
  testerExpress(e) {
    e.preventDefault();
    console.log(this.state.message)
    const msg = {
      msg : this.state.message
    }
    axios.post("http://localhost:4000/options/specialites",msg).then(res => {
      console.log(res.data.intent)
      if(res.data.intent === "Specialite"){
        this.props.history.push({
          pathname : '/TousSpecialites',
          state : { specialites : res.data.response}
        })
      }else if(res.data.intent === "detailsSpecialite"){
        this.props.history.push({
          pathname : '/DetailsSpecialite',
          state : { specialite : res.data.response}
        })
      }
    });
  }
  // testerExpress(e){
  //   e.preventDefault();
  //   this.props.history.push({
  //     pathname: '/',
  //     state: { some: 'state' }
  //   })
  // }
  onChangeMessage(e){
    this.setState({
      message : e.target.value
    })
  }

  render() {
    return (
      <div className="container-fluid containerBodyS">
        <div className="row">
          <div className="col-lg-11 colBodyS">
            <p><span><img className="arrow" src={arrow} alt="arrow"/></span>Spécialités</p>
            <div className="formEtudiantS">
              <p>
                <span>|</span> Vous avez des questions ?
              </p>
              <div className="inputDiv">
                <input
                  className="inputBotS"
                  type="text"
                  autocomplete="off"
                  placeholder="Options, Specialites, Modules.."
                  name="message"
                  onChange = {this.onChangeMessage.bind(this)}
                />
              </div>
              {/* <button onClick={this.testerExpress.bind(this)}>Demander</button> */}
              <img className="arrowRightS" src={arrowRight} alt="arrowBot" onClick={this.testerExpress.bind(this)}/> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Specialites;
