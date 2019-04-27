import React, { Component }  from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
  render () {
    return(
      <nav className="navbar full-width-box">
        <h2>Menu</h2>
        <ul>
          <li><NavLink className="nav-button" to="/">My Home</NavLink></li>
          <li><NavLink className="nav-button" to="/weather">Weather</NavLink></li>
          <li><NavLink className="nav-button" to="/devices">Devices</NavLink></li>
          <li><NavLink className="nav-button" to="/data-charts">Data Charts</NavLink></li>
        </ul>
      </nav>
    )
  }
}

export default Navbar;
