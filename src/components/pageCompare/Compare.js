import React, { Component } from 'react'

class Compare extends Component {
  render () {
    return(
      <div id="compare">
        <div className="col blue-bg-padding">
            <h2 className="font-2 compare-h2">Select Devices</h2>
            <div className="container">
              <div className="row">
                <div className="col align-self-end">
                  <select className="device-select">
                    <option value='1'>Device 1</option>
                    <option value='2'>Device 2</option>
                    <option value='3'>Device 3</option>
                  </select>
                </div>
                <div className="col-2">
                  <button className="align-self-end" id="switch-button">Switch</button>
                </div>
                <div className="col align-self-end">
                  <select className="device-select">
                    <option value='1'>Device 1</option>
                    <option value='2'>Device 2</option>
                    <option value='3'>Device 3</option>
                  </select>
                </div>
              </div>
              <button id="compare-button">Compare</button>

            </div>
        </div>
      </div>
    )
  }
}

export default Compare;
