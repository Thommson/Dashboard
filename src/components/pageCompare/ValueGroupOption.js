import React, { Component } from 'react';
import ValueOption from './ValueOption';

class ValueGroupOption extends Component {

  render () {
    return(
      <optgroup className="color-black" label={this.props.group.name}>
        { this.props.deviceArray.models.map((device, index) =>
        <ValueOption group={this.props.group} device={device} key={"value-option-" + index} />
        )}
      </optgroup>
    )
  }
}

export default ValueGroupOption;
