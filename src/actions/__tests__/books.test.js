/* global expect */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './books';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('books actions', () => {
  it('return ADD_BOOK action', () => {
    
    const store = mockStore({
      books: {}
    });
    
    console.log(store);
    
    // const expectedActions  = [
    //   {type: 'ADD_BOOK', id  
    // ];
    
    // const action = store.dispatch(actions.addBook);
    // console.log(store.dispatch);
    // console.log(action());
    
  });
});