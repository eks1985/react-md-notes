import { v4 } from 'node-uuid';
import { database } from '../firebase/firebase-app';

const boardsRef = database.ref('boards');
const booksRef = database.ref('books');

export const addBoard = () => {
  
  return (dispatch, getState) => {
    const newBoardId = boardsRef.push().key;
    const newBoard = boardsRef.child(newBoardId);
    const initialNodeKey = v4();
    newBoard.set({
      id: newBoardId,
      title: 'title',
      tree: {
        [initialNodeKey]: {
          id: initialNodeKey,
          path: [0],
          collapsed: true
        }
      }
    });
    const currentBookId = getState().books.currentBookId;
    const bookRef = database.ref('books/' + currentBookId);
    const currentBoards = getState().books.items[currentBookId].boards || [];
    const updatedBoards = currentBoards.concat(newBoardId);
    bookRef.update({
      boards: updatedBoards 
    });
  };
};

export const setBoardTitle = (boardId, title) => {
  return dispatch => {
    dispatch({type: 'SET_BOARD_TITLE'});
    boardsRef.child(boardId).child("title").set(title);
  };
  
};

export const deleteBoard = (boardId) => {
  return (dispatch, getState) => {
    dispatch({type: 'DELETE_BOARD--->firebase'});
    const state = getState();
    const currentBookId = state.books.currentBookId;
    const bookBoards = state.books.items[currentBookId].boards;
    let boardIndex;
    let i = 0;
    for (let board in bookBoards) {
      if (true) {}
      if (bookBoards[board] === boardId) {
        boardIndex = i;
        break;
      }
      i += 1;
    }
    booksRef.child(currentBookId).child("boards").child(boardIndex).remove();
    boardsRef.child(boardId).remove();
  };
};

export const setCurrentBoardId = (id) => {
  return {
    type: 'SET_CURRENT_BOARD_ID',
    id
  };
};