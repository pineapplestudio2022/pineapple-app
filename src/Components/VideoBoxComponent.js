import React from 'react';
import {ImageBackground} from 'react-native';
import {Box, Pressable, Text} from 'native-base';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../Commons/CommonUtil';

import DefaultImage from '../Assets/Image/image_singing_dumpimage.jpg';
import Cover1 from '../Assets/Image/Top_music/top_music_1.jpg';
import Cover2 from '../Assets/Image/Top_music/top_music_2.jpg';
import Cover3 from '../Assets/Image/Top_music/top_music_3.jpg';
import Cover4 from '../Assets/Image/Top_music/top_music_4.jpg';
import Cover5 from '../Assets/Image/Top_music/top_music_5.jpg';
import Cover6 from '../Assets/Image/Top_music/top_music_6.jpg';
import Cover7 from '../Assets/Image/Top_music/top_music_7.jpg';
import Cover8 from '../Assets/Image/Top_music/top_music_8.jpg';
import Cover9 from '../Assets/Image/Top_music/top_music_9.jpg';
import Cover10 from '../Assets/Image/Top_music/top_music_10.jpg';

const getCover = number => {
  //랜덤 이미지
  if (number === 100) {
    number = Math.floor(Math.random() * 10) + 1;
  }
  switch (number) {
    case 1:
      return Cover1;
    case 2:
      return Cover2;
    case 3:
      return Cover3;
    case 4:
      return Cover4;
    case 5:
      return Cover5;
    case 6:
      return Cover6;
    case 7:
      return Cover7;
    case 8:
      return Cover8;
    case 9:
      return Cover9;
    case 10:
      return Cover10;
    default:
      return DefaultImage;
  }
};

const VideoBox = props => {
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        width: responsiveWidth(widthPersentage(props.wp)),
        height: responsiveHeight(heightPersentage(props.hp)),
        borderRadius: props.rounded,
        overflow: 'hidden',
      }}>
      <ImageBackground
        source={getCover(props.cover)}
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.8,
          backgroundColor: '#595d62',
        }}
        resizeMode={'cover'}
      />
      <Box
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: responsiveHeight(heightPersentage(52)),
          backgroundColor: '#1a1b1c80',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          fontSize={responsiveFontSize(fontSizePersentage(15))}
          bold
          color={'#4be3ac'}
          noOfLines={1}
          w={'95%'}
          textAlign={'right'}>
          {props.title}
        </Text>
        <Text
          fontSize={responsiveFontSize(fontSizePersentage(15))}
          color={'#fafafa'}
          noOfLines={1}
          w={'95%'}
          textAlign={'right'}>
          {props.participant}
        </Text>
      </Box>
    </Pressable>
  );
};

VideoBox.defaultProps = {
  wp: 320, //width
  hp: 148, //height
  rounded: 8, //borderRadius
  cover: 1,
};
export default VideoBox;
