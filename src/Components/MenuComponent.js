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
} from 'native-base';
import HomeIcon from '../Assets/Image/icon_home.png';

//헤더 이름 변경해서 보여주기위한 switch-case
const getTitle = screenName => {
  switch (screenName) {
    case 'MainScreen':
      return 'Mi-Music';
    case 'About':
      return '';
    case 'Price - 준비중':
      return '';
    case 'My Diary - 준비중':
      return '';
    case 'My Photo Album - 준비중':
      return '';
    case '내가 만든 음원 - 준비중':
      return '';
    case 'My Challenge':
      return 'Challenge';
    case 'My BGM - 준비중':
      return '';
    case '파인애플스튜디오 - 준비중':
      return '';
    case 'My List - 준비중':
      return '';
    default:
      return undefined;
  }
};

function MenuComponent({name, navigation}) {
  return (
    <Box safeAreaTop>
      <HStack alignItems="center" borderColor={'red'} height={44}>
        <Box ml={30}>
          <Pressable onPress={() => navigation.toggleDrawer()}>
            <HamburgerIcon size="6" />
          </Pressable>
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
    </Box>
  );
}

export default MenuComponent;
