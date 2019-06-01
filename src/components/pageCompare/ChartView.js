import React, { Component } from 'react'

import { VictoryChart, VictoryLine, VictoryGroup, VictoryAxis, VictoryTheme } from 'victory';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'

class ChartView extends Component {
  constructor(props){
    super(props)
    this.state = {
      status: '',
      selectedTimeGap: 'none'
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

      document.getElementById("option-" + this.props.cardId).style.display = 'none';
      let select = document.getElementById(this.props.timeGap);
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
      console.log(query, this.props.chart.devices, this.props.chart.values, startTime, endTime)
      this.props.getHistoricalDataMaster(query, this.props.chart.devices, this.props.chart.values, startTime, endTime);
      this.props.updateChartMaster(this.props.chart.valueids, query, startTime, endTime);
  }

  async nextDate(){

    if(new Date(new Date(this.props.chart.startTime).getTime()+(60000*60*24)).getTime() >= new Date().getTime()){
      console.log("Negated")
    } else {
      console.log(new Date(this.props.chart.startTime).getTime());
      console.log(new Date().getTime());
      let select = document.getElementById(this.props.timeGap);
      let query;
      let startTime;
      let endTime;
      if(select.options[select.selectedIndex].value === 'day'){
        startTime = new Date(new Date(this.props.chart.startTime).getTime()+(60000*60*24)).toISOString();
        endTime = new Date(new Date(this.props.chart.endTime).getTime()+(60000*60*24)).toISOString();
        let sort = "hour";
        query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
      } else if(select.options[select.selectedIndex].value === 'week'){
        let time = this.getMonday(new Date());
        startTime = new Date(new Date(this.props.chart.startTime).getTime()+(60000*60*24*7)).toISOString();
        endTime = new Date(new Date(this.props.chart.endTime).getTime()+(60000*60*24*7)).toISOString();
        let sort = "day";
        query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
      } else if(select.options[select.selectedIndex].value === 'month'){
        let newMonth = new Date(this.props.chart.startTime).getMonth() + 1;
        startTime = new Date(new Date(this.props.chart.startTime).setMonth(newMonth)).toISOString();
        endTime = new Date(new Date(this.props.chart.startTime).setMonth(newMonth+1)).toISOString();
        let sort = "week";
        query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
      }
      this.props.getHistoricalDataMaster(query, this.props.chart.devices, this.props.chart.values, startTime, endTime);
      this.props.updateChartMaster(this.props.chart.valueids, query, startTime, endTime);
    }
  }

  async prevDate(){
      let select = document.getElementById(this.props.timeGap);
      let query;
      let startTime;
      let endTime;
      if(select.options[select.selectedIndex].value === 'day'){
        startTime = new Date(new Date(this.props.chart.startTime).getTime()-(60000*60*24)).toISOString();
        endTime = new Date(new Date(this.props.chart.endTime).getTime()-(60000*60*24)).toISOString();
        let sort = "hour";
        query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
      } else if(select.options[select.selectedIndex].value === 'week'){
        let time = this.getMonday(new Date());
        startTime = new Date(new Date(this.props.chart.startTime).getTime()-(60000*60*24*7)).toISOString();
        endTime = new Date(new Date(this.props.chart.startTime).getTime()).toISOString();
        let sort = "day";
        query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
      } else if(select.options[select.selectedIndex].value === 'month'){
        let newMonth = new Date(this.props.chart.startTime).getMonth() - 1;
        startTime = new Date(new Date(this.props.chart.startTime).setMonth(newMonth)).toISOString();
        endTime = new Date(new Date(this.props.chart.startTime).setMonth(newMonth+1)).toISOString();
        let sort = "week";
        query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
      }
      this.props.getHistoricalDataMaster(query, this.props.chart.devices, this.props.chart.values, startTime, endTime);
      this.props.updateChartMaster(this.props.chart.valueids, query, startTime, endTime);
  }
  pin = () => {

    let pinStatus;
    if(this.props.chart.pinned === true){
      pinStatus = false
    } else {
      pinStatus = true
    }
    this.props.pinMaster(this.props.chart.id, pinStatus)
  }

  componentDidUpdate(){
    if(this.props.chart.pinned === true){
      document.getElementById('pin-button').classList.add('pin-button-active')
    } else {
      document.getElementById('pin-button').classList.remove('pin-button-active')
    }
  }
  componentDidMount(){
    if(this.props.chart.pinned === true){
      document.getElementById('pin-button').classList.add('pin-button-active')
    } else {
      document.getElementById('pin-button').classList.remove('pin-button-active')
    }
  }
  render () {
    let maxima1;
    let maxima2;
    let minima1;
    let minima2;
    let avg1;
    let avg2;
    let maxima;
    let gap;
    if(this.props.historicalData !== undefined && this.state.selectedTimeGap !== 'none'){
      return(
        <div id="chart-view">
            <div className="row card-pad">
              <div className="col-5">
                <div className="inline-left legend-box">
                  <span className="legend-color-box color-box-1 inline-left"></span>
                  <p className="inline-left">{this.props.chart.groups[0]} {this.props.chart.values[0]}</p>
                </div>
                <div className="inline-left legend-box">
                  <span className="legend-color-box color-box-2 inline-left"></span>
                  <p className="inline-left">{this.props.chart.groups[1]}  {this.props.chart.values[1]}</p>
                </div>

              </div>
              <div className="col-7">
                <button id="pin-button" className="inline-right pin-button" onClick={this.pin}><FontAwesomeIcon size="xs" icon={ faThumbtack } /></button>
                <select onChange={this.getHistoricalData} id={this.props.timeGap} className="select inline-right">
                  <option id={"option-" + this.props.cardId} value="def">Time gap</option>
                  <option value="day">Day</option>
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                </select>
                <div className="inline-left"><button className="chevron" onClick={this.prevDate}><FontAwesomeIcon icon={ faChevronLeft } /></button>{new Date(this.props.chart.startTime).getDate()}-{new Date(this.props.chart.startTime).getMonth()+1}-{new Date(this.props.chart.startTime).getFullYear()}<button className="chevron" onClick={this.nextDate}><FontAwesomeIcon icon={faChevronRight} /></button></div>

              </div>
            </div>

            <div className="row">
              <VictoryChart style={{ data: {fontSize: 9}, labels: {fontSize: 9}}} padding={{top: 0, bottom: 40, left: 50, right: 50}} domainPadding={20} height={250} width={750} theme={VictoryTheme.material} id={this.props.cardId} className="chart-card-content">

                { this.props.historicalData.map((data) => {
                  if(this.props.chart.valueids[0] === data.meta.id && this.props.chart.query === data.query){
                      maxima1 = Math.max(...data.data.map((d) => d.avg));
                      minima1 = Math.min(...data.data.map((d) => d.avg));
                      let sum = 0;
                      for(let i = 0; i < data.data.length; i++){
                        sum += data.data[i].avg;
                      }
                      avg1 = sum/data.data.length;
                    }
                  if(this.props.chart.valueids[1] === data.meta.id && this.props.chart.query === data.query){
                      maxima2 = Math.max(...data.data.map((d) => d.avg));
                      minima2 = Math.min(...data.data.map((d) => d.avg));
                      let sum = 0;
                      for(let i = 0; i < data.data.length; i++){
                        sum += data.data[i].avg;
                      }
                      avg2 = sum/data.data.length;
                    }
                  })
                }
                { this.props.historicalData.map((data) => {
                  maxima = 0;
                  if(maxima1 > maxima2){
                    maxima = Math.round(maxima1);
                  } else {
                    maxima = Math.round(maxima2);
                  }
                  if(maxima > 0 && maxima <= 10){
                    gap = 1;
                    maxima = maxima + (1.5*gap);
                  } else if(maxima > 10 && maxima <= 100){
                    gap = 10;
                    maxima = maxima + (1.5*gap);
                  } else if(maxima > 100){
                    gap = 100;
                    maxima = maxima + (1.5*gap);
                    }
                  }
                )}

                { this.props.historicalData.map((data) => {
                  if(this.props.chart.valueids[0] === data.meta.id && this.props.chart.query === data.query){
                    if(maxima1 - (10 * maxima2) >= 0 || gap <= 10){
                      return(
                        <VictoryGroup color="#5265E1">
                          <VictoryLine interpolation={"natural"} style={{ data: {fontSize: 9}, labels: {fontSize: 9}}} sortOrder="ascending" sortKey="selected_timestamp" x="selected_timestamp" labels={(datum) => Math.round(datum.avg)} y={(datum) => Math.round(datum.avg)} data={data.data}/>
                        </VictoryGroup>
                      )

                  } else {
                      return(
                        <VictoryGroup color="#5265E1">
                          <VictoryLine interpolation={"natural"} style={{ data: {fontSize: 9}, labels: {fontSize: 9}}} sortOrder="ascending" sortKey="selected_timestamp" x="selected_timestamp" labels={(datum) => Math.round(datum.avg)} y={(datum) => Math.round(datum.avg * 10)} data={data.data}/>
                        </VictoryGroup>
                      )
                    }
                  } else {
                      return null
                    }
                  }
                )}
                { this.props.historicalData.map((data) => {
                  if(this.props.chart.valueids[1] === data.meta.id && this.props.chart.query === data.query){
                    if(maxima2 - (10 * maxima1) >= 0 || gap <= 10){
                      return(
                        <VictoryGroup color="#E0BF51">
                          <VictoryLine interpolation={"natural"} style={{ data: {fontSize: 9}, labels: {fontSize: 9}}} sortOrder="ascending" sortKey="selected_timestamp" x="selected_timestamp" labels={(datum) => Math.round(datum.avg)} y={(datum) => Math.round(datum.avg)} data={data.data}/>
                        </VictoryGroup>
                      )
                     } else {
                      return(
                        <VictoryGroup color="#E0BF51">
                          <VictoryLine interpolation={"natural"} style={{ data: {fontSize: 9}, labels: {fontSize: 9}}} sortOrder="ascending" sortKey="selected_timestamp" x="selected_timestamp" labels={(datum) => Math.round(datum.avg)} y={(datum) => Math.round(datum.avg * 10)} data={data.data}/>
                        </VictoryGroup>
                      )
                    }
                  } else {
                      return null
                    }
                  }
                )}


                { this.props.historicalData.map((data) => {
                  let newArray = []
                  if(this.props.chart.valueids[0] === data.meta.id && this.props.chart.query === data.query){
                    for(let i = 0; i <= maxima; i = i + gap){
                      newArray.push(i);
                    }
                    if(maxima1 - (10 * maxima2) >= 0 || gap <= 10){
                      return  <VictoryAxis style={{ tickLabels: {fontSize: 9}}}orientation="left" standalone={false} dependentAxis tickFormat={(y) => y + data.dataUnit}/>
                    } else {
                      return  <VictoryAxis style={{ tickLabels: {fontSize: 9}}} orientation="left" standalone={false} dependentAxis tickFormat={(y) => y / 10 + data.dataUnit}/>
                      }
                    }
                  })
                }
                { this.props.historicalData.map((data) => {
                  let newArray = []
                  if(this.props.chart.valueids[1] === data.meta.id && this.props.chart.query === data.query){
                      for(let i = 0; i <= maxima; i = i + gap){
                        newArray.push(i);
                      }
                  if(maxima2 - (10 * maxima1) >= 0 || gap <= 10){
                        return <VictoryAxis style={{ tickLabels: {fontSize: 9}}} orientation="right" standalone={false} dependentAxis tickFormat={(y) => y + data.dataUnit}/>
                      } else {
                        return <VictoryAxis style={{ tickLabels: {fontSize: 9}}} orientation="right" standalone={false} dependentAxis tickFormat={(y) => y / 10 + data.dataUnit}/>
                      }
                    } else {
                      return null
                    }
                  }
                )}

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
                     return "week" + date
                   } else {
                     return null
                   }

                  }}/>
              </VictoryChart>
            </div>

            <div className="row">
              <div className="col">

                <div className="row card-pad-lr">
                  <div className="col-4">
                    <h4 className="bold-font">Average:</h4>
                  </div>
                  <div className="col-4">
                    <h4 className="bold-font">Highest:</h4>
                  </div>
                  <div className="col-4">
                    <h4 className="bold-font">Lowest:</h4>
                  </div>
                </div>

                <div className="row card-pad-lr">
                  <div className="col-4">
                    <p>{this.props.chart.groups[0]} {this.props.chart.values[0]} <span className="bold-font">{Math.round(avg1)}</span></p>
                  </div>
                  <div className="col-4">
                    <p>{this.props.chart.groups[0]} {this.props.chart.values[0]} <span className="bold-font">{Math.round(maxima1)}</span></p>
                  </div>
                  <div className="col-4">
                    <p>{this.props.chart.groups[0]} {this.props.chart.values[0]} <span className="bold-font">{Math.round(minima1)}</span></p>
                  </div>
                </div>

                <div className="row card-pad-lr">
                  <div className="col-4">
                    <p>{this.props.chart.groups[1]}  {this.props.chart.values[1]} <span className="bold-font">{Math.round(avg2)}</span></p>
                  </div>
                  <div className="col-4">
                    <p>{this.props.chart.groups[1]}  {this.props.chart.values[1]} <span className="bold-font">{Math.round(maxima2)}</span></p>
                  </div>
                  <div className="col-4">
                    <p>{this.props.chart.groups[1]}  {this.props.chart.values[1]} <span className="bold-font">{Math.round(minima2)}</span></p>
                  </div>
                </div>

              </div>
            </div>
        </div>

      )
    } else if(this.state.selectedTimeGap === 'none'){
      return(
        <div id="chart-view">
          <div className="row card-pad">
            <div className="col-5">
              <div className="inline-left legend-box">
                <span className="legend-color-box color-box-1 inline-left"></span>
                <p className="inline-left">{this.props.chart.groups[0]} {this.props.chart.values[0]}</p>
              </div>
              <div className="inline-left legend-box">
                <span className="legend-color-box color-box-2 inline-left"></span>
                <p className="inline-left">{this.props.chart.groups[1]}  {this.props.chart.values[1]}</p>
              </div>
            </div>
            <div className="col-7">
              <button id="pin-button" className="inline-right pin-button" onClick={this.pin}><FontAwesomeIcon size="xs" icon={ faThumbtack } /></button>
              <select onChange={this.getHistoricalData} id={this.props.timeGap} className="select inline-right pulse-time-gap">
                <option id={"option-" + this.props.cardId} value="def">Time gap</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              Select a "Time gap" to get historical data in the chart.
            </div>
          </div>
        </div>
      )

    } else {
      return null
    }
  }
}

export default ChartView;
