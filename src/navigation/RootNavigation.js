//Main Drawer Navigation

import React, {useContext, useEffect} from 'react';
import {Box, Center, Pressable, Text, VStack} from 'native-base';
import {ImageBackground, Platform, TouchableOpacity} from 'react-native';
// import {BlurView} from '@react-native-community/blur';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  widthPersentage,
} from '../Commons/DeviceWHPersentage';

import HomeNavigation from './HomeNavigation';
import MyChallengeNavigation from './MyChallengeNavigation';

import MainBackground from '../Assets/Image/bg_main.png';

import Intro from '../Screens/Intro';
import {MemberScreen, LoginScreen, MypageScreen} from './MemberNavigation';
import LyricsScreen from './LyricsNavigation';
import {UserDispatch} from '../Commons/UserDispatchProvider';
import {PERMISSIONS, request} from 'react-native-permissions';
import {createStackNavigator} from '@react-navigation/stack';
import ChallengeVideo from '../Screens/Challenge/ChallengeVideo';
import ChallengeEnjoy from '../Screens/Challenge/ChallengeEnjoy';
import EncryptedStorage from 'react-native-encrypted-storage';

// 햄버거메뉴 활성화시 보여지는 컨텐츠
function CustomDrawerContent(props) {
  const {userId, dispatch} = useContext(UserDispatch);

  //로그아웃
  const handleLogout = () => {
    dispatch({type: 'SIGN_OUT'});
    props.navigation.reset({
      index: 0,
      routes: [{name: 'HomeNavigation'}],
    });
  };

  return (
    <Box flex={1}>
      <Box
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 8,
        }}>
        <VStack safeAreaTop space={5} {...props} flex={1} mt={20}>
          <TouchableOpacity
            w="100%"
            // onPress={() => props.navigation.navigate('PineappleIntro')}>
          >
            <Text
              textAlign={'center'}
              color={'#fafafa'}
              bold
              fontSize={responsiveFontSize(fontSizePersentage(18))}>
              Pineapple Studio 소개
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            w="100%"
            // onPress={() => props.navigation.navigate('PinappleMusic')}>
          >
            <Text
              textAlign={'center'}
              color={'#fafafa'}
              bold
              fontSize={responsiveFontSize(fontSizePersentage(18))}>
              PinappleMusic [준비중]
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            w="100%"
            onPress={() => props.navigation.navigate('MyChallenge')}>
            <Text
              textAlign={'center'}
              color={'#fafafa'}
              bold
              fontSize={responsiveFontSize(fontSizePersentage(18))}>
              My Challenge
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            w="100%"
            onPress={() => props.navigation.navigate('LyricsScreen')}>
            <Text
              textAlign={'center'}
              color={'#fafafa'}
              bold
              fontSize={responsiveFontSize(fontSizePersentage(18))}>
              My Lyrics
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            w="100%"
            // onPress={() => props.navigation.navigate('MyPhotoAlbum')}
          >
            <Text
              textAlign={'center'}
              color={'#fafafa'}
              bold
              fontSize={responsiveFontSize(fontSizePersentage(18))}>
              My Photo Album [준비중]
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            w="100%"
            // onPress={() => props.navigation.navigate('MyMusic')}
          >
            <Text
              textAlign={'center'}
              color={'#fafafa'}
              bold
              fontSize={responsiveFontSize(fontSizePersentage(18))}>
              내가 만든 음원 [준비중]
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            w="100%"
            // onPress={() => props.navigation.navigate('MyBGM')}
          >
            <Text
              textAlign={'center'}
              color={'#fafafa'}
              bold
              fontSize={responsiveFontSize(fontSizePersentage(18))}>
              My BGM [준비중]
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            w="100%"
            // onPress={() => props.navigation.navigate('FavoriteList')}
          >
            <Text
              textAlign={'center'}
              color={'#fafafa'}
              bold
              fontSize={responsiveFontSize(fontSizePersentage(18))}>
              Favorite List [준비중]
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            w="100%"
            // onPress={() => props.navigation.navigate('Price')}
          >
            <Text
              textAlign={'center'}
              color={'#fafafa'}
              bold
              fontSize={responsiveFontSize(fontSizePersentage(18))}>
              Price [준비중]
            </Text>
          </TouchableOpacity>
        </VStack>
        <VStack space={5} alignItems={'center'} safeAreaBottom mb={8}>
          {/* 로그인 시 마이페이지, 로그아웃으로 변경 */}
          {userId === '' ? (
            <Pressable
              onPress={() => props.navigation.navigate('MemberScreen')}
              w="100%">
              <Center>
                <Text
                  color={'#fafafa'}
                  bold
                  fontSize={responsiveFontSize(fontSizePersentage(18))}>
                  회원 가입
                </Text>
              </Center>
            </Pressable>
          ) : (
            <Pressable
              w="100%"
              onPress={() => props.navigation.navigate('MypageScreen')}>
              <Center>
                <Text
                  color={'#fafafa'}
                  bold
                  fontSize={responsiveFontSize(fontSizePersentage(18))}>
                  마이페이지
                </Text>
              </Center>
            </Pressable>
          )}

          {userId === '' ? (
            <Pressable
              w="100%"
              onPress={() => props.navigation.navigate('LoginScreen')}>
              <Center>
                <Text
                  color={'#fafafa'}
                  bold
                  fontSize={responsiveFontSize(fontSizePersentage(18))}>
                  로그인
                </Text>
              </Center>
            </Pressable>
          ) : (
            <Pressable w="100%" onPress={handleLogout}>
              <Center>
                <Text
                  color={'#fafafa'}
                  bold
                  fontSize={responsiveFontSize(fontSizePersentage(18))}>
                  로그아웃
                </Text>
              </Center>
            </Pressable>
          )}
        </VStack>
      </Box>
    </Box>
  );
}
const Drawer = createDrawerNavigator();

