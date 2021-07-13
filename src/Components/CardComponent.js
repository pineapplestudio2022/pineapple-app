import React, {Component} from 'react';
import {Image, Text, Box, VStack, HStack, Pressable} from 'native-base';
import DumpImage from '../Assets/Image/image_singing_dumpimage.jpg';
export default class CardComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <HStack
        space={3}
        maxWidth="92%"
        maxHeight="23%"
        borderWidth={1}
        borderColor={'#8799a45b'}
        rounded={4}
        alignItems={'center'}>
        <Box m={4} rounded={4} overflow={'hidden'}>
          <Image source={DumpImage} resizeMode={'center'} w="110" h="110" />
        </Box>
        <VStack space={1} w="50%">
          <Text fontSize={14} fontWeight={800} color={'#1a1b1c'} noOfLines={1}>
            곡 제목
          </Text>
          <Text fontSize={11} color={'#858c92'} noOfLines={2}>
            곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡
            설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명 곡 설명
          </Text>
          <Text fontSize={11} fontWeight={800} color={'#000000'} noOfLines={1}>
            작곡가:
          </Text>
          <Text fontSize={11} fontWeight={800} color={'#000000'} noOfLines={1}>
            작사가:
          </Text>
          <HStack space={6}>
            <Pressable
              backgroundColor={'#0fefbd'}
              rounded={4}
              pt={1}
              pb={1}
              pl={4}
              pr={4}>
              <Text
                fontSize={12}
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
                fontSize={12}
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
    );
  }
}
