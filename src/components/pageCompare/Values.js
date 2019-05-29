import React, { Component } from 'react'

class Values extends Component {

  render () {
      return(
        <option groupname={this.props.group.name} devicename={this.props.devicename} valueid={this.props.value.attributes.state.models[0].attributes.meta.id} value={this.props.value.attributes.state.models[0].attributes.name}>{this.props.value.attributes.name}</option>
      )
  }
}

export default Values;
