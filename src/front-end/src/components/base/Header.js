import React, {Component} from 'react'
import Navbar from './Navbar'
import {Link } from 'react-router-dom'

class Header extends Component{
    constructor(props){
        super(props)
        this.state = {
            error: null, 
            isLoaded: false,     
            currentPath: "", 
        }
        this.loadedForm = null
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick = (e) => {
        this.setState({
            currentPath : e.target.href
        })
    }
    setActivePath = (activePathName, comparedPathName) => {
        if (activePathName === comparedPathName){
            return {textDecoration: "none", color: "blue"}
        }else if(activePathName !== comparedPathName){
            return {textDecoration: "none", color: "black"}
        };
    }
    render(){
        return(
            <div className="App">
                    <Link to="/home" onClick={this.handleClick}>
                        <img style={imageStyle} src="/test-static/headerimg.png" alt="Failed to load" />
                    </Link>
                    <Navbar currentPath={this.state.currentPath} handleClick={this.handleClick} setActivePath={this.setActivePath}/>           
            </div>
        )
    }
}

 const imageStyle = {
    justifyContent : "center",
    marginTop : "-50px",
    marginBottom : "-70px",
    width: "300px",
    height: "300px"
 }

export default Header