import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryGroup, VictoryAxis, VictoryTheme } from 'victory';
import Values from './Values';

class DeviceOverviewChart extends Component {

  constructor(props){
    super(props)
    this.state = {
      status: ''
    }
    this.getHistoricalData= this.getHistoricalData.bind(this);
  }

  getMonday = (d) => {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1);
    return new Date(d.setDate(diff));
  }

  async getHistoricalData(){
     let select = document.getElementById("device-overview-select1");
     let query;
     let d = new Date();
     let currentTime = d.toISOString();
     if(select.options[select.selectedIndex].value === 'day'){
       let endTime = new Date(d.setHours(0,0,0,0)).toISOString();
       let sort = "hour";
       query = "start=" + endTime + "&end=" + currentTime + "&group_by=" + sort + "&operation=avg"
     } else if(select.options[select.selectedIndex].value === 'week'){
       let time = this.getMonday(new Date());
       let endTime = new Date(new Date(time).setHours(0,0,0,0)).toISOString();
       let sort = "day";
       query = "start=" + endTime + "&end=" + currentTime + "&group_by=" + sort + "&operation=avg"
     } else if(select.options[select.selectedIndex].value === 'month'){
       let endTime = new Date(d.setDate(1)).toISOString();
       let sort = "week";
       query = "start=" + endTime + "&end=" + currentTime + "&group_by=" + sort + "&operation=avg"
     }
     this.setState({ query: query });
     let devices = [];
     devices.push(this.props.selectedDevice);
     let values = [];
     values.push(document.getElementById("device-overview-select2").options[document.getElementById("device-overview-select2").selectedIndex].value);
     let valueids = [];
     valueids.push(document.getElementById("device-overview-select2").options[document.getElementById("device-overview-select2").selectedIndex].getAttribute('valueid'));
     this.props.getHistoricalDataMaster(query, devices, values);
     this.props.updateChartMaster(valueids, query);
     document.getElementById("option-device-overview").style.display = 'none';
 }

  render () {
    if(this.props.deviceArray !== undefined && this.props.historicalDeviceData !== undefined){
      return(
        <div id='device-overview-chart'>
          <div className="row">
            <div className="container">
              <div className="row pad-40">
                <div className="overview-row">
                  <h2 className="font-4">Device Name Overview 1</h2>
                  <select onChange={this.getHistoricalData} id="device-overview-select1" className="select">
                    <option id="option-device-overview" value="def">Time gap</option>
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </select>
                  <select  onChange={this.getHistoricalData} id="device-overview-select2" className="select">

                      { this.props.deviceArray.find({name: this.props.selectedDevice}).attributes.value.models.map((value) => {
                          return <Values value={value} />
                        })
                      }

                  </select>
                </div>

              </div>
              <div className="row pad-40">
                <div className="col">
                  <VictoryChart padding={{top: 10, bottom: 40, left: 50, right: 50}} domainPadding={20} height={250} width={650} theme={VictoryTheme.material}>
                    { this.props.historicalDeviceData.map((data) => {
                      if(this.state.query === data.query){
                        return <VictoryLine sortOrder="ascending" sortKey="selected_timestamp" x="selected_timestamp" labels={(datum) => Math.round(datum.avg)} y={(datum) => Math.round(datum.avg)} data={data.data}/>
                      } else {
                        return null
                        }
                      })
                    }
                    <VictoryAxis orientation="left" standalone={false} dependentAxis tickFormat={(y) => y}/>
                    <VictoryAxis standalone={false} tickFormat={(x) => new Date(x).getHours()}/>
                  </VictoryChart>
                </div>
              </div>

              <div className="row pad-40">
                <div className="overview-lower-row">
                  <div className="overview-lower-box">
                    <h4>Average Temps</h4>
                    <p className="font-4">20</p>
                  </div>
                  <div className="overview-lower-box">
                    <h4>Lowest Temps</h4>
                    <p className="font-4">10</p>
                  </div>
                  <div className="overview-lower-box">
                    <h4>Highest Temps</h4>
                    <p className="font-4">24</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )
    } else if(this.props.deviceArray !== undefined && this.props.historicalDeviceData === undefined ){
      return(
        <div id='device-overview-chart'>
          <div className="row">
            <div className="container">
              <div className="row pad-40">
                <div className="overview-row">
                  <h2 className="font-4">Device Name Overview 2</h2>
                    <select onChange={this.getHistoricalData} id="device-overview-select1" className="select">
                      <option id="option-device-overview" value="def">Time gap</option>
                      <option value="day">Day</option>
                      <option value="week">Week</option>
                      <option value="month">Month</option>
                    </select>
                    <select id="device-overview-select2" className="select">

                        { this.props.deviceArray.find({name: this.props.selectedDevice}).attributes.value.models.map((value) => {
                            return <Values value={value} />
                          })
                        }

                    </select>
                </div>

              </div>
              <div className="row pad-40">
                <div className="col">
                  <VictoryChart padding={{top: 0, bottom: 40, left: 50, right: 50}} domainPadding={20} height={250} width={650} theme={VictoryTheme.material}>

                  </VictoryChart>
                </div>
              </div>

              <div className="row pad-40">
                <div className="overview-lower-row">
                  <div className="overview-lower-box">
                    <h4>Average Temps</h4>
                    <p className="font-4">20</p>
                  </div>
                  <div className="overview-lower-box">
                    <h4>Lowest Temps</h4>
                    <p className="font-4">10</p>
                  </div>
                  <div className="overview-lower-box">
                    <h4>Highest Temps</h4>
                    <p className="font-4">24</p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div>Loading</div>
      )
    }

  }
}

export default DeviceOverviewChart;
