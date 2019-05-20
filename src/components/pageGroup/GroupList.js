import React, { Component } from 'react'
import GroupRow from './GroupRow';

class GroupList extends Component {
  render () {
    if(this.props.groups !== undefined && this.props.groups.length > 0){
      return(
        <div className="group-list row">
          { this.props.groups.map((group, index) =>
            <GroupRow removeDeviceFromGroup={this.props.removeDeviceFromGroup} assignDeviceToGroupMaster={this.props.assignDeviceToGroupMaster} deviceArray={this.props.deviceArray} group={group} key={group.id} />
          )}
        </div>
      )
    } else {
      return(
        <div className="group-list row">
          Sorry... No Groups...
        </div>
      )
    }

  }
}

export default GroupList;
