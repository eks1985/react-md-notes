import { database } from '../firebase/firebase-app';

export const updateNodesFirebase = () => {
	const nodesRef = database.ref('nodes');
	return (dispatch, getState) => {
		nodesRef.set(getState().tree);
	};
};

export const listenToNodes = () => {
	const nodesRef = database.ref('nodes');
	return (dispatch, getState) => {
		nodesRef.on('value', snapshot => {
			dispatch({
				type: 'TREE_NODES_RECEIVE_DATA',
				data: snapshot.val()
			});
		});
	}; 
};