import React, { Component } from 'react';
import Base from './components/base/Base'
import './App.css';
import {BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      description: ""
    }
  }

  render(){
    // axios.get('http://127.0.0.1:8000/api/products/')
    // .then(response => this.setState({
    //   description : response.data[0].description
    // }))
    // .catch(err => console.log(err));  
    // axios.get('http://127.0.0.1:8000/api/products/')
    // .then(response => {
    //   console.log(response);
    // })
    // .catch(err => console.log(err));  
    // console.log(this.state.description)
    return (
        <Router>
          <div className="App"> 
            <Base/>      
          </div>
        </Router>
    );
  }
}

export default App;
