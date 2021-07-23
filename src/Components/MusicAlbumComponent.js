//MainScreen 상단 Top 10 안의 음원 표시 Component

import React, {Component} from 'react';
import {Box, Text, Image, Pressable} from 'native-base';
import {ImageBackground} from 'react-native';
import TopMusicAll from '../Assets/Image/Top_music/top_music_all.jpg';
import BadgeIcon1 from '../Assets/Image/Top_music/top_music_badge_1.png';
import BadgeIcon2 from '../Assets/Image/Top_music/top_music_badge_2.png';
import BadgeIcon3 from '../Assets/Image/Top_music/top_music_badge_3.png';
import BadgeIcon4 from '../Assets/Image/Top_music/top_music_badge_4.png';
import BadgeIcon5 from '../Assets/Image/Top_music/top_music_badge_5.png';
import BadgeIcon6 from '../Assets/Image/Top_music/top_music_badge_6.png';
import BadgeIcon7 from '../Assets/Image/Top_music/top_music_badge_7.png';
import BadgeIcon8 from '../Assets/Image/Top_music/top_music_badge_8.png';
import BadgeIcon9 from '../Assets/Image/Top_music/top_music_badge_9.png';
import BadgeIcon10 from '../Assets/Image/Top_music/top_music_badge_10.png';
import BadgeIconCrown from '../Assets/Image/Top_music/top_music_badge_crown.png';
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
    case 11:
      return BadgeIconCrown;
    default:
      return undefined;
  }
};

function MusicAlbumComponent(props) {
  return (
    <Box>
      <Box
        style={{
          shadowColor: '#00000040',
          shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowRadius: 10,
          shadowOpacity: 1,
        }}>
        <Pressable
          onPress={
            props.nextView === undefined
              ? () => {}
              : () => props.navigation.navigate(props.nextView)
          }
          borderRadius={9.5}
          overflow={'hidden'}
          marginBottom={11}
          marginLeft={3}
          marginRight={3}
          marginTop={3}>
          {/* 앨범이미지 */}
          <ImageBackground
            source={TopMusicAll}
            resizeMode="cover"
            style={{
              width: responsiveWidth(widthPersentage(100)),
              height: responsiveWidth(widthPersentage(100)),
            }}>
            <Image
              source={getBadge(props.badge)}
              resizeMode="cover"
              position="absolute"
              width={25}
              height={25}
              right={1}
              top={1}
              alt={' '}
            />
          </ImageBackground>
        </Pressable>
      </Box>
      <Box marginLeft={3} marginRight={3}>
        <Text color={'#14163e'} fontSize={15}>
          {props.title === undefined ? '음원제목' : props.title}
        </Text>
        <Text color={'#a4acb4'} fontSize={12}>
          {props.subtitle === undefined ? '소유자' : props.subtitle}
        </Text>
      </Box>
    </Box>
  );
}

export default MusicAlbumComponent;
