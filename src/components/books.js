import React from 'react';
import { connect } from 'react-redux';
import * as booksActions from '../actions/books';
import Book from './book';

let Books = ({
  books,
  //actions
  addBook
}) => {
  
  const getBooksJsx = () => {
    const keys = Object.keys(books);
    return (
      <div>
        {
          keys.map(key => {
            return <Book book={books[key]} key={key} />;
          })
        }
      </div>
    );
  };
  
  return (
    <div>
      <p>
        <button
          onClick={
            () => {
              addBook();
            }
          }
        >
          Add book
        </button>
      </p>
      {getBooksJsx()}
    </div>
  );
  
};

export default connect(
  state => ({books: state.books.items}),
  booksActions
)(Books);