import React, { Component } from 'react';
import Device from './Device';
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
    let groupId = props.group.id
    let deviceId = monitor.getItem().meta.id

    props.assignDeviceToGroupMaster(groupId, deviceId);
    props.removeDeviceFromGroup(deviceId, groupId);
  }
}
class GroupRow extends Component {

  deleteItem = (id, group) => {
    //DELETING AND ADDING FUNCTIONALITY HERE !!!
    /*
    console.log("GROUP ROW IS SAVING");
    let groupCopy = Object.assign({}, this.props.group);
    groupCopy.assignedDevices.push(id);
    console.log(groupCopy);
    */
    //console.log(this.props.group)
      //this.props.removeDeviceFromGroup(id, this.props.group);


  }


  render () {

    if(this.props.deviceArray !== undefined){
      const { connectDropTarget, hovered, device } = this.props;
      const backgroundHover = hovered ? this.props.group.color : this.props.group.color;
      const opacityHover = hovered ? '1' : '0.5';

      return connectDropTarget(
        <div className="group-row row height-323" >
          <div className="group-tab-color" style={{opacity: opacityHover, background: backgroundHover}}></div>
          <div className="group-row-10" style={{background: backgroundHover}}>
          </div>
            <div className="container" >
              <h2 className="font-3">{this.props.group.name}</h2>
                { this.props.deviceArray.models.map((device) =>
                  <Device group={this.props.group} assignedDevices={this.props.group.assignedDevices} deviceArray={this.props.deviceArray} handleDrop={(id, group) => this.deleteItem(id, group)} device={device} key={device.id} />
                )}
            </div>

        </div>
      )
    } else {
      return(
        <div className="group-row row height-323">
          <div className="group-tab-color"></div>
          <div className="container">
            <h2 className="font-3">{this.props.group.name}</h2>

          </div>
        </div>
      )
    }

  }
}

export default DropTarget("device", targetSource, collect)(GroupRow)
