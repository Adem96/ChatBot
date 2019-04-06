import React, { Component } from "react";

class Profile extends Component {
    componentWillMount(){
       console.log(localStorage.Session)
    }
    render() {
        return(
            <div>profile</div>
        )
    }
}

export default Profile