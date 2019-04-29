import React, { Component } from "react";
import Header from "../component/header";
import IsConnect from "../component/isConnect";
import "./CSS/admission.css"
import openSocket from 'socket.io-client';

class Admission extends Component {
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
      const socket = openSocket('http://localhost:4000');


const canvas = document.getElementById('canvas-video');
const context = canvas.getContext('2d');
const img = new Image();

context.fillStyle = '#333';
context.fillText('Loading...', canvas.width / 2 - 30, canvas.height / 3);

socket.on('face', function (data) {
	const uint8Arr = new Uint8Array(data.buffer);
	const str = String.fromCharCode.apply(null, uint8Arr);
	const base64String = btoa(str);

	img.onload = function () {
		context.drawImage(this, 0, 0, canvas.width, canvas.height);
	};
	img.src = 'data:image/jpg;base64,' + base64String;
});


//socket.disconnect();

        const script = document.createElement("script");
        const script2 = document.createElement("script");
        
        script.src = "http://localhost:4000/socket.io/socket.io.js";
        script2.src = "/js/script.js";
        script2.async=true;
        script.async = true;

        document.body.appendChild(script);
        document.body.appendChild(script2);
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
        <div>
           
           <meta name="viewport" content="initial-scale=1" />
           <title>Face detection Node Opencv</title>
           <div className="container">
             <canvas id="canvas-video" width={640} height={480} />
           </div>
           </div>
          
      </>
    );
  }
}

export default Admission;
