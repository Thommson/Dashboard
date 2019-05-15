import React, { Component } from 'react'
import { VictoryChart, VictoryAxis, VictoryLabel, VictoryBar } from 'victory';

class Charts extends Component {
  render () {
    return(
      <div className="charts row">
        <div className="col">
          <div className="row">
            <div className="col">
              <h3>Chart Name</h3>
              <select>
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
              <select>
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="pie">Pie</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Charts;
