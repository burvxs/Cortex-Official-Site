import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import PageRouter from '../PageRoutes'
import Header from "./Header"
import Bottom from "./Bottom"

const ComponentLoader = ({match}) => (
    <PageRouter UrlMatch={match.params.id}/>
)

class Base extends Component {
  constructor(props){
    super(props)
    this.state = {
      description: "",
      loadedComponent: null
    }
  }

  render(){
    return (
        <div className="Base">    
            <div style={pageStyle}>
                <div style={contentStyle} className="baseContainer"> 
                    <Header/> 
                    <Route path="/:id" component={ComponentLoader}/>                      
                </div>
                <Bottom/>    
            </div>       
        </div>
    );
  }
}

const pageStyle = {
  margin: "0",
  display: "flex",
  justifyContent: "space-between",
  padding: "0%",
  float: "bottom",
  flexDirection: "column",
  minHeight: "100vh",
  textAlign: "center",
}
const contentStyle = {
  flex : "1 1 100%",
  background: "#fdfcfa"
}

export default Base;
