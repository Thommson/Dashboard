import React, { Component } from 'react'
import UnassignedDeviceList from './UnassignedDeviceList';
import GroupList from './GroupList';
import CreateGroup from './CreateGroup';

class Group extends Component {
  render () {
    return(
      <div id="group" className="row">
        <div className="col blue-bg height-323">
          <UnassignedDeviceList removeDeviceFromUnassigned={this.props.removeDeviceFromUnassigned} group="unassigned" unassignedDevices={this.props.unassignedDevices} groups={this.props.groups} deviceArray={this.props.deviceArray} />
        </div>
        <GroupList removeDeviceFromGroup={this.props.removeDeviceFromGroup} assignDeviceToGroupMaster={this.props.assignDeviceToGroupMaster} deviceArray={this.props.deviceArray} groups={this.props.groups} />
        <CreateGroup createGroupMaster={this.props.createGroupMaster}/>
      </div>
    )
  }
}

export default Group;
