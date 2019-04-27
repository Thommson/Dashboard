import React, { Component } from 'react'
import { VictoryChart, VictoryAxis, VictoryLabel, VictoryBar } from 'victory';

const data = [
  {time: "00:00", temperature: 13},
  {time: "03:00", temperature: 16},
  {time: "06:00", temperature: 14},
  {time: "09:00", temperature: 19},
  {time: "12:00", temperature: 16},
  {time: "15:00", temperature: 14},
  {time: "18:00", temperature: 19},
  {time: "21:00", temperature: 14},
  {time: "24:00", temperature: 19}
];

class WeatherChart extends Component {
  render () {
    return(
      <div className="main-chart">
        <VictoryChart width={1200}>
          <VictoryBar
            domainPadding={16}
            height={500}
            width={1200}
            data={data}
            labels={(data) => data.temperature}
            barRatio={1.34}
            x="time"
            y="temperature"
            labelComponent={<VictoryLabel />}
          />
        <VictoryAxis style={{
            axis: {stroke: "none"}
          }}/>
      </VictoryChart>
      </div>
    )
  }
}

export default WeatherChart;
