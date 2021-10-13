//My Challenge > 노래 챌린지 > 카드컴포넌트
import React from 'react';
import {Image, Text, Box, VStack, HStack, Pressable} from 'native-base';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {fontSizePersentage, widthPersentage} from '../Commons/CommonUtil';
import PlayIcon from '../Assets/Image/challenge/icon_challenge_playmusic.png';

const SingingMiniCardComponent = props => {
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
            alt={' '}
          />
        </Pressable>
      </HStack>
    </Box>
  );
};

export default SingingMiniCardComponent;
