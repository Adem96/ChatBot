import React, { Component } from "react";
import Header from "../component/header";
import IsConnect from "../component/isConnect";
import "./CSS//profile.css";
class Profile extends Component {
  componentWillMount() {}
  disconnect() {
    this.props.history.push({
      pathname: "/"
    });
  }
  render() {
    return (
      <>
        <Header />
        <IsConnect disconnect={this.disconnect.bind(this)} />
    
        <div className="profile">
          <div className="tabInfo">
            <table className="table table-condensed">
              <thead>
                <tr>
                  <th>DESIGNATION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>july@example.com</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="tabNotes">
            <h2>Notes des modules</h2>
            <table class="table table-condensed">
              <thead>
                <tr>
                  <th>DESIGNATION</th>
                  <th>COEF</th>
                  <th>NOTE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John</td>
                  <td>Doe</td>
                  <td>john@example.com</td>
                </tr>
                <tr>
                  <td>Mary</td>
                  <td>Moe</td>
                  <td>mary@example.com</td>
                </tr>
                <tr>
                  <td>July</td>
                  <td>Dooley</td>
                  <td>july@example.com</td>
                </tr>
                <tr>
                  <td>July</td>
                  <td>Dooley</td>
                  <td>july@example.com</td>
                </tr>
                <tr>
                  <td>July</td>
                  <td>Dooley</td>
                  <td>july@example.com</td>
                </tr>
                <tr>
                  <td>July</td>
                  <td>Dooley</td>
                  <td>july@example.com</td>
                </tr>
                <tr>
                  <td>July</td>
                  <td>Dooley</td>
                  <td>july@example.com</td>
                </tr>
                <tr>
                  <td>July</td>
                  <td>Dooley</td>
                  <td>july@example.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
