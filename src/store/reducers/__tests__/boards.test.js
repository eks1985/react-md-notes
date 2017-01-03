/*global expect */
import reducer from '../boards';
import { items__test__ }  from '../boards';

describe('boards reducer', () => {
  
  it('handle ADD_BOARD action', () => {
    
    const action = {
      type: 'ADD_BOARD',
      id: '1'
    };
    
    const actual = reducer({}, action);
    
    const expected = {
      items: {
        '1': {
          id: '1',
          title: '',
          tree: {}
        }
      },
      currenBoardId: ''
    };
    
    expect(actual).toEqual(expected);
    
  });
  
  it('handle TREE_EXPAND action - subreducer items', () => {
    
    const action = {
      type: 'TREE_EXPAND',
      boardId: '1',
      id: '1'
    };
    
    const initial = {
      '0': {
        id: '0',
        title: 'title 0',
        tree: {
          '0': {
            id: '0',
            path: [0],
            collapsed: true
          }
        }
      },
      '1': {
        id: '1',
        title: 'title 1',
        tree: {
          '0': {
            id: '0',
            path: [0],
            collapsed: true
          },
          '1': {
            id: '1',
            path: [0, 0],
            collapsed: true
          },
          '2': {
            id: '2',
            path: [1],
            collapsed: true
          }
        }
      }
    };
    
    const expected = {
      '0': {
        id: '0',
        title: 'title 0',
        tree: {
          '0': {
            id: '0',
            path: [0],
            collapsed: true
          }
        }
      },
      '1': {
        id: '1',
        title: 'title 1',
        tree: {
          '0': {
            id: '0',
            path: [0],
            collapsed: true
          },
          '1': {
            id: '1',
            path: [0, 0],
            collapsed: false
          },
          '2': {
            id: '2',
            path: [1],
            collapsed: true
          }
        }
      }
    };
    
    const actual = items__test__(initial, action);
    
    expect(actual).toEqual(expected);
    
  });
  
  it('handle TREE_COLLAPSE action - subreducer items', () => {
    
    const action = {
      type: 'TREE_COLLAPSE',
      boardId: '1',
      id: '1'
    };
    
    const initial = {
      '0': {
        id: '0',
        title: 'title 0',
        tree: {
          '0': {
            id: '0',
            path: [0],
            collapsed: true
          }
        }
      },
      '1': {
        id: '1',
        title: 'title 1',
        tree: {
          '0': {
            id: '0',
            path: [0],
            collapsed: true
          },
          '1': {
            id: '1',
            path: [0, 0],
            collapsed: false
          },
          '2': {
            id: '2',
            path: [1],
            collapsed: true
          }
        }
      }
    };
    
    const expected = {
      '0': {
        id: '0',
        title: 'title 0',
        tree: {
          '0': {
            id: '0',
            path: [0],
            collapsed: true
          }
        }
      },
      '1': {
        id: '1',
        title: 'title 1',
        tree: {
          '0': {
            id: '0',
            path: [0],
            collapsed: true
          },
          '1': {
            id: '1',
            path: [0, 0],
            collapsed: true
          },
          '2': {
            id: '2',
            path: [1],
            collapsed: true
          }
        }
      }
    };
    
    const actual = items__test__(initial, action);
    
    expect(actual).toEqual(expected);
    
  });
  
  it('handle TREE_ADD_NODE action / insertToType = child - subreducer items', () => {
    
    const action = {
      type: 'TREE_ADD_NODE',
      boardId: '0',
      id: '1',
      insertToId: '0',
      insertToType: 'child'
    };
    
    const initial = {
      '0': {
        id: '0',
        title: 'title 0',
        tree: {
          '0': {id: '0', path: [0], collapsed: true}
        }
      }
    };
    
    const expected = {
      '0': {
        id: '0',
        title: 'title 0',
        tree: {
          '0': {id: '0', path: [0], collapsed: true},
          '1': {id: '1', path: [0, 0], collapsed: true}
        }
      }
    };
    
    const actual = items__test__(initial, action);
    
    expect(actual).toEqual(expected);
    
  });
  
  it('handle TREE_ADD_NODE action / insertToType = before - subreducer items', () => {
    
    const action = {
      type: 'TREE_ADD_NODE',
      boardId: '0',
      id: '1',
      insertToId: '0',
      insertToType: 'before'
    };
    
    const initial = {
      '0': {
        id: '0',
        title: 'title 0',
        tree: {
          '0': {id: '0', path: [0], collapsed: true}
        }
      }
    };
    
    const expected = {
      '0': {
        id: '0',
        title: 'title 0',
        tree: {
          '1': {id: '1', path: [0], collapsed: true},
          '0': {id: '0', path: [1], collapsed: true},
        }
      }
    };
    
    const actual = items__test__(initial, action);
    
    expect(actual).toEqual(expected);
    
  });
  
  it('handle TREE_ADD_NODE action / insertToType = after - subreducer items', () => {
    
    const action = {
      type: 'TREE_ADD_NODE',
      boardId: '0',
      id: '1',
      insertToId: '0',
      insertToType: 'after'
    };
    
    const initial = {
      '0': {
        id: '0',
        title: 'title 0',
        tree: {
          '0': {id: '0', path: [0], collapsed: true}
        }
      }
    };
    
    const expected = {
      '0': {
        id: '0',
        title: 'title 0',
        tree: {
          '0': {id: '0', path: [0], collapsed: true},
          '1': {id: '1', path: [1], collapsed: true},
        }
      }
    };
    
    const actual = items__test__(initial, action);
    
    expect(actual).toEqual(expected);
    
  });
 
  it('handle TREE_DELETE_NODE action - subreducer items', () => {
    
    const action = {
      type: 'TREE_DELETE_NODE',
      boardId: '0',
      deleteId: '1',
    };
    
    const initial = {
      '0': {
        id: '0',
        title: 'title 0',
        tree: {
          '0': {id: '0', path: [0], collapsed: true},
          '1': {id: '1', path: [0, 0], collapsed: true},
          '2': {id: '2', path: [0, 0, 0], collapsed: true},
        }
      }
    };
    
    const expected = {
      '0': {
        id: '0',
        title: 'title 0',
        tree: {
          '0': {id: '0', path: [0], collapsed: true},
        }
      }
    };
    
    const actual = items__test__(initial, action);
    
    expect(actual).toEqual(expected);
    
  });
  
  it('handle TREE_COMMIT_MOVE action / insertToType = child - subreducer items', () => {
    
    const action = {
      type: 'TREE_COMMIT_MOVE',
      boardId: '0',
      moveId: '2',
      moveToId: '0',
      moveType: 'child'
    };
    
    const initial = {
      '0': {
        id: '0',
        title: 'title 0',
        tree: {
          '0': {id: '0', path: [0], collapsed: true},
          '1': {id: '1', path: [0, 0], collapsed: true},
          '2': {id: '2', path: [0, 0, 0], collapsed: true},
        }
      }
    };
    
    const expected = {
      '0': {
        id: '0',
        title: 'title 0',
        tree: {
          '0': {id: '0', path: [0], collapsed: true},
          '1': {id: '1', path: [0, 0], collapsed: true},
          '2': {id: '2', path: [0, 1], collapsed: true},
        }
      }
    };
    
    const actual = items__test__(initial, action);
    
    expect(actual).toEqual(expected);
    
  });
  
});