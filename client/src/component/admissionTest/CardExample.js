import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import jwt_decode from "jwt-decode";
import Header from "../header";
import IsConnect from "../isConnect";


class CardExample extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
        name : "",
        prenom:"",
        classe:"",

        }


    }
    
componentWillMount() {    
    
    if(localStorage.getItem("token") !== null){
     this.setState({
         name:jwt_decode(localStorage.token).user.nom,
         prenom:jwt_decode(localStorage.token).user.prenom,
         classe:jwt_decode(localStorage.token).user.classe
     })
     
  }}
disconnect() {


  this.props.history.push({
    pathname: "/"
  });
}

render(){

    let {name,prenom,classe} = this.state;
    
  return (
    <>

    <MDBCol>
    <h1 className="my-2">Profile</h1>
      <MDBCard style={{ width: "22rem" }}>
        <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
        <MDBCardBody>
          <MDBCardTitle> {name}
                   {prenom} </MDBCardTitle>
          <MDBCardText>
      Class: {classe}
          </MDBCardText>
    
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    </>
  )
}


}

export default CardExample;