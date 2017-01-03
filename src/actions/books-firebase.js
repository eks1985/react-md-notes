import { database } from '../firebase/firebase-app';

const booksRef = database.ref('books');
export const listenToBooks = () => {
	return (dispatch) => {
		booksRef.off();
		booksRef.on('value', (snapshot) => {
			dispatch({
				type: 'BOOKS_RECEIVE_DATA',
				payload: snapshot.val()
			});
		}, (error) => {
			dispatch({
				type: 'BOOKS_RECEIVE_DATA_ERROR',
				message: error.message
			});
		});
	};
};
