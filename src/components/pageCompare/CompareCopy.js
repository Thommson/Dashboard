import React, { Component } from 'react';
import ValueGroupOption from './ValueGroupOption';
import ChartList from './ChartList';
import ChartView from './ChartView';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

class Compare extends Component {

  switch = () => {
    let select1 = document.getElementById('select-1');
    let select2 = document.getElementById('select-2');
    let holder = select1.selectedIndex;
    select1.options[select2.selectedIndex].selected = 'selected';
    select2.options[holder].selected = 'selected';
  }
  getChartValues = () => {
    let select1 = document.getElementById('select-1');
    let select2 = document.getElementById('select-2');
    var values = []
    values.push(select1.options[select1.selectedIndex].value)
    values.push(select2.options[select2.selectedIndex].value)
    var devices = [];
    devices.push(select1.options[select1.selectedIndex].getAttribute('devicename'));
    devices.push(select2.options[select2.selectedIndex].getAttribute('devicename'));
    var groups = [];
    groups.push(select1.options[select1.selectedIndex].getAttribute('groupname'));
    groups.push(select2.options[select2.selectedIndex].getAttribute('groupname'));
    var valueids = [];
    valueids.push(select1.options[select1.selectedIndex].getAttribute('valueid'));
    valueids.push(select2.options[select2.selectedIndex].getAttribute('valueid'));
    this.props.createChart(values, devices, valueids, groups);
  }

  render () {
    if(this.props.deviceArray !== undefined && this.props.historicalData !== undefined){
      return(
        <div id="compare">
          <div className="col blue-bg-padding">
              <h2 className="font-2 compare-h2">Select Values</h2>
              <div className="container">
                <div className="row">
                  <div className="col align-self-end">
                    <select id="select-1" className="device-select">
                      { this.props.groups.map((group) =>
                      <ValueGroupOption deviceArray={this.props.deviceArray} group={group} key={group.id} />
                      )}
                    </select>
                  </div>
                  <div className="col-2">
                    <button onClick={this.switch} className="align-self-end" id="switch-button">Switch</button>
                  </div>
                  <div className="col align-self-end">
                    <select id="select-2" className="device-select">
                      { this.props.groups.map((group) =>
                      <ValueGroupOption deviceArray={this.props.deviceArray} group={group} key={group.id} />
                      )}
                    </select>
                  </div>
                </div>
                <button onClick={this.getChartValues} id="compare-button">Compare</button>

              </div>
          </div>
          <ChartView chart={this.props.charts[this.props.charts.length]}/>
          <div className="container">
            <ChartList groups={this.props.groups} updateChartMaster={this.props.updateChartMaster} getHistoricalDataMaster={this.props.getHistoricalDataMaster} historicalData={this.props.historicalData} charts={this.props.charts} />
          </div>
        </div>
      )
    } else {
      return(
        <div id="compare">
          <div className="col blue-bg-padding">
              <h2 className="font-2 compare-h2">Select Values</h2>
              <div className="container">
                <div className="row">
                  <div className="col align-self-end">
                    <select className="device-select">

                    </select>
                  </div>
                  <div className="col-2">
                    <button className="align-self-end" id="switch-button">Switch</button>
                  </div>
                  <div className="col align-self-end">
                    <select className="device-select">

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
}

export default Compare;
