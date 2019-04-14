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
import Entraid from "./component/entraid"
import Admission from "./component/admission"
class App extends Component {

  componentWillMount(){
    //localStorage.removeItem("token")

  }
 
 
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
              <Route path="/" component={Body} exact />
              <Route path="/Specialites" component={Specialites} exact />
              <Route path="/TousSpecialites" component={TousLesSpecialites} exact />
              <Route path="/DetailsSpecialite" component={DetailsSpecialite} exact />
              <Route path="/suggestion" component={SuggestionSpecialite} exact />
              <Route path="/Profile" component={Profile} exact />
              <Route path="/Entraid" component={Entraid} exact />
              <Route path="/Admission" component={Admission} exact />
          </Switch>
          <Footer />
        </BrowserRouter>
          
      </div>
    );
  }
}

export default App;
