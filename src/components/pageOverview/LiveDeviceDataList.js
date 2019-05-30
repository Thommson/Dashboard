import React, { Component } from 'react'
import LiveDevice from './LiveDevice';

class LiveDeviceDataList extends Component {
  render () {
    if(this.props.deviceArray !== undefined){
      return(
        <div id="live-device-data-list" className="row">
          { this.props.deviceArray.find({name: this.props.selectedDevice}).attributes.value.models.map((value) => {

            let dataTypesCopy = Object.assign([],this.props.dataTypes);
            let dataType = dataTypesCopy.filter( dataType => dataType.name === value.attributes.name);

            if(dataType[0] !== undefined){
              return <LiveDevice add={dataType[0].add} value={value} key={value.id} />
            } else {
              return <LiveDevice add={''} value={value} key={value.id} />
              }
            }
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
