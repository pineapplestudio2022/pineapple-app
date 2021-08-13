import React, {createContext} from 'react';
import {useReducer} from 'react';
import {cleanClientToken} from '../API/APIkit';

export const UserDispatch = createContext();
const initialState = {
  userId: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        userId: action.userId,
      };
    case 'SIGN_OUT':
      cleanClientToken();
      return {
        userId: '',
      };
    default:
      return state;
  }
};

const UserDispatchProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserDispatch.Provider value={{userId: state.userId, dispatch}}>
      {props.children}
    </UserDispatch.Provider>
  );
};

export default UserDispatchProvider;
