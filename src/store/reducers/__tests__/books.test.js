import reducer from '../books';
/* global expect */

describe('books reducer', () => {
  
  // it ('handle RECEIVE_BOOKS', () => {
    
  //   const action  = {
  //     type: 'RECEIVE_BOOKS',
  //     payload: {
        
  //     }
  //   };
    
  //   const actual = reducer({}, action);
    
  //   const expected = {"1": {id: "1", boards: [], title: ''}};
    
  //   expect(actual).toEqual(expected);
    
  // });
  
  it ('handle ADD_BOOK', () => {
    
    const action  = {
      type: 'ADD_BOOK',
      id: "1"
    };
    
    const actual = reducer({}, action);
    
    const expected = {
        items: {
          '1': {id: "1", boards: [], title: ''}
        },
        currentBookId: '' 
    };
    
    expect(actual).toEqual(expected);
    
  });
  
  it ('handle DELETE_BOOK', () => {
    
    const action  = {
      type: 'DELETE_BOOK',
      id: "1"
    };
    
    const initial = {
      items: {
        "0": {id: "0", boards: [], title: ''},
        "1": {id: "1", boards: [], title: ''},
        "2": {id: "2", boards: [], title: ''},
      },
      currentBookId: ''
    };
    
    const actual = reducer(initial, action);
    
    const expected = {
      items: {
        "0": {id: "0", boards: [], title: ''},
        "2": {id: "2", boards: [], title: ''}, 
      },
      currentBookId: ''
    };
    
    expect(actual).toEqual(expected);
    
  });
  
  it ('handle SET_BOOK_TITLE', () => {
    
    const action  = {
      type: 'SET_BOOK_TITLE',
      id: '1',
      title: 'foo'
    };
    
    const initial = {
      '0': {id: '0', boards: [], title: ''},
      '1': {id: '1', boards: [], title: ''},
      '2': {id: '2', boards: [], title: ''},
    };
    
    const actual = reducer(initial, action);
    
    const expected = {
      '0': {id: '0', boards: [], title: ''},
      '1': {id: '1', boards: [], title: 'foo'},
      '2': {id: '2', boards: [], title: ''},
    };
    
    expect(actual).toEqual(expected);
    
  });
  
  it ('handle ADD_BOARD', () => {
    
    const action  = {
      type: 'ADD_BOARD',
      id: '1',
      boardId: '2'
    };
    
    const initial = {
      '0': {id: '0', boards: [], title: ''},
      '1': {id: '1', boards: ['0', '1'], title: 'foo'},
      '2': {id: '2', boards: [], title: ''},
    };
    
    const actual = reducer(initial, action);
    
    const expected = {
      '0': {id: '0', boards: [], title: ''},
      '1': {id: '1', boards: ['0', '1', '2'], title: 'foo'},
      '2': {id: '2', boards: [], title: ''},
    };
    
    expect(actual).toEqual(expected);
    
  });
  
  it ('handle REMOVE_BOARD', () => {
    
    const action  = {
      type: 'REMOVE_BOARD',
      id: '1',
      boardId: '1'
    };
    
    const initial = {
      '0': {id: '0', boards: [], title: ''},
      '1': {id: '1', boards: ['0', '1', '2'], title: 'foo'},
      '2': {id: '2', boards: [], title: ''},
    };
    
    const actual = reducer(initial, action);
    
    const expected = {
      '0': {id: '0', boards: [], title: ''},
      '1': {id: '1', boards: ['0', '2'], title: 'foo'},
      '2': {id: '2', boards: [], title: ''},
    };
    
    expect(actual).toEqual(expected);
    
  });
  
});