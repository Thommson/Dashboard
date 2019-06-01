import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryGroup, VictoryAxis, VictoryTheme } from 'victory';
import Values from './Values';
import TimeValues from './TimeValues';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

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
  getWeekNumber = (d) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo;
  }
  async getHistoricalData(){
     this.props.saveSelect(document.getElementById("device-overview-select1").selectedIndex)
     let select = document.getElementById("device-overview-select1");
     this.setState({ selectedTimeGap: select.options[select.selectedIndex].value});
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
   this.props.saveSelect(document.getElementById("device-overview-select1").selectedIndex)
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
       endTime = new Date(new Date(historicalSave.startTime).setMonth(newMonth + 1)).toISOString();
       let sort = "week";
       query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
     }
     console.log(query)
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
   this.props.saveSelect(document.getElementById("device-overview-select1").selectedIndex)
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
       endTime = new Date(new Date(historicalSave.startTime).setMonth(newMonth + 1)).toISOString();
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
   if(this.props.historicalDeviceData !== undefined && this.props.savedQuery){
     for(let i = 0; i < this.props.historicalDeviceData.length; i++){
       if(this.props.historicalDeviceData[i].query === this.props.savedQuery){
         historicalSave = this.props.historicalDeviceData[i];
         console.log(historicalSave);
       }
     }
   }
 }

  render () {
    let maxima;
    let minima;
    let avg;
    let unit;
    let property;
    if(this.props.deviceArray !== undefined && this.props.historicalDeviceData !== undefined){
      const optionValues = ["day", "week", "month"]

      return(
        <div id='device-overview-chart'>
          <div className="row">
            <div className="container">
              <div className="row pad-40 overview-row">
                <div className="col-5">
                  <h2 className="inline-left font-4">{this.props.selectedDevice}</h2>
                </div>
                <div className="col-7">

                  {this.props.historicalDeviceData.map((data) => {
                    let num;
                    let tracker = false;
                    for(let i = 0; i < this.props.historicalDeviceData.length; i++){
                      if(this.props.historicalDeviceData[i].query === this.props.savedQuery && tracker === false){
                        unit = this.props.historicalDeviceData[i].dataUnit;
                        property = this.props.historicalDeviceData[i].dataName;
                        maxima = Math.max(...data.data.map((d) => d.avg));
                        minima = Math.min(...data.data.map((d) => d.avg));
                        let sum = 0;
                        for(let i = 0; i < data.data.length; i++){
                          sum += data.data[i].avg;
                        }
                        avg = sum/data.data.length;

                        }
                        if(this.props.historicalDeviceData[i].query === this.props.savedQuery){
                          num = i;
                          historicalSave = this.props.historicalDeviceData[i];
                        }
                      }
                    })
                  }
                  <div id="selecte-check" className="inline-left"><button className="chevron" onClick={this.prevDate}><FontAwesomeIcon icon={faChevronLeft} /></button>{new Date(historicalSave.startTime).getDate()}-{new Date(historicalSave.startTime).getMonth()+1}-{new Date(historicalSave.startTime).getFullYear()}<button className="chevron" onClick={this.nextDate}><FontAwesomeIcon icon={faChevronRight} /></button></div>
                  <div className="inline-right">
                    <select className="inline-right" onChange={this.getHistoricalData} id="device-overview-select2" className="select">
                      { this.props.deviceArray.find({name: this.props.selectedDevice}).attributes.value.models.map((value, index) => {
                        if(value.attributes.name !== 'city' && value.attributes.name !== 'country code' && value.attributes.name !== 'wind direction' && value.attributes.name !== 'sunrise' && value.attributes.name !== 'sunset' && value.attributes.name !== 'last updated' && value.attributes.name !== 'scd30 humidity' && value.attributes.name !== 'scd30 Temp'){
                          return <Values select={this.props.select} value={value} index={index}/>
                        } else {
                          return null
                          }
                        })
                      }
                    </select>
                    <select className="inline-right" onChange={this.getHistoricalData} id="device-overview-select1" className="select">
                      { optionValues.map((value, index) => {
                          return <TimeValues select={this.props.select} value={value} index={index}/>
                        })
                      }
                    </select>
                  </div>
                </div>
              </div>
              <div className="row pad-40">
                <div className="col">
                  <VictoryChart style={{ data: {fontSize: 9}, labels: {fontSize: 9}}} padding={{top: 30, bottom: 40, left: 50, right: 50}} domainPadding={20} height={250} width={650} theme={VictoryTheme.material}>
                    {this.props.historicalDeviceData.map((data) => {

                      if(this.props.savedQuery === data.query ){
                        for(let i = 0; i < this.props.historicalDeviceData.length; i++){
                          if(this.props.historicalDeviceData[i].query === this.props.savedQuery){
                            historicalSave = this.props.historicalDeviceData[i];
                            console.log(historicalSave);
                          }
                        }
                        return(
                          <VictoryGroup color="#5265E1">
                            <VictoryLine interpolation={"natural"} style={{ data: {fontSize: 9}, labels: {fontSize: 9}}} sortOrder="ascending" sortKey="selected_timestamp" x="selected_timestamp" labels={(datum) => Math.round(datum.avg)} y={(datum) => Math.round(datum.avg)} data={historicalSave.data}/>
                          </VictoryGroup>
                        )
                        }
                      })
                    }

                    <VictoryAxis style={{ tickLabels: {fontSize: 9}}} orientation="left" standalone={false} dependentAxis tickFormat={(y) => y + historicalSave.dataUnit}/>
                      <VictoryAxis style={{ tickLabels: {fontSize: 9}}} standalone={false}
                        tickFormat={(x) => {
                          if(this.state.selectedTimeGap === 'none'){
                            return ''
                          } else if(this.state.selectedTimeGap === 'day'){
                            return new Date(x).getHours() + 1 + 'h'
                          } else if(this.state.selectedTimeGap ==='week'){
                            return "day " + new Date(x).getDate()
                          }
                          else if(this.state.selectedTimeGap === 'month'){
                          let date = this.getWeekNumber(new Date(x))
                           return "week " + date
                         } else {
                           return null
                         }

                        }}/>
                  </VictoryChart>
                </div>
              </div>

              <div className="row pad-40">
                <div className="overview-lower-row">
                  <div className="overview-lower-box">
                    <h4>Average {property}</h4>
                    <p className="font-4">{Math.round(avg)}{unit}</p>
                  </div>
                  <div className="overview-lower-box">
                    <h4>Lowest {property}</h4>
                    <p className="font-4">{Math.round(minima)}{unit}</p>
                  </div>
                  <div className="overview-lower-box">
                    <h4>Highest {property}</h4>
                    <p className="font-4">{Math.round(maxima)}{unit}</p>
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
                  <h2 className="font-4 inline-left">{this.props.selectedDevice} device</h2>
                  <div className="inline-right">
                    <div className="inline-right pulse-time-gap">
                      <select onChange={this.getHistoricalData} id="device-overview-select1" className="select no-pad-marg">
                        { optionValues.map((value, index) => {
                            return <TimeValues select={this.props.select} value={value} index={index}/>
                          })
                        }
                        <option selected="selected" id={"option-" + this.props.cardId} value="def">Time gap</option>
                      </select>
                    </div>
                    <select className="inline-right" id="device-overview-select2" select2={this.props.select2} className="select">

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

              </div>
              <div className="row pad-40">
                <div className="col text-center">
                  Select a "Time gap" to get an overview of the devices historical data.
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
