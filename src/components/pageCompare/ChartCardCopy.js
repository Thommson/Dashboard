import React, { Component } from 'react'

import { VictoryChart, VictoryLine, VictoryGroup, VictoryAxis, VictoryTheme } from 'victory';

class ChartCard extends Component {
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
      let select = document.getElementById(this.props.timeGap);
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
      this.props.getHistoricalDataMaster(query, this.props.chart.devices, this.props.chart.values);
      this.props.updateChartMaster(this.props.chart.valueids, query);
  }



  render () {
    let maxima1;
    let maxima2;

    if(this.props.historicalData !== undefined){
      return(
        <div className="chart-card row card">
          <div className="col">

            <div className="row">
              <h3>Comparing {this.props.chart.groups[0]} {this.props.chart.values[0]} with {this.props.chart.groups[1]}  {this.props.chart.values[1]}</h3>
              <select id={this.props.chartType}></select>
              <select onChange={this.getHistoricalData} id={this.props.timeGap}>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>

            <div className="row">
              <VictoryChart theme={VictoryTheme.material} id={this.props.cardId} className="chart-card-content">

                { this.props.historicalData.map((data) => {
                  if(this.props.chart.valueids[0] === data.meta.id && this.props.chart.query === data.query){
                      maxima1 = Math.max(...data.data.map((d) => d.avg));
                      console.log(Math.round(maxima1))
                    }
                  })
                }
                { this.props.historicalData.map((data) => {
                  if(this.props.chart.valueids[1] === data.meta.id && this.props.chart.query === data.query){
                      maxima2 = Math.max(...data.data.map((d) => d.avg));
                      console.log(Math.round(maxima2));
                    }
                  })
                }
                { this.props.historicalData.map((data) => {
                  if(this.props.chart.valueids[0] === data.meta.id && this.props.chart.query === data.query){
                      return  <VictoryLine sortOrder="ascending" sortKey="selected_timestamp" x="selected_timestamp" y={(datum) => datum.avg * Math.round(maxima2)} data={data.data}/>
                  } else {
                      return null
                    }
                  }
                )}
                { this.props.historicalData.map((data) => {
                  if(this.props.chart.valueids[1] === data.meta.id && this.props.chart.query === data.query){
                        return  <VictoryLine sortOrder="ascending" sortKey="selected_timestamp" x="selected_timestamp" y={(datum) => datum.avg * Math.round(maxima1)}  data={data.data}/>
                    } else {
                      return null
                    }
                  }
                )}
                { this.props.historicalData.map((data) => {

                  let newArray = []
                  if(this.props.chart.valueids[0] === data.meta.id && this.props.chart.query === data.query){

                    let min = data.data[0].avg;
                    let max = data.data[0].avg;
                    for(let i = 0; i < data.data.length; i++){
                      if(min > data.data[i].avg){
                        min = data.data[i].avg;
                      }
                      if(max < data.data[i].avg){
                        max = data.data[i].avg;
                      }
                    }
                    let diff = max - min;
                    if(Math.round(diff) === 0){
                      newArray.push(min * Math.round(maxima1));
                    }
                    for(let j = 0; j <= Math.round(diff); j++){
                      let newVal = Math.round(min) + j;
                      newArray.push(newVal * Math.round(maxima2));
                    }
                    console.log(newArray);
                      return  <VictoryAxis orientation="left" standalone={false} dependentAxis tickValues={newArray} tickCount={newArray.length} tickFormat={(y) => Math.round( y / Math.round(maxima2))}/>
                    } else {
                      return null
                    }
                  }
                )}
                { this.props.historicalData.map((data) => {

                  let newArray = []
                  if(this.props.chart.valueids[1] === data.meta.id && this.props.chart.query === data.query){

                    let min = data.data[0].avg;
                    let max = data.data[0].avg;
                    for(let i = 0; i < data.data.length; i++){
                      if(min > data.data[i].avg){
                        min = data.data[i].avg;
                      }
                      if(max < data.data[i].avg){
                        max = data.data[i].avg;
                      }
                    }
                    let diff = max - min;
                    if(Math.round(diff) === 0){
                      newArray.push(min * Math.round(maxima1));
                    }
                    for(let j = 0; j <= Math.round(diff); j++){
                      let newVal = Math.round(min) + j;
                      newArray.push(newVal * Math.round(maxima1));
                    }
                    console.log(newArray);

                      return <VictoryAxis orientation="right" standalone={false} dependentAxis tickValues={newArray} tickCount={newArray.length} tickFormat={(y) =>  Math.round(y / Math.round(maxima1))}/>
                    } else {
                      return null
                    }
                  }
                )}

                    <VictoryAxis standalone={false} tickFormat={(x) => new Date(x).getHours()}/>
              </VictoryChart>
            </div>

            <div className="row">
              <div className="col">

                <div className="row">
                  <div className="col-2">
                    <h3>Average Temp</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                    <p>Kitchen temp: 21</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                    <p>Kitchen CO2: 425ppm</p>
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

            <div className="row">
              <h3>Comparing name + name</h3>
              <select id={this.props.chartType}></select>
              <select onChange={this.getHistoricalData} id={this.props.timeGap}>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>

            <div className="row">

            </div>

            <div className="row">
              <div className="col">

                <div className="row">
                  <div className="col-2">
                    <h3>Average Temp</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                    <p>Kitchen temp: 21</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2">
                    <p>Kitchen CO2: 425ppm</p>
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

export default ChartCard;
