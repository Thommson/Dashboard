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
  constructor(props){
    super(props)
    this.state = {
      editOpen: false
    }
  }
  deleteItem = (id, group) => {

  }
  deleteGr = () => {
    this.props.deleteGroup(this.props.group);
  }
  openEdit = () => {
    if(this.state.editOpen === false){
      this.setState({editOpen: true});
      document.getElementById("non-edit-" + this.props.group.id).classList.add("dis-off");
      document.getElementById("edit-" + this.props.group.id).classList.remove("dis-off");
    } else {
      this.setState({editOpen: false});
      document.getElementById("non-edit-" + this.props.group.id).classList.remove("dis-off");
      document.getElementById("edit-" + this.props.group.id).classList.add("dis-off");
    }
  }
  editGr = () => {
    this.props.editGroup(this.props.group, document.getElementById("edit-input-" + this.props.group.id).value);
    this.openEdit();
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
          <div className="col">
            <div className="container">
              <div className="group-util-row">
                <h2 id={"non-edit-" + this.props.group.id} className="font-3 group-util-item">{this.props.group.name}</h2>
                <div className="dis-off group-util-item" id={"edit-" + this.props.group.id}>
                  <input id={"edit-input-" + this.props.group.id} className="font-3 group-util-item" placeholder={this.props.group.name}></input>
                  <button className="group-util-item" onClick={this.editGr}>Save</button>
                </div>
                <button onClick={this.deleteGr} className="group-util-item delete-btn  row-button">Delete</button>
                <button onClick={this.openEdit} className="group-util-item edit-btn row-button">Edit</button>
            </div>

              <div className="group-row-invis">
                { this.props.deviceArray.models.map((device) =>
                  <Device group={this.props.group} assignedDevices={this.props.group.assignedDevices} deviceArray={this.props.deviceArray} handleDrop={(id, group) => this.deleteItem(id, group)} device={device} key={device.id} />
                )}
              </div>
            </div>
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
