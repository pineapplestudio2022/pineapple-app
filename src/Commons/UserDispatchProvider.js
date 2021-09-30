import React, {createContext} from 'react';
import {useReducer} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {cleanClientToken, setClientToken} from '../API/APIkit';

export const UserDispatch = createContext();
const initialState = {
  userId: '',
  email: '',
  token: '',
};
const storeUserSession = async (userId, email, token) => {
  try {
    await EncryptedStorage.setItem(
      'user_session',
      JSON.stringify({
        userId: userId,
        email: email,
        token: token,
      }),
    );
  } catch (error) {}
};

const removeUserSession = async () => {
  try {
    await EncryptedStorage.removeItem('user_session');
  } catch (error) {}
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      storeUserSession(action.userId, action.email, action.token);
      setClientToken(action.token);
      return {
        userId: action.userId,
        email: action.email,
      };
    case 'SIGN_OUT':
      removeUserSession();
      cleanClientToken();
      return {
        userId: '',
        email: '',
      };
    default:
      return state;
  }
};

const UserDispatchProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserDispatch.Provider
      value={{userId: state.userId, email: state.email, dispatch}}>
      {props.children}
    </UserDispatch.Provider>
  );
};

export default UserDispatchProvider;
