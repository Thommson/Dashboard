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
      navState: 'Home',
      temperature: '',
      cloudiness: '',
      humidity: '',
      city: '',
      pressure: '',
      sunset: '',
      sunrise: '',
      groups: [],
      unassignedDevices: [],
      charts: [],
      historicalData: []
    }
    this.initApp = this.initApp.bind(this);
    this.addListeners = this.addListeners.bind(this);
  }

  async initApp() {
    new Promise(async (resolve, reject) => {
        deviceArray = await getAllDevices();
        console.log(deviceArray);
        resolve(deviceArray);
    }).then((deviceArray) => {
        this.getAllhistoricalData(deviceArray);
        this.setState({deviceArray: deviceArray});
        return deviceArray;
    }).then((deviceArray) => {
      this.identifyWetherDevice(deviceArray);
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
  addListeners = (deviceReportState, deviceArray, i, j) => {
    deviceReportState.on('change:data', (data) => {
      new Promise((resolve, reject) => {
        let stateCopy = Object.assign({}, this.state.deviceArray);
        stateCopy.models[i].attributes.value.models[j].attributes.state.models[0].attributes = data.attributes;
        this.setState({deviceArray: stateCopy})
        resolve(deviceArray);
      }).then((deviceArray) => {
        this.identifyWetherDevice(deviceArray);
      });
    });
  }
  identifyWetherDevice = (deviceArray) =>{
    console.log("WEATHER UPDATED HERE!!!");
    for(let j = 0; j < deviceArray.find({name: "Current Weather"}).attributes.value.models.length; j++){
      let dataName = deviceArray.find({name: "Current Weather"}).attributes.value.models[j].attributes.name;
      let newData = deviceArray.find({name: "Current Weather"}).attributes.value.models[j].attributes.state.models[0].attributes.data
      this.setState({
        [dataName]: newData
      });
    }
  }
  createGroupMaster = (newGroup) => {
    let groupsCopy = Object.assign([], this.state.groups);
    groupsCopy.push(newGroup);
    this.setState({
      groups: groupsCopy
    });
  }
  /*
  assignDeviceToGroupMaster = (groupId, deviceId) => {
    console.log("ASSIGNING NEW DEVICES TO GROUP")
    let groupsCopy = Object.assign([], this.state.groups);
    for(let i = 0; i < this.state.groups.length; i++){
      if(groupsCopy[i].id === groupId){
        groupsCopy[i].assignedDevices.push(deviceId);
      }
    }
    this.setState({
      groups: groupsCopy
    });
  }
  */
  assignDeviceToGroupMaster = (groupId, deviceId) => {
    console.log("ASSIGNING NEW DEVICES TO GROUP")

    let groupsCopy = Object.assign([], this.state.groups);

    for(let i = 0; i < this.state.groups.length; i++){
      if(groupsCopy[i].id === groupId){
        groupsCopy[i].assignedDevices.push(deviceId);
        this.setState({
          groups: groupsCopy
        });
        return;
      }
    }


  }
  countUnassignedDevicesMaster = (props) => {
    console.log("COUNTING UNASSIGNED GROUP")
    console.log(this.state);
    console.log(props)
    let newArray = [];
    for(let j = 0; j < deviceArray.models.length; j++){
        newArray.push(deviceArray.models[j].attributes.meta.id);
      }
    console.log(newArray);
    this.setState({
      unassignedDevices: newArray
    });
  }
  removeDeviceFromGroup = (deviceId, groupId) => {
    console.log("removing device")
    console.log(deviceId, groupId);
    let groupsCopy = Object.assign([], this.state.groups);
    let unassignedDevicesCopy = Object.assign([], this.state.unassignedDevices);
    for(let i = 0; i < groupsCopy.length; i++){
      if(groupsCopy[i].id === groupId && !groupsCopy[i].assignedDevices.includes(deviceId)){
        var newAssignedDevices = groupsCopy[i].assignedDevices.filter(assignedDevice => assignedDevice === deviceId)
        console.log('F1')
        groupsCopy[i].assignedDevices = newAssignedDevices;
      }
      if(groupsCopy[i].id !== groupId && groupsCopy[i].assignedDevices.includes(deviceId)){
        var newAssignedDevices = groupsCopy[i].assignedDevices.filter(assignedDevice => assignedDevice !== deviceId)
        console.log('F2')
        groupsCopy[i].assignedDevices = newAssignedDevices;
      }
      var newUnassignedDevices = unassignedDevicesCopy.filter(unassignedDevice => unassignedDevice !== deviceId);
      console.log("ACTIVATED");
      this.setState({
        unassignedDevices: newUnassignedDevices
      });
    }
    this.setState({
      groups: groupsCopy
    });
  }
  removeDeviceFromUnassigned = (deviceId, groupId) => {
    console.log(groupId);
    let unassignedDevicesCopy = Object.assign([], this.state.unassignedDevices);
    if(!unassignedDevicesCopy.includes(deviceId)){
      var newUnassignedDevices = unassignedDevicesCopy.filter(unassignedDevice => unassignedDevice !== deviceId);
      console.log("ACTIVATED");
      this.setState({
        unassignedDevices: newUnassignedDevices
      });
    }
    if(groupId === "unassigned"){
      this.removeDeviceFromGroup(deviceId, groupId)
      unassignedDevicesCopy.push(deviceId);
      this.setState({
        unassignedDevices: unassignedDevicesCopy
      });

      return;
    }
  }
  /*
  getAllhistoricalData = (deviceArray) => {

    new Promise((resolve, reject) => {
      let historicalDataArray = [];

      for (let i = 0; i < deviceArray.models.length; i++) {
        let historicalDataArrayObject = {};
        let historicalData = [];
        for (let j = 0; j < deviceArray.models[i].attributes.value.length; j++) {

          historicalDataArrayObject.id = deviceArray.models[i].attributes.meta.id;
          deviceArray.models[i].attributes.value.models[j].attributes.state.findWhere({type: 'Report'}).getLogs({
            "query": "start=2018-12-21T09:52:21+01:00&end=2019-05-13T12:16:21+01:00",
            "success": (model, response, XHRResponse) => {
              console.log("Successful Response:");
              console.log(response);
              response.dataType = deviceArray.models[i].attributes.value.models[j].attributes.type;
              response.dataName = deviceArray.models[i].attributes.value.models[j].attributes.name;
              historicalData.push(response);
              historicalDataArrayObject.data = historicalData
              return historicalDataArrayObject;
            },
            "error": (model, XHRResponse) => {
              console.log("something went wrong", XHRResponse);
            }
          });
        }
        console.log({historicalDataArrayObject});
        historicalDataArray.push({historicalDataArrayObject});
      }

    resolve(historicalDataArray);
  }).then((historicalDataArray) => {
      console.log('Done');
    this.setState({
      historicalDataArray: historicalDataArray
    });
  });
  }
  */
  getAllhistoricalData = (deviceArray) => {

    new Promise((resolve, reject) => {
      let historicalData = [];
      for (let i = 0; i < deviceArray.models.length; i++) {
        for (let j = 0; j < deviceArray.models[i].attributes.value.length; j++) {
          deviceArray.models[i].attributes.value.models[j].attributes.state.findWhere({type: 'Report'}).getLogs({
            "query": "start=2019-05-20T09:45:00+01:00&end=2019-05-21T12:16:21+01:00",
            "success": (model, response, XHRResponse) => {
              console.log("Successful Response:");
              console.log(response);
              response.dataType = deviceArray.models[i].attributes.value.models[j].attributes.type;
              response.dataName = deviceArray.models[i].attributes.value.models[j].attributes.name;
              historicalData.push(response);
              return historicalData;
            },
            "error": (model, XHRResponse) => {
              console.log("something went wrong", XHRResponse);
            }
          });
        }
      }
    resolve(historicalData);
  }).then((historicalData) => {
      this.setState({ historicalData: historicalData });
    });
  }
  createChart = (valueId1, valueId2) => {
    let chartsCopy = Object.assign([], this.state.charts);
    let newChart = {};
    newChart.valueId1 = valueId1
    newChart.valueId2 = valueId2
    chartsCopy.push(newChart);
    this.setState({
      charts: chartsCopy
    });
  }

  render() {
    return (<div className="container-fluid">
      <BrowserRouter>
        <Navbar/>
        <button onClick={this.initApp}>Refresh</button>
        <button onClick={this.getAllhistoricalData}>Get Historical Data</button>
        <Switch>
          <Route path='/' render={() => <Overview temperature={this.state.temperature} cloudiness={this.state.cloudiness} city={this.state.city} humidity={this.state.humidity} pressure={this.state.pressure} sunset={this.state.sunset} sunrise={this.state.sunrise} identifyWetherDeviceMaster={this.identifyWetherDeviceMaster} deviceArray={this.state.deviceArray}/>} exact="exact"/>
          <Route path='/Group' render={() => <Group removeDeviceFromGroup={this.removeDeviceFromGroup} removeDeviceFromUnassigned={this.removeDeviceFromUnassigned} unassignedDevices={this.state.unassignedDevices} assignDeviceToGroupMaster={this.assignDeviceToGroupMaster} deviceArray={this.state.deviceArray} groups={this.state.groups} createGroupMaster={this.createGroupMaster}/>} />
          <Route path='/Compare' render={() => <Compare historicalData={this.state.historicalData} charts={this.state.charts} createChart={this.createChart} groups={this.state.groups} deviceArray={this.state.deviceArray} />} exact="exact"/>
          <Route path='*' component={Error404}/>
        </Switch>
      </BrowserRouter>
    </div>);
  }
}

export default DragDropContext(HTML5Backend)(App)
