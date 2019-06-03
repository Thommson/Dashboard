import React, { Component } from 'react'
import GroupRow from './GroupRow';

class GroupList extends Component {
  render () {
    if(this.props.groups !== undefined && this.props.groups.length > 0){
      return(
        <div className="group-list row">
          { this.props.groups.map((group, index) =>
            <GroupRow deleteGroup={this.props.deleteGroup} editGroup={this.props.editGroup} removeDeviceFromGroup={this.props.removeDeviceFromGroup} assignDeviceToGroupMaster={this.props.assignDeviceToGroupMaster} deviceArray={this.props.deviceArray} group={group} key={group.id} />
          )}
        </div>
      )
    } else {
      return(
        <div className="group-list row">
          <div className="col text-center margin-top-xl">
            <div className="bold-font">Create a group.</div>
          Groups are used to give a device set a meaningful location based name.<br></br>
        Example: <span className="bold-font">Living room</span>

          </div>
        </div>
      )
    }

  }
}

export default GroupList;
