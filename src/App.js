import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Overview from './components/pageOverview/Overview';
import Group from './components/pageGroup/Group';
import Compare from './components/pageCompare/Compare';
import Error404 from './components/pageError404/Error404';
import Navbar from './components/navbar/Navbar';

import {getAllDevices} from './Wappsto';
import {getDataMaster} from './Wappsto';
import './setupProxy';

import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

var deviceArray;
var userData;
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
      savedQuery: '',
      userData: ''
    }
    this.initApp = this.initApp.bind(this);
    this.addListeners = this.addListeners.bind(this);
    this.getHistoricalDataMaster = this.getHistoricalDataMaster.bind(this);
  }

  async initApp() {
    new Promise(async (resolve, reject) => {
        userData = await getDataMaster();
        if(userData.attributes !== null && userData.attributes !== undefined ){
          this.setState({
            charts: userData.attributes.charts,
            groups: userData.attributes.groups,
            unassignedDevices: userData.attributes.unassignedDevices
          })
        }
        console.log(userData);
        resolve(userData);
    }).then(async (userData) => {
      deviceArray = await getAllDevices();
      return deviceArray;
    }).then((deviceArray) => {

        console.log(deviceArray)
        this.setState({ deviceArray: deviceArray });
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
    userData.save({ groups: groupsCopy }, {patch: true});
    this.setState({ groups: groupsCopy });
  }
  assignDeviceToGroupMaster = (groupId, deviceId) => {
    let groupsCopy = Object.assign([], this.state.groups);
    for(let i = 0; i < this.state.groups.length; i++){
      if(groupsCopy[i].id === groupId){
        groupsCopy[i].assignedDevices.push(deviceId);
        userData.save({ groups: groupsCopy }, {patch: true});
        this.setState({ groups: groupsCopy });
        return;
      }
    }
  }
  countUnassignedDevicesMaster = (props) => {
      let newArray = [];
      if(userData.attributes.groups.length !== 0){
        for(let j = 0; j < deviceArray.models.length; j++){
          for(let k = 0; k < userData.attributes.groups.length; k++){

            console.log(userData)
            console.log(k)
            console.log(userData.attributes.groups[k].assignedDevices)
            if(!userData.attributes.groups[k].assignedDevices.includes(deviceArray.models[j].attributes.meta.id)){
              newArray.push(deviceArray.models[j].attributes.meta.id);
            }
          }
        }
      } else {
          for(let j = 0; j < deviceArray.models.length; j++){
            newArray.push(deviceArray.models[j].attributes.meta.id);
          }
      }

      userData.save({ unassignedDevices: newArray }, {patch: true});
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
      userData.save({ unassignedDevices: newUnassignedDevices }, {patch: true});
      this.setState({ unassignedDevices: newUnassignedDevices });
    }
    userData.save({ groups: groupsCopy }, {patch: true});
    this.setState({ groups: groupsCopy });
  }
  removeDeviceFromUnassigned = (deviceId, groupId) => {
    let unassignedDevicesCopy = Object.assign([], this.state.unassignedDevices);
    if(!unassignedDevicesCopy.includes(deviceId)){
      var newUnassignedDevices = unassignedDevicesCopy.filter(unassignedDevice => unassignedDevice !== deviceId);
      userData.save({ unassignedDevices: newUnassignedDevices }, {patch: true});
      this.setState({ unassignedDevices: newUnassignedDevices });
    }
    if(groupId === "unassigned"){
      this.removeDeviceFromGroup(deviceId, groupId)
      unassignedDevicesCopy.push(deviceId);
      userData.save({ unassignedDevices: unassignedDevicesCopy }, {patch: true});
      this.setState({ unassignedDevices: unassignedDevicesCopy });
      return;
    }
  }

  async getHistoricalDataMaster(query, devices, values, startTime, endTime){
    console.log({query, devices, values, startTime, endTime});
    let historicalDataCopy =  Object.assign([], this.state.historicalData);
      let deviceArray = this.state.deviceArray;
      for (let i = 0; i < devices.length; i++) {
          console.log(i);
          let data = await deviceArray.find({name: devices[i]}).attributes.value.find({name: values[i]}).attributes.state.findWhere({type: 'Report'}).getLogs({
            "query": query,
            "success": (model, response, XHRResponse) => {
              console.log(response)
              response.query = query;
              response.startTime = startTime;
              response.endTime = endTime;
              response.dataType = deviceArray.find({name: devices[i]}).attributes.value.find({name: values[i]}).attributes.type;
              response.dataName = deviceArray.find({name: devices[i]}).attributes.value.find({name: values[i]}).attributes.name;
              if(deviceArray.find({name: devices[i]}).attributes.value.find({name: values[i]}).attributes.number !== null){
                response.dataUnit = deviceArray.find({name: devices[i]}).attributes.value.find({name: values[i]}).attributes.number.unit;
              } else {
                response.dataUnit = '';
              }
              historicalDataCopy.push(response);
              console.log(historicalDataCopy)
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
        console.log(historicalDataCopy)
        this.setState({ historicalDeviceData: historicalDataCopy });
      }
      if(devices.length === 2 && values.length === 2){
        console.log(devices.length);
        console.log(historicalDataCopy)
        this.setState({ historicalData: historicalDataCopy });
      }
  }
  componentDidMount(){
    this.initApp()
  }
  createChart = (values, devices, valueids, groups) => {
    let checkId = valueids[0] + valueids[1];
    let chartsCopy = Object.assign([], this.state.charts);
    chartsCopy = chartsCopy.filter(chart => chart.pinned === true);
    let newIds = [];
    for(let i = 0; i < chartsCopy.length; i++){

      newIds.push(chartsCopy[i].id);
    }
    if(!newIds.includes(checkId)){
      let newChart = {};
      newChart.id = valueids[0] + valueids[1];
      newChart.values = values;
      newChart.devices = devices;
      newChart.valueids = valueids;
      newChart.groups = groups;
      newChart.pinned = false;
      newChart.query = {};
      chartsCopy.push(newChart);
      userData.save({ charts: chartsCopy }, {patch: true});
      this.setState({ charts: chartsCopy });
    }


  }
  updateChartMaster = (valueids, query, startTime, endTime) => {
    console.log(valueids)
    let chartsCopy = this.state.charts;
    for(let i = 0; i < this.state.charts.length; i++){
      if(this.state.charts[i].valueids[0] === valueids[0] && this.state.charts[i].valueids[1] === valueids[1] && this.state.charts[i].query !== query){
        chartsCopy[i].query = query
        chartsCopy[i].startTime = startTime
        chartsCopy[i].endTime = endTime
      }
    }
    console.log(chartsCopy);
    userData.save({ charts: chartsCopy }, {patch: true});
    this.setState({ charts: chartsCopy })
  }
  saveQuery = (query) => {
    this.setState({ savedQuery: query});
  }
  deleteGroup = (data) => {
    console.log(data)
    let groupsCopy = Object.assign([], this.state.groups);
    let unassignedDevicesCopy = Object.assign([], this.state.unassignedDevices);
    console.log(unassignedDevicesCopy);
    var newGroups = groupsCopy.filter(group => group.id !== data.id)
    unassignedDevicesCopy.push(...data.assignedDevices)
    userData.save({ unassignedDevices: unassignedDevicesCopy, groups: newGroups }, {patch: true});
    this.setState({
      unassignedDevices: unassignedDevicesCopy,
      groups: newGroups
    })
  }
  editGroup = (group, name) => {
    let groupsCopy = Object.assign([], this.state.groups);
    for(let i = 0; i < groupsCopy.length; i++){
      if(groupsCopy[i].id === group.id){
        groupsCopy[i].name = name;
        console.log(groupsCopy);
        userData.save({ groups: groupsCopy }, {patch: true});
        this.setState({ groups: groupsCopy });
      }
    }
    return
  }
  pinMaster = (id, setPinStatus) => {

    let chartsCopy = Object.assign([], this.state.charts);

    console.log(chartsCopy)
    for(let i = 0; i < chartsCopy.length; i++ ){
      if(chartsCopy[i].id === id){
        chartsCopy[i].pinned = setPinStatus
      }
      if(chartsCopy[i].id === id && setPinStatus === false){
        chartsCopy = chartsCopy.filter(chart => chart.id !== id);
      }
    }

    console.log(chartsCopy);
    userData.save({ charts: chartsCopy }, {patch: true});
    this.setState({ charts: chartsCopy });
  }

  render() {
    return (
      <div className="container-fluid">
      <BrowserRouter>
        <Navbar navState={this.state.navState} navActiveMaster={this.navActiveMaster}/>
        <Switch>
          <Route path='/' render={() => <Overview pinMaster={this.pinMaster} saveQuery={this.saveQuery} savedQuery={this.state.savedQuery} dataTypes={this.state.dataTypes} deviceArray={this.state.deviceArray} updateChartMaster={this.updateChartMaster} getHistoricalDataMaster={this.getHistoricalDataMaster} historicalDeviceData={this.state.historicalDeviceData} historicalData={this.state.historicalData} charts={this.state.charts} groups={this.state.groups} />} exact="exact"/>
          <Route path='/Group' render={() => <Group deleteGroup={this.deleteGroup} editGroup={this.editGroup} removeDeviceFromGroup={this.removeDeviceFromGroup} removeDeviceFromUnassigned={this.removeDeviceFromUnassigned} unassignedDevices={this.state.unassignedDevices} assignDeviceToGroupMaster={this.assignDeviceToGroupMaster} deviceArray={this.state.deviceArray} groups={this.state.groups} createGroupMaster={this.createGroupMaster}/>} />
          <Route path='/Compare' render={() => <Compare pinMaster={this.pinMaster} updateChartMaster={this.updateChartMaster} getHistoricalDataMaster={this.getHistoricalDataMaster} historicalData={this.state.historicalData} charts={this.state.charts} createChart={this.createChart} groups={this.state.groups} deviceArray={this.state.deviceArray} />} exact="exact"/>
          <Route path='*' component={Error404}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
  }
}

export default DragDropContext(HTML5Backend)(App)
