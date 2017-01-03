import React, { Component } from 'react';
import { connect } from 'react-redux';
import Auth from './components/auth';
import Tree from './components';
import * as treeActions from './actions/index';
import * as modalActions from './lib/modal/actions/index' ;

class App extends Component {
  
  constructor(props) {
    super(props);
    this.style = {};
  }
  
  render() {
    return (
      <div className="App" style={{padding: 10}}>
        <Auth />
        <Tree data={this.props.data} {...treeActions} {...modalActions} />
      </div>
    );
  }
}

App = connect(
  state => ({ data: state.tree })
)(App);

export default App;
