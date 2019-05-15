import React, { Component } from 'react';

class LiveDevice extends Component {
  render () {
    return(
      <div className="live-device col-6">
        <span>{this.props.value.attributes.name}</span>
        <p>{this.props.value.attributes.state.models[0].attributes.data}</p>
      </div>
    )
  }
}

export default LiveDevice;
