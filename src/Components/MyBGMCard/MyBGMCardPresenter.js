import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, HStack, Image, Text, VStack} from 'native-base';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {
  fontSizePersentage,
  getImage,
  widthPersentage,
} from '../../Commons/CommonUtil';
import Gbutton from '../../Components/GbuttonComponent';

import TrashIcon from '../../Assets/Image/challenge/icon_challenge_trash.png';

const MyBGMCardPresenter = props => {
  return (
    <Box
      w={320}
      h={110}
      backgroundColor={'#ffffff80'}
      borderRadius={8}
      style={{
        shadowColor: '#8799a45b',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 10,
        shadowOpacity: 1,
      }}>
      <HStack space={3} w="100%" h="100%" padding={2} borderRadius={8}>
        <Box
          borderColor="red"
          width={responsiveWidth(widthPersentage(95))}
          height={responsiveWidth(widthPersentage(95))}
          alignSelf="center"
          rounded={4}
          overflow={'hidden'}>
          <Image
            source={getImage}
            alt=" "
            resizeMode="cover"
            width="100%"
            height="100%"
          />
        </Box>
        <Box flex={1} justifyContent="center">
          <VStack space={1.5}>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(17))}
              fontWeight={600}
              numberOfLines={1}
              color="#1a1b1c">
              BGM 생성 일자
            </Text>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(11))}
              fontWeight={600}
              numberOfLines={1}
              color="#858c92">
              BGM 생성 키워드 정보
            </Text>
            <HStack space={1}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(11))}
                bold
                numberOfLines={1}
                color="#000000">
                사용처
              </Text>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(11))}
                bold
                numberOfLines={1}
                color="#858c92">
                사용처정보
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Gbutton
                wp={84}
                hp={26}
                rounded={4}
                text={'재 생'}
                imgName={'play'}
                fs={13}
                fw={800}
              />
              <Gbutton
                wp={84}
                hp={26}
                rounded={4}
                text={'다운로드'}
                imgName={'download'}
                fs={13}
                fw={800}
              />
            </HStack>
          </VStack>
        </Box>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 12,
            top: 8,
            padding: 4,
          }}>
          <Image
            source={TrashIcon}
            resizeMode={'contain'}
            alt={' '}
            width={responsiveWidth(widthPersentage(16))}
            height={responsiveWidth(widthPersentage(16))}
          />
        </TouchableOpacity>
      </HStack>
    </Box>
  );
};

export default MyBGMCardPresenter;
