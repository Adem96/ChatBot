import React from 'react';
import openSocket from 'socket.io-client';
import Header from "../../component/header";
import IsConnect from "../../component/isConnect";
import "../CSS/admission.css"
import axios from "axios";
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import CardExample from './CardExample';
import jwt_decode from "jwt-decode";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBContainer, MDBAlert, MDBCardText, MDBCol } from 'mdbreact';

class facialrecogniton extends React.Component {


  constructor() {
    super();
    this.state = {
      isconnect: false,
      reconaissance: "",
      flipped:false
    };


  }
    
  routeChange() {
    this.props.history.push({
      pathname: "/testAdmission"
 
    });
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/testAdmission' />
    }
  }


    componentDidMount () {

  


      if (localStorage.token !== undefined) {
        this.setState({ 
          isConnect: true
        });
      }
  
     

    }


    commencerReconaissance()
    {

      const socket = openSocket('http://localhost:4001');


      const canvas = document.getElementById('canvas-video');
      const context = canvas.getContext('2d');
      const img = new Image();
      
      context.fillStyle = '#333';
      context.fillText('Loading...', canvas.width / 2 - 30, canvas.height / 3);
      
      
      //socket.on("disconnect", function(){
        //console.log("client disconnected from server");
      //});
      
      
      socket.on('face', function (data) {
        const uint8Arr = new Uint8Array(data.buffer);
        const str = String.fromCharCode.apply(null, uint8Arr);
        const base64String = btoa(str);
      
      
     
      
        img.onload = function () {
          context.drawImage(this, 0, 0, canvas.width, canvas.height);
        };
        img.src = 'data:image/jpg;base64,' + base64String;
      }.bind(this));
      
      
      
      
      
      //socket.disconnect();
      
              const script = document.createElement("script");
              const script2 = document.createElement("script");
              
              script.src = "http://localhost:4001/socket.io/socket.io.js";
              script2.src = "/js/script.js";
              script2.async=true;
              script.async = true;
      
              document.body.appendChild(script);
              document.body.appendChild(script2);
      
      
               


    }

    isRealUser(){

let {reconaissance} = this.state;


return <button href="#" className="btn btn-success">Passer le test</button>



    }

    tick(msg) {
      this.setState({
        reconaissance: msg
      });


    }

    isconnect() {
      if (localStorage.token !== undefined) {
        return <IsConnect disconnect={this.disconnect.bind(this)} />;
      } else {
        return <></>;
      }
    }

    handleFlipping = () => {
      this.setState({ flipped: !this.state.flipped });
    }


    reconaissance() {
    
    }
    disconnect() {
      this.props.history.push({
        pathname: "/"
      });
    }


    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }
    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/testAdmission' />
      }
    }
    
    

    render() {
    

      axios.get("http://localhost:4000/user/verificationReconaissance").then(response => {
      
        console.log(response);
        this.setState({ reconaissance: response.data });
         // bind.tick(response.data);
        
      })
      
      let { reconaissance} = this.state;
      let testexiste;
      var divStyle = {
        width: '200px',
        marginLeft:'80px',
      
     
      };
      
      let isrealuser;
      let cardexemple;
      if(reconaissance=="Reconaissance faciale effectuée avec succés !")
      {
       cardexemple = <CardExample/>;
       isrealuser= <div>{this.renderRedirect()}
       <button className="btn btn-default" style={divStyle} onClick={this.setRedirect}>Passer le test</button>
       </div>

      }
  
      
      if(reconaissance) {
          testexiste=  reconaissance
             }
             const colStyle = { maxWidth: "22rem" };
             const divcamera = {paddingLeft:"200px" ,width:"2000px"};

      return (
        <>
          <Header />
          
          <div hidden={!this.state.isConnect}>{this.isconnect()}</div>

            <div>
              
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
              <meta name="description" content />
              <meta name="author" content />
             
              {/* Bootstrap core CSS */}
              <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
              {/* Custom styles for this template */}
              <link href="css/shop-item.css" rel="stylesheet" />
              {/* Navigation */}
      
              {/* Page Content */}
              <div className="container">
              <MDBContainer>
      <MDBAlert color="warning" dismiss>
        <strong>{testexiste}</strong> 
      </MDBAlert>
    </MDBContainer>
                <div className="row">
                  <div className="col-lg-3">  
                
{cardexemple}
                     <MDBCardText>
                        {isrealuser}
          </MDBCardText>
                  </div>
                  {/* /.col-lg-3 */}
                  <div className="col-lg-9" style={divcamera}>
                    <div className="card mt-2">
                    <div className="container">
               <canvas id="canvas-video" width={640} height={480} />
             </div>
                      <div className="card-body">
                        <h3 className="card-title">Reconaissance faciale</h3>
                      

                        <p className="card-text">Afin de vous connecter vous devez reconnaitre vote visage</p>
                        <button className="btn btn-success" style={divStyle} onClick={this.commencerReconaissance}>Commencer la reconaissance</button>
   
                   
                      </div>
                    </div>
                    {/* /.card */}
                   {/* <div className="card card-outline-secondary my-4">
                      <div className="card-header">
                        Product Reviews
                      </div>
                      <div className="card-body">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                        <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                        <hr />
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                        <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                        <hr />
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                        <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                        <hr />
                     
                      </div>
      </div> */}
                    {/* /.card */}
                  </div>
                  {/* /.col-lg-9 */}
                </div>
              </div>
              {/* /.container */}
              {/* Footer */}
              <footer className="py-2 bg-dark" style={{height:20}}>
           
                {/* /.container */}
              </footer>
              {/* Bootstrap core JavaScript */}
            </div>
          );
            
        </>
      );
        }
    
}

export default facialrecogniton