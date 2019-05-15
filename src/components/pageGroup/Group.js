import React, { Component } from 'react'
import UnassignedDeviceList from './UnassignedDeviceList';
import GroupList from './GroupList';
import CreateGroup from './CreateGroup';

class Group extends Component {
  render () {
    return(
      <div id="group" className="row">
        <div className="col blue-bg">
          <UnassignedDeviceList deviceArray={this.props.deviceArray} />
          <GroupList deviceArray={this.props.deviceArray} groups={this.props.groups} />
        </div>
        <CreateGroup createGroupMaster={this.props.createGroupMaster}/>
      </div>
    )
  }
}

export default Group;
