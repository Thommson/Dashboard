import React, { Component } from 'react'

class DeviceOptions extends Component {

  render () {
    return(
      <option value={this.props.device.attributes.name}>{this.props.device.attributes.name}</option>
    )
  }
}

export default DeviceOptions;
