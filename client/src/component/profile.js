import React, { Component } from "react";
import Header from "../component/header";
import IsConnect from "../component/isConnect"
class Profile extends Component {
  componentWillMount() {
   
  }
  disconnect(){
    this.props.history.push({
      pathname : '/'
    })
  }
  render() {
    return (
      <>
        <Header />
        <IsConnect disconnect={this.disconnect.bind(this)}/>
      </>
    );
  }
}

export default Profile;
