import React, { Component } from 'react'

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
      purple: "#750DCF"
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
    console.log('Save Group')
    let newGroup = {
      id: this.state.name+this.state.color,
      name: this.state.name,
      color: this.state.color,
      assignedDevices: []
    };
    this.props.createGroupMaster(newGroup);
  }

  render () {
    if(this.state.createState === "create-group-active"){
      return(
        <div id="create-group" className="card create-group-active">
          <h3 className="font-4">Create Group</h3>
          <div className="row">
            <div className="col">
              <label for="groupName">Name</label><br></br>
              <input onChange={this.getName} type="text" name="groupName"/>
            </div>
            <div className="col">
              <p>Color</p>  
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

            <button id="group-save-button" onClick={this.saveGroup}>Save</button>

            <button onClick={this.toggleCreateState} id="create-group-button">Create a group</button>
        </div>
      )
    } else {
      return(
        <div id="create-group" className="card">
            <button onClick={this.toggleCreateState} id="create-group-button">Create a group</button>
        </div>
      )
    }
  }
}

export default CreateGroup;
