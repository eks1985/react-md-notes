import { database } from '../firebase/firebase-app';

export const updateNodesFirebase = (board) => {
	const nodesRef = database.ref('boards/' + board + '/tree');
	return (dispatch, getState) => {
		nodesRef.set(getState().boards.items[board].tree);
	};
};
