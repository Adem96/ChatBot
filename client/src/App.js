import React, { Component } from "react";
import Body from "./component/body";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Specialites from "./component/specialites";
import TousLesSpecialites from "./component/TousLesSpecialites";
import DetailsSpecialite from "./component/detailsSpecialite";
import SuggestionSpecialite from "./component/suggestionSpecialite"
import Footer from "./component/footer";
import Profile from "./component/profile";
import ProfileAdmin from "./component/profileAdmin";
import Scolarite from "./component/scolarite";
import FoyerForm from "./component/FoyerForm";
import Entraid from "./component/entraid"
import Admission from "./component/admission"
import TestAdmission from './component/admissionTest/Main'
import facialrecognition from './component/admissionTest/facialrecognition'
import chat from './component/chat'
import chatbot from "./component/chatbot"
import voiceRecognitions from "./component/speechRecognition"
import CalendarEtudiant from "./component/CalendarEtudiant"
import ListReclamation from "./component/ListReclamation";
import QuizPreferences from "./component/quizPreferences"
import ResultatPreferences from "./component/resultatPreferences"
import Admin from "./component/admin"
import AdminReclamation from "./component/AdminReclamation";
import CanvasNotes from "./component/CanvasNotes";

class App extends Component {

  componentWillMount(){
    //localStorage.removeItem("token")
    // var socket = socketIOClient("http://127.0.0.1:4000");
    // socket.on("notification" , data => {
    //   console.log(data)
    // })
  }
 
 
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
              <Route path="/" component={Body} exact />
              <Route path="/Specialites" component={Specialites} exact />
              <Route path="/Scolarite" component={Scolarite} exact />
              <Route path="/TousSpecialites" component={TousLesSpecialites} exact />
              <Route path="/CalendarEtudiant" component={CalendarEtudiant} exact />
              <Route path="/FoyerForm" component={FoyerForm} exact />
              <Route path="/DetailsSpecialite" component={DetailsSpecialite} exact />
              <Route path="/suggestion" component={SuggestionSpecialite} exact />
              <Route path="/Profile" component={Profile} exact />
              <Route path="/Entraid" component={Entraid} exact />
              <Route path="/Admission" component={Admission} exact />
              <Route path="/TestAdmission" component={TestAdmission} exact />
            <Route path="/Reconaissance" component={facialrecognition} exact />
            <Route path="/chat" component={chat} exact />
            <Route path="/AideAdmission" component={chatbot} exact />
            <Route path="/voiceRecognition" component={voiceRecognitions} exact />
              <Route path="/ListReclamation" component={ListReclamation} exact />
              <Route path="/QuizPreferences" component={QuizPreferences} exact />
              <Route path="/ResultatPreferences" component={ResultatPreferences} exact />
              <Route path="/Admin/affectation" component={Admin} exact />
              <Route path="/Admin/profile" component={ProfileAdmin} exact />
              <Route path="/admin/reclamation" component={AdminReclamation} exact />
              <Route path="/CanvasNotes" component={CanvasNotes} exact />



          </Switch>
          <Footer />
        </BrowserRouter>
          
      </div>
    );
  }
}

export default App;
