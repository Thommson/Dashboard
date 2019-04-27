import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/pageHome/Home';
import Weather from './components/pageWeather/Weather';
import DataCharts from './components/pageDataCharts/DataCharts';
import Devices from './components/pageDevices/Devices';
import Error404 from './components/pageError404/Error404';
import Pully from './components/pully/Pully';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      navState: 'Home'
    }
    
  }


  render() {
    return (
      <div className="container-fluid no-gutters">
        <BrowserRouter>
          <div className="row">
            <div className="col-8 no-gutters">
              <Pully navState={this.state.navState}/>
              <div className="main-col-container">
                <Switch>
                  <Route path='/' render={()=> <Home />} exact/>
                  <Route path='/weather' render={()=> <Weather />} />
                  <Route path='/data-charts' render={()=> <DataCharts />} />
                  <Route path='/devices' render={()=> <Devices />} />
                  <Route path='*' component={ Error404 } />
                </Switch>
              </div>

            </div>
            <div className="col-4 no-gutters">

            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
