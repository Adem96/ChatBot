import React, { Component } from "react";
import "./CSS/suggestionSpecialite.css";
import Header from "../component/header";
import IsConnect from "../component/isConnect";
class SuggestionSpecialite extends Component {
  constructor() {
    super();
    this.state = {
      isConnect: false,
      specialite: "",
      id: 0
    };
  }
  componentWillMount() {
    console.log(this.props.location.state.suggestion);
    console.log(this.props.location.state.notes);
    switch (this.props.location.state.suggestion) {
      case "twin":
        this.setState({
          specialite: "Technologies du web et de l'internet"
        });
        break;
      case "gl":
        this.setState({
          specialite: "Génie logiciel"
        });
        break;
      case "sim":
        this.setState({
          specialite: "Systémes d'informations mobiles"
        });
        break;
      case "ds":
        this.setState({
          specialite: "Data Science"
        });
        break;
      case "twinDs":
        this.setState({
          specialite: "Technologies du web et de l'internet || Data Science"
        });
        break;
      case "twinSim":
        this.setState({
          specialite:
            "Technologies du web et de l'internet || Systémes d'informations mobiles"
        });
        break;
      case "simGl":
        this.setState({
          specialite: "Systémes d'informations mobiles || Génie logiciel"
        });
        break;
      case "twinGl":
        this.setState({
          specialite: "Technologies du web et de l'internet || Génie logiciel"
        });
        break;
      case "twinSimGl":
        this.setState({
          specialite:
            "Technologies du web et de l'internet || Systémes d'informations mobiles || Génie logiciel"
        });
        break;
      default:
    }
  }
  disconnect() {
    this.props.history.push({
      pathname: "/"
    });
  }

  render() {
    return (
      <>
        <Header />
        <IsConnect disconnect={this.disconnect.bind(this)} />
        <div className="suggestion">
          <div className="tabSuggestion">
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>Spécialités Suggérer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.specialite}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="tabNotesS">
            <h2>Vos notes des modules de la spécialité {this.state.specialite}</h2>
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>MATIERE</th>
                  <th>NOTE</th>
                </tr>
              </thead>
              <tbody>
                {this.props.location.state.notes.map(note => {
                 
                  return (
              
                    <tr>
                      <td>{note.matiere}</td>
                      <td>{note.note}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default SuggestionSpecialite;
