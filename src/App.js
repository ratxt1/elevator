import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pressedFloors: [],
      currentFloor: 1,
      updateFloorChecks: [],
      intervalId: undefined
    }
    this.handleKeypadClick = this.handleKeypadClick.bind(this)
    this.renderBuilding = this.renderBuilding.bind(this)
    this.renderKeypad = this.renderKeypad.bind(this)
  }

  handleKeypadClick(e, keypadNumber) {
    let pressedFloors = this.state.pressedFloors
    let check = true
    for (let i = 0; i < pressedFloors.length; i++) {
      if (pressedFloors[i] === keypadNumber + 1) {
        check = false
        break;
      }
    }
    if (check) {
      pressedFloors.push(keypadNumber+1)
    }
    this.setState({
      pressedFloors: pressedFloors
    })
    e.preventDefault()

    clearInterval(this.state.intervalId)
    // let callback = this.updateFloor(e)
    let intervalId = setInterval(this.updateFloor.bind(this), 1000);
    this.setState({
      intervalId: intervalId
    })
    e.preventDefault()
   
  }

  updateFloor() {

    let currentFloor = this.state.currentFloor
    let pressedFloors = this.state.pressedFloors

    if (pressedFloors.length === 0) {
      if (currentFloor !== 1) {
        currentFloor += -1
      } 
    } else if (pressedFloors[0] > currentFloor) {
      currentFloor += 1
    } else if (pressedFloors[0] < currentFloor) {
      currentFloor += -1
    } else if (pressedFloors[0] === currentFloor) {
      pressedFloors.shift()
    }

    this.setState({
      currentFloor: currentFloor,
      pressedFloors: pressedFloors
    })
  }


  renderBuilding() {
    let building = []
    for (let i=0; i< 10; i++) {
      if (10-i === this.state.currentFloor) {
        building.push("elevatorfloor")
      } else {
        building.push("emptyfloor")
      }
    }
    let map1 = building.map((x) => (
      <li id={x}></li>
    ))
    return(
      <ul id="building"> 
        {map1}
      </ul>
    )
  }

  renderKeypad() {
    let pressedFloors = this.state.pressedFloors
    let ids = []
    for (let i= 0; i < 10; i++) {
      let x = ""
      if (i === 5) {
        x = " clearl"
      }
      
      for (let j=0; j < pressedFloors.length; j++) {
        if (pressedFloors[j]-1 === i) {
          x = "highlight" + x
          break;
        }
      }
      ids.push(x)
    }
    let map = ids.map((x, i) => (
      <li 
        class={x}
        onClick= {(e) => this.handleKeypadClick(e, i)}
      >
        {i+1}
      </li>
    ))

    return (
      <ul id="keyboard">   
        {map}
      </ul>
    )
  }

  render () {
    return (
      <div id="container">  
        {this.renderKeypad()}
        <div id="display">{this.state.currentFloor}</div>
        {this.renderBuilding()}
        
      </div>
    )
  }
}

export default App;
