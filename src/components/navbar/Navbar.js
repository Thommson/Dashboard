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
        <NavLink to="/" id="logo"><img onClick={this.navActiveHome} src={Logo} alt="Logo"/></NavLink>
        <div className="nav-button-list">
          <NavLink to="/" className="inline-left no-default-link nav-button-wrapper"><div onClick={this.navActiveHome} className="nav-button "><span id="nav-home" className="nav-button-active">Overview</span></div></NavLink>
          <NavLink to="/Group" className="inline-left no-default-link nav-button-wrapper"><div onClick={this.navActiveGroup} className="nav-button"><span id="nav-group">Group</span></div></NavLink>
          <NavLink to="/Compare" className="inline-left no-default-link nav-button-wrapper"><div onClick={this.navActiveCompare} className="nav-button"><span id="nav-compare">Compare</span></div></NavLink>
        </div>
      </nav>
    )
  }
}

export default Navbar;
