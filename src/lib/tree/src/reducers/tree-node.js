export default (
  state, action  
) => {
  switch (action.type) {
    case 'TREE_ADD_NODE':
      const { id, path } = action;  
      return {id, path, collapsed: true};
    default: 
      return {};
  }
};