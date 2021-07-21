//
import React, {Component} from 'react';
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
export default class CardComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
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
            />
          </Box>
          <VStack space={1} w={responsiveWidth(widthPersentage(190))}>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(14))}
              fontWeight={800}
              color={'#1a1b1c'}
              noOfLines={1}>
              곡 제목
            </Text>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(11))}
              color={'#858c92'}
              noOfLines={2}>
              곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡
              설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡
              설명
            </Text>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(11))}
              fontWeight={800}
              color={'#000000'}
              noOfLines={1}>
              작곡가:
            </Text>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(11))}
              fontWeight={800}
              color={'#000000'}
              noOfLines={1}>
              작사가:
            </Text>
            <HStack space={5} mt={1}>
              <Pressable
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
}