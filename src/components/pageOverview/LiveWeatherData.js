import React, { Component } from 'react'
import arrow from '../../images/cursor.png'
import sun from '../../images/sun.png'

class LiveWeatherData extends Component {

  render () {
    if(this.props.temperature !== null){
      return(
        <div id="weather-data" className="row">
          <div className="col">
            <div className="row white-text">
              <div className="col-6">
                <div className="row">
                  <div className="col font-3"><div className="temp-box">{this.props.temperature}°C</div><img className="weather-icon" src={sun} alt="" /></div>
                </div>
                <div className="row margin-top-s">
                  <div className="col">
                    <img className="arrow-icon" src={arrow} alt="" /><div className="wind-box">North East<br></br>Wind</div>
                  </div>
                </div>
              </div>

              <div className="col-1"></div>

              <div className="col-5">
                <div className="row">
                   <div className="col font-3">{this.props.city}</div>

                </div>
                <div className="row margin-top-s">
                  <div className="col">Wednesday, 3 April 2019 14:26</div>
                </div>
              </div>
            </div>

              <div className="row margin-top-m white-text">
                <div className="col-2">{this.props.humidity}%</div>
                <div className="col-2">{this.props.windspeed}m/s</div>
                <div className="col-2">{this.props.cloudiness}%</div>
                <div className="col-2" id="sunrise"></div>
                <div className="col-2" id="sunset"></div>
                <div className="col-2">{this.props.pressure}</div>
              </div>

          </div>
        </div>
      )
    } else {
      return(
        <div id="weather-data" className="row">
          <div className="col">
            <div className="row white-text">
              <div className="col-6">
                <div className="row">
                  <div className="col font-3"><div className="temp-box">20°C</div><img className="weather-icon" src={sun} alt="" /></div>
                </div>
                <div className="row margin-top-s">
                  <div className="col">
                    <img className="arrow-icon" src={arrow} alt="" /><div className="wind-box">North East<br></br>Wind</div>
                  </div>
                </div>
              </div>

              <div className="col-1"></div>

              <div className="col-5">
                <div className="row">
                   <div className="col font-3">...</div>

                </div>
                <div className="row margin-top-s">
                  <div className="col">Wednesday, 3 April 2019 14:26</div>
                </div>
              </div>
            </div>

              <div className="row margin-top-m white-text">
                <div className="col-2">12%</div>
                <div className="col-2">4m/s</div>
                <div className="col-2">0%</div>
                <div className="col-2">3km</div>
                <div className="col-2">1050hPa</div>
              </div>

          </div>
        </div>
      )
    }

  }
}

export default LiveWeatherData;
