//상단 헤더, 햄버거 메뉴 컴포넌트
import React from 'react';
import {
  Box,
  Center,
  HamburgerIcon,
  Heading,
  HStack,
  Icon,
  Image,
  Pressable,
  ChevronLeftIcon,
  View,
  Text,
} from 'native-base';
import HomeIcon from '../Assets/Image/icon_home.png';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import {ImageBackground} from 'react-native';
import MainBackground from '../Assets/Image/bg_main.png';
//헤더 이름 변경해서 보여주기위한 switch-case
const getTitle = screenName => {
  switch (screenName) {
    case 'MainScreen':
      return 'PINEAPPLE STUDIO';
    case 'My Challenge':
      return 'Challenge';
    default:
      return undefined;
  }
};

function MenuComponent({name, navigation}) {
  return (
    <Box>
      <Box safeAreaTop mb={5}>
        {/* 상단 그라데이션 && 블러 효과 start */}
        <LinearGradient
          colors={['#0fefbd', '#94fc1300']}
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: '350%',
            backgroundColor: 'transparent',
          }}>
          <BlurView
            style={{
              height: '100%',
              width: '100%',
            }}
            blurType="light"
            blurAmount={10}
            reducedTransparencyFallbackColor="white"
          />
        </LinearGradient>
        {/* 상단 그라데이션 && 블러 효과 end */}
        {/* 상단 메뉴, 타이틀 start */}
        <HStack alignItems="center" borderColor={'red'} height={44}>
          <Box ml={30}>
            {name === 'MainScreen' ? (
              <Pressable onPress={() => navigation.toggleDrawer()}>
                <HamburgerIcon size="6" />
              </Pressable>
            ) : (
              <Pressable onPress={() => navigation.goBack()}>
                <ChevronLeftIcon size="6" />
              </Pressable>
            )}
          </Box>
          <Center flex={1}>
            <Heading size="md" fontSize={'17'} color={'#1a1b1c'}>
              {getTitle(name)}
            </Heading>
          </Center>
          {name === 'MainScreen' ? (
            <Box size={6} mr={30}></Box>
          ) : (
            <Box mr={30}>
              <Pressable onPress={() => navigation.navigate('MainScreen')}>
                <Image size="6" source={HomeIcon} resizeMode={'contain'} />
              </Pressable>
            </Box>
          )}
        </HStack>
        {/* 상단 메뉴, 타이틀 end */}
      </Box>
    </Box>
  );
}

export default MenuComponent;
