//MainScreen 상단 Top 10 안의 음원 표시 Component

import React, {Component} from 'react';
import {Box, Text, Image} from 'native-base';
import {ImageBackground} from 'react-native';
import TopMusicAll from '../Assets/Image/Top_music/top_music_all.jpg';
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
export default class MusicAlbumComponent extends Component {
  render() {
    return (
      <Box>
        <Box shadow={9}>
          <Box
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
                source={require('../Assets/Image/Top_music/top_music_badge_2.png')}
                resizeMode="cover"
                position="absolute"
                width={25}
                height={25}
                right={1}
                top={1}
                alt={'.'}
              />
            </ImageBackground>
          </Box>
        </Box>
        <Box marginLeft={3} marginRight={3}>
          <Text color={'#14163e'} fontSize={15}>
            인기음원
          </Text>
          <Text color={'#a4acb4'} fontSize={12}>
            전체보기
          </Text>
        </Box>
      </Box>
    );
  }
}
