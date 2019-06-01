import React, { Component } from 'react';
import LiveDeviceDataList from './LiveDeviceDataList';
import LiveWeatherData from './LiveWeatherData';
import DeviceOptions from './DeviceOptions';
import DeviceOverview from './DeviceOverview';
import DeviceOverviewChart from './DeviceOverviewChart';
import ChartList from '../pageCompare/ChartList';

class Overview extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedDevice: "Current Weather",
      select1: 0,
      select2: 0
    }
  }

  selectDevice = (event) => {
    this.setState({
      selectedDevice: event.target.value
    });
  }
  saveSelect = (data) => {
    this.setState({select: data})
  }

  render () {
    if(this.props.deviceArray !== undefined){
      return(
        <div id="overview" className="row">
          <div className="col">
            <div className="row blue-bg">
              <div className="container">
                <div className="row">
                  <div className="col-6">
                    <div id="device-data" className="row blue-bg-padding-left">
                          <span className="selected-device font-5">Selected Device</span>
                          <select onChange={this.selectDevice} className="device-select">
                            { this.props.deviceArray.models.map((device) =>
                            <DeviceOptions device={device} key={device.id} />
                            )}
                          </select>
                          <LiveDeviceDataList dataTypes={this.props.dataTypes} selectedDevice={this.state.selectedDevice} deviceArray={this.props.deviceArray} />
                    </div>
                  </div>
                  <div className="col-6 blue-bg-padding-right">
                    <LiveWeatherData weatherData={this.props.deviceArray.find({name: "Current Weather"}).attributes.value} />
                  </div>
                </div>


              </div>
            </div>
            <DeviceOverviewChart saveSelect={this.saveSelect} select={this.state.select} savedQuery={this.props.savedQuery} saveQuery={this.props.saveQuery} historicalDeviceData={this.props.historicalDeviceData} deviceArray={this.props.deviceArray} selectedDevice={this.state.selectedDevice} updateChartMaster={this.props.updateChartMaster} getHistoricalDataMaster={this.props.getHistoricalDataMaster} />

            <div className="container pinned-chart-list">
              <ChartList pinMaster={this.props.pinMaster} groups={this.props.groups} updateChartMaster={this.props.updateChartMaster} getHistoricalDataMaster={this.props.getHistoricalDataMaster} historicalData={this.props.historicalData} charts={this.props.charts} />
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
                  <div className="col-6">
                    <div id="device-data" className="row blue-bg-padding-left">
                      <span className="selected-device">Selected Device</span>
                          <select className="device-select">

                          </select>
                          <LiveDeviceDataList deviceArray={this.props.deviceArray}/>
                    </div>
                  </div>
                  <div className="col-1">
                    <span id="spliter"></span>
                  </div>
                  <div className="col-5 blue-bg-padding-right">
                    <LiveWeatherData />
                  </div>
                </div>


              </div>
            </div>

            <DeviceOverviewChart />

          </div>
        </div>
      )
    }

  }
}

export default Overview;
