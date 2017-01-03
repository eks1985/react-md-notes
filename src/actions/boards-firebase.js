import { database } from '../firebase/firebase-app';

const boardsRef = database.ref('boards');
export const listenToBoards = () => {
	return (dispatch) => {
		boardsRef.off();
		boardsRef.on('value', (snapshot) => {
			dispatch({
				type: 'BOARDS_RECEIVE_DATA',
				payload: snapshot.val()
			});
		}, (error) => {
			dispatch({
				type: 'BOARDS_RECEIVE_DATA_ERROR',
				message: error.message
			});
		});
	};
};
