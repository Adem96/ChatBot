import React , { Component } from "react"

class DetailsSpecialite extends Component{

    componentDidMount(){
        console.log(this.props.location.state.specialite)

    }
    render() {
        return(
            <div>Details</div>
        )
    }
}
export default DetailsSpecialite