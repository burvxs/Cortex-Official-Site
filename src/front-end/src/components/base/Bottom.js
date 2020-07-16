import React, {Component} from 'react'

class Bottom extends Component{
    render(){
        return(
            <div style={footerStyling} className="main-footer">
                <div className="bottomContainer">
                    <h1>Support | Policies | Cookies | <img src="/test-static/stripe.png" alt="Failed to load"/></h1>
                </div>
            </div>
        )
    }
}

const footerStyling = {
    backgroundColor : "#D3D3D3",
    bottom: "0%"
}


export default Bottom;