const MainNavigation = props => {
  // 음성인식 권한 체크
  const checkRecord = async () => {
    if (Platform.OS === 'ios') {
      await request(PERMISSIONS.IOS.MICROPHONE);
    } else if (Platform.OS === 'android') {
      await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    }
  };
  useEffect(() => {
    checkRecord();
  }, []);
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: '#595d6299',
        borderTopEndRadius: 8,
        borderBottomEndRadius: 8,
        width: responsiveWidth(widthPersentage(305)),
      }}
      overlayColor={'transparent'}
      sceneContainerStyle={{backgroundColor: 'transparent'}}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeNavigation" component={HomeNavigation} />
      <Drawer.Screen name="PineappleIntro" component={Intro} />
      <Drawer.Screen name="MemberScreen" component={MemberScreen} />
      <Drawer.Screen name="LoginScreen" component={LoginScreen} />
      <Drawer.Screen name="MypageScreen" component={MypageScreen} />
      <Drawer.Screen name="MyChallenge" component={MyChallengeNavigation} />
      <Drawer.Screen name="LyricsScreen" component={LyricsScreen} />
      {/* <Drawer.Screen name="PinappleMusic" component={PineappleMusic} /> */}
      {/* <Drawer.Screen name="MyPhotoAlbum" component={MainScreen} />
      <Drawer.Screen name="MyMusic" component={MainScreen} />
      <Drawer.Screen name="MyBGM" component={MainScreen} />
      <Drawer.Screen name="FavoriteList" component={MainScreen} />
      <Drawer.Screen name="Price" component={MainScreen} /> */}
    </Drawer.Navigator>
  );
};
const RootStack = createStackNavigator();

const RootNavigation = props => {
  const {dispatch} = useContext(UserDispatch);

  useEffect(() => {
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
        }
      } catch (error) {}
    };
    retrieveUserSession();
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
        <RootStack.Screen name={'MainNavigation'} component={MainNavigation} />
        <RootStack.Screen name={'ChallengeVideo'} component={ChallengeVideo} />
        <RootStack.Screen name={'ChallengeEnjoy'} component={ChallengeEnjoy} />
      </RootStack.Navigator>
    </ImageBackground>
  );
};
export default RootNavigation;
