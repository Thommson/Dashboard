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
      const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
      const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const windDirections = ["North", "Northeast", "East", "Eastsouth", "South", "Southwest", "West", "Westnorth"];

      var windDir = Math.round(this.props.weatherData.find({name: "wind direction"}).attributes.state.models[0].attributes.data)
      console.log(windDir)
      return(
        <div id="weather-data" className="row">
          <div className="col white-text">
            <div className="row">
              <div className="inline-left font-4">Weather in {this.props.weatherData.find({name: "city"}).attributes.state.models[0].attributes.data}</div>
            </div>
            <div className="row">
              <div className="inline-left">{dayNames[new Date().getDay()]},<br></br> {new Date().getDate()} {monthNames[new Date().getMonth()]} {new Date().getFullYear()} {new Date().getHours()}:{new Date().getMinutes()}</div>
            </div>
            <div className="row margin-top-m">
              <div className="col-6 inline-left font-4"><img className="weather-icon" src={sun} alt="" /><div className="temp-box">{Math.round(this.props.weatherData.find({name: "temperature"}).attributes.state.models[0].attributes.data)}°C</div></div>
              <div className="col-6 inline-left"><FontAwesomeIcon icon={faLocationArrow} size="2x" className="arrow-icon" transform={{ rotate: windDir }} /><div className="wind-box">{windDirections[Math.round(this.props.weatherData.find({name: "wind direction"}).attributes.state.models[0].attributes.data/45)]}<br></br>Wind</div></div>
            </div>
            <div className="row margin-top-m white-text">
              <div className="col-6"><FontAwesomeIcon className="stock-icon" icon={ faCloud } size="xs" />{this.props.weatherData.find({name: "cloudiness"}).attributes.state.models[0].attributes.data}%</div>
              <div className="col-6"><FontAwesomeIcon className="stock-icon" icon={ faWind } size="xs" />{this.props.weatherData.find({name: "wind speed"}).attributes.state.models[0].attributes.data}m/s</div>
            </div>
            <div className="row white-text">
              <div className="col-6"><FontAwesomeIcon className="stock-icon" icon={ faWater } size="xs" />{this.props.weatherData.find({name: "humidity"}).attributes.state.models[0].attributes.data}%</div>
              <div className="col-6"><FontAwesomeIcon className="stock-icon" icon={ faTachometerAlt } size="xs" />{this.props.weatherData.find({name: "pressure"}).attributes.state.models[0].attributes.data}hPa</div>
            </div>
            <div className="row white-text">
              <div className="col-6"><FontAwesomeIcon icon={faSun} size="xs" /><FontAwesomeIcon className="stock-icon" icon={ faLongArrowAltUp } size="xs" />{new Date(Number(this.props.weatherData.find({name: "sunrise"}).attributes.state.models[0].attributes.data*1000)).getHours()}:{new Date(Number(this.props.weatherData.find({name: "sunrise"}).attributes.state.models[0].attributes.data*1000)).getMinutes()}</div>
              <div className="col-6"><FontAwesomeIcon icon={faSun} size="xs" /><FontAwesomeIcon className="stock-icon" icon={ faLongArrowAltDown } size="xs" />{new Date(Number(this.props.weatherData.find({name: "sunset"}).attributes.state.models[0].attributes.data*1000)).getHours()}:{new Date(Number(this.props.weatherData.find({name: "sunset"}).attributes.state.models[0].attributes.data*1000)).getMinutes()}</div>
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
