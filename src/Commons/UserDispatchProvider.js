import React, {createContext} from 'react';
import {useReducer} from 'react';
import {cleanClientToken} from '../API/APIkit';

export const UserDispatch = createContext();
const initialState = {
  userId: '',
  token: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        userId: action.userId.toString(),
        token: action.token.toString(),
      };
    case 'SIGN_OUT':
      cleanClientToken();
      return {
        userId: '',
        token: '',
      };
    default:
      return state;
  }
};

const UserDispatchProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserDispatch.Provider
      value={{userId: state.userId, token: state.token, dispatch}}>
      {props.children}
    </UserDispatch.Provider>
  );
};

export default UserDispatchProvider;
