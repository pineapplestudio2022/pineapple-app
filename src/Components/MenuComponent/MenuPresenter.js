//상단 헤더, 햄버거 메뉴 컴포넌트
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, Center, HStack, Image, Pressable, Text} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../../Commons/CommonUtil';
import HomeIcon from '../../Assets/Image/icon_home.png';
import HamburgerIcon from '../../Assets/Image/icon_main_hamburg.png';
import AddLyricsIcon from '../../Assets/Image/icon_menu_addLyrics.png';
import SaveLyricsIcon from '../../Assets/Image/icon_menu_saveLyrics.png';

const MenuPresenter = props => {
  return (
    <Box safeAreaTop pt={5} mb={responsiveHeight(heightPersentage(22))}>
      {/* 상단 그라데이션 && 블러 효과 start */}
      {props.notGB ? (
        <></>
      ) : (
        <LinearGradient
          colors={['#0fefbd', '#94fc1300']}
          style={{
            flex: 1,
            position: 'absolute',
            width: '100%',
            height: responsiveHeight(heightPersentage(152)),
            backgroundColor: 'transparent',
          }}
        />
      )}
      {/* 상단 그라데이션 && 블러 효과 end */}

      {/* 상단 메뉴, 타이틀 start */}
      <HStack
        alignItems="center"
        width="100%"
        height={responsiveHeight(heightPersentage(44))}>
        <Box ml={responsiveWidth(widthPersentage(30))}>
          {props.name === 'Home' ? (
            <Pressable
              onPress={props.handlerToggleDrawer}
              w={responsiveWidth(widthPersentage(25))}
              h={responsiveHeight(heightPersentage(25))}>
              <Image
                size="100%"
                source={HamburgerIcon}
                resizeMode={'contain'}
                alt=" "
              />
            </Pressable>
          ) : (
            <Pressable
              onPress={props.handlerGoBack}
              w={responsiveWidth(widthPersentage(25))}
              h={responsiveHeight(heightPersentage(25))}>
              <Image
                size="100%"
                source={props.handlerGetLeftImageIcon}
                resizeMode={'contain'}
                alt=" "
              />
            </Pressable>
          )}
        </Box>
        <Center flex={1}>
          <Pressable
            onPress={
              __DEV__ ? () => props.navigation.navigate('DEVScreen') : () => {}
            }>
            <Text
              textAlign={'center'}
              fontSize={responsiveFontSize(fontSizePersentage(17))}
              fontWeight={600}
              noOfLines={1}
              color={'#1a1b1c'}>
              {props.titleName}
            </Text>
          </Pressable>
        </Center>
        {props.name === 'Home' ? (
          <Box
            w={responsiveWidth(widthPersentage(25))}
            h={responsiveHeight(heightPersentage(25))}
            mr={responsiveWidth(widthPersentage(30))}
          />
        ) : props.name === 'LyricsListView' ? (
          <Box mr={responsiveWidth(widthPersentage(30))}>
            <Pressable
              onPress={props.handlerGoLyrics}
              w={responsiveWidth(widthPersentage(25))}
              h={responsiveHeight(heightPersentage(25))}>
              <Image
                size="100%"
                source={AddLyricsIcon}
                resizeMode={'contain'}
                alt=" "
              />
            </Pressable>
          </Box>
        ) : props.name === 'WriteLyrics' ? (
          <Box mr={responsiveWidth(widthPersentage(30))}>
            <TouchableOpacity
              onPress={props.handlerOnSave}
              style={{
                width: responsiveWidth(widthPersentage(25)),
                height: responsiveHeight(heightPersentage(25)),
              }}>
              <Image
                size="100%"
                source={SaveLyricsIcon}
                resizeMode={'contain'}
                alt=" "
              />
            </TouchableOpacity>
          </Box>
        ) : (
          <Box mr={responsiveWidth(widthPersentage(30))}>
            <Pressable
              onPress={props.handlerResetNavigation}
              w={responsiveWidth(widthPersentage(25))}
              h={responsiveHeight(heightPersentage(25))}>
              <Image
                size="100%"
                source={HomeIcon}
                resizeMode={'contain'}
                alt=" "
              />
            </Pressable>
          </Box>
        )}
      </HStack>
      {/* 상단 메뉴, 타이틀 end */}
    </Box>
  );
};

export default MenuPresenter;
