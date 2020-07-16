import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import "../../checkbox.scss"

class RenderFilter  extends Component {
    constructor (props) {
        super(props)
        this.state ={ 
            symbol : "+",
            isOpen : false,
            isError : false
        }
        this.PRICE_THRESHOLDS = [0, 50, 100, 200, 300, 400, 500, 700, 900, 1000]
        this.productLimit = 0;
        this.handlePriceFilter = this.checkPriceItem.bind(this)
        console.log(this.state.isItemChecked)
        
    }
    componentDidMount = () =>{
        this.setState({
            isItemChecked : []
        })
    }
    handleSymbolChange = (e) => {
        e.preventDefault()     
        this.setState({
            symbol : !this.state.isOpen ? "-" : "+",
            isOpen : !this.state.isOpen
        })   
    }
    displayCheckboxText = (startPrice, endPrice) => {
        return "$" + startPrice + " - " + "$" + endPrice
    }
    getPriceDifferences = () => {
        var diff = []
        for (var i = 0; i < this.props.readObjects.length; i++){  
            if(this.props.readObjects()[i] !== undefined || null){
                if (this.props.readObjects()[i + 1] !== undefined){
                    diff.push(Math.abs(this.props.readObjects[i].price - this.props.readObjects[i + 1].price))               
                }else{
                    break;    
                }                                    
            }
        }
        diff.sort((a, b) => a - b)
        return diff;
    }
    set priceCount(value){
        this.priceCheckboxCount = value
    }
    checkPriceItem = async e => {
        e.preventDefault()
        let idString = e.target.id
        let cbIndex = idString.substr(idString.length - 1)
        cbIndex = parseInt(cbIndex)
        this.state.isItemChecked[cbIndex] = e.target.checked  
     
        if (this.state.isItemChecked[cbIndex]){                
            const passedData = {
                minRange : this.priceFilterStart[cbIndex],
                maxRange : this.priceFilterEnd[cbIndex]
            }
            const res = await fetch("http://127.0.0.1:8000/api/products/?price__range=" + passedData.minRange + "," + passedData.maxRange, {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                    'Accept': 'application/json'
                }                  
            })
            const data = await res.json()
            !data.hasOwnProperty("error") 
            ? this.setState({message : data.success})
            : this.setState({message : data.error, isError : true})          
            if(!this.state.isError)
                this.props.onFilter(data["products"])
            for (let i = 0; i < this.state.isItemChecked.length; i++){
                    this.state.isItemChecked[i] = false
            } 
        }
    }
    renderCheckboxPrice = () => {
        let checkboxes = [] 
        for(let i = 0; i < this.PRICE_THRESHOLDS.length; i++){ 
            if(this.checkProductBetweenValues(this.PRICE_THRESHOLDS[i], this.PRICE_THRESHOLDS[i + 1])){ 
                checkboxes.push(    
                    <React.Fragment>    
                            <input 
                            className="filter-checkbox"
                            id={"filter-checkbox-" + i}
                            type="checkbox"
                            checked={this.state.isItemChecked[i] || false}
                            onChange={this.handlePriceFilter}
                            /><label htmlFor={"filter-checkbox-" + i} >
                                {this.displayCheckboxText(this.PRICE_THRESHOLDS[i], this.PRICE_THRESHOLDS[i + 1])}
                            </label>
                    </React.Fragment> 
                )
                this.priceFilterStart.push(this.PRICE_THRESHOLDS[i])
                this.priceFilterEnd.push(this.PRICE_THRESHOLDS[i + 1])
            }else
                break;          
        }
        this.priceCount = checkboxes.length
        return checkboxes;
    }
    checkProductBetweenValues = (startValue, endValue) => {
        let productExists = false;
        const fullProductArray = this.props.readObjects
        for (let i = 0; i < fullProductArray.length; i++){
            if (fullProductArray[i] !== undefined){
                if ( fullProductArray[i].price > startValue && fullProductArray[i].price < endValue){
                    this.productLimit++ 
                    if (this.productLimit > 0)
                        productExists = this.props.readObjects.includes(fullProductArray[i])                
                }
            }
        }
        this.productLimit = 0;
        return productExists
    }
    filterForm = () => {
        if (this.state.isOpen){
            return (
                <div className="filter-wrapper" style={filterWrapperStyle}>
                    <div  className="price-filter-wrapper" style={{gridArea : "1 / col3Start", paddingRight : "15vh"}}>                   
                       <ul style={{listStyle : "none"}}>
                        <li>
                            <h3 style={{ textAlign : "left", fontSize : "17px"}}>Price</h3>  
                        </li>     
                        {this.renderCheckboxPrice().map((item, i) => (
                            <li style={{textAlign : "left"}} key={i}>{item}</li>
                        ))}                      
                       </ul>
                    </div>
                </div>
            )
        }
        else
            return null
    }
    render () {
        return (
            <div style={{textAlign : "right", position : "relative", zIndex : "10", justifyContent : "right", background : "white"}} className="filter-wrapper">
                <span style={{cursor : "pointer"}} onClick={this.handleSymbolChange}>{this.state.symbol}Filter</span>
                {this.filterForm()}
            </div>
        )
    }
}

const filterWrapperStyle = {
    display : "grid", 
    columns : "4",
    gridTemplateColumns: "repeat(4, 1fr)", 
    columnGap : "40px",
    rowGap : "40px",
    gridTemplateRows : "1",
    width : "100%",
    justifyItems : "end", 
    position : "absolute", 
    zIndex : "2", 
    background : "white"
}


export default RenderFilter
