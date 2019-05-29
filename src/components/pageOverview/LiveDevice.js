import React, { Component } from 'react';

class LiveDevice extends Component {
  render () {
    if(this.props.value.attributes.type === "timestamp"){

      let hours = new Date(Number(this.props.value.attributes.state.models[0].attributes.data)).getHours();
      let minutes;
      if(new Date(Number(this.props.value.attributes.state.models[0].attributes.data)).getMinutes() < 10){
        minutes = "0" +  new Date(Number(this.props.value.attributes.state.models[0].attributes.data)).getMinutes();
      } else {
         minutes = new Date(Number(this.props.value.attributes.state.models[0].attributes.data)).getMinutes();
      }
      return(
        <div className="live-device col-6">
          <span>{this.props.value.attributes.name}</span>
          <p>{hours + ":" + minutes } {this.props.add}</p>
        </div>
      )
    } else if(this.props.value.attributes.name === 'city' || this.props.value.attributes.name === 'country code'){
      return(
        <div className="live-device col-6">
          <span>{this.props.value.attributes.name}</span>
          <p>{this.props.value.attributes.state.models[0].attributes.data} {this.props.add}</p>
        </div>
      )
    } else {
      return(
        <div className="live-device col-6">
          <span>{this.props.value.attributes.name}</span>
          <p>{Math.round(this.props.value.attributes.state.models[0].attributes.data)} {this.props.add}</p>
        </div>
      )
    }
  }
}

export default LiveDevice;
