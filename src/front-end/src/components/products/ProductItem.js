import React, {Component} from "react"
import {
    Col
  } from 'reactstrap'

class ProductItem extends Component{
    constructor(props){
        super(props)
        this.state = {
            price : 40.00,
            image : "",
            color : "Black",
            title : "CRTee",
            id : "123AGDAS"
        }
    }
    render(){    
        return(
                <div onClick={this.props.handleSelectItem} id={this.props.productId} style={itemStyle}>
                    <img onClick={this.props.handleSelectItem} style={imgStyle} id={this.props.productId} src={this.props.imagePath} alt="Failed to load"/>
                    <h5 style={{marginBottom : "-5px"}}>{this.props.title}</h5>
                    <p style={{marginBottom : "-5px", justifyContent : "center"}}>{this.state.color}</p>
                    <p style={{paddingTop : "-100px", justifyContent : "center"}}>AU${this.props.price}</p>
                </div>
        )
    }
}
const itemStyle = {
    width : "200px",
    position : "relative"
}
const imgStyle = {
    width : "200px",
}
export default ProductItem