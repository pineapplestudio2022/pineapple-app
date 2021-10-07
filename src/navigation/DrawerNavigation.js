//Main Drawer Navigation

import React, {useContext, useEffect} from 'react';
import {Box, Center, Pressable, Text, VStack} from 'native-base';
import {Platform, TouchableOpacity} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {PERMISSIONS, request} from 'react-native-permissions';

import Intro from '../Screens/Intro';
import Mypage from '../Screens/Member/Mypage';
import DEVScreen from '../Screens/etc/FFmpegTest';
import HomeNavigation from './HomeNavigation';
import LyricsNavigation from './LyricsNavigation';
import MyChallengeNavigation from './MyChallengeNavigation';
import {LoginNavigation, MemberNavigation} from './MemberNavigation';

import {UserDispatch} from '../Commons/UserDispatchProvider';
import {fontSizePersentage, widthPersentage} from '../Commons/CommonUtil';

// 햄버거메뉴 활성화시 보여지는 컨텐츠
const CustomDrawerContent = props => {
  const {userId, dispatch} = useContext(UserDispatch);

  //로그아웃
  const handleLogout = () => {
    dispatch({type: 'SIGN_OUT'});
    props.navigation.reset({
      index: 0,
      routes: [{name: 'DrawerNavigation'}],
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
              Pineapple Studio 소개 [준비중]
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
            onPress={() => props.navigation.navigate('MyChallengeNavigation')}>
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
            onPress={() => props.navigation.navigate('LyricsNavigation')}>
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
              onPress={() => props.navigation.navigate('MemberNavigation')}
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
              onPress={() => props.navigation.navigate('Mypage')}>
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
              onPress={() => props.navigation.navigate('LoginNavigation')}>
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
};

const Drawer = createDrawerNavigator();

const DrawerNavigation = props => {
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
      <Drawer.Screen name="MemberNavigation" component={MemberNavigation} />
      <Drawer.Screen name="LoginNavigation" component={LoginNavigation} />
      <Drawer.Screen name="Mypage" component={Mypage} />
      <Drawer.Screen
        name="MyChallengeNavigation"
        component={MyChallengeNavigation}
      />
      <Drawer.Screen name="LyricsNavigation" component={LyricsNavigation} />
      <Drawer.Screen name="DEVScreen" component={DEVScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
