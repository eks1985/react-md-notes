import { auth } from '../firebase/firebase-app';
import { listenToBooks } from './books-firebase' ;

export const listenToAuth = () => {
	return (dispatch, getState) => {
		auth.onAuthStateChanged((authData) => {
			if (authData) {
				dispatch({
					type: 'AUTH_LOGIN',
					uid: authData.uid,
					username: authData.displayName
				});
				// reload nodes on auth update.
				const listenToBooksDispatcher = listenToBooks();
				listenToBooksDispatcher(dispatch);
			} else {
				if (getState().auth.status !== 'AUTH_ANONYMOUS') {
					dispatch({ type: 'AUTH_LOGOUT' });
				}
			}
		});
	};
};

export const openAuth = () => {
	return (dispatch) => {
		dispatch({ type: 'AUTH_OPEN' });
		auth.signInAnonymously()
			.catch(function(error) {
	    		dispatch({
						type: 'FEEDBACK_DISPLAY_ERROR',
						error: `Login failed! ${error}`
					});
					dispatch({ type: 'AUTH_LOGOUT' });
			});
	};
};

export const logoutUser = () => {
	return (dispatch) => {
		dispatch({ type: 'AUTH_LOGOUT' });
		auth.signOut();
	};
};
