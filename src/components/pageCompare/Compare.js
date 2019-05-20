import React, { Component } from 'react';
import ValueGroupOption from './ValueGroupOption';
import ChartList from './ChartList';



class Compare extends Component {


  getChartValues = () => {
    //var valueId1 = document.getElementById('select-1');
    //var valueId1 = document.getElementById('select-1');
    let select1 = document.getElementById('select-1');
    let select2 = document.getElementById('select-2');
    var valueId1 = select1.options[select1.selectedIndex].value;
    var valueId2 = select2.options[select2.selectedIndex].value;
    this.props.createChart(valueId1, valueId2)
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
                    <button className="align-self-end" id="switch-button">Switch</button>
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
          { this.props.charts.map((chart) =>
          <ChartList historicalData={this.props.historicalData} chart={chart} key={chart.id} />
          )}

        </div>
      )
    } else {
      return(
        <div id="compare">
          <div className="col blue-bg-padding">
              <h2 className="font-2 compare-h2">Select Devices</h2>
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
