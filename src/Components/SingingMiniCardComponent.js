//My Challenge > 노래 챌린지 > 카드컴포넌트
import React, {Component} from 'react';
import {Image, Text, Box, VStack, HStack, Pressable, View} from 'native-base';
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
import PlayIcon from '../Assets/Image/challenge/icon_challenge_playmusic.png';

export default class SingingMiniCardComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Box>
        <Box w="100%" borderWidth={1} borderColor={'#0fefbd'} />
        <HStack backgroundColor={'#fafafa80'} py={3}>
          <VStack ml={6}>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(17))}
              fontWeight={600}
              color={'#1a1b1c'}>
              노래 제목입니다
            </Text>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(15))}
              color={'#858c92'}>
              KingKong12
            </Text>
          </VStack>
          <Pressable
            size={responsiveWidth(widthPersentage(36))}
            position="absolute"
            right={37}
            top={3}>
            <Image
              source={PlayIcon}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </Pressable>
        </HStack>
      </Box>
    );
  }
}
