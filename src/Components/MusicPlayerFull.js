//음악플레이어 큰화면
import {BlurView} from '@react-native-community/blur';
import {
  Box,
  Center,
  HStack,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import CdDumpImage from '../Assets/Image/img_dump_cd.png';
import HeartIcon from '../Assets/Image/icon_musicplayer_heart_green.png';
import FireIcon from '../Assets/Image/icon_musicplayer_fire_green.png';
import MicIcon from '../Assets/Image/icon_musicplayer_mic_green.png';

import MusicPlayBarComponent from '../Components/MusicPlayBarComponent';
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
import {Pressable} from 'react-native';
function MusicPlayerFull(props) {
  return (
    <BlurView
      style={{
        height: '100%',
        width: '100%',
        borderRadius: 16,
      }}
      blurType="light"
      blurAmount={10}
      reducedTransparencyFallbackColor="white">
      <Box flex={1} backgroundColor={'#fafafacc'} borderRadius={16}>
        <VStack alignItems={'center'} space={2}>
          <Box
            style={{
              width: responsiveWidth(widthPersentage(228)),
              height: responsiveHeight(heightPersentage(228)),
              marginTop: responsiveHeight(heightPersentage(34)),
              marginBottom: responsiveHeight(heightPersentage(14)),
            }}>
            <Image
              source={CdDumpImage}
              resizeMode={'contain'}
              style={{width: '100%', height: '100%'}}
              alt={' '}
            />
          </Box>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(28))}
            bold
            color={'#1a1b1c'}
            noOfLines={1}>
            곡 제목이 들어갈 공간입니다
          </Text>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(20))}
            bold
            color={'#858c92'}>
            참여자 이름
          </Text>
        </VStack>
        {/* 슬라이더 */}
        <Center>
          <Box
            style={{
              width: responsiveWidth(widthPersentage(320)),
              height: responsiveHeight(heightPersentage(80)),
            }}
            mb={1}>
            <MusicPlayBarComponent />
          </Box>
        </Center>
        {/* 슬라이더 */}
        <HStack justifyContent={'center'} space={10} mb={4}>
          <VStack>
            <Pressable
              style={{
                width: responsiveWidth(widthPersentage(60)),
                height: responsiveHeight(heightPersentage(80)),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#a5a8ae'}>
                555
              </Text>
              <Image
                source={FireIcon}
                alt={' '}
                style={{
                  width: responsiveWidth(widthPersentage(38)),
                  height: responsiveHeight(heightPersentage(38)),
                }}
                resizeMode={'contain'}
              />
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#0fefbd'}>
                응원해요
              </Text>
            </Pressable>
          </VStack>
          <VStack>
            <Pressable
              style={{
                width: responsiveWidth(widthPersentage(60)),
                height: responsiveHeight(heightPersentage(80)),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#a5a8ae'}>
                555
              </Text>
              <Image
                source={HeartIcon}
                style={{
                  width: responsiveWidth(widthPersentage(38)),
                  height: responsiveHeight(heightPersentage(38)),
                }}
                alt={' '}
                resizeMode={'contain'}
              />
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#0fefbd'}>
                찜
              </Text>
            </Pressable>
          </VStack>
          <VStack>
            <Pressable
              style={{
                width: responsiveWidth(widthPersentage(60)),
                height: responsiveHeight(heightPersentage(80)),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#a5a8ae'}>
                555
              </Text>
              <Image
                source={MicIcon}
                style={{
                  width: responsiveWidth(widthPersentage(38)),
                  height: responsiveHeight(heightPersentage(38)),
                }}
                alt={' '}
                resizeMode={'contain'}
              />
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#0fefbd'}>
                함께해요
              </Text>
            </Pressable>
          </VStack>
        </HStack>
        {/* 댓글 start */}
        <Center>
          <Box
            style={{
              width: responsiveWidth(widthPersentage(320)),
              height: responsiveHeight(heightPersentage(90)),
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              onTouchStart={() => props.onScroll(false)}
              onTouchEnd={() => props.onScroll(true)}
              onTouchCancel={() => props.onScroll(false)}>
              {['1', '2', '3', '4', '5', '6', '7'].map(() => (
                <HStack space={8} my={1}>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(14))}
                    bold
                    color={'#1a1b1c'}>
                    작성자
                  </Text>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(14))}
                    fontWeight={500}>
                    댓글
                  </Text>
                </HStack>
              ))}
            </ScrollView>
          </Box>
          <Input
            mt={4}
            borderWidth={1}
            borderColor={'#a5a8ae4c'}
            backgroundColor={'#fafafab3'}
            placeholder={'응원의 한 줄을 남겨주세요~'}
            fontSize={responsiveFontSize(fontSizePersentage(16))}
            w={responsiveWidth(widthPersentage(320))}
            InputRightElement={
              <Pressable
                style={{
                  width: responsiveWidth(widthPersentage(70)),
                  height: responsiveHeight(heightPersentage(24)),
                  borderRadius: 4,
                  backgroundColor: '#0fefbd',
                  shadowColor: '#00000020',
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowRadius: 10,
                  shadowOpacity: 1,
                  marginRight: 10,
                }}
                justifyContent={'center'}>
                <Text textAlign={'center'} color={'#ffffff'}>
                  등록
                </Text>
              </Pressable>
            }
          />
        </Center>
        {/* 댓글 end */}
      </Box>
    </BlurView>
  );
}

export default MusicPlayerFull;
