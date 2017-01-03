import { combineReducers } from 'redux';
//reducers
import auth from './auth';
import books from './books';
import boards from './boards';
import cards from './cards';
import modal from './../../lib/tree/src/lib/modal/reducers/index';
import editTitle from '../../lib/tree/src/reducers/edit-title';
import move from '../../lib/tree/src/reducers/move';
import currentNodeId from '../../lib/tree/src/reducers/current-node-id';

const rootReducer = combineReducers({
	auth,
	books,
	boards,
	cards,
	editTitle,
	modal,
	move,
	currentNodeId
});

export default rootReducer;
