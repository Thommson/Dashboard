import React, { Component } from 'react'
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory';

class Charts extends Component {

  render () {
    if(this.props.chart.valueId1 === this.props.data.meta.id){
      return(
        <div>
          <VictoryChart theme={VictoryTheme.material}>

            <VictoryLine theme={VictoryTheme.material} sortKey="x" sortOrder="descending" y="data" x="selected_timestamp" data={this.props.data.data} />

          </VictoryChart>
        </div>
      )
    } else {
      return null
    }
  }
}

export default Charts;
