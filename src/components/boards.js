import React from 'react';
import { connect } from 'react-redux';
import * as boardActions from '../actions/boards';
import { getBookBoards } from '../store/reducers/boards';
import Board from './board';

let Boards = ({
  bookId,
  boards,
  bookTitle,
  //actions
  addBoard
}) => {

  const getBoardsJsx = () => {
    return boards.map(board => {
      return <Board board={board} key={board.id} />;
    });
  };

  return (
    <div>
      { bookId !== "" &&
        <div>
          <p>
            <button
              onClick={
                () => {
                  addBoard();
                }
              }
            >
              Add board
            </button>
          </p>
          <p>
            Boards of the book: {' '}{bookTitle}
          </p>
          <div>
            {getBoardsJsx()}
          </div>
        </div>
      }
    </div>
  );

};

export default connect(
  state => {
    const bookId = state.books.currentBookId;
    const bookTitle = bookId === "" ? "" : state.books.items[state.books.currentBookId].title;
    const boards = getBookBoards(state);
    return {bookId, bookTitle, boards};
  },
  boardActions
)(Boards);
