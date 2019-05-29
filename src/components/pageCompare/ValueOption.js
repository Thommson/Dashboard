import React, { Component } from 'react'
import Values from './Values';

class ValueOption extends Component {

  render () {
    if(this.props.group.assignedDevices.includes(this.props.device.attributes.meta.id)){
      return(
        <React.Fragment>
        { this.props.device.attributes.value.models.map((value, index) => {
          if(value.attributes.name !== 'city' && value.attributes.name !== 'country code' && value.attributes.name !== 'wind direction' && value.attributes.name !== 'sunrise' && value.attributes.name !== 'sunset' && value.attributes.name !== 'last updated' && value.attributes.name !== 'scd30 humidity' && value.attributes.name !== 'scd30 Temp'){
            return  <Values group={this.props.group} devicename={this.props.device.attributes.name} value={value} key={'value-'+index} />
          } else {
            return null
          }
        }
        )}
      </React.Fragment>
      )
    } else {
      return null
    }

  }
}

export default ValueOption;
