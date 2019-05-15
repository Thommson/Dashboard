import React, { Component } from 'react';
import LiveDeviceDataList from './LiveDeviceDataList';
import LiveWeatherData from './LiveWeatherData';
import DeviceOptions from './DeviceOptions';
class Overview extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedDevice: "Current Weather"
    }
  }

  selectDevice = (event) => {

    this.setState({
      selectedDevice: event.target.value
    });

  }

  render () {
    if(this.props.deviceArray !== undefined){
      return(
        <div id="overview" className="row">
          <div className="col">
            <div className="row blue-bg">
              <div className="container">
                <div className="row">
                  <div className="col-5">
                    <div id="device-data" className="row blue-bg-padding-left">
                          <span className="selected-device">Selected Device</span>
                          <select onChange={this.selectDevice} className="device-select">
                            { this.props.deviceArray.models.map((device) =>
                            <DeviceOptions device={device} key={device.id} />
                            )}
                          </select>
                          <LiveDeviceDataList selectedDevice={this.state.selectedDevice} deviceArray={this.props.deviceArray} />
                    </div>
                  </div>
                  <div className="col-1"></div>
                  <div className="col-6 blue-bg-padding-right">
                    <LiveWeatherData temperature={this.props.temperature} cloudiness={this.props.cloudiness} city={this.props.city} humidity={this.props.humidity} pressure={this.props.pressure} sunset={this.props.sunset} sunrise={this.props.sunrise}/>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div id="overview" className="row">
          <div className="col">
            <div className="row blue-bg">
              <div className="container">
                <div className="row">
                  <div className="col-5">
                    <div id="device-data" className="row blue-bg-padding-left">
                      <span className="selected-device">Selected Device</span>
                          <select className="device-select">

                          </select>
                          <LiveDeviceDataList deviceArray={this.props.deviceArray}/>
                    </div>
                  </div>
                  <div className="col-1">
                  </div>
                  <div className="col-6 blue-bg-padding-right">
                    <LiveWeatherData />
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      )
    }

  }
}

export default Overview;
