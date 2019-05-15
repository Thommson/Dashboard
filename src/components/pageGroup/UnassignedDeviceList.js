import React, { Component } from 'react'
import Device from "./Device";
import DeviceTest from "./DeviceTest";

class UnassignedDeviceList extends Component {
  render () {
    if(this.props.deviceArray !== undefined){
      return(
        <div id="unassigned-device-list" className="row">
          <div className="col">
            <div className="container">
              <h1 className="row font-3">Unassigned Devices</h1>
            </div>
            <div className="container">
              <div className="unassigned-device-list-row">
                { this.props.deviceArray.models.map((device) =>
                  <Device device={device} key={device.id} />
                )}

              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div id="unassigned-device-list" className="row">
          <div className="col">
            <div className="container">
              <h1 className="row font-3">Unassigned Devices</h1>
            </div>
            <div className="container">
              <div className="unassigned-device-list-row">
                <DeviceTest />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default UnassignedDeviceList;
