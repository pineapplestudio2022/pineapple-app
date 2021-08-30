//Main Drawer Navigation

import React from 'react';
import {Box, Center, Pressable, Text, VStack} from 'native-base';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {fontSizePersentage} from '../Commons/DeviceWHPersentage';

import HomeNavigation from '../navigation/HomeNavigation';
import MyChallengeNavigation from './MyChallengeNavigation';

import MainBackground from '../Assets/Image/bg_main.png';

import Intro from '../Screens/Intro';
import PineappleMusic from '../Screens/PineappleMusic';
import MainScreen from '../Screens/MainScreen';
import {MemberScreen, LoginScreen, MypageScreen} from './MemberNavigation';
import LyricsScreen from '../navigation/LyricsNavigation';
import {useContext} from 'react/cjs/react.development';
import {UserDispatch} from '../Commons/UserDispatchProvider';
import Permission from '../Screens/etc/Permission';

// 햄버거메뉴 활성화시 보여지는 컨텐츠
function CustomDrawerContent(props) {
  const {userId, dispatch} = useContext(UserDispatch);

  //로그아웃
  const handleLogout = () => {
    dispatch({type: 'SIGN_OUT'});
    props.navigation.navigate('MainScreen');
  };

  return (
    <Box flex={1}>
      <BlurView
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 8,
        }}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white">
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
            onPress={() => props.navigation.navigate('MyLyrics')}>
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
        <VStack space={5} alignItems={'center'} safeAreaBottom mb={4}>
          {/* 로그인 시 마이페이지, 로그아웃으로 변경 */}
          {userId == '' ? (
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

          {userId == '' ? (
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
      </BlurView>
    </Box>
  );
}
const Drawer = createDrawerNavigator();

const MainNavigation = props => {
  return (
    <ImageBackground
      source={MainBackground}
      style={{width: '100%', height: '100%'}}>
      <Drawer.Navigator
        drawerStyle={{
          backgroundColor: '#595d6299',
          borderTopEndRadius: 8,
          borderBottomEndRadius: 8,
        }}
        overlayColor={'transparent'}
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Permission" component={Permission} />
        <Drawer.Screen name="HomeNavigation" component={HomeNavigation} />
        <Drawer.Screen name="MemberScreen" component={MemberScreen} />
        <Drawer.Screen name="LoginScreen" component={LoginScreen} />
        <Drawer.Screen name="MypageScreen" component={MypageScreen} />
        <Drawer.Screen name="PineappleIntro" component={Intro} />
        <Drawer.Screen name="PinappleMusic" component={PineappleMusic} />
        <Drawer.Screen name="MyChallenge" component={MyChallengeNavigation} />
        <Drawer.Screen name="MyLyrics" component={LyricsScreen} />
        <Drawer.Screen name="MyPhotoAlbum" component={MainScreen} />
        <Drawer.Screen name="MyMusic" component={MainScreen} />
        <Drawer.Screen name="MyBGM" component={MainScreen} />
        <Drawer.Screen name="FavoriteList" component={MainScreen} />
        <Drawer.Screen name="Price" component={MainScreen} />
      </Drawer.Navigator>
    </ImageBackground>
  );
};
export default MainNavigation;
