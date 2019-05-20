import React, { Component } from 'react'
import Charts from './Charts';

class ChartList extends Component {

  render () {
      return(
        <div id="chart-list">
        { this.props.historicalData.map((data) =>
        <Charts chart={this.props.chart} data={data} key={data.id} />
        )}
        </div>
      )
  }
}

export default ChartList;
