// 랭킹, 파인애플 뮤직 등 음악 앨범 카드 컴포넌트
import {Box, Image, Pressable, Text, VStack} from 'native-base';
import React from 'react';
import {ImageBackground} from 'react-native';
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

import DumpImage from '../Assets/Image/image_singing_dumpimage.jpg';
import {BlurView} from '@react-native-community/blur';
import BadgeIcon1 from '../Assets/Image/Top_music/badge_ranking_green_1.png';
import BadgeIcon2 from '../Assets/Image/Top_music/badge_ranking_green_2.png';
import BadgeIcon3 from '../Assets/Image/Top_music/badge_ranking_green_3.png';
import BadgeIcon4 from '../Assets/Image/Top_music/badge_ranking_green_4.png';
import BadgeIcon5 from '../Assets/Image/Top_music/badge_ranking_green_5.png';
import BadgeIcon6 from '../Assets/Image/Top_music/badge_ranking_green_6.png';
import BadgeIcon7 from '../Assets/Image/Top_music/badge_ranking_green_7.png';
import BadgeIcon8 from '../Assets/Image/Top_music/badge_ranking_green_8.png';
import BadgeIcon9 from '../Assets/Image/Top_music/badge_ranking_green_9.png';
import BadgeIcon10 from '../Assets/Image/Top_music/badge_ranking_green_10.png';
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
      return undefined;
  }
};
const getBadge = number => {
  switch (number) {
    case 1:
      return BadgeIcon1;
    case 2:
      return BadgeIcon2;
    case 3:
      return BadgeIcon3;
    case 4:
      return BadgeIcon4;
    case 5:
      return BadgeIcon5;
    case 6:
      return BadgeIcon6;
    case 7:
      return BadgeIcon7;
    case 8:
      return BadgeIcon8;
    case 9:
      return BadgeIcon9;
    case 10:
      return BadgeIcon10;
    default:
      return undefined;
  }
};

function MusicBoxComponent(props) {
  return (
    <Pressable
      onPress={props.onPress}
      style={{
        width: responsiveWidth(widthPersentage(145)),
        height: responsiveHeight(heightPersentage(145)),
        borderRadius: 4,
        overflow: 'hidden',
      }}>
      <ImageBackground
        source={getCover(props.cover)}
        style={{width: '100%', height: '100%'}}>
        <BlurView
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: responsiveHeight(heightPersentage(52)),
            backgroundColor: '#1a1b1c80',
          }}
          blurType="light"
          blurAmount={2}
          reducedTransparencyFallbackColor="white">
          {props.badge === undefined ? (
            {}
          ) : (
            <Image
              source={getBadge(props.badge)}
              style={{
                position: 'absolute',
                left: 6,
                top: 8,
                width: responsiveWidth(widthPersentage(36)),
                height: responsiveHeight(heightPersentage(36)),
              }}
              alt={' '}
            />
          )}

          <Text
            noOfLines={1}
            style={{
              width: responsiveWidth(widthPersentage(100)),
              position: 'absolute',
              top: 8,
              right: 4,
              textAlign: 'right',
              color: '#4be3ac',
              fontSize: responsiveFontSize(fontSizePersentage(15)),
            }}
            bold>
            {props.music === '미상' ? '' : props.music}
          </Text>
          <Text
            noOfLines={1}
            style={{
              width: responsiveWidth(widthPersentage(80)),
              position: 'absolute',
              top: 26,
              right: 4,
              color: '#fafafa',
              textAlign: 'right',
              fontSize: responsiveFontSize(fontSizePersentage(15)),
            }}
            fontSize={responsiveFontSize(fontSizePersentage(15))}>
            {props.owner === '미상' ? '' : props.owner}
          </Text>
        </BlurView>
      </ImageBackground>
    </Pressable>
  );
}

export default MusicBoxComponent;
