import React, { Component } from "react";
import Header from "../component/header";
import IsConnect from "../component/isConnect";
import "./CSS/entraid.css"
class Entraid extends Component {
  constructor() {
    super();
    this.state = {
      isconnect: false
    };
  }
  componentWillMount(){
    if (localStorage.token !== undefined) {
        this.setState({
          isConnect: true
        });
      }
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
  render() {
    return (
      <>
        <Header />
        <div hidden={!this.state.isConnect}>{this.isconnect()}</div>
        <h1>Entraid page</h1>
      </>
    );
  }
}

export default Entraid;
