import { database } from '../firebase/firebase-app';

const cardsRef = database.ref('cards');
export const listenToCards = () => {
	return (dispatch) => {
		cardsRef.off();
		cardsRef.on('value', (snapshot) => {
			dispatch({
				type: 'CARDS_RECEIVE_DATA',
				payload: snapshot.val()
			});
		}, (error) => {
			dispatch({
				type: 'CARDS_RECEIVE_DATA_ERROR',
				message: error.message
			});
		});
	};
};
