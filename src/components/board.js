import React from 'react';
import { connect } from 'react-redux';
import Tree from '../lib/tree/src/components/index';
import * as boardsActions from '../actions/boards';
import * as treeActions from '../actions/tree';
import * as cardsActions from '../actions/cards';
import * as modalActions from './../lib/tree/src/lib/modal/actions/index';

let Board = ({
  board,
  //actions
  setBoardTitle,
  deleteBoard
}) => {

  return (
    <div>
      <input type="text" defaultValue={board.title}
        onChange={
          (e) => {
          setBoardTitle(board.id, e.target.value);
          }
        }
      />
      <button
        onClick={
          () => {
            // TODO delete board
            deleteBoard(board.id);
          }
        }
      >
        delete
      </button>
      <Tree data={board.tree} boardId={board.id} {...treeActions} {...boardsActions} {...cardsActions} { ...modalActions } />
    </div>
  );

};

export default connect(
  null,
  boardsActions
)(Board);
