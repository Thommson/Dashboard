import React, { Component } from 'react'
import ChartCard from './ChartCard';

class ChartList extends Component {

  render () {
    if(this.props.charts !== undefined && this.props.historicalData !== undefined){
      return(
        <div id="chart-list">

          { this.props.charts.map((chart, index) =>
          <ChartCard pinMaster={this.props.pinMaster} groups={this.props.groups} key={"chart-card-"+index} selectid={"selectid-"+index} updateChartMaster={this.props.updateChartMaster} getHistoricalDataMaster={this.props.getHistoricalDataMaster} historicalData={this.props.historicalData} chart={chart} chartType={"chartType" + index} timeGap={"timeGap" + index} cardId={"chart-card" + index}/>
          )}

        </div>
      )
    } else {
      return(
        null
      )
    }

  }
}

export default ChartList;
