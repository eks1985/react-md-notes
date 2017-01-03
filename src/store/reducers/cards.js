import { combineReducers } from 'redux';
import card from './card';

const initialState = {};
const items = (state, action) => {
  switch (action.type) {
    case 'CARDS_RECEIVE_DATA':
      return { ...state, ...action.payload };
    case 'CARDS_RECEIVE_DATA_ERROR':
      return state;
    // case 'ADD_CARD': 
    //   return { ...state, [action.id]: card(undefined, action) };
    case 'DELETE_CARD':
      return state;
    case 'SET_CARD_TITLE':
      return { ...state, [action.id]: card(state[action.id], action)};
    default:
      return state || initialState;
  }
};

const currenCardId = (state = '', action) => {
  switch (action.type) {
    case 'SET_CURRENT_CARD_ID':
      return action.id;
    default:
      return state;
  }
};

export default combineReducers({
  items,
  currenCardId
});

export { items as items__test__};

export const getNodeCards = (state) => {
  const currentNodeId = state.currentNodeId;
  const currentBoardId = state.boards.currentBoardId;
  if (currentNodeId === "") {
    return [];
  }
  const cardsIds = state.boards.items[currentBoardId].tree[currentNodeId].cards || [];
  return cardsIds.map(cardId => state.cards.items[cardId]);
};
