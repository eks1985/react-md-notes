import React from 'react';
import { connect } from 'react-redux';
import * as booksActions from '../actions/books';

let Book = ({
  book,
  //actions
  setBookTitle,
  deleteBook,
  setCurrentBookId
}) => {

  let input;

  return (
    <div>
      <input
        type='text'
        defaultValue={book.title}
        ref={
          (node) => {
            input = node;
          }
        }
        onChange={
          () => {
            setBookTitle(book.id, input.value);
          }
        }
      >
      </input>
      <button
        onClick={
          () => {
            deleteBook(book.id);
          }
        }
      >
        delete
      </button>
      <button
        onClick={
          () => {
            setCurrentBookId(book.id);
          }
        }
      >
        boards
      </button>
    </div>
  );

};

export default connect(
  null,
  booksActions
)(Book);
