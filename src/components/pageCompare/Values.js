import React, { Component } from 'react'

class Values extends Component {

  render () {
      return(
        <option value={this.props.value.attributes.state.models[0].attributes.meta.id}>{this.props.value.attributes.name}</option>
      )
  }
}

export default Values;
