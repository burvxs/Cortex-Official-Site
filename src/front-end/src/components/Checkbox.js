import React, {Component} from 'react'

import '../checkbox.css'

class Checkbox extends Component {
    render(){
        console.log(this.props.isChecked)
        return (
            <span  onChange={this.props.toggleCheckbox} >
                <input type="checkbox" checked={this.props.isChecked} onChange={this.props.toggleCheck}></input>
                <span></span>
            </span>
        )
    }
}

export default Checkbox