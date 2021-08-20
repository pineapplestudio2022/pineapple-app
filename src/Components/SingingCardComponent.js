//CHallenge > 노래부르기 참여 > 카드 컴포넌트
import React from 'react';
import {Image, Text, Box, VStack, HStack, Pressable} from 'native-base';
import DumpImage from '../Assets/Image/image_singing_dumpimage.jpg';
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

function SingingCardComponent(props) {
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
            source={DumpImage}
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
            {props.title}곡 제목
          </Text>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(11))}
            color={'#858c92'}
            noOfLines={2}>
            곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡
            설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명
          </Text>

          <HStack space={3}>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(11))}
              fontWeight={500}
              color={'#000000'}>
              장르:
            </Text>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(11))}
              fontWeight={500}
              color={'#858c92'}>
              일렉트로닉
            </Text>
          </HStack>
          <HStack space={5} mt={1}>
            <Pressable
              onPress={() => props.navigation.navigate('Lyrics')}
              backgroundColor={'#0fefbd'}
              rounded={4}
              pt={1}
              pb={1}
              pl={4}
              pr={4}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(12))}
                lineHeight={16}
                textAlign={'center'}
                bold
                color="white">
                가사보기
              </Text>
            </Pressable>
            <Pressable
              onPress={() => props.navigation.navigate('Listening')}
              backgroundColor={'#0fefbd'}
              rounded={4}
              pt={1}
              pb={1}
              pl={4}
              pr={4}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(12))}
                lineHeight={16}
                textAlign={'center'}
                bold
                color="white">
                15초감상
              </Text>
            </Pressable>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}
export default SingingCardComponent;
