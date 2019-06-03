import React, { Component } from 'react';
import './App.css';
import MainComponent from './components/MainComponent';
import Data from './components/data.json';

class App extends Component {

  constructor() {
  
    super()
    this.state = {
      dataJSON: [],
    }
    
    this.readData = this.readData.bind(this);

  }

  readData() {

    this.state.dataJSON = []
    
    Data.map( (itemm) =>
      this.state.dataJSON.push({ rank: itemm.rank, employer: itemm.employer,
        employeesCount: itemm.employeesCount, medianSalary: itemm.medianSalary 
      })
    );

  }

  render() {
    this.readData()
    return (
      <div>
        <MainComponent dataJSON={this.state.dataJSON} />
      </div>
    );
  }
}

export default App;
