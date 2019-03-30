import React, { Component } from "react";
import "./CSS/TousLesSpecialites.css";
import sim from "../images/sim.png";
import twin from "../images/twin.png";
import gl from "../images/gl.png";
import sleam from "../images/sleam.png";
import ds from "../images/ds.png";
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
      <div className="container">
        <div className="row rowS">
          <div className="col-lg-5 containerLogo">
            <img className="logoOption" src={sim} alt="optionSim" />
            <button className="buttonOption">Plus d'informations</button>
          </div>
          <div className="col-lg-5 containerLogo">
            <img className="logoOption" src={twin} alt="optionSim" />
            <button className="buttonOption">Plus d'informations</button>
          </div>
          <div className="col-lg-5 containerLogo">
            <img className="logoOption" src={ds} alt="optionSim" />
            <button className="buttonOption">Plus d'informations</button>
          </div>
          <div className="col-lg-5 containerLogo">
            <img className="logoOption" src={sleam} alt="optionSim" />
            <button className="buttonOption">Plus d'informations</button>
          </div>
          <div className="col-lg-5 containerLogo">
            <img className="logoOption" src={gl} alt="optionSim" />
            <button className="buttonOption">Plus d'informations</button>
          </div>
        </div>
      </div>
    );
  }
}
export default TousLesSpecialites;
