import React, { Component } from 'react'
import Navbar from './Navbar';
import PullyHome from './PullyHome';

class Pully extends Component {

constructor(props){
  super(props)

  var pully = undefined;
  let isDown = false;
  let startY;
  let scrollTop;
  let closedY = '-300px';
  let openY = '0px';
  let pullyState = 'closed';
  this.checkPullyState = function checkPullyState(){
    if(pullyState === 'open'){
      this.openPully();
    } else if(pullyState === 'closed'){
      this.closePully();
    } else {
      this.closePully();
    }
  }
  this.openPully = function openPully(){
    console.log('Openend');
    pully.style.top = openY;
    pullyState = 'open';
  }

  this.closePully = function closePully(){
    console.log('Closed');
    pully.style.top = closedY;
    pullyState = 'closed';
  }

  this.getPully = function getPully(){
    pully = document.getElementById('pully');
  }

  this.addListeners = function addListeners(){
    pully.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isDown = true;
      startY = e.pageY - pully.offsetTop;
      scrollTop = pully.offsetTop;
    });
    pully.addEventListener('mouseleave', () => {
      isDown = false;
      this.checkPullyState();
    })
    pully.addEventListener('mouseup', (e) => {
      e.preventDefault();
      var y = e.pageY - pully.offsetTop;
      var dist = y - startY;
      if(dist >= 100){
        this.openPully();
      } else if(dist <= -100) {
        this.closePully();
      } else {
        this.checkPullyState();
      }
      isDown = false;
    })
    pully.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if(!isDown) return;
      let y = e.pageY - pully.offsetTop;
      let dist = y - startY;
      let newY = scrollTop + dist + 'px';
      pully.style.top = newY;
    });
  }
}
componentDidMount(){
  this.getPully();
  this.addListeners();
  this.closePully();
}

  render () {

    let pullyContent;
    let navState = this.props.navState;
    if(navState === 'Home'){
      pullyContent = <PullyHome />
    } else if(navState === 'Weather'){

    } else if(navState === 'Data Charts'){

    } else if(navState === 'Devices'){

    }

    return(
      <div id="pully">
        <Navbar />
        {pullyContent}
        <div id="pully-bar"></div>
      </div>
    )
  }
}

export default Pully;
