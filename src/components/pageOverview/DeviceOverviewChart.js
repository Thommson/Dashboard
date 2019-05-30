import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryGroup, VictoryAxis, VictoryTheme } from 'victory';
import Values from './Values';
import TimeValues from './TimeValues';
let historicalSave;
class DeviceOverviewChart extends Component {

  constructor(props){
    super(props)
    this.state = {
      status: ''
    }
    this.getHistoricalData= this.getHistoricalData.bind(this);
    this.prevDate= this.prevDate.bind(this);
    this.nextDate= this.nextDate.bind(this);
  }

  getMonday = (d) => {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1);
    return new Date(d.setDate(diff));
  }

  async getHistoricalData(){
     this.props.saveSelect(document.getElementById("device-overview-select1").selectedIndex)
     let select = document.getElementById("device-overview-select1");
     let query;
     let startTime;
     let d = new Date();
     let endD = new Date(new Date().setHours(23,59,59,999)).getTime();
     let endTime = new Date(endD).toISOString();
     if(select.options[select.selectedIndex].value === 'day'){
       startTime = new Date(d.setHours(0,0,0,0)).toISOString();
       let sort = "hour";
       query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
     } else if(select.options[select.selectedIndex].value === 'week'){
       let time = this.getMonday(new Date());
       startTime = new Date(new Date(time).setHours(0,0,0,0)).toISOString();
       let sort = "day";
       query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
     } else if(select.options[select.selectedIndex].value === 'month'){
       startTime = new Date(d.setDate(1)).toISOString();
       let sort = "week";
       query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
     }
     this.props.saveQuery(query);
     let devices = [];
     devices.push(this.props.selectedDevice);
     let values = [];
     values.push(document.getElementById("device-overview-select2").options[document.getElementById("device-overview-select2").selectedIndex].value);
     let valueids = [];
     valueids.push(document.getElementById("device-overview-select2").options[document.getElementById("device-overview-select2").selectedIndex].getAttribute('valueid'));
     this.props.getHistoricalDataMaster(query, devices, values, startTime, endTime);
     this.props.updateChartMaster(valueids, query, startTime, endTime);

 }
 async nextDate(){
   this.props.saveSelect(document.getElementById("device-overview-select2").selectedIndex)
   for(let i = 0; i < this.props.historicalDeviceData.length; i++){
     if(this.props.historicalDeviceData[i].query === this.props.savedQuery){
       historicalSave = this.props.historicalDeviceData[i];
       console.log(historicalSave);
     }
   }
   if(new Date(new Date(historicalSave.endTime).getTime()+(60000*60*24)).getTime() >= new Date().getTime()){
     console.log("Negated")
   } else {

     console.log(new Date(historicalSave.startTime).getTime());
     console.log(new Date().getTime());
     let select = document.getElementById("device-overview-select1");
     let query;
     let startTime;
     let endTime;
     if(select.options[select.selectedIndex].value === 'day'){
       startTime = new Date(new Date(historicalSave.startTime).getTime()+(60000*60*24)).toISOString();
       endTime = new Date(new Date(historicalSave.endTime).getTime()+(60000*60*24)).toISOString();
       let sort = "hour";
       query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
     } else if(select.options[select.selectedIndex].value === 'week'){
       let time = this.getMonday(new Date());
       startTime = new Date(new Date(historicalSave.startTime).getTime()+(60000*60*24*7)).toISOString();
       endTime = new Date(new Date(historicalSave.endTime).getTime()+(60000*60*24*7)).toISOString();
       let sort = "day";
       query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
     } else if(select.options[select.selectedIndex].value === 'month'){
       let newMonth = new Date(historicalSave.startTime).getMonth() + 1;
       startTime = new Date(new Date(historicalSave.startTime).setMonth(newMonth)).toISOString();
       endTime = new Date(new Date(historicalSave.endTime).setMonth(newMonth)).toISOString();
       let sort = "week";
       query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
     }
     this.props.saveQuery(query);
     let devices = [];
     devices.push(this.props.selectedDevice);
     let values = [];
     values.push(document.getElementById("device-overview-select2").options[document.getElementById("device-overview-select2").selectedIndex].value);
     let valueids = [];
     valueids.push(document.getElementById("device-overview-select2").options[document.getElementById("device-overview-select2").selectedIndex].getAttribute('valueid'));
     console.log({query, devices, values, startTime, endTime})
     this.props.getHistoricalDataMaster(query, devices, values, startTime, endTime);
     this.props.updateChartMaster(valueids, query, startTime, endTime);

   }
 }

 async prevDate(){
   this.props.saveSelect(document.getElementById("device-overview-select2").selectedIndex)
   for(let i = 0; i < this.props.historicalDeviceData.length; i++){
     if(this.props.historicalDeviceData[i].query === this.props.savedQuery){
       historicalSave = this.props.historicalDeviceData[i];
       console.log(historicalSave);
     }
   }

     let select = document.getElementById("device-overview-select1");
     let query;
     let startTime;
     let endTime;
     if(select.options[select.selectedIndex].value === 'day'){
       startTime = new Date(new Date(historicalSave.startTime).getTime()-(60000*60*24)).toISOString();
       endTime = new Date(new Date(historicalSave.endTime).getTime()-(60000*60*24)).toISOString();
       let sort = "hour";
       query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
     } else if(select.options[select.selectedIndex].value === 'week'){
       let time = this.getMonday(new Date());
       startTime = new Date(new Date(historicalSave.startTime).getTime()-(60000*60*24*7)).toISOString();
       endTime = new Date(new Date(historicalSave.startTime).getTime()).toISOString();
       let sort = "day";
       query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
     } else if(select.options[select.selectedIndex].value === 'month'){
       let newMonth = new Date(historicalSave.startTime).getMonth() - 1;
       startTime = new Date(new Date(historicalSave.startTime).setMonth(newMonth)).toISOString();
       endTime = new Date(new Date(historicalSave.endTime).setMonth(newMonth)).toISOString();
       let sort = "week";
       query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
     }
     this.props.saveQuery(query);
     let devices = [];
     devices.push(this.props.selectedDevice);
     let values = [];
     values.push(document.getElementById("device-overview-select2").options[document.getElementById("device-overview-select2").selectedIndex].value);
     let valueids = [];
     valueids.push(document.getElementById("device-overview-select2").options[document.getElementById("device-overview-select2").selectedIndex].getAttribute('valueid'));
     console.log({query, devices, values, startTime, endTime})
     this.props.getHistoricalDataMaster(query, devices, values, startTime, endTime);
     this.props.updateChartMaster(valueids, query, startTime, endTime);


 }
 componentDidUpdate(){
   if(this.props.historicalDeviceData !== undefined){
     for(let i = 0; i < this.props.historicalDeviceData.length; i++){
       if(this.props.historicalDeviceData[i].query === this.props.savedQuery){
         historicalSave = this.props.historicalDeviceData[i];
         console.log(historicalSave);
       }
     }
   }

 }
  render () {
    if(this.props.deviceArray !== undefined && this.props.historicalDeviceData !== undefined){
      const optionValues = ["day", "week", "month"]

      return(
        <div id='device-overview-chart'>
          <div className="row">
            <div className="container">
              <div className="row pad-40">
                <div className="overview-row">
                  <h2 className="font-4">Device Name1</h2>

                  {this.props.historicalDeviceData.map((data) => {
                    for(let i = 0; i < this.props.historicalDeviceData.length; i++){
                      if(this.props.historicalDeviceData[i].query === this.props.savedQuery){
                        historicalSave = this.props.historicalDeviceData[i];
                        console.log(historicalSave);
                      }
                    }
                    if(historicalSave !== undefined){
                      return (
                        <div><button onClick={this.prevDate}>Prev</button>{new Date(historicalSave.startTime).getDate()}-{new Date(historicalSave.startTime).getMonth()+1}-{new Date(historicalSave.startTime).getFullYear()}<button onClick={this.nextDate}>Next</button></div>
                      )
                    } else {
                      return null
                    }})
                  }
                  <select onChange={this.getHistoricalData} id="device-overview-select1" className="select">
                    { optionValues.map((value, index) => {
                        return <TimeValues select={this.props.select} value={value} index={index}/>
                      })
                    }
                  </select>
                  <select  onChange={this.getHistoricalData} id="device-overview-select2" className="select">

                    { this.props.deviceArray.find({name: this.props.selectedDevice}).attributes.value.models.map((value, index) => {
                      if(value.attributes.name !== 'city' && value.attributes.name !== 'country code' && value.attributes.name !== 'wind direction' && value.attributes.name !== 'sunrise' && value.attributes.name !== 'sunset' && value.attributes.name !== 'last updated' && value.attributes.name !== 'scd30 humidity' && value.attributes.name !== 'scd30 Temp'){
                        return <Values select={this.props.select} value={value} index={index}/>
                      } else {
                        return null
                      }

                      })
                    }

                  </select>
                </div>

              </div>
              <div className="row pad-40">
                <div className="col">
                  <VictoryChart padding={{top: 10, bottom: 40, left: 50, right: 50}} domainPadding={20} height={250} width={650} theme={VictoryTheme.material}>
                    {this.props.historicalDeviceData.map((data) => {

                      if(this.props.savedQuery === data.query ){
                        for(let i = 0; i < this.props.historicalDeviceData.length; i++){
                          if(this.props.historicalDeviceData[i].query === this.props.savedQuery){
                            historicalSave = this.props.historicalDeviceData[i];
                            console.log(historicalSave);
                          }
                        }
                        return <VictoryLine sortOrder="ascending" sortKey="selected_timestamp" x="selected_timestamp" labels={(datum) => Math.round(datum.avg)} y={(datum) => Math.round(datum.avg)} data={historicalSave.data}/>
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
    } else if(this.props.deviceArray !== undefined && this.props.historicalDeviceData === undefined && historicalSave === undefined){
      const optionValues = ["day", "week", "month"]
      return(
        <div id='device-overview-chart'>
          <div className="row">
            <div className="container">
              <div className="row pad-40">
                <div className="overview-row">
                  <h2 className="font-4">Device Name2</h2>
                    <select onChange={this.getHistoricalData} id="device-overview-select1" className="select">
                      <option value="day">Day</option>
                      <option value="week">Week</option>
                      <option value="month">Month</option>
                    </select>
                    <select id="device-overview-select2" select2={this.props.select2} className="select">

                        { this.props.deviceArray.find({name: this.props.selectedDevice}).attributes.value.models.map((value) => {
                          if(value.attributes.name !== 'city' && value.attributes.name !== 'country code' && value.attributes.name !== 'wind direction' && value.attributes.name !== 'sunrise' && value.attributes.name !== 'sunset' && value.attributes.name !== 'last updated' && value.attributes.name !== 'scd30 humidity' && value.attributes.name !== 'scd30 Temp'){
                            return <Values select2={this.props.select2} value={value}/>
                          } else {
                            return null
                          }
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
