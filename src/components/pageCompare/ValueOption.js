import React, { Component } from 'react'
import Values from './Values';

class ValueOption extends Component {

  render () {
    if(this.props.group.assignedDevices.includes(this.props.device.attributes.meta.id)){
      return(
        <React.Fragment>
        { this.props.device.attributes.value.models.map((value) =>
        <Values value={value} key={value.id} />
        )}
      </React.Fragment>
      )
    } else {
      return(
        <div></div>
      )
    }

  }
}

export default ValueOption;
