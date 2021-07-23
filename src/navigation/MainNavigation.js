//Main Drawer Navigation

import React from 'react';
import MainScreen from '../Screens/MainScreen';
import {Box, Center, Pressable, Text, VStack} from 'native-base';
import {BlurView} from '@react-native-community/blur';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ImageBackground} from 'react-native';
import MainBackground from '../Assets/Image/bg_main.png';

import PineappleMusic from '../Screens/PineappleMusic';
import HomeNavigation from '../navigation/HomeNavigation';
import MyChallengeNavigation from './MyChallengeNavigation';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {fontSizePersentage} from '../Commons/DeviceWHPersentage';
import Intro from '../Screens/Intro';
// 햄버거메뉴 활성화시 보여지는 컨텐츠
function CustomDrawerContent(props) {
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
          {props.state.routeNames.map((name, index) =>
            index > 0 ? (
              <Pressable
                w="100%"
                onPress={() => props.navigation.navigate(name)}>
                <Center>
                  <Text
                    color={'#fafafa'}
                    bold
                    fontSize={responsiveFontSize(fontSizePersentage(18))}>
                    {name}
                  </Text>
                </Center>
              </Pressable>
            ) : null,
          )}
        </VStack>
        <VStack space={5} alignItems={'center'} safeAreaBottom mb={4}>
          {/* 로그인 시 마이페이지, 로그아웃으로 변경 */}
          <Pressable onPress={null} w="100%">
            <Center>
              <Text
                color={'#fafafa'}
                bold
                fontSize={responsiveFontSize(fontSizePersentage(18))}>
                회원 가입
              </Text>
            </Center>
          </Pressable>
          <Pressable onPress={null} w="100%">
            <Center>
              <Text
                color={'#fafafa'}
                bold
                fontSize={responsiveFontSize(fontSizePersentage(18))}>
                로그인
              </Text>
            </Center>
          </Pressable>
        </VStack>
      </BlurView>
    </Box>
  );
}
const Drawer = createDrawerNavigator();

function MainNavigation() {
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
        <Drawer.Screen name="HomeNavigation" component={HomeNavigation} />
        <Drawer.Screen name="Pineapple Studio 소개" component={Intro} />
        <Drawer.Screen
          name="PinappleMusic [준비중]"
          component={PineappleMusic}
        />
        <Drawer.Screen name="My Challenge" component={MyChallengeNavigation} />
        <Drawer.Screen name="My Lyrics" component={MainScreen} />
        <Drawer.Screen name="My Photo Album [준비중]" component={MainScreen} />
        <Drawer.Screen name="내가 만든 음원 [준비중]" component={MainScreen} />
        <Drawer.Screen name="My BGM [준비중]" component={MainScreen} />
        <Drawer.Screen name="Favorite List [준비중]" component={MainScreen} />
        <Drawer.Screen name="Price [준비중]" component={MainScreen} />
      </Drawer.Navigator>
    </ImageBackground>
  );
}
export default MainNavigation;
