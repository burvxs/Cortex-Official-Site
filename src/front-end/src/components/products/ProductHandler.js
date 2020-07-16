import React, {Component} from "react"

import ProductGrid from './ProductGrid'
import RenderFilter from "./RenderFilter"

class ProductHandler extends Component{
    constructor(props){
        super(props)
        this.state = {
            productCount : 0,
            selectedItem : "",
            productItemObjects : [],
            filteredItemObjects : [],
            isFiltering : false,
            isCleared : false,
        }
        this.COLUMN_COUNT = 4
        this.rowCount = Math.ceil(this.state.productCount / this.COLUMN_COUNT)
    }
    passFilterValue = () =>{
        this.setState({
            isFiltering : !this.state.isFiltering
        })
        console.log(this.state.isFiltering)
        return this.state.isFiltering
    }
    async componentDidMount() {
        const res = await fetch("http://127.0.0.1:8000/api/products/", {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                    'Accept': 'application/json'
                }
            })
        const data = await res.json()
        if (!this.state.isFiltering){
            this.setState({
                productCount : data["product_count"],
                productItemObjects : await data["products"]
            })    
        }

    }

    handleSelectedItem = (itemSelected) => {
        this.setState({
            selectedIndex : itemSelected
        })
    }
    handleFilter = (newData) => {
        if (newData != null || undefined){
            this.setState({
                isFiltering : true,
                filterItemObjects : newData
            })
        }
    }
    handleDataChange = () => {
        if (this.state.isFiltering){
            return this.state.filterItemObjects
        }
        else
            return this.state.productItemObjects
    }
    selectItem = (e) => {
        this.handleSelectedItem(e.target.id) 
        console.log(e.target.id)
    }
    render(){
        return(
            <div className="productWrapper" style={{position : "relative"}}> 
                <RenderFilter   itemsToFilter={this.handleDataChange}
                                readObjects={this.state.productItemObjects}
                                isFiltering={this.passFilterValue} 
                                onFilter={this.handleFilter}/>           
                <div className="gridContainer">
                <ProductGrid    rows={this.rowCount}
                                cols={this.COLUMN_COUNT}
                                itemWidth="200px" 
                                itemHeight="310px" 
                                itemsToRender={this.handleDataChange}
                                handleGridSelection={this.selectItem}
                                />
                </div>
            </div>
        )
    }
}
export default ProductHandler