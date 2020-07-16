import React, {Component} from "react"
import PropTypes from 'prop-types'

import ProductItem from './ProductItem'

class ProductGrid extends Component {
    constructor(props){
        super(props)
    }
    makeGrid = () => {
        let grid = []
        if (this.props.itemsToRender() !== undefined){
            let cell = this.props.itemsToRender().map((item) =>{ 
                return (
                <ProductItem    title={item.title}
                                productId={item.product_id}
                                key={item.product_id}
                                price={item.price}
                                imagePath={item.image_path}
                                handleSelectItem={this.props.handleGridSelection}/>
                )
            })
            grid.push(cell)
        }      
        return grid
    }
    setCellHeight = () => {
        let propHeight = this.props.itemHeight.concat(" ")
        let height = propHeight.repeat(this.props.rows)
        return height
    }
    setCellWidth = () => {
        let propWidth = this.props.itemWidth.concat(" ")
        let width = propWidth.repeat(this.props.cols)
        return width
    }
    render(){
        const containerStyle = {
            display : "grid",
            zIndex : "0",
            position : "relative",
            justifyContent : "center",
            gridRows : this.props.rows,
            gridCols : this.props.cols,
            gridTemplateRows : this.setCellHeight(),
            gridTemplateColumns : this.setCellWidth(),
            columnGap : "30px",
            rowGap : "30px",    
        }
        return(
            <div onClick={this.selectItem} style={containerStyle} id="container">
              {this.makeGrid()}
            </div>
        )
    }
}

ProductGrid.propTypes = {
    rows : PropTypes.number.isRequired,
    cols : PropTypes.number.isRequired,
    itemWidth : PropTypes.string.isRequired,
    itemHeight : PropTypes.string.isRequired,
}

export default ProductGrid