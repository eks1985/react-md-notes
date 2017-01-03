import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { listenToBooks } from './actions/books-firebase';
import { listenToBoards } from './actions/boards-firebase';
import { listenToCards } from './actions/cards-firebase';
import { listenToAuth } from './actions/auth';
import App from './App';
import store from './store';

export default class root extends Component {
  
  componentWillMount()  { 
		store.dispatch(listenToAuth());
    store.dispatch(listenToBooks()); 
    store.dispatch(listenToBoards()); 
    store.dispatch(listenToCards()); 
	}
  
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
  
}

