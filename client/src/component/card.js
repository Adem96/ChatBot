import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer } from "mdbreact";

const PanelPage = props => {

  var div1style = {


    paddingLeft:"300px",
 }

return (
<MDBContainer>
  <MDBCard style={{ width: "22rem", marginTop: "1rem" , marginLeft:"400px"}}>
    <MDBCardHeader color="primary-color" tag="h3">
      Votre Test
    </MDBCardHeader>
    <MDBCardBody>
      <MDBCardTitle>Vous êtes inscris à un test</MDBCardTitle>
      <MDBCardText>
      Vous pouvez désormais passer le test écrit en ligne ! 
      </MDBCardText>
    
    </MDBCardBody>
  </MDBCard>
</MDBContainer>
);
};

export default PanelPage;