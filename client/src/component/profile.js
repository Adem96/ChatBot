import React, { Component } from "react";
import Header from "../component/header";
import IsConnect from "../component/isConnect"
class Profile extends Component {
  componentWillMount() {
   
  }
  render() {
    return (
      <>
        <Header />
        <IsConnect />
      </>
    );
  }
}

export default Profile;
