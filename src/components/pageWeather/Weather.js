import React, { Component } from 'react'
import WeatherChart from '../Charts/WeatherChart';

class Weather extends Component {

  render () {
      return(
        <div id="weather">
          <WeatherChart />
            <div className="chart-list">

            </div>
        </div>
      )
    };
  }

export default Weather;
