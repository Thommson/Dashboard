import React, { Component } from 'react'

class Home extends Component {
  render () {
    return(
      <div id="home">
        <div className="row device-list">
          <div className="col-2 card">
            <h3>Device Name</h3>
            <p>Device content goes here</p>
          </div>
        </div>

      </div>
    )
  }
}

export default Home;
