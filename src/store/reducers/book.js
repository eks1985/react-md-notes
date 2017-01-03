export default (state, action) => {
  switch (action.type) {
    case 'ADD_BOOK': 
      return {id: action.id, boards: [], title: ''};
    case 'SET_BOOK_TITLE': 
      return {...state, title: action.title} ;
    case 'ADD_BOARD': 
      return {...state, boards: [ ...state.boards, action.boardId ]} ;
    case 'REMOVE_BOARD': 
      const pos = state.boards.indexOf(action.boardId);
      return {...state, boards: [ ...state.boards.slice(0, pos), ...state.boards.slice(pos + 1) ]} ;
    default:
      return state;
  }
};