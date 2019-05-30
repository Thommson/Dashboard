import React, { Component } from 'react'
import arrow from '../../images/cursor.png'
import sun from '../../images/sun.png'

class LiveWeatherData extends Component {

  render () {


    if(this.props.weatherData !== undefined){
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const windDirections = ["North", "Northeast", "East", "Eastsouth", "South", "Southwest", "West", "Westnorth"];

      return(
        <div id="weather-data" className="row">
          <div className="col">
            <div className="row white-text">
              <div className="col-6">
                <div className="row">
                  <div className="col font-3"><div className="temp-box">{Math.round(this.props.weatherData.find({name: "temperature"}).attributes.state.models[0].attributes.data)}°C</div><img className="weather-icon" src={sun} alt="" /></div>
                </div>
                <div className="row margin-top-s">
                  <div className="col">
                    <img className="arrow-icon" src={arrow} alt="" /><div className="wind-box">{windDirections[Math.round(this.props.weatherData.find({name: "wind direction"}).attributes.state.models[0].attributes.data/45)]}<br></br>Wind</div>
                  </div>
                </div>
              </div>

              <div className="col-1"></div>

              <div className="col-5">
                <div className="row">
                   <div className="col font-3">{this.props.weatherData.find({name: "city"}).attributes.state.models[0].attributes.data}</div>

                </div>
                <div className="row margin-top-s">
                  <div className="col">{new Date().getDate()} {monthNames[new Date().getMonth()]} {new Date().getFullYear()} {new Date().getHours()}:{new Date().getMinutes()}</div>
                </div>
              </div>
            </div>

              <div className="row margin-top-m white-text">
                <div className="weather-data-subrow-box">{this.props.weatherData.find({name: "cloudiness"}).attributes.state.models[0].attributes.data}%</div>
                <div className="weather-data-subrow-box">{this.props.weatherData.find({name: "humidity"}).attributes.state.models[0].attributes.data}%</div>
                <div className="weather-data-subrow-box">{this.props.weatherData.find({name: "wind speed"}).attributes.state.models[0].attributes.data}m/s</div>
                <div className="weather-data-subrow-box">{this.props.weatherData.find({name: "pressure"}).attributes.state.models[0].attributes.data}hPa</div>
                <div className="weather-data-subrow-box">{new Date(Number(this.props.weatherData.find({name: "sunrise"}).attributes.state.models[0].attributes.data)).getHours()}:{new Date(Number(this.props.weatherData.find({name: "sunrise"}).attributes.state.models[0].attributes.data)).getMinutes()}</div>
                <div className="weather-data-subrow-box">{new Date(Number(this.props.weatherData.find({name: "sunset"}).attributes.state.models[0].attributes.data)).getHours()}:{new Date(Number(this.props.weatherData.find({name: "sunset"}).attributes.state.models[0].attributes.data)).getMinutes()}</div>
              </div>

          </div>
        </div>
      )
    } else {
      return(
        <div id="weather-data" className="row">

        </div>
      )
    }

  }
}

export default LiveWeatherData;
