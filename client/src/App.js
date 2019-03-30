import React, { Component } from "react";
import Header from "./component/header";
import Body from "./component/body";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Specialites from './component/specialites'
import TousLesSpecialites from './component/TousLesSpecialites'
import DetailsSpecialite from './component/detailsSpecialite'


class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <Header />
          <Switch>
            <Route path="/" component={Body} exact />
            <Route path="/Specialites" component={Specialites} exact />
            <Route path="/TousSpecialites" component={TousLesSpecialites} exact />
            <Route path="/DetailsSpecialite" component={DetailsSpecialite} exact />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
