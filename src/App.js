import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Overview from './components/pageOverview/Overview';
import Group from './components/pageGroup/Group';
import Compare from './components/pageCompare/Compare';
import Error404 from './components/pageError404/Error404';
import Navbar from './components/navbar/Navbar';

import {getAllDevices} from './Wappsto';
import './setupProxy';

const axios = require('axios');

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
      groups: []
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
        this.setState({deviceArray: deviceArray});
        return deviceArray;
    }).then((deviceArray) => {
      this.identifyWetherDevice(deviceArray);
        for( let i = 0; i < deviceArray.models.length; i++){
          for(let j = 0; j < deviceArray.models[i].attributes.value.models.length; j++){
            //SET THE MODEL FROM 0 BACK TO i
            let deviceReportState = deviceArray.models[0].attributes.value.models[j].attributes.state.findWhere({type: 'Report'});
            this.addListeners(deviceReportState, deviceArray, i, j);
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
    let stateCopy = Object.assign([], this.state.groups);
    stateCopy.push(newGroup);
    this.setState({
      groups: stateCopy
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
          <Route path='/Group' render={() => <Group deviceArray={this.state.deviceArray} groups={this.state.groups} createGroupMaster={this.createGroupMaster}/>} />
          <Route path='/Compare' render={() => <Compare/>} exact="exact"/>
          <Route path='*' component={Error404}/>
        </Switch>
      </BrowserRouter>
    </div>);
  }
}

export default App;
