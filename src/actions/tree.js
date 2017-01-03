import { v4 } from 'node-uuid';
import { updateNodesFirebase } from './tree-firebase';

const detectBoardIdByNodeId = (getState, nodeId) => {
  const boardsItems = getState().boards.items;
  const boardsKeys = Object.keys(boardsItems);
  let boardId;
  boardsKeys.forEach(boardKey => {
    const nodesKeys = Object.keys(boardsItems[boardKey].tree);
    nodesKeys.forEach(nodeKey => {
      if (nodeKey === nodeId) {
        boardId = boardKey;
      }
    });
  });
  return boardId;
}

// EXPAND / COLLAPSE

export const expand = id => {
  return (dispatch, getState) => {
    const boardId = detectBoardIdByNodeId(getState, id);
    dispatch({
      type: 'TREE_EXPAND',
      id,
      boardId
    });
    dispatch(updateNodesFirebase(boardId));
  };
};

export const collapse = id => {
  return (dispatch, getState) => {
    const boardId = detectBoardIdByNodeId(getState, id);
    dispatch({
      type: 'TREE_COLLAPSE',
      id,
      boardId
    });
    dispatch(updateNodesFirebase(boardId));
  };
};

// ADD {child, before, after} / DELETE

export const addNode = (insertToId, insertToType) => {
  return (dispatch, getState) => {
    const boardId = detectBoardIdByNodeId(getState, insertToId);
    const treeLength = v4();
    dispatch({
      type: 'TREE_ADD_NODE',
      boardId,
      id: treeLength,
      insertToId,
      insertToType,
    });
    dispatch(updateNodesFirebase(boardId));
  };
};

export const deleteNode = deleteId => {
  return (dispatch, getState) => {
    const boardId = detectBoardIdByNodeId(getState, deleteId);
    dispatch({
      type: 'TREE_DELETE_NODE',
      deleteId,
      boardId
    });
    dispatch(updateNodesFirebase(boardId));
  };
};

// MOVE

// TODO restriction to move to inself or to any of it's children

// Select what to move

export const setMoveObject = (moveId, moveType) => {
  return {
    type: 'TREE_SET_MOVE_OBJECT',
    moveId,
    moveType
  };
};

// Complete move
// completeMove => commitMove + RESET_MOVE

const commitMove = (moveId, moveType, moveToId, boardId) => {
  return {
    type: 'TREE_COMMIT_MOVE',
    moveId,
    moveType,
    moveToId,
    boardId
  };
};

export const completeMove = (moveToId) => {
  return (dispatch, getState) => {
    const boardId = detectBoardIdByNodeId(getState, moveToId);
    const { moveId, moveType } = getState().move;
    dispatch(commitMove(moveId, moveType, moveToId, boardId));
    dispatch({
      type: 'TREE_RESET_MOVE'
    });
    dispatch(updateNodesFirebase(boardId));
  };
};

// Edit title

export const startEditTitle = (id, title) => {
  return dispatch => {
    dispatch({
      type: 'TREE_START_EDIT_TITLE',
      id,
    });
  };
};

export const commitEditTitle = (title) => {
  return (dispatch, getState) => {
    const id = getState().editTitle.id;
    const boardId = detectBoardIdByNodeId(getState, id);
    dispatch({
      type: 'TREE_COMMIT_EDIT_TITLE',
      id,
      title,
      boardId
    });
    dispatch(updateNodesFirebase(boardId));
  };
};

export const setCurrentNodeId = id => ({ type: 'SET_CURRENT_NODE_ID', id });
