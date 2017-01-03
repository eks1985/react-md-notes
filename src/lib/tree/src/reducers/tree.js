import treeNode from './tree-node';
import { 
  getChildrenIds, 
  getChildrenQty, 
  getSublingsNextIds, 
  updateSublingsNextNodes, 
  updatePathUniversal, 
  getConcat, 
  applyConcat, 
  filterArray 
} from '../common';

export default (
  state = {}, action
) => {
  switch (action.type) {
    case 'TREE_EXPAND': 
      return {...state, [action.id]: {...state[action.id], collapsed: false}};
    case 'TREE_COLLAPSE': 
      return {...state, [action.id]: {...state[action.id], collapsed: true}};
    case 'TREE_ADD_NODE': 
      const { id, insertToId, insertToType } = action;
      if (insertToType === "child") {
        const insertToPath = state[insertToId].path;
        const childrenQty = getChildrenQty(insertToPath, state);
        const newNodePath = insertToPath.concat(childrenQty);
        return {...state, [id]: treeNode(undefined, {...action, path: newNodePath})};
      } else if (insertToType === "before") {
        let treeCopy = {...state};
        const nextIds = getSublingsNextIds(insertToId, state);
        const updatedNext = updateSublingsNextNodes(nextIds, treeCopy, 1);
        return {...treeCopy, ...updatedNext, [id]: treeNode(undefined, {...action, path: state[insertToId].path})};
      } else if (insertToType === "after") {
        let treeCopy = {...state};
        const nextIds = getSublingsNextIds(insertToId, state, false);
        const updatedNext = updateSublingsNextNodes(nextIds, treeCopy,  1);
        return {...treeCopy, ...updatedNext, [id]: treeNode(undefined, {...action, path: updatePathUniversal(state[insertToId].path, 0, 1)})};
      }
      return state;
    case 'TREE_DELETE_NODE': 
      const { deleteId } = action;
      let treeCopy = {...state};
      const nextIds = getSublingsNextIds(deleteId, state, false);
      const updatedNext = updateSublingsNextNodes(nextIds, treeCopy, -1);
      treeCopy = {...treeCopy, ...updatedNext};
      delete treeCopy[deleteId];
      let childrenToDeleteIds = getChildrenIds(deleteId, state);
      for (var key of childrenToDeleteIds) {
        delete treeCopy[key];
      }
      return treeCopy;
    case 'TREE_COMMIT_MOVE':
      const { moveId, moveToId, moveType } = action;
      if (moveType === 'before') {
        let treeCopy = {...state};
        //update sublings next to moveId with decrement
        //because we cut move from it's place
        let nextToMoveIds = getSublingsNextIds(moveId, state, false);
        const updatedNextToMove = updateSublingsNextNodes(nextToMoveIds, treeCopy, -1);
        treeCopy = {...treeCopy, ...updatedNextToMove};
        //move
        //update children of move and move 
        const newPath = treeCopy[moveToId].path; //get path of alreafy updated moveTo 
        const moveChildrenIds = getChildrenIds(moveId, state);
        const updatedMoveChildren = moveChildrenIds.reduce((result, childId) => {
          const concat = getConcat(state[moveId].path, state[childId].path);
          result[childId] = {...state[childId], path: applyConcat(newPath, concat)};
          return result;
        }, {});
        treeCopy = {...treeCopy, ...updatedMoveChildren, [moveId]: {...state[moveId], path: newPath}};
        //update moveToNext included moveTo
        let nextToMoveToIds = getSublingsNextIds(moveToId, treeCopy);
        nextToMoveToIds = filterArray(nextToMoveToIds, [moveId]);
        const toBeExcluded  = moveChildrenIds.concat(moveId);
        const updatedNextToMoveTo = updateSublingsNextNodes(nextToMoveToIds, treeCopy, 1, toBeExcluded);
        treeCopy = {...treeCopy, ...updatedNextToMoveTo};
        return treeCopy;
      } else if (moveType === 'after') {
        let treeCopy = {...state};
        //update sublings next to moveId with decrement
        //because we cut move from it's place
        let nextToMoveIds = getSublingsNextIds(moveId, state, false);
        const updatedNextToMove = updateSublingsNextNodes(nextToMoveIds, treeCopy, -1);
        treeCopy = {...treeCopy, ...updatedNextToMove};
        //move
        //update children of move and move 
        const newPath = updatePathUniversal(treeCopy[moveToId].path, 0, 1); //get path of alreafy updated moveTo 
        const moveChildrenIds = getChildrenIds(moveId, state);
        const updatedMoveChildren = moveChildrenIds.reduce((result, childId) => {
          const concat = getConcat(state[moveId].path, state[childId].path);
          result[childId] = {...state[childId], path: applyConcat(newPath, concat)};
          return result;
        }, {});
        treeCopy = {...treeCopy, ...updatedMoveChildren, [moveId]: {...state[moveId], path: newPath}};
        //update moveNext excluded move
        let nextToMoveIdsAfterMove = getSublingsNextIds(moveId, treeCopy, false);
        nextToMoveIdsAfterMove = filterArray(nextToMoveIdsAfterMove, [moveId]);
        const toBeExcluded  = moveChildrenIds.concat(moveId);
        const updatedNextToMoveAfterMove = updateSublingsNextNodes(nextToMoveIdsAfterMove, treeCopy, 1, toBeExcluded);
        treeCopy = {...treeCopy, ...updatedNextToMoveAfterMove};
        return treeCopy; 
      } else if (moveType === 'child') {
        let treeCopy = {...state};
        //update sublings next to moveId with decrement
        //because we cut move from it's place
        let nextToMoveIds = getSublingsNextIds(moveId, state, false);
        const updatedNextToMove = updateSublingsNextNodes(nextToMoveIds, treeCopy, -1);
        treeCopy = {...treeCopy, ...updatedNextToMove};
        //move
        //update children of move and move 
        //when calculate newPath last coord decrease 1 if moveTo contains move 
        const moveToPath = treeCopy[moveToId].path;
        let childrenQty = getChildrenQty(moveToPath, treeCopy);
        const moveLevel = state[moveId].path.length;
        const moveToLevel = moveToPath.length;
        if (moveLevel === moveToLevel + 1)  {
          childrenQty -= 1; 
        }
        const newPath = moveToPath.concat(childrenQty);
        const moveChildrenIds = getChildrenIds(moveId, state);
        const updatedMoveChildren = moveChildrenIds.reduce((result, childId) => {
          const concat = getConcat(state[moveId].path, state[childId].path);
          result[childId] = {...state[childId], path: applyConcat(newPath, concat)};
          return result;
        }, {});
        treeCopy = {...treeCopy, ...updatedMoveChildren, [moveId]: {...state[moveId], path: newPath}};
        return treeCopy; 
      }
      return state;
    case 'TREE_NODES_RECEIVE_DATA':
      return {...state, ...action.data};
    case 'TREE_COMMIT_EDIT_TITLE':
      return {...state, [action.id]: {...state[action.id], title: action.title}};
    default:
      return state;
  }
};

