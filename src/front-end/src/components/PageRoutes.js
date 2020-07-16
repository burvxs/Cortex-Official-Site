import React, {Component} from 'react'

import RegisterForm from "./forms/Register"
import ProductHandler from "./products/ProductHandler"

class PageRouter extends Component{  
    constructor(props){
        super(props)
        this.state = {
            isLoaded : false,
            pageView : false,
            components : null
        }
        this.loadedComponent = null
    }
    getIsRegOpen = () => {
        if (this.props.UrlMatch == "register")
            return true;
        else
            return false
    }
    loadedComponentFromUrl = () => {
        switch(this.props.UrlMatch){
            case "register":          
                this.loadedComponent = <RegisterForm isOpen={this.getIsRegOpen()}/>
                break;
            case "products":
                this.loadedComponent = <ProductHandler/>
        }
    }
    render(){
        return(
            <React.Fragment>
                {this.loadedComponentFromUrl()}
                {this.loadedComponent}
            </React.Fragment>
        )
    }
}

export default PageRouter;