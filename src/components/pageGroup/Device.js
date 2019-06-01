import React, { Component } from 'react'
import { DragSource } from 'react-dnd'

const deviceSource = {
  beginDrag(props){
    console.log(props.device);
    console.log("Begin Drag")
    return props.device.attributes;
  },
  endDrag(props, monitor, component){
    if(!monitor.didDrop()){
      console.log("YAY")
      return;
    }
    console.log(props)
    return props.handleDrop(props.device.attributes.meta.id, props.group);
  }
}

function collect(connect, monitor){
  return{
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}
class Device extends Component {
  render () {
    if(this.props.assignedDevices.includes(this.props.device.attributes.meta.id)){
      const { isDragging, connectDragSource, device } = this.props;

      return connectDragSource(
        <div className="device card">
          <p><span>Device name: </span>{this.props.device.attributes.name}</p>
          <p><span>Manufacturer: </span>{this.props.device.attributes.manufacturer}</p>
          <p><span>Tracking: </span>{this.props.device.attributes.value.models.length} values</p>
        </div>
      )
    } else {
      return(
        <div></div>
      )
    }

  }
}

export default DragSource("device", deviceSource, collect)(Device)
