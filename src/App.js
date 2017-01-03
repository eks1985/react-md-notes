import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auth from './components/auth';
import Books from './components/books';
import Boards from './components/boards';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.style = {};
  }
  
  render() {
    return (
      <div className="App" style={{padding: 10}}>
        <Auth />
        <Books />
        <Boards />
      </div>
    );
  }
}

App = connect()(App);

export default App;
