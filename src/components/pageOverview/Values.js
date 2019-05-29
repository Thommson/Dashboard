import React, { Component } from 'react'

class Values extends Component {

  render () {
      return(
        <option valueid={this.props.value.attributes.state.models[0].attributes.meta.id} value={this.props.value.attributes.state.models[0].attributes.name}>{this.props.value.attributes.name}</option>
      )
  }
}

export default Values;
