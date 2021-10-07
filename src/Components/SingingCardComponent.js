//CHallenge > 노래부르기 참여 > 카드 컴포넌트
import React from 'react';
import {Image, Text, Box, VStack, HStack} from 'native-base';
import DumpImage from '../Assets/Image/image_singing_dumpimage.jpg';
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
import Gbutton from './GbuttonComponent';
const getImage = () => {
  const number = Math.floor(Math.random() * 10) + 1;
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
      return DumpImage;
  }
};
function SingingCardComponent(props) {
  const handlerGoLyrics = () => {
    props.navigation.navigate('LyricsListView', {id: props.id});
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
            resizeMode={'center'}
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
          <HStack space={5} mt={1}>
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
}
export default SingingCardComponent;
