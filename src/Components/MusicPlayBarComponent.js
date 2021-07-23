//음악 재생 플레이어 컨트롤 컴포넌트
import {Box, HStack, Image, Pressable, Slider, Text} from 'native-base';
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

import PulseIcon from '../Assets/Image/icon_musicplayer_pulse.png';
import SkipBackIcon from '../Assets/Image/icon_musicplayer_skip_back.png';
import SkipForwordIcon from '../Assets/Image/icon_musicplayer_skip_forword.png';
import RewindLeftIcon from '../Assets/Image/icon_musicplayer_rewind_left.png';
import RewindRightIcon from '../Assets/Image/icon_musicplayer_rewind_right.png';

function MusicPlayBarComponent(props) {
  const [onChangeValue, setOnChangeValue] = React.useState('00:00');
  const [onChangeEndValue, setOnChangeEndValue] = React.useState('00:00');

  return (
    <Box>
      <Slider
        defaultValue={0}
        onChange={v => {
          setOnChangeValue(Math.floor(v));
        }}
        onChangeEnd={v => {
          v && setOnChangeEndValue(Math.floor(v));
        }}>
        <Slider.Track bg={'#a5a8ae'}>
          <Slider.FilledTrack bg={'#0fefbd'} />
        </Slider.Track>
      </Slider>
      <Box>
        <HStack justifyContent={'space-between'}>
          <Text
            color={'#0fefbd'}
            fontSize={responsiveFontSize(fontSizePersentage(12))}
            fontWeight={500}>
            {onChangeValue}
          </Text>
          <Text
            color={'#0fefbd'}
            fontSize={responsiveFontSize(fontSizePersentage(12))}
            fontWeight={500}>
            {onChangeEndValue}
          </Text>
        </HStack>
      </Box>
      <HStack justifyContent={'space-around'} alignItems={'center'}>
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
            width: responsiveWidth(widthPersentage(36)),
            height: responsiveHeight(heightPersentage(36)),
          }}>
          <Image
            source={RewindLeftIcon}
            resizeMode={'contain'}
            style={{width: '100%', height: '100%'}}
            alt={' '}
          />
        </Pressable>
        <Pressable
          style={{
            width: responsiveWidth(widthPersentage(48)),
            height: responsiveHeight(heightPersentage(48)),
          }}>
          <Image
            source={PulseIcon}
            resizeMode={'contain'}
            alt={' '}
            style={{width: '100%', height: '100%'}}
          />
        </Pressable>
        <Pressable
          style={{
            width: responsiveWidth(widthPersentage(36)),
            height: responsiveHeight(heightPersentage(36)),
          }}>
          <Image
            source={RewindRightIcon}
            resizeMode={'contain'}
            alt={' '}
            style={{width: '100%', height: '100%'}}
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
            alt={' '}
            style={{width: '100%', height: '100%'}}
          />
        </Pressable>
      </HStack>
    </Box>
  );
}

export default MusicPlayBarComponent;
