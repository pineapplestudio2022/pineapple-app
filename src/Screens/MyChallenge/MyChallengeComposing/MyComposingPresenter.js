//My Challenge > 연주 챌린지 화면

import React from 'react';
import {Box, HStack, Image, Input, Pressable, Text, VStack} from 'native-base';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../../../Commons/CommonUtil';
import MenuComponent from '../../../Components/MenuComponent';

import LinkIcon from '../../../Assets/Image/challenge/icon_challenge_link.png';

const MyComposingPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'My Challenge/편곡챌린지'}
        navigation={props.navigation}
      />
      <VStack alignItems={'center'} mt={20}>
        <Text
          textAlign={'center'}
          fontSize={responsiveFontSize(fontSizePersentage(20))}
          bold
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
            bold
            textAlign={'center'}
            color={'#858c92'}>
            Innocent
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
                alt={' '}
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
          width={responsiveWidth(widthPersentage(320))}
          height={responsiveHeight(heightPersentage(48))}
          my={5}>
          <Box
            style={{
              width: '100%',
              height: '100%',
              borderWidth: 1,
              borderColor: '#0fefbd',
              justifyContent: 'center',
              borderRadius: 5,
            }}>
            <Input
              type={'file'}
              editable={false}
              textAlign={'center'}
              borderWidth={0}
              fontSize={responsiveFontSize(fontSizePersentage(13))}
              color={'#858c92'}>
              파일을 등록해주세요
            </Input>
          </Box>
          <HStack space={5} justifyContent={'flex-end'} my={2} mr={4}>
            <Pressable
              width={responsiveWidth(widthPersentage(70))}
              height={responsiveHeight(heightPersentage(24))}
              backgroundColor={'#0fefbd'}
              alignItems={'center'}
              justifyContent={'center'}
              rounded={4}>
              <Text
                color={'#ffffff'}
                fontSize={responsiveFontSize(fontSizePersentage(12))}
                bold>
                파일찾기
              </Text>
            </Pressable>
            <Pressable
              width={responsiveWidth(widthPersentage(70))}
              height={responsiveHeight(heightPersentage(24))}
              backgroundColor={'#0fefbd'}
              alignItems={'center'}
              justifyContent={'center'}
              rounded={4}>
              <Text
                color={'#ffffff'}
                fontSize={responsiveFontSize(fontSizePersentage(12))}
                bold>
                등 록
              </Text>
            </Pressable>
          </HStack>
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
            bold
            textAlign={'center'}
            color={'#858c92'}>
            Rocking in the Beach
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
                alt={' '}
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
          width={responsiveWidth(widthPersentage(320))}
          height={responsiveHeight(heightPersentage(48))}
          my={5}>
          <Box
            style={{
              width: '100%',
              height: '100%',
              borderWidth: 1,
              borderColor: '#0fefbd',
              justifyContent: 'center',
              borderRadius: 5,
            }}>
            <Input
              type={'file'}
              editable={false}
              borderWidth={0}
              textAlign={'center'}
              fontSize={responsiveFontSize(fontSizePersentage(13))}
              color={'#858c92'}>
              파일을 등록해주세요
            </Input>
          </Box>
          <HStack space={5} justifyContent={'flex-end'} my={2} mr={4}>
            <Pressable
              width={responsiveWidth(widthPersentage(70))}
              height={responsiveHeight(heightPersentage(24))}
              backgroundColor={'#0fefbd'}
              alignItems={'center'}
              justifyContent={'center'}
              rounded={4}>
              <Text
                color={'#ffffff'}
                fontSize={responsiveFontSize(fontSizePersentage(12))}
                bold>
                파일찾기
              </Text>
            </Pressable>
            <Pressable
              width={responsiveWidth(widthPersentage(70))}
              height={responsiveHeight(heightPersentage(24))}
              backgroundColor={'#0fefbd'}
              alignItems={'center'}
              justifyContent={'center'}
              rounded={4}>
              <Text
                color={'#ffffff'}
                fontSize={responsiveFontSize(fontSizePersentage(12))}
                bold>
                등 록
              </Text>
            </Pressable>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default MyComposingPresenter;
