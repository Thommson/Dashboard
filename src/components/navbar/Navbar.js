import React, { Component }  from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../../images/Dashy-Logo.png"
class Navbar extends Component {
  render () {
    return(
      <nav id="navbar" className="row">
        <NavLink to="/" id="logo"><img src={Logo} alt="Logo"/></NavLink>
        <div className="nav-button-list">
          <NavLink to="/" className="inline-left no-default-link nav-button-wrapper"><span className="nav-button nav-button-active">Overview</span></NavLink>
          <NavLink to="/Group" className="inline-left no-default-link nav-button-wrapper"><span className="nav-button">Group</span></NavLink>
          <NavLink to="/Compare" className="inline-left no-default-link nav-button-wrapper"><span className="nav-button">Compare</span></NavLink>
        </div>
      </nav>
    )
  }
}

export default Navbar;