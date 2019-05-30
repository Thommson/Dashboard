import React, { Component } from 'react'

import { VictoryChart, VictoryLine, VictoryGroup, VictoryAxis, VictoryTheme } from 'victory';

class ChartCard extends Component {
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

      document.getElementById("option-" + this.props.cardId).style.display = 'none';
      let select = document.getElementById(this.props.timeGap);
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

    if(new Date(new Date(this.props.chart.endTime).getTime()+(60000*60*24)).getTime() >= new Date().getTime()){
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
        endTime = new Date(new Date(this.props.chart.endTime).setMonth(newMonth)).toISOString();
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
        endTime = new Date(new Date(this.props.chart.endTime).setMonth(newMonth)).toISOString();
        let sort = "week";
        query = "start=" + startTime + "&end=" + endTime + "&group_by=" + sort + "&operation=avg"
      }
      this.props.getHistoricalDataMaster(query, this.props.chart.devices, this.props.chart.values, startTime, endTime);
      this.props.updateChartMaster(this.props.chart.valueids, query, startTime, endTime);
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
    if(this.props.historicalData !== undefined){
      return(
        <div className="chart-card row card">
          <div className="col">

            <div className="row card-pad">
              <h3>Comparing {this.props.chart.groups[0]} {this.props.chart.values[0]} with {this.props.chart.groups[1]}  {this.props.chart.values[1]}</h3>
              <button onClick={this.prevDate}>Prev</button>{new Date(this.props.chart.endTime).getDate()}-{new Date(this.props.chart.endTime).getMonth()+1}-{new Date(this.props.chart.endTime).getFullYear()}<button  onClick={this.nextDate}>Next</button>
              <select onChange={this.getHistoricalData} id={this.props.timeGap} className="select">
                <option id={"option-" + this.props.cardId} value="def">Time gap</option>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>

            <div className="row">
              <VictoryChart style={{ data: {fontSize: 10}, labels: {fontSize: 10}}} padding={{top: 0, bottom: 40, left: 50, right: 50}} domainPadding={20} height={250} width={650} theme={VictoryTheme.material} id={this.props.cardId} className="chart-card-content">

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
                      return  <VictoryLine style={{ data: {fontSize: 10}, labels: {fontSize: 10}}} sortOrder="ascending" sortKey="selected_timestamp" x="selected_timestamp" labels={(datum) => Math.round(datum.avg)} y={(datum) => Math.round(datum.avg)} data={data.data}/>
                    } else {
                      return <VictoryLine style={{ data: {fontSize: 10}, labels: {fontSize: 10}}} sortOrder="ascending" sortKey="selected_timestamp" x="selected_timestamp" labels={(datum) => Math.round(datum.avg)} y={(datum) => Math.round(datum.avg * 10)} data={data.data}/>
                    }
                  } else {
                      return null
                    }
                  }
                )}
                { this.props.historicalData.map((data) => {
                  if(this.props.chart.valueids[1] === data.meta.id && this.props.chart.query === data.query){
                    if(maxima2 - (10 * maxima1) >= 0 || gap <= 10){
                      return  <VictoryLine style={{ data: {fontSize: 10}, labels: {fontSize: 10}}} sortOrder="ascending" sortKey="selected_timestamp" x="selected_timestamp" labels={(datum) => Math.round(datum.avg)} y={(datum) => Math.round(datum.avg)} data={data.data}/>
                    } else {
                      return <VictoryLine style={{ data: {fontSize: 10}, labels: {fontSize: 10}}} sortOrder="ascending" sortKey="selected_timestamp" x="selected_timestamp" labels={(datum) => Math.round(datum.avg)} y={(datum) => Math.round(datum.avg * 10)} data={data.data}/>
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
                      return  <VictoryAxis style={{ data: {fontSize: 10}, labels: {fontSize: 10}}} orientation="left" standalone={false} dependentAxis tickFormat={(y) => y}/>
                    } else {
                      return  <VictoryAxis style={{ data: {fontSize: 10}, labels: {fontSize: 10}}} orientation="left" standalone={false} dependentAxis tickFormat={(y) => y / 10}/>
                      }
                    }
                  })
                }
                { this.props.historicalData.map((data) => {
                  let newArray = []
                  if(this.props.chart.valueids[0] === data.meta.id && this.props.chart.query === data.query){
                      for(let i = 0; i <= maxima; i = i + gap){
                        newArray.push(i);
                      }
                  if(maxima2 - (10 * maxima1) >= 0 || gap <= 10){
                        return <VictoryAxis style={{ data: {fontSize: 10}, labels: {fontSize: 10}}} orientation="right" standalone={false} dependentAxis tickFormat={(y) => y}/>
                      } else {
                        return <VictoryAxis style={{ data: {fontSize: 10}, labels: {fontSize: 10}}} orientation="right" standalone={false} dependentAxis tickFormat={(y) => y / 10}/>
                      }
                    } else {
                      return null
                    }
                  }
                )}

                    <VictoryAxis style={{ data: {fontSize: 10}, labels: {fontSize: 10}}} standalone={false} tickFormat={(x) => new Date(x).getHours() + 1}/>
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
        </div>

      )
    } else {
      return(
        <div className="chart-card row">
          <div className="col">

            <div className="row card-pad">
              <h3>Comparing {this.props.chart.groups[0]} {this.props.chart.values[0]} with {this.props.chart.groups[1]}  {this.props.chart.values[1]}</h3>
              <select id={this.props.chartType}></select>
              <select onChange={this.getHistoricalData} id={this.props.timeGap}>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>

            <div className="row">

            </div>

          </div>
        </div>
      )

    }
  }
}

export default ChartCard;
