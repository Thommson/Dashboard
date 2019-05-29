import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Overview from './components/pageOverview/Overview';
import Group from './components/pageGroup/Group';
import Compare from './components/pageCompare/Compare';
import Error404 from './components/pageError404/Error404';
import Navbar from './components/navbar/Navbar';

import {getAllDevices} from './Wappsto';
import './setupProxy';

import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

var deviceArray;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navState: 'nav-home',
      dataTypes: [
        {
          name: "temperature",
          add: "°C"
        },
        {
          name: "cloudiness",
          add: "%"
        },
        {
          name: "humidity",
          add: "%"
        },
        {
          name: "pressure",
          add: "hPa"
        },
        {
          name: "wind speed",
          add: "m/s"
        },
        {
          name: "wind direction",
          add: "deg"
        },
      ],
      groups: [],
      unassignedDevices: [],
      charts: [],
      historicalData: [],

    }
    this.initApp = this.initApp.bind(this);
    this.addListeners = this.addListeners.bind(this);
    this.getHistoricalDataMaster = this.getHistoricalDataMaster.bind(this);
  }

  async initApp() {
    new Promise(async (resolve, reject) => {
        deviceArray = await getAllDevices();
        resolve(deviceArray);
    }).then((deviceArray) => {
        console.log(deviceArray)
        //this.getHistoricalDataMaster(deviceArray);
        this.setState({deviceArray: deviceArray});
        return deviceArray;
    }).then((deviceArray) => {
      this.countUnassignedDevicesMaster(deviceArray)
        for( let i = 0; i < deviceArray.models.length; i++){
          for(let j = 0; j < deviceArray.models[i].attributes.value.models.length; j++){
            //SET THE MODEL FROM 0 BACK TO i
            let deviceReportState = deviceArray.models[i].attributes.value.models[j].attributes.state.findWhere({type: 'Report'});
            //this.addListeners(deviceReportState, deviceArray, i, j);
          }
        }
    });
  }
  navActiveMaster = (active) => {
    this.setState({ navState: active })
  }
  addListeners = (deviceReportState, deviceArray, i, j) => {
    deviceReportState.on('change:data', (data) => {
        let stateCopy = this.state.deviceArray;
        stateCopy.models[i].attributes.value.models[j].attributes.state.models[0].attributes = data.attributes;
        this.setState({ deviceArray: stateCopy })
    });
  }
  createGroupMaster = (newGroup) => {
    let groupsCopy = Object.assign([], this.state.groups);
    groupsCopy.push(newGroup);
    this.setState({ groups: groupsCopy });
  }
  assignDeviceToGroupMaster = (groupId, deviceId) => {
    let groupsCopy = Object.assign([], this.state.groups);
    for(let i = 0; i < this.state.groups.length; i++){
      if(groupsCopy[i].id === groupId){
        groupsCopy[i].assignedDevices.push(deviceId);
        this.setState({ groups: groupsCopy });
        return;
      }
    }
  }
  countUnassignedDevicesMaster = (props) => {
    let newArray = [];
    for(let j = 0; j < deviceArray.models.length; j++){
        newArray.push(deviceArray.models[j].attributes.meta.id);
      }
    this.setState({ unassignedDevices: newArray });
  }
  removeDeviceFromGroup = (deviceId, groupId) => {
    let groupsCopy = Object.assign([], this.state.groups);
    let unassignedDevicesCopy = Object.assign([], this.state.unassignedDevices);
    for(let i = 0; i < groupsCopy.length; i++){
      if(groupsCopy[i].id === groupId && !groupsCopy[i].assignedDevices.includes(deviceId)){
        var newAssignedDevices = groupsCopy[i].assignedDevices.filter(assignedDevice => assignedDevice === deviceId)
        groupsCopy[i].assignedDevices = newAssignedDevices;
      }
      if(groupsCopy[i].id !== groupId && groupsCopy[i].assignedDevices.includes(deviceId)){
        var newAssignedDevices = groupsCopy[i].assignedDevices.filter(assignedDevice => assignedDevice !== deviceId)
        groupsCopy[i].assignedDevices = newAssignedDevices;
      }
      var newUnassignedDevices = unassignedDevicesCopy.filter(unassignedDevice => unassignedDevice !== deviceId);
      this.setState({ unassignedDevices: newUnassignedDevices });
    }
    this.setState({ groups: groupsCopy });
  }
  removeDeviceFromUnassigned = (deviceId, groupId) => {
    let unassignedDevicesCopy = Object.assign([], this.state.unassignedDevices);
    if(!unassignedDevicesCopy.includes(deviceId)){
      var newUnassignedDevices = unassignedDevicesCopy.filter(unassignedDevice => unassignedDevice !== deviceId);
      this.setState({ unassignedDevices: newUnassignedDevices });
    }
    if(groupId === "unassigned"){
      this.removeDeviceFromGroup(deviceId, groupId)
      unassignedDevicesCopy.push(deviceId);
      this.setState({ unassignedDevices: unassignedDevicesCopy });
      return;
    }
  }

  async getHistoricalDataMaster(query, devices, values){
    let historicalDataCopy =  Object.assign([], this.state.historicalData);
      let deviceArray = this.state.deviceArray;
      for (let i = 0; i < devices.length; i++) {
          console.log(i);
          let data = await deviceArray.find({name: devices[i]}).attributes.value.find({name: values[i]}).attributes.state.findWhere({type: 'Report'}).getLogs({
            "query": query,
            "success": (model, response, XHRResponse) => {
              response.query = query;
              response.dataType = deviceArray.find({name: devices[i]}).attributes.value.find({name: values[i]}).attributes.type;
              response.dataName = deviceArray.find({name: devices[i]}).attributes.value.find({name: values[i]}).attributes.name;
              historicalDataCopy.push(response);
              return historicalDataCopy
            },
            "error": (model, XHRResponse) => {
              console.log("something went wrong", XHRResponse);
              return
            }
          })
      }
      if(devices.length === 1 && values.length === 1) {
        console.log(devices.length);
        this.setState({ historicalDeviceData: historicalDataCopy });
        return
      }
      if(devices.length === 2 && values.length === 2){
        console.log(devices.length);
        this.setState({ historicalData: historicalDataCopy });
        return
      }


  }

  createChart = (values, devices, valueids, groups) => {
    let chartsCopy = Object.assign([], this.state.charts);
    let newChart = {};
    newChart.values = values;
    newChart.devices = devices;
    newChart.valueids = valueids;
    newChart.groups = groups
    newChart.query = {};
    chartsCopy.push(newChart);
    this.setState({ charts: chartsCopy });
  }
  updateChartMaster = (valueids, query) => {
    console.log(valueids)
    let chartsCopy = this.state.charts;
    for(let i = 0; i < this.state.charts.length; i++){
      if(this.state.charts[i].valueids[0] === valueids[0] && this.state.charts[i].valueids[1] === valueids[1] && this.state.charts[i].query !== query){
        chartsCopy[i].query = query
      }
    }
    console.log(chartsCopy);
    this.setState({
      charts: chartsCopy
    })
  }

  render() {
    return (<div className="container-fluid">
      <BrowserRouter>
        <Navbar navState={this.state.navState} navActiveMaster={this.navActiveMaster}/>
        <button onClick={this.initApp}>Refresh</button>

        <Switch>
          <Route path='/' render={() => <Overview dataTypes={this.state.dataTypes} deviceArray={this.state.deviceArray} updateChartMaster={this.updateChartMaster} getHistoricalDataMaster={this.getHistoricalDataMaster} historicalDeviceData={this.state.historicalDeviceData} historicalData={this.state.historicalData} charts={this.state.charts} groups={this.state.groups} />} exact="exact"/>
          <Route path='/Group' render={() => <Group removeDeviceFromGroup={this.removeDeviceFromGroup} removeDeviceFromUnassigned={this.removeDeviceFromUnassigned} unassignedDevices={this.state.unassignedDevices} assignDeviceToGroupMaster={this.assignDeviceToGroupMaster} deviceArray={this.state.deviceArray} groups={this.state.groups} createGroupMaster={this.createGroupMaster}/>} />
          <Route path='/Compare' render={() => <Compare updateChartMaster={this.updateChartMaster} getHistoricalDataMaster={this.getHistoricalDataMaster} historicalData={this.state.historicalData} charts={this.state.charts} createChart={this.createChart} groups={this.state.groups} deviceArray={this.state.deviceArray} />} exact="exact"/>
          <Route path='*' component={Error404}/>
        </Switch>
      </BrowserRouter>
    </div>);
  }
}

export default DragDropContext(HTML5Backend)(App)
