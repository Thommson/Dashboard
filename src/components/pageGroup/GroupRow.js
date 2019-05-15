import React, { Component } from 'react'
import Device from './Device';

class GroupRow extends Component {
  render () {
    if(this.props.deviceArray !== undefined){
      return(
        <div className="group-row row">
          <div className="group-tab-color"></div>
          <div className="container">
            <h2 className="font-3">{this.props.group.name}</h2>
            <Device />
            <Device />
          </div>
        </div>
      )
    } else {
      return(
        <div className="group-row row">
          <div className="group-tab-color"></div>
          <div className="container">
            <h2 className="font-3">{this.props.group.name}</h2>

          </div>
        </div>
      )
    }

  }
}

export default GroupRow;
