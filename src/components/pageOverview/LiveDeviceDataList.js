import React, { Component } from 'react'
import LiveDevice from './LiveDevice';

class LiveDeviceDataList extends Component {
  render () {
    if(this.props.deviceArray !== undefined){
      return(
        <div id="live-device-data-list" className="row">
          { this.props.deviceArray.find({name: this.props.selectedDevice}).attributes.value.models.map((value) =>
            <LiveDevice value={value} key={value.id} />
          )}
        </div>
      )
    } else {
      return(
        <div id="live-device-data-list" className="row">
          <p className="no-device-message">There are no devices connected...</p>
        </div>
      )
    }

  }
}

export default LiveDeviceDataList;
