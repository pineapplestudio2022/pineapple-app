//음악플레이어 작은 화면
import {BlurView} from '@react-native-community/blur';
import {Box, HStack, Image, Pressable, Text, VStack} from 'native-base';
import React from 'react';
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
import CdDumpImage from '../Assets/Image/img_dump_cd.png';
import SkipBackIcon from '../Assets/Image/icon_musicplayer_skip_back.png';
import SkipForwordIcon from '../Assets/Image/icon_musicplayer_skip_forword.png';
import PulseIcon from '../Assets/Image/icon_musicplayer_pulse.png';
function MusicPlayerSmall(props) {
  return (
    <BlurView
      style={{
        height: '100%',
        width: '100%',
        borderRadius: 16,
      }}
      blurType="light"
      blurAmount={10}
      reducedTransparencyFallbackColor="white">
      <Box
        style={{
          width: responsiveWidth(widthPersentage(390)),
          height: responsiveHeight(heightPersentage(157)),
        }}
        backgroundColor={'#fafafacc'}
        borderRadius={16}>
        <VStack
          style={{
            width: responsiveWidth(widthPersentage(163)),
            marginTop: 32,
            marginLeft: 39,
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(fontSizePersentage(14)),
              color: '#1a1b1c',
              textAlign: 'right',
            }}
            noOfLines={1}
            bold>
            {props.title}
          </Text>
          <Text
            noOfLines={1}
            style={{
              fontSize: responsiveFontSize(fontSizePersentage(12)),
              color: '#858c92',
              textAlign: 'right',
            }}>
            {props.owner}
          </Text>
          <HStack justifyContent={'space-between'} my={4} alignItems={'center'}>
            <Pressable
              style={{
                width: responsiveWidth(widthPersentage(36)),
                height: responsiveHeight(heightPersentage(36)),
              }}>
              <Image
                source={SkipBackIcon}
                resizeMode={'contain'}
                style={{width: '100%', height: '100%'}}
                alt={' '}
              />
            </Pressable>
            <Pressable
              style={{
                width: responsiveWidth(widthPersentage(38)),
                height: responsiveHeight(heightPersentage(38)),
              }}>
              <Image
                source={PulseIcon}
                resizeMode={'contain'}
                style={{width: '100%', height: '100%'}}
                alt={' '}
              />
            </Pressable>
            <Pressable
              style={{
                width: responsiveWidth(widthPersentage(36)),
                height: responsiveHeight(heightPersentage(36)),
              }}>
              <Image
                source={SkipForwordIcon}
                resizeMode={'contain'}
                style={{width: '100%', height: '100%'}}
                alt={' '}
              />
            </Pressable>
          </HStack>
        </VStack>
        {/* CD Image start */}
        <Box
          style={{
            position: 'absolute',
            top: 26,
            right: 41,
            width: responsiveWidth(widthPersentage(107)),
            height: responsiveHeight(heightPersentage(107)),
          }}>
          <Image
            source={CdDumpImage}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode={'contain'}
            alt={' '}
          />
        </Box>
        {/* CD Image end */}
      </Box>
    </BlurView>
  );
}
export default MusicPlayerSmall;
