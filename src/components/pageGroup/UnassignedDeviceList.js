import React, { Component } from 'react'
import Device from "./Device";
import DeviceTest from "./DeviceTest";
import { DropTarget } from 'react-dnd';

function collect(connect, monitor){
  return{
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    device: monitor.getItem()
  }
}

const targetSource = {
  drop(props, monitor, component){

    console.log(monitor.getItem());
    let deviceId = monitor.getItem().meta.id
    console.log(props);
    console.log(deviceId)
    props.removeDeviceFromUnassigned(deviceId, props.group);
  }
}
class UnassignedDeviceList extends Component {

  deleteItem = (id, group) => {
    //DELETING AND ADDING FUNCTIONALITY HERE !!!
    /*
    let groupCopy = Object.assign({}, this.props.group);
    groupCopy.assignedDevices.push(id);
    console.log(groupCopy);
    console.log(groupCopy);
    */
    //console.log(group);

    //this.props.removeDeviceFromUnassigned(id, group);
  }


  render () {
    if(this.props.deviceArray !== undefined){
        const { connectDropTarget, hovered, device } = this.props;
      return connectDropTarget(
        <div id="unassigned-device-list" className="row height-323">
          <div className="col">
            <div className="container">
              <h1 className="row font-3">Unassigned Devices</h1>
            </div>
            <div className="container">
              <div className="unassigned-device-list-row">
                { this.props.deviceArray.models.map((device) =>
                  <Device assignedDevices={this.props.unassignedDevices} group="unassigned" device={device} handleDrop={(id, group) => this.deleteItem(id, group)} key={device.id} />
                )}

              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div id="unassigned-device-list" className="row height-323">
          <div className="col ">
            <div className="container ">
              <h1 className="row font-3">Unassigned Devices</h1>
            </div>
            <div className="container">
              <div className="unassigned-device-list-row ">

              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
export default DropTarget("device", targetSource, collect)(UnassignedDeviceList)
