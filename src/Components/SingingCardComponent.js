//CHallenge > 노래부르기 참여 > 카드 컴포넌트
import React from 'react';
import {Image, Text, Box, VStack, HStack} from 'native-base';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {
  fontSizePersentage,
  getImage,
  heightPersentage,
  widthPersentage,
} from '../Commons/CommonUtil';
import Gbutton from './GbuttonComponent';

const SingingCardComponent = props => {
  const handlerGoLyrics = () => {
    props.navigation.navigate('Lyrics', {id: props.id});
  };
  const handlerGoListening = () => {
    props.navigation.navigate('Listening', {id: props.id});
  };
  return (
    <Box my={2}>
      <HStack
        space={3}
        Width={responsiveWidth(widthPersentage(804))}
        Height={responsiveHeight(heightPersentage(155))}
        borderWidth={1}
        borderColor={'#8799a45b'}
        backgroundColor={'#fafafa80'}
        rounded={4}
        alignItems={'center'}>
        <Box m={4} rounded={4} overflow={'hidden'}>
          <Image
            source={getImage}
            resizeMode={'cover'}
            width={responsiveWidth(widthPersentage(110))}
            height={responsiveWidth(widthPersentage(110))}
            alt={' '}
          />
        </Box>
        <VStack space={1} w={responsiveWidth(widthPersentage(190))}>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(14))}
            fontWeight={800}
            color={'#1a1b1c'}
            noOfLines={1}>
            {props.title}
          </Text>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(11))}
            color={'#858c92'}
            h={responsiveHeight(heightPersentage(32))}
            noOfLines={2}>
            {props.detail}
          </Text>
          <HStack space={3}>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(11))}
              fontWeight={500}
              color={'#000000'}
              noOfLines={1}>
              장르:
            </Text>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(11))}
              fontWeight={500}
              noOfLines={1}
              color={'#858c92'}>
              {props.genre}
            </Text>
          </HStack>
          <HStack space={5} mt={1} justifyContent={'space-between'}>
            <Gbutton
              wp={70}
              hp={24}
              fs={12}
              fw={800}
              rounded={4}
              text={'가사보기'}
              onPress={handlerGoLyrics}
            />
            <Gbutton
              wp={70}
              hp={24}
              fs={12}
              fw={800}
              rounded={4}
              text={'15초 감상'}
              onPress={handlerGoListening}
            />
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};
export default SingingCardComponent;
