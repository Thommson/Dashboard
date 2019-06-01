import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

class CreateGroup extends Component {
  constructor(props){
    super(props)
    this.state = {
      createState: '',
      orange: "#FF9A63",
      blue: "#5EBDF3",
      green: "#4BD487",
      red: "#F3445C",
      yellow: "#F2E641",
      purple: "#750DCF",
      color: '',
      name: ''
    }
  }
  toggleCreateState = () =>{
    if(this.state.createState === ''){
      this.setState({
        createState: "create-group-active"
      });
    } else if(this.state.createState === "create-group-active"){
      this.setState({
        createState: ''
      });
    }

  }
  getName = (event) => {
    this.setState({
      name: event.target.value
    });
  }
  getColor = (event) => {
    new Promise((resolve, reject) => {
      console.log(event.target.id);
      resolve( event.target.id );
    }).then((color) => {
      this.setState((prevState) => {
        console.log(color);
        console.log(prevState.color);
        if(color !== prevState.color){
          console.log("CHANGE");
          console.log(document.getElementById(prevState.color))
          console.log(document.getElementById(color))
          if(document.getElementById(prevState.color) !== null){
            document.getElementById(prevState.color).classList.remove('active-color-box');
          }
          document.getElementById(color).classList.add('active-color-box');
        }
      });
      return color
    }).then((color) => {
      this.setState({
        color: color
      });
    })


  }
  saveGroup = () => {
    document.getElementById('alert-color').innerHTML = '';
    document.getElementById('alert-name').innerHTML = '';
    let groupCheck = [];
    for(let i = 0; i < this.props.groups.length; i++){
      groupCheck.push(this.props.groups[i].name);
    }
    console.log(groupCheck);
    if(this.state.name !== '' && this.state.color !== '' && !groupCheck.includes(this.state.name)){
        console.log('Saved Group')
      let newGroup = {
        id: this.state.name+this.state.color,
        name: this.state.name,
        color: this.state.color,
        assignedDevices: []
      };
      this.props.createGroupMaster(newGroup);
      this.setState({createState: ''});
    } else {
      if(this.state.name === '' ){
          console.log('Name')
        document.getElementById('alert-color').innerHTML = "Please enter a name."
      }
      if(this.state.color === '' ){
          console.log('Color')
        document.getElementById('alert-name').innerHTML = "Please select a color."
      }
      if(groupCheck.includes(this.state.name)){
        document.getElementById('alert-name-used').innerHTML = "Name is already used."
      }
    }

  }

  render () {
    if(this.state.createState === "create-group-active"){
      return(
        <div id="create-group" className="card create-group-active">
          <h3 className="font-4">Create Group</h3>
          <div className="row">
            <div className="col-4">
              <label for="groupName" className="blue-text">Name</label><br></br>
              <input className="create-group-input" onChange={this.getName} type="text" name="groupName"/>
            </div>
            <div className="col-1"></div>
            <div className="col-7">
              <p className="blue-text" >Color</p>
              <div className="row">
                <div className="col-2 align-self-end">
                  <div onClick={this.getColor} id={this.state.red} className="color-box red"></div>
                </div>
                <div className="col-2 align-self-end">
                  <div onClick={this.getColor} id={this.state.orange} className="color-box orange"></div>
                </div>
                <div value={this.state.yellow} className="col-2 align-self-end">
                  <div onClick={this.getColor} id={this.state.yellow} className="color-box yellow"></div>
                </div>
                <div value={this.state.green} className="col-2 align-self-end">
                  <div onClick={this.getColor} id={this.state.green} className="color-box green"></div>
                </div>
                <div value={this.state.blue} className="col-2 align-self-end">
                  <div  onClick={this.getColor} id={this.state.blue} className="color-box blue"></div>
                </div>
                <div value={this.state.purple} className="col-2 align-self-end">
                  <div onClick={this.getColor} id={this.state.purple} className="color-box purple"></div>
                </div>
              </div>
            </div>
          </div>
          <div  className="row margin-top-m">
            <div id="alert-name"></div>
            <div id="alert-name-used"></div>
            <div id="alert-color"></div>
          </div>
          <div className="row">
            <div className="col-10">
              <button id="group-save-button" onClick={this.saveGroup}>Save</button>
            </div>
            <div className="col-2">
              <button className="plus-icon-open" onClick={this.toggleCreateState} id="create-group-button"><FontAwesomeIcon size="lg" icon={ faPlus }/></button>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div id="create-group">
            <button className="plus-icon-closed" onClick={this.toggleCreateState} id="create-group-button"><FontAwesomeIcon size="2x" icon={ faPlus }/></button>
        </div>
      )
    }
  }
}

export default CreateGroup;
