//음악플레이어 작은 화면
import {BlurView} from '@react-native-community/blur';
import {Box, Image, Pressable} from 'native-base';
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
import ArrowUpIcon from '../Assets/Image/icon_musicplayer_arrow_up.png';

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
        <Pressable
          style={{
            position: 'absolute',
            top: 23,
            left: 35,
            width: responsiveWidth(widthPersentage(40)),
            height: responsiveHeight(heightPersentage(40)),
          }}>
          <Image
            source={ArrowUpIcon}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode={'contain'}
          />
        </Pressable>
        <Pressable
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
          />
        </Pressable>
      </Box>
    </BlurView>
  );
}
export default MusicPlayerSmall;
