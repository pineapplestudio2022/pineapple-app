//회원가입, 로그인 Navigation

import React from 'react';
import {ImageBackground} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import PineappleCharacter from '../Assets/Image/pineapplecharacter.png';

import Login from '../Screens/Member/Login';
import Register from '../Screens/Member/Register';
import Agreement from '../Screens/Member/Agreement';
import AccountFindOne from '../Screens/Member/AccountFindOne';
import AccountFindTwo from '../Screens/Member/AccountFindTwo';
import AccountFindThree from '../Screens/Member/AccountFindThree';
import AccountFindFour from '../Screens/Member/AccountFindFour';
import AccountFindFive from '../Screens/Member/AccountFindFive';

import {heightPersentage, widthPersentage} from '../Commons/CommonUtil';

const MemberStack = createStackNavigator();
const LoginStack = createStackNavigator();

export const LoginNavigation = () => {
  return (
    <>
      <ImageBackground
        source={PineappleCharacter}
        style={{
          position: 'absolute',
          left: responsiveWidth(widthPersentage(45)),
          top: responsiveHeight(heightPersentage(236)),
          width: responsiveWidth(widthPersentage(320)),
          height: responsiveHeight(heightPersentage(420)),
        }}
      />
      <LoginStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          animationEnabled: false,
        }}
        initialRouteName={'Login'}>
        <LoginStack.Screen name={'Login'} component={Login} />
        <LoginStack.Screen name={'FindAccount1'} component={AccountFindOne} />
        <LoginStack.Screen name={'FindAccount2'} component={AccountFindTwo} />
        <LoginStack.Screen name={'FindAccount3'} component={AccountFindThree} />
        <LoginStack.Screen name={'FindAccount4'} component={AccountFindFour} />
        <LoginStack.Screen name={'FindAccount5'} component={AccountFindFive} />
      </LoginStack.Navigator>
    </>
  );
};

export const MemberNavigation = () => {
  return (
    <>
      <ImageBackground
        source={PineappleCharacter}
        style={{
          position: 'absolute',
          left: responsiveWidth(widthPersentage(45)),
          top: responsiveHeight(heightPersentage(236)),
          width: responsiveWidth(widthPersentage(320)),
          height: responsiveHeight(heightPersentage(420)),
        }}
      />
      <MemberStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          animationEnabled: false,
        }}
        initialRouteName={'Agreement'}>
        <MemberStack.Screen name={'Agreement'} component={Agreement} />
        <MemberStack.Screen
          name={'LoginNavigation'}
          component={LoginNavigation}
        />
        <MemberStack.Screen name={'Register'} component={Register} />
      </MemberStack.Navigator>
    </>
  );
};

export default MemberNavigation;
