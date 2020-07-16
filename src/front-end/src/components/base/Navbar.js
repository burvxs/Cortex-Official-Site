import React, {Component} from 'react'
import {Link } from 'react-router-dom'

class Navbar extends Component{
    state = {
        isLoggedIn: false,
    }
    onActive = () => {
        return this.props.setActivePath("http://localhost:3000/register", this.props.currentPath);
    }

    render(){
        return(
            <div style={{background : "#FFFFFF"}}>
                <hr/>
                    <h2 style={navTextStyling}>
                        <Link style={this.onActive()} onClick={this.props.handleClick} to="/news">{' '}
                            {' '}News
                        </Link>
                        <Link style={this.onActive()} onClick={this.props.handleClick} to="/products">
                            {' '}Products
                        </Link>
                        <Link style={this.onActive()} onClick={this.props.handleClick} to='/login'>
                            {' '}Login
                        </Link> 
                        <Link style={this.onActive()} onClick={this.props.handleClick} to="/register">
                            {' '}Register
                        </Link>
                    </h2>              
                <hr/>   
            </div>                    
        )
    }
}

const navTextStyling = {
    wordSpacing: "100px",
    fontSize: "12px"
}

export default Navbar;