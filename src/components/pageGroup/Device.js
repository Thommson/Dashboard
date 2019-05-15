import React, { Component } from 'react'

class Device extends Component {
  render () {
    return(
      <div className="device card">
        <h3>{this.props.device.attributes.name}</h3>
      </div>
    )
  }
}

export default Device;
