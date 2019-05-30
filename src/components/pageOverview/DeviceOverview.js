import React, { Component } from 'react';
import DeviceOverviewChart from './DeviceOverviewChart';

class DeviceOverview extends Component {
  constructor(props){
    super(props)
    this.state = {
      select: 0,
    }
  }


  render () {
          if(this.props.historicalDeviceData === undefined){

            return(
              <div>
                <DeviceOverviewChart saveQuery={this.props.saveQuery} select1={this.state.select1} select2={this.state.select2} saveSelect1={this.saveSelect1} saveSelect2={this.saveSelect2} selectedDevice={this.props.selectedDevice} historicalDeviceData={this.props.historicalDeviceData} deviceArray={this.props.deviceArray} selectedDevice={this.props.selectedDevice} updateChartMaster={this.props.updateChartMaster} getHistoricalDataMaster={this.props.getHistoricalDataMaster} />
              </div>
            )
          } else {
            return(
              <React.Fragment>
                {this.props.historicalDeviceData.map((data) => {

                  if(this.props.savedQuery === data.query){
                    return(
                      <div>
                        <DeviceOverviewChart saveQuery={this.props.saveQuery} select1={this.state.select1} select2={this.state.select2} saveSelect1={this.saveSelect1} saveSelect2={this.saveSelect2} selectedDevice={this.props.selectedDevice} data={data} deviceArray={this.props.deviceArray} selectedDevice={this.props.selectedDevice} updateChartMaster={this.props.updateChartMaster} getHistoricalDataMaster={this.props.getHistoricalDataMaster} />
                      </div>
                    )
                  } else {
                    return(
                      null
                    )

                  }
                }
              )}
            </React.Fragment>
            )
          }
        }
      }


export default DeviceOverview;
