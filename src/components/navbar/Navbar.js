import React, { Component }  from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../../images/Dashy-Logo.png"
class Navbar extends Component {

  navActiveHome = () => {
    console.log(document.getElementById(this.props.navState))

    document.getElementById(this.props.navState).classList.remove('nav-button-active');
    document.getElementById('nav-home').classList.add('nav-button-active');
    this.props.navActiveMaster("nav-home")
  }
  navActiveGroup = () => {
    console.log(document.getElementById(this.props.navState))

    document.getElementById(this.props.navState).classList.remove('nav-button-active');
    document.getElementById('nav-group').classList.add('nav-button-active');
    this.props.navActiveMaster("nav-group")
  }
  navActiveCompare = () => {
    console.log(document.getElementById(this.props.navState))
    document.getElementById(this.props.navState).classList.remove('nav-button-active');
    document.getElementById('nav-compare').classList.add('nav-button-active');
    this.props.navActiveMaster("nav-compare")
  }

  render () {
    return(
      <nav id="navbar" className="row">
        <NavLink to="/" id="logo"><img src={Logo} alt="Logo"/></NavLink>
        <div className="nav-button-list">
          <NavLink to="/" className="inline-left no-default-link nav-button-wrapper"><span onClick={this.navActiveHome} id="nav-home" className="nav-button nav-button-active">Overview</span></NavLink>
          <NavLink to="/Group" className="inline-left no-default-link nav-button-wrapper"><span onClick={this.navActiveGroup} id="nav-group" className="nav-button">Group</span></NavLink>
          <NavLink to="/Compare" className="inline-left no-default-link nav-button-wrapper"><span onClick={this.navActiveCompare} id="nav-compare" className="nav-button">Compare</span></NavLink>
        </div>
      </nav>
    )
  }
}

export default Navbar;
