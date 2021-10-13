//Main Drawer Navigation

import React, {useContext, useEffect} from 'react';
import {ImageBackground} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import EncryptedStorage from 'react-native-encrypted-storage';

import MainBackground from '../Assets/Image/bg_main.png';

import DrawerNavigation from './DrawerNavigation';
import ChallengeVideo from '../Screens/Challenge/ChallengeVideo';
import ChallengeEnjoy from '../Screens/Challenge/ChallengeEnjoy';

import APIKit from '../API/APIkit';
import {UserDispatch} from '../Commons/UserDispatchProvider';

const RootStack = createStackNavigator();

const RootNavigation = props => {
  const {dispatch} = useContext(UserDispatch);

  useEffect(() => {
    //token 유효한지 확인, 아니면 로그아웃
    const auth = async () => {
      await APIKit.post('login/auth')
        .then(({data}) => {
          if (data.IBcode !== '1000') {
            dispatch({type: 'SIGN_OUT'});
          }
        })
        .catch(() => {
          dispatch({type: 'SIGN_OUT'});
        });
    };

    const retrieveUserSession = async () => {
      try {
        const session = await EncryptedStorage.getItem('user_session');

        if (session !== undefined && session !== null) {
          const {userId, email, token} = JSON.parse(session);
          dispatch({
            type: 'SIGN_IN',
            userId: userId,
            email: email,
            token: token,
          });
          return true;
        }
        return false;
      } catch (error) {}
    };

    retrieveUserSession().then(exist => {
      exist ? auth() : {};
    });

    return () => {};
  }, [dispatch]);

  return (
    <ImageBackground
      source={MainBackground}
      style={{width: '100%', height: '100%'}}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          animationEnabled: false,
        }}>
        <RootStack.Screen
          name={'DrawerNavigation'}
          component={DrawerNavigation}
        />
        <RootStack.Screen name={'ChallengeVideo'} component={ChallengeVideo} />
        <RootStack.Screen name={'ChallengeEnjoy'} component={ChallengeEnjoy} />
      </RootStack.Navigator>
    </ImageBackground>
  );
};
export default RootNavigation;
