import React, { Component } from 'react'

class TimeValues extends Component {

  render () {
    if(this.props.select === this.props.index){
      console.log(this.props)
      return(
        <option selected="selected" value={this.props.value}>{this.props.value}</option>
      )
    } else {
      console.log(this.props)
      return(
        <option value={this.props.value}>{this.props.value}</option>
      )
    }

  }
}

export default TimeValues;
