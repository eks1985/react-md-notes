import { database } from '../firebase/firebase-app';

const boardsRef = database.ref('boards');
const cardsRef = database.ref('cards');

export const addCard = () => {
  return (dispatch, getState) => {
    dispatch({type: 'ADD_CARD--->firebase'});
    const newCardId = cardsRef.push().key;
    const newCard = cardsRef.child(newCardId);
    newCard.set({
      id: newCardId,
      title: 'title',
      text: ''
    });
    const currentBoardId = getState().boards.currentBoardId;
    const currentNodeId = getState().currentNodeId;
    const currentNodeRef = boardsRef.child(currentBoardId).child("tree").child(currentNodeId);
    const currentNodeCards = getState().boards.items[currentBoardId].tree[currentNodeId].cards || [];
    const newCards = currentNodeCards.concat(newCardId);
    currentNodeRef.child('cards').set(newCards);
  };
};

export const setCardTitle = (id, title) => {
  return dispatch => {
    dispatch({type: 'SET_CARD_TITLE--->firebase'});
    cardsRef.child(id).child("title").set(title);
  };
  
};

export const deleteCard = (id) => {
  return (dispatch, getState) => {
    dispatch({type: 'DELETE_CARD--->firebase'});
    // const state = getState();
    // const currentBookId = state.books.currentBookId;
    // const bookBoards = state.books.items[currentBookId].boards;
    // let boardIndex;
    // let i = 0;
    // for (let board in bookBoards) {
    //   if (true) {}
    //   if (bookBoards[board] === boardId) {
    //     boardIndex = i;
    //     break;
    //   }
    //   i += 1;
    // }
    // booksRef.child(currentBookId).child("boards").child(boardIndex).remove();
    // boardsRef.child(boardId).remove();
  };
};

export const setCurrentCardId = (id) => {
  return {
    type: 'SET_CURRENT_CARD_ID',
    id
  };
};


export const editCard = (id) => {
  return {
    type: 'EDIT_CARD_ID',
    id
  };
};

export const commitCard = (id) => {
  return {
    type: 'COMMIT_CARD',
    id
  };
};