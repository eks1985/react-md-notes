import { database } from '../firebase/firebase-app';

const booksRef = database.ref('books');

export const  addBook = () => {
  return dispatch => {
    dispatch({type: 'SET_BOOK_TITLE--->firebase'});
    const newBookId = booksRef.push().key;
    booksRef.update({
      [newBookId]: {
        id: newBookId,
        title: '',
      }
    });
  };
};

export const setBookTitle = (id, title) => {
  return dispatch => {
    dispatch({type: 'SET_BOOK_TITLE--->firebase'});
    booksRef.child(id).child("title").set(title);
  };
};

export const deleteBook = (id) => {
  const bookRef = database.ref('books/' + id);
  return (dispatch, getState) => {
    const currentBookId = getState().books.currentBookId;
    if (id === currentBookId) {
      dispatch({
        type: 'SET_CURRENT_BOOK_ID',
        id: ''
      });
    }
    dispatch({
      type: 'DELETE_BOOK',
      id
    });
    bookRef.remove();
  };
  // TODO delete chold boards of the book
};

export const setCurrentBookId = (id) => {
  return {
    type: 'SET_CURRENT_BOOK_ID',
    id
  };
};