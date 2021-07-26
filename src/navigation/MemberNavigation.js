//회원가입, 로그인 Navigation

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Agreement from '../Screens/Member/Agreement';
import Register from '../Screens/Member/Register';
import FindAccount1 from '../Screens/Member/find_account_step1';
import FindAccount2 from '../Screens/Member/find_account_step2';
import FindAccount3 from '../Screens/Member/find_account_step3';
import Login from '../Screens/Member/Login';

const MemberStack = createStackNavigator();
const LoginStack = createStackNavigator();

export const LoginScreen = () => {
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <LoginStack.Screen name={'Login'} component={Login} />
      <LoginStack.Screen name={'FindAccount1'} component={FindAccount1} />
      <LoginStack.Screen name={'FindAccount2'} component={FindAccount2} />
      <LoginStack.Screen name={'FindAccount3'} component={FindAccount3} />
    </LoginStack.Navigator>
  );
};

export const MemberScreen = () => {
  return (
    <MemberStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <MemberStack.Screen name={'Agreement'} component={Agreement} />
      <MemberStack.Screen name={'Register'} component={Register} />
    </MemberStack.Navigator>
  );
};
