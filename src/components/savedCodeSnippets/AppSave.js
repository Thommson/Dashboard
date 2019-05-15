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
      devices: []
    }
    this.getDataPromise = this.getDataPromise.bind(this);
  }

  //Gets wappsto networks
  async getDataPromise() {
    new Promise(async (resolve, reject) => {
      deviceArray = await getAllDevices();
      console.log(deviceArray);
      resolve(deviceArray);
    }).then((deviceArray) => {
      this.setState({deviceArray: deviceArray});
      //this.getAllhistoricalData(deviceArray);

      let newDevices = this.state.devices.slice();
      for( let i = 0; i < deviceArray.models.length; i++){
        let newObject = {};
        let newDataArray = [];
        newObject.id = deviceArray.models[i].attributes.meta.id;
        for(let j = 0; j < deviceArray.models[i].attributes.value.length; j++){
          let newData = {};
          newData.valueName = deviceArray.models[i].attributes.value.models[j].attributes.name;
          newData.valueData = deviceArray.models[i].attributes.value.models[j].attributes.state.findWhere({type: 'Report'}).attributes.data;
          newDataArray.push(newData);
          newObject.values = newDataArray;
        }
        newDevices.push(newObject);
      }
      return newDevices;
    }).then((newDevices) => {
      this.setState({
        devices: newDevices
      });

    });

  }
  addListeners = (deviceReportState, deviceArray, i, j) => {
    deviceReportState.on('change:data', (data) => {
      deviceArray.models[i].attributes.value.models[j].attributes.state.findWhere({type: 'Report'}).data = data;
      this.setState({deviceArray: deviceArray});
    });

    //console.log(deviceArray.findWhere({name: deviceArray.models[queNumber].attributes.value.models[i].attributes.name}));

    /*
    device.get('state').findWhere({type: 'Report'}).on('change:data', (locat) => {
      outdoorDataCopy.location = locat.attributes.data;
      this.setState({ outdoorData: outdoorDataCopy });
    });
    */
  }
  getAllhistoricalData = (deviceArray) => {

    new Promise((resolve, reject) => {
      let historicalDataArray = [];
      for (let i = 0; i < deviceArray.models.length; i++) {
        let historicalDataObject = {};
        let historicalData = [];
        for (let j = 0; j < deviceArray.models[i].attributes.value.length; j++) {
          deviceArray.models[i].attributes.value.models[j].attributes.state.findWhere({type: 'Report'}).getLogs({
            "query": "start=2018-12-21T09:52:21+01:00&end=2019-05-13T12:16:21+01:00",
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
        console.log({historicalData});
        historicalDataArray.push({historicalData});
      }

    resolve(historicalDataArray);
  }).then((historicalDataArray) => {
      console.log('Done');
    this.setState({
      historicalDataArray: historicalDataArray
    });
  });
  }

  render() {
    return (<div className="container-fluid">
      <BrowserRouter>
        <Navbar/>
        <button onClick={this.getDataPromise}>Refresh</button>
        <button onClick={this.getAllhistoricalData}>Get Historical Data</button>
        <Switch>
          <Route path='/' render={() => <Overview deviceArray={this.state.deviceArray}/>} exact="exact"/>
          <Route path='/Group' render={() => <Group deviceArray={this.state.deviceArray}/>} />
          <Route path='/Compare' render={() => <Compare/>} exact="exact"/>
          <Route path='*' component={Error404}/>
        </Switch>
      </BrowserRouter>
    </div>);
  }
}

export default App;
