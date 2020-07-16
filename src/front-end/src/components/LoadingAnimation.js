import React, {Component} from 'react'
import "../animation.css"
import PropTypes from 'prop-types'

class BrainAnimation extends Component{
    render(){
    return(
        <div style={{marginLeft : this.props.MarginLeft, marginTop : this.props.MarginTop}}>
            <div className="brain-wrapper">
                <img id="brain-icon" src="brain-icon.png" alt="Failed to load"/>
            </div>
            <div className="spark-wrapper">
                <img  id="spark-icon-1" src="spark.png"  alt="Failed to load"/>
                <img  id="spark-icon-2" src="spark.png"  alt="Failed to load"/>
                <img  id="spark-icon-3" src="spark.png"  alt="Failed to load"/>
                <img  id="spark-icon-4" src="spark.png"  alt="Failed to load"/>
                <img  id="spark-icon-5" src="spark.png"  alt="Failed to load"/>
                <img  id="spark-icon-6" src="spark.png"  alt="Failed to load"/>
            </div> 
        </div>
        )
    }
    
}

BrainAnimation.propTypes = {
    MarginLeft : PropTypes.string.isRequired,
    MarginTop : PropTypes.string.isRequired
}


export default BrainAnimation