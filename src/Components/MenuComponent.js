//상단 헤더, 햄버거 메뉴 컴포넌트
import React from 'react';
import {Box, Center, HStack, Image, Pressable, Text} from 'native-base';
import HomeIcon from '../Assets/Image/icon_home.png';
import HamburgerIcon from '../Assets/Image/icon_main_hamburg.png';
import LeftArrowIcon from '../Assets/Image/icon_main_left_arrow.png';
import LinearGradient from 'react-native-linear-gradient';
import {BlurView} from '@react-native-community/blur';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../Commons/DeviceWHPersentage';

//헤더 이름 변경해서 보여주기위한 switch-case
const getTitle = screenName => {
  switch (screenName) {
    case 'MainScreen':
      return 'PINEAPPLE STUDIO';
    case 'My Challenge':
      return 'My Challenge';
    default:
      return undefined;
  }
};

function MenuComponent({name, navigation}) {
  return (
    <Box safeAreaTop mb={responsiveHeight(heightPersentage(22))}>
      {/* 상단 그라데이션 && 블러 효과 start */}
      <LinearGradient
        colors={['#0fefbd', '#94fc1300']}
        style={{
          flex: 1,
          position: 'absolute',
          width: '100%',
          height: responsiveHeight(heightPersentage(152)),
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
      <HStack
        alignItems="center"
        width="100%"
        height={responsiveHeight(heightPersentage(44))}>
        <Box ml={responsiveWidth(widthPersentage(30))}>
          {name === 'MainScreen' ? (
            <Pressable
              onPress={() => navigation.toggleDrawer()}
              w={responsiveWidth(widthPersentage(25))}
              h={responsiveHeight(heightPersentage(25))}>
              <Image
                size="100%"
                source={HamburgerIcon}
                resizeMode={'contain'}
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => navigation.goBack()}
              w={responsiveWidth(widthPersentage(25))}
              h={responsiveHeight(heightPersentage(25))}>
              <Image
                size="100%"
                source={LeftArrowIcon}
                resizeMode={'contain'}
              />
            </Pressable>
          )}
        </Box>
        <Center flex={1}>
          <Text
            textAlign={'center'}
            fontSize={responsiveFontSize(fontSizePersentage(17))}
            fontWeight={600}
            color={'#1a1b1c'}>
            {getTitle(name)}
          </Text>
        </Center>
        {name === 'MainScreen' ? (
          <Box
            w={responsiveWidth(widthPersentage(25))}
            h={responsiveHeight(heightPersentage(25))}
            mr={responsiveWidth(widthPersentage(30))}></Box>
        ) : (
          <Box mr={responsiveWidth(widthPersentage(30))}>
            <Pressable
              onPress={() => navigation.navigate('MainScreen')}
              w={responsiveWidth(widthPersentage(25))}
              h={responsiveHeight(heightPersentage(25))}>
              <Image size="100%" source={HomeIcon} resizeMode={'contain'} />
            </Pressable>
          </Box>
        )}
      </HStack>
      {/* 상단 메뉴, 타이틀 end */}
    </Box>
  );
}

export default MenuComponent;
