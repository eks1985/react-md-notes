import book from './book';
import { combineReducers } from 'redux';
const initialState = {};
const items = (state, action) => {
  switch (action.type) {
    case 'BOOKS_RECEIVE_DATA':
      return { ...state, ...action.payload };
    case 'BOOKS_RECEIVE_DATA_ERROR':
      return state;
    // case 'ADD_BOOK': 
    //   return { ...state, [action.id]: book(undefined, action) };
    case 'DELETE_BOOK':
      const booksCopy = {...state};
      delete booksCopy[action.id];
      return booksCopy;
    // case 'SET_BOOK_TITLE':
    case 'ADD_BOARD':
    case 'REMOVE_BOARD':
      return { ...state, [action.id]: book(state[action.id], action) };
    default:
      return state || initialState;
  }  
};

const currentBookId = (state = "", action) => {
  switch (action.type) {
    case 'SET_CURRENT_BOOK_ID':
      return action.id;
    default:
      return state;
  }
};

export default combineReducers({
  items,
  currentBookId
});