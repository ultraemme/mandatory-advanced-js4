import React, { Component } from 'react';
import './App.css';
import Grid from './Grid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="">Player X wins!</p>
        <Grid/>
      </div>
    );
  }
}

export default App;
