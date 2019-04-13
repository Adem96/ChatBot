import React, { Component } from "react";

class SuggestionSpecialite extends Component{
    componentWillMount(){
        console.log(this.props.location.state.suggestion)
        console.log(this.props.location.state.notes)
    }
    render(){
        return(
            <>
            hello
            </>
        )
    }
}

export default SuggestionSpecialite