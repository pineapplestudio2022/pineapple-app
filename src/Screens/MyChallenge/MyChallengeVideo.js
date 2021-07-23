//My Challenge > 영상 챌린지 화면

import React from 'react';
import {Box, Image, Input, Pressable, Text, VStack} from 'native-base';
import MenuComponent from '../../Components/MenuComponent';
import LinkIcon from '../../Assets/Image/challenge/icon_challenge_link.png';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../../Commons/DeviceWHPersentage';
function MyChallengeVideo(props) {
  return (
    <Box flex={1}>
      <MenuComponent name={props.route.name} navigation={props.navigation} />
      <VStack alignItems={'center'} mt={20}>
        <Text
          textAlign={'center'}
          fontSize={responsiveFontSize(fontSizePersentage(20))}
          bold
          lineHeight={28}
          color={'#1a1b1c'}>
          개인 YouTube에 등록 된 {'\n'} 챌린지 영상의 링크를 등록해 주세요
        </Text>

        <Box
          width={responsiveWidth(widthPersentage(320))}
          height={responsiveHeight(heightPersentage(48))}
          justifyContent={'center'}
          mt={8}>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(20))}
            lineHeight={28}
            bold
            textAlign={'center'}
            color={'#858c92'}>
            귀요미 챌린지
          </Text>
        </Box>
        <Box>
          <Input
            width={responsiveWidth(widthPersentage(320))}
            backgroundColor={'#1a1b1c80'}
            placeholder="링크를 등록해주세요"
            placeholderTextColor="#a5a8ae"
            fontSize={responsiveFontSize(fontSizePersentage(16))}
            fontWeight={600}
            color={'#fafafa'}
            InputLeftElement={
              <Image
                source={LinkIcon}
                style={{width: responsiveWidth(widthPersentage(24))}}
                ml={3}
              />
            }
            InputRightElement={
              <Pressable
                width={responsiveWidth(widthPersentage(70))}
                height={responsiveHeight(heightPersentage(24))}
                backgroundColor={'#0fefbd'}
                alignItems={'center'}
                justifyContent={'center'}
                rounded={4}
                mr={3}>
                <Text
                  color={'#ffffff'}
                  fontSize={responsiveFontSize(fontSizePersentage(12))}
                  bold>
                  등 록
                </Text>
              </Pressable>
            }
          />
        </Box>
        <Box
          mt={6}
          width={responsiveWidth(widthPersentage(350))}
          height={responsiveHeight(heightPersentage(20))}>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(12))}
            bold
            textAlign={'center'}
            color={'#a5a8ae'}>
            등록이 완료 되었습니다. 감사합니다.
          </Text>
        </Box>

        <Box
          width={responsiveWidth(widthPersentage(320))}
          height={responsiveHeight(heightPersentage(48))}
          justifyContent={'center'}
          mt={10}>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(20))}
            lineHeight={28}
            bold
            textAlign={'center'}
            color={'#858c92'}>
            우리아이 챌린지
          </Text>
        </Box>

        <Box>
          <Input
            width={responsiveWidth(widthPersentage(320))}
            backgroundColor={'#1a1b1c80'}
            placeholder="링크를 등록해주세요"
            placeholderTextColor="#a5a8ae"
            fontSize={responsiveFontSize(fontSizePersentage(16))}
            fontWeight={600}
            color={'#fafafa'}
            InputLeftElement={
              <Image
                source={LinkIcon}
                style={{width: responsiveWidth(widthPersentage(24))}}
                ml={3}
              />
            }
            InputRightElement={
              <Pressable
                width={responsiveWidth(widthPersentage(70))}
                height={responsiveHeight(heightPersentage(24))}
                backgroundColor={'#0fefbd'}
                alignItems={'center'}
                justifyContent={'center'}
                rounded={4}
                mr={3}>
                <Text
                  color={'#ffffff'}
                  fontSize={responsiveFontSize(fontSizePersentage(12))}
                  bold>
                  등 록
                </Text>
              </Pressable>
            }
          />
        </Box>
      </VStack>
    </Box>
  );
}

export default MyChallengeVideo;
