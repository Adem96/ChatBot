import React, { Component } from "react";
import "./CSS/TousLesSpecialites.css";
import sim from "../images/sim.png";
import twin from "../images/twin.png";
import gl from "../images/gl.png";
import sleam from "../images/sleam.png";
import ds from "../images/ds.png";
import arrow from "../images/arrow.png"
import arrowRight from "../images/arrowRight.png"
import axios from 'axios'
class TousLesSpecialites extends Component {
  constructor() {
    super();
    this.state = {
      listSpecialites: [],
      message: ""
    };
  }

  componentDidMount() {
    this.setState({
      listSpecialites: this.props.location.state.specialites
    });
  }
  detectIntention(e){
    e.preventDefault()
    const msg = {
      msg : this.state.message
    }
    axios.post("http://localhost:4000/options/specialites",msg).then(res => {
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
    })
  }
  onChangeMessage(e){
    this.setState({
      message : e.target.value
    })
  }
  render() {
    return (
      <div className="container-fluid containerBodyS">
        <div className="row rowS">
        <div className="col-lg-11 colBodyS">
      
        <p><span><img className="arrow" src={arrow} alt="arrow"/></span>Spécialités</p>
        <input
                  className="inputBotTS"
                  type="text"
                  autoComplete="off"
                  placeholder="Vous avez des questions ?"
                  name="message"
                  onChange = {this.onChangeMessage.bind(this)}
                  
                />
                <img className="arrowRightTS" src={arrowRight} alt="arrowBot" onClick={this.detectIntention.bind(this)}/> 

        <div className="row">
        <div className="col-lg-5 containerLogo">
            <img className="logoOption" src={sim} alt="optionSim" />
        
          </div>
          <div className="col-lg-5 containerLogo">
            <img className="logoOption" src={twin} alt="optionSim" />
         
          </div>
          <div className="col-lg-5 containerLogo">
            <img className="logoOption" src={gl} alt="optionSim" />
      
          </div>
          <div className="col-lg-5 containerLogo">
            <img className="logoOption" src={sleam} alt="optionSim" />
        
          </div>
          <div className="col-lg-5 containerLogo">
            <img className="logoOption" src={ds} alt="optionSim" />
        
          </div>
</div>
        </div>         
        </div>
      </div>
    );
  }
}
export default TousLesSpecialites;
