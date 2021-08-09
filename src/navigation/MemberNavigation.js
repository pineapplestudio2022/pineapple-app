//회원가입, 로그인 Navigation

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Agreement from '../Screens/Member/Agreement';
import Register from '../Screens/Member/Register';
import FindAccount1 from '../Screens/Member/AccountFind1';
import FindAccount2 from '../Screens/Member/AccountFind2';
import FindAccount3 from '../Screens/Member/AccountFind3';
import FindAccount4 from '../Screens/Member/AccountFind4';
import FindAccount5 from '../Screens/Member/AccountFind5';

import Login from '../Screens/Member/Login';
import Mypage from '../Screens/Member/Mypage';

import PineappleCharacter from '../Assets/Image/pineapplecharacter.png';
import {ImageBackground} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {heightPersentage, widthPersentage} from '../Commons/DeviceWHPersentage';
const MemberStack = createStackNavigator();
const LoginStack = createStackNavigator();
const MypageStack = createStackNavigator();

export const MypageScreen = () => {
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
      <MypageStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          animationEnabled: false,
        }}>
        <MypageStack.Screen name={'Mypage'} component={Mypage} />
      </MypageStack.Navigator>
    </>
  );
};

export const LoginScreen = () => {
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
        <LoginStack.Screen name={'FindAccount1'} component={FindAccount1} />
        <LoginStack.Screen name={'FindAccount2'} component={FindAccount2} />
        <LoginStack.Screen name={'FindAccount3'} component={FindAccount3} />
        <LoginStack.Screen name={'FindAccount4'} component={FindAccount4} />
        <LoginStack.Screen name={'FindAccount5'} component={FindAccount5} />
        <LoginStack.Screen name={'Register'} component={Register} />
      </LoginStack.Navigator>
    </>
  );
};

export const MemberScreen = () => {
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
        }}>
        <MemberStack.Screen name={'Agreement'} component={Agreement} />
        <MemberStack.Screen name={'Register'} component={Register} />
      </MemberStack.Navigator>
    </>
  );
};
