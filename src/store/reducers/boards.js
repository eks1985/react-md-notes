import { combineReducers } from 'redux';
import tree from '../../lib/tree/src/reducers/tree';

// state = id, title, tree

const initialState = {};
const items = (state, action) => {
  switch (action.type) {
    case 'BOARDS_RECEIVE_DATA':
      return { ...state, ...action.payload };
    case 'BOARDS_RECEIVE_DATA_ERROR':
      return state;
    case 'ADD_BOARD':
      return { ...state, [action.id]: {id: action.id, title: '', tree: {}} };
    case 'DELETE_BOARD':
      return state;
    case 'SET_BOARD_TITLE':
      return state;
    case 'TREE_EXPAND':
    case 'TREE_COLLAPSE':
    case 'TREE_ADD_NODE':
    case 'TREE_DELETE_NODE':
    case 'TREE_COMMIT_MOVE':
    case 'TREE_NODES_RECEIVE_DATA':
    case 'TREE_COMMIT_EDIT_TITLE':
      let boardId = action.boardId;
      let updatedTree = tree(state[boardId].tree, action);
      return { ...state, [boardId]: {...state[boardId], tree: updatedTree} };
    default:
      return state || initialState;
  }
};

const currentBoardId = (state = '', action) => {
  switch (action.type) {
    case 'SET_CURRENT_BOARD_ID':
      return action.id;
    default:
      return state;
  }
};

export default combineReducers({
  items,
  currentBoardId
});

export const getBookBoards = (state) => {
  const { books } = state;
  const bookId = books.currentBookId;
  let boardsIds = [];
  if (books.items[bookId]) {
    boardsIds = books.items[bookId].boards  ? books.items[bookId].boards : [];
  }
  const boards = state.boards.items;
  return bookId === "" ? [] : boardsIds.map(id => boards[id]);
};

export { items as items__test__};
