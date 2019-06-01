import React, { Component } from 'react'
import arrow from '../../images/cursor.png'
import sun from '../../images/sun.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import { faWater } from '@fortawesome/free-solid-svg-icons'
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'
import { faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'
class LiveWeatherData extends Component {

  render () {


    if(this.props.weatherData !== undefined){
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const windDirections = ["North", "Northeast", "East", "Eastsouth", "South", "Southwest", "West", "Westnorth"];

      var windDir = Math.round(this.props.weatherData.find({name: "wind direction"}).attributes.state.models[0].attributes.data)
      console.log(windDir)
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
                      <FontAwesomeIcon icon={faLocationArrow} size="2x" className="arrow-icon" transform={{ rotate: windDir }} /><div className="wind-box">{windDirections[Math.round(this.props.weatherData.find({name: "wind direction"}).attributes.state.models[0].attributes.data/45)]}<br></br>Wind</div>
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
                <div className="weather-data-subrow-box"><FontAwesomeIcon icon={faCloud} size="xs" />{this.props.weatherData.find({name: "cloudiness"}).attributes.state.models[0].attributes.data}%</div>
                <div className="weather-data-subrow-box"><FontAwesomeIcon icon={faWater} size="xs" />{this.props.weatherData.find({name: "humidity"}).attributes.state.models[0].attributes.data}%</div>
                <div className="weather-data-subrow-box"><FontAwesomeIcon icon={faWind} size="xs" />{this.props.weatherData.find({name: "wind speed"}).attributes.state.models[0].attributes.data}m/s</div>
                <div className="weather-data-subrow-box"><FontAwesomeIcon icon={faTachometerAlt} size="xs" />{this.props.weatherData.find({name: "pressure"}).attributes.state.models[0].attributes.data}hPa</div>
                <div className="weather-data-subrow-box"><FontAwesomeIcon icon={ faLongArrowAltUp } size="xs" /><FontAwesomeIcon icon={faSun} size="xs" />{new Date(Number(this.props.weatherData.find({name: "sunrise"}).attributes.state.models[0].attributes.data)).getHours()}:{new Date(Number(this.props.weatherData.find({name: "sunrise"}).attributes.state.models[0].attributes.data)).getMinutes()}</div>
                <div className="weather-data-subrow-box"><FontAwesomeIcon icon={ faLongArrowAltDown } size="xs" /><FontAwesomeIcon icon={faSun} size="xs" />{new Date(Number(this.props.weatherData.find({name: "sunset"}).attributes.state.models[0].attributes.data)).getHours()}:{new Date(Number(this.props.weatherData.find({name: "sunset"}).attributes.state.models[0].attributes.data)).getMinutes()}</div>
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
