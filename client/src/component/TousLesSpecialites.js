import React, { Component } from "react";
import "./CSS/TousLesSpecialites.css";
import sim from "../images/sim.png";
import twin from "../images/twin.png";
import gl from "../images/gl.png";
import sleam from "../images/sleam.png";
import ds from "../images/ds.png";
import arrow from "../images/arrow.png"
import arrowRight from "../images/arrowRight.png"
class TousLesSpecialites extends Component {
  constructor() {
    super();
    this.state = {
      listSpecialites: []
    };
  }
  componentDidMount() {
    this.setState({
      listSpecialites: this.props.location.state.specialites
    });
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
                  
                />
                <img className="arrowRightTS" src={arrowRight} alt="arrowBot"/> 

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
