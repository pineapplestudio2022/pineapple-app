//음악플레이어 큰화면
import {BlurView} from '@react-native-community/blur';
import {
  Box,
  Center,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import ArrowDownIcon from '../Assets/Image/icon_musicplayer_arrow_down.png';
import CdDumpImage from '../Assets/Image/img_dump_cd.png';
import HeartIcon from '../Assets/Image/icon_musicplayer_heart.png';
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
        <Box
          style={{
            position: 'absolute',
            top: responsiveHeight(heightPersentage(23)),
            left: responsiveWidth(widthPersentage(35)),
            width: responsiveWidth(widthPersentage(40)),
            height: responsiveHeight(heightPersentage(40)),
          }}>
          <Image
            source={ArrowDownIcon}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode={'contain'}
          />
        </Box>
        <Box
          style={{
            position: 'absolute',
            top: responsiveHeight(heightPersentage(240)),
            right: responsiveWidth(widthPersentage(35)),
            width: responsiveWidth(widthPersentage(40)),
            height: responsiveHeight(heightPersentage(40)),
          }}>
          <Image
            source={HeartIcon}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode={'contain'}
          />
        </Box>
        <VStack alignItems={'center'} space={2}>
          <Box
            rounded={114}
            style={{
              width: responsiveWidth(widthPersentage(228)),
              height: responsiveHeight(heightPersentage(228)),
              marginTop: responsiveHeight(heightPersentage(38)),
              marginBottom: responsiveHeight(heightPersentage(22)),
            }}>
            <Image
              source={CdDumpImage}
              resizeMode={'contain'}
              style={{width: '100%', height: '100%'}}
            />
          </Box>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(28))}
            bold
            color={'#1a1b1c'}>
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
            mb={10}>
            <MusicPlayBarComponent />
          </Box>
        </Center>
        {/* 슬라이더 */}

        {/* 댓글 start */}
        <Center>
          <Box
            style={{
              width: responsiveWidth(widthPersentage(320)),
              height: responsiveHeight(heightPersentage(134)),
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              onTouchStart={() => props.onScroll(false)}
              onTouchEnd={() => props.onScroll(true)}
              onTouchCancel={() => props.onScroll(false)}>
              {['1', '2', '3', '4', '5', '6', '7'].map(() => (
                <HStack space={6} my={1}>
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
        </Center>
      </Box>
    </BlurView>
  );
}

export default MusicPlayerFull;
