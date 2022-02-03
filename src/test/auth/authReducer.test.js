import {authReducer} from '../../auth/authReducer';
import {types} from '../../types/types';

describe('authReducer test', () => {


  test('should return default state', () => {
    const state = authReducer({logged: false}, {});
    expect(state).toEqual({logged: false});
});

test('should authenticate and place the user name', () => {
    
    const action = {
        type: types.login,
        payload: {
            name: 'Carlitos',
            
        }
    }
    const state = authReducer({logged: false}, action);
    expect(state).toEqual({
        name: 'Carlitos',
        logged: true,
    });

  });

  test('should clear username and set logged out', () => {
    const action = {
        type: types.logout,
    }
    const state = authReducer({name: 'Carlitos', logged: true}, action);
    expect(state).toEqual({logged: false});
  });

  
  
  
});
