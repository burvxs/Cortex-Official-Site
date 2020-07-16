import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import Modal from 'react-modal'

import BrainAnimation from '../LoadingAnimation'

import {
          Row, 
          Col,
        } from 'reactstrap'


Modal.defaultStyles.overlay.backgroundColor = "none"

class RegisterForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            values: {
                email: "",
                firstname: "",
                lastname: "",
                fullName: "",
                password : "",
                phoneNumber : "",
            },
            isSubmitting: false,
            isOpen : false,
            isPasswordValid : false,
            isEmailValid : null,
            emailExists : false,
            isError: false,
            isHover : false
        } 
        this.emailExistsText = null
        this.loadingAnim = null
        this.status = null
        this.buttonText = "Create a Cortex account"
    }
    handleFormChange = (e) =>{
        let elementName = e.target.name;
        if (elementName == "password")
            this.validatePassword(e.target.value)

        if (elementName == "email")
            this.validateEmail(e.target.value)

        let content = e.target.value;
        this.setState({
            values : {
                ...this.state.values, [elementName] : content
            }            
        });
    }
    submitRegisterData = async e =>{
        if(this.state.isEmailValid && this.state.isPasswordValid){
            this.setState({isSubmitting : true})          
            const res = await fetch("http://127.0.0.1:8000/api/accounts/", {
                method : "POST",
                body: JSON.stringify(this.state.values),
                headers : {
                    "Content-Type" : "application/json",
                    'Accept': 'application/json'
                }
            });
            this.buttonText = "Account created!"
            setTimeout(() => {
                this.setState({isSubmitting : false})
                
            }, 1500)     
            const data = await res.json();
            this.setState({emailExists : data['validity']})
            if(this.state.emailExists)
                this.emailExistsText = <p style={{fontSize : "14px", marginBottom : "-10px"}}>It looks like you already have an account. <Link to="/login">Login?</Link></p> 
            else
                this.emailExistsText = null
            !data.hasOwnProperty("error")
            ? this.setState({ message : data.success })
            : this.setState({message: data.error, isError: true}) 
            console.log(this.state.message)
            this.setState({
                values : {
                    email: "",
                    firstname: "",
                    lastname: "",
                    fullName: "",
                    password : "",
                    phoneNumber : "",
                },
            })
            setTimeout(() => {
                this.setState({isOpen : false})
            } ,1500)       
        }   
    }
    feedbackStyle = () => {
        if(this.isInvalid == true){
            return {
                display : "flex"
            }
        }
    }
    toggleHover = (e) => {
        this.setState({isHover : !this.state.hover})
        if (this.state.isHover)
            this.setState({isHover : false})
    }
    getHoverStyle = () => {
        var style
        if(this.state.isHover)
            style = "#404040"
        else
            style = "black"
        return style
    }
    componentDidMount(){
        this.setState({
            isOpen : true
        });
    }
    validatePassword = (value) => {
        //let digitReg = new RegExp("[0-9].{2}");    
        let pwReg = new RegExp("^((?=.*[0-9]{2,})(?=.*[A-Z])(?=.{8,}))")
        let isConfirmed = false      
        if (value === "" || value === null || value === undefined){
            this.setState({
                isPasswordValid : false,
            })
        }else{
            isConfirmed = true
        }
        if (isConfirmed){
            if (!pwReg.test([value])){
                this.setState({
                    isPasswordValid : false,
                })
            }else{
                this.setState({
                    isPasswordValid : true,
                })
            }
        }  
        if (value !== null) {
            let pw = [value.toString()]    
            if (pw[0].lastIndexOf('"') > 0){
                this.setState({
                    isPassword : false
                })
            }
        }
    }
    getPasswordStyle = () => {
        if(this.state.values.password !== ""){
            if (!this.state.isPasswordValid)
                return "#f70d1a"
            else
                return "black"
        }
    }
    setLoading = () => {
         if(this.state.isSubmitting)
            this.loadingAnim = <BrainAnimation MarginLeft="86.5%" MarginTop="-7%"/>
         else if (!this.state.isSubmitting)
            this.loadingAnim =  null
    }
    validateEmail = (value) => {     
        let email = [value.toString()]
        if (email[0] === "")
            this.setState({isEmailValid : false})
        if (email[0].lastIndexOf('@') > 0 && email[0].lastIndexOf('.') > 0){
            this.setState({
            isEmailValid : true,
            })
        }
        else{
            this.setState({
                isEmailValid : false,
            })
        }
        if (email[0].lastIndexOf('"') > 0){
            this.setState({
                isEmailValid : false
            })
        }
    }
    getEmailStyle = () => {
        if(this.state.values.email !== ""){
            if(!this.state.isEmailValid)
                return "#f70d1a"
            else
                return "black"
        }
    }
    render(){
        const buttonStyle = {
            outline : "none",
            width: "90%",
            height : "39px",
            marginLeft : "18px",
            borderRadius : "10px",
            borderColor : "	#FFFFFF",
            borderWidth : "2px",
            backgroundColor : this.getHoverStyle(),
            color : "white",
            transition: "all ease .5s",
        }
        const passwordStyle = {
            borderWidth : "1px",
            borderRadius : "3px",
            borderColor : this.getPasswordStyle(),
            outlineColor : this.getPasswordStyle(),
            width : "100%"
        }
        const emailStyle = {
            borderWidth : "1px",
            borderRadius : "3px",
            borderColor : this.getEmailStyle(),
            outlineColor : this.getEmailStyle(),
            width : "100%"
        }
        const nameStyle = {
            display : "flex",
            borderWidth : "1px",
            borderRadius : "3px",
            borderColor : "black",
            width : "100%"
        }
        return(    
            <div style={{display : "flex"}}>          
                <Modal isOpen={this.state.isOpen} ariaHideApp={false} style={modalStyle} width="10">
                    <h2>Sign Up</h2> 
                    <hr/>
                    <Row style={{paddingTop : "10px"}}>             
                        <Col>
                            <label style={nameStyle}>First Name</label>
                            <input style={{width: "100%", paddingRight : "5px" }} type="text" name="firstname" placeholder="Enter your first name"/>
                        </Col>
                        <Col style={{paddingLeft : "5px"}}>
                            <label style={nameStyle}>Last Name</label>
                            <input style={{width: "100%" }} type="text" name="lastname" placeholder="Enter your last name"/>
                        </Col>
                    </Row>
                    <Row style={{paddingTop : "10px"}}>
                        <Col>
                            <label style={{display : "flex"}}>Email<span style={{color : this.getEmailStyle()}}>*</span></label>
                            <input style={emailStyle} type="text" name="email"  onChange={this.handleFormChange}  placeholder="Enter your email"/>
                            <label style={{display : "flex", paddingTop : "10px"}}>Password<span style={{color : this.getPasswordStyle()}}>*</span></label>
                            <input style={passwordStyle} type="password" name="password" onChange={this.handleFormChange} placeholder="Enter your password"/>
                            {this.emailExistsText}
                            <label style={{ paddingLeft : "20px", paddingTop : "10px", color: "#808080", fontSize : "15px"}}>Protect your data!</label>                           
                            <ul style={{marginTop : "-10px", fontSize : "15px", color: "#808080"}}>
                                <li>Try to include one symbol in your password. !@#$</li>
                                <li>Password must contain 2 numbers.</li>
                                <li>Password must contain 1 uppercase letter.</li>
                                <li>Password must contain at least 8 digits.</li>
                            </ul>
                            <button className="registerSubmit"
                             onMouseEnter={this.toggleHover} 
                             onMouseLeave={this.toggleHover}
                             style={buttonStyle} 
                             type="submit"
                             onClick={this.submitRegisterData}>
                                {this.buttonText}
                            </button>
                            {this.setLoading()}
                            {this.loadingAnim}
                            <Route path="?next=/account"/>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}
const modalStyle = {
    content : {
        margin : "auto",
        width : "55vh",
        height : "53vh",
        position : "absolute",
        borderRadius : "10px",
        overflow : "none",
        boxShadow : "0px 0px 20px"
      }
}
export default RegisterForm