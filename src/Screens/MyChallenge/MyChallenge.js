// My Challenge View

import React from 'react';
import {Box, VStack, HStack, Text, Image, Pressable} from 'native-base';
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
import MenuComponent from '../../Components/MenuComponent';

import SingingIcon from '../../Assets/Image/challenge/btn_challenge_singing.png';
import PlayingMusicIcon from '../../Assets/Image/challenge/btn_challenge_playingmusic.png';
import PreviewIcon from '../../Assets/Image/challenge/btn_challenge_preview.png';
import CameraIcon from '../../Assets/Image/challenge/btn_challenge_camera.png';
import {BlurView} from '@react-native-community/blur';

function MyChallenge(props) {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'My Challenge'}
        navigation={props.navigation}
      />
      <VStack alignItems={'center'}>
        {/* 노래 챌린지 버튼 start */}
        <BlurView
          style={{
            width: responsiveWidth(widthPersentage(320)),
            height: responsiveHeight(heightPersentage(104)),
            marginTop: 4,
            marginBottom: 4,
          }}
          blurType="light"
          blurAmount={15}
          reducedTransparencyFallbackColor="white">
          <Pressable
            onPress={() => props.navigation.navigate('MySinging')}
            borderWidth={1}
            borderColor={'#0fefbd'}
            rounded={8}
            backgroundColor={'#fafafa19'}
            width="100%"
            height="100%">
            <HStack>
              <Image
                position={'absolute'}
                left={responsiveWidth(widthPersentage(56))}
                top={responsiveHeight(heightPersentage(32))}
                source={SingingIcon}
                style={{
                  width: responsiveWidth(widthPersentage(40)),
                  height: responsiveHeight(heightPersentage(40)),
                }}
                resizeMode={'contain'}
              />
              <Text
                position={'absolute'}
                left={responsiveWidth(widthPersentage(112))}
                top={responsiveHeight(heightPersentage(35))}
                color={'#0fefbd'}
                fontSize={responsiveFontSize(fontSizePersentage(28))}
                bold>
                노래 챌린지
              </Text>
            </HStack>
          </Pressable>
        </BlurView>
        {/* 노래 챌린지 버튼 end */}
        {/* 영상 챌린지 버튼 start */}
        <BlurView
          style={{
            width: responsiveWidth(widthPersentage(320)),
            height: responsiveHeight(heightPersentage(104)),
            marginTop: 4,
            marginBottom: 4,
          }}
          blurType="light"
          blurAmount={15}
          reducedTransparencyFallbackColor="white">
          <Pressable
            onPress={() => props.navigation.navigate('MyVideo')}
            borderWidth={1}
            borderColor={'#0fefbd'}
            rounded={8}
            backgroundColor={'#fafafa19'}
            width="100%"
            height="100%">
            <HStack>
              <Image
                position={'absolute'}
                left={responsiveWidth(widthPersentage(56))}
                top={responsiveHeight(heightPersentage(32))}
                source={CameraIcon}
                style={{
                  width: responsiveWidth(widthPersentage(40)),
                  height: responsiveHeight(heightPersentage(40)),
                }}
                resizeMode={'contain'}
              />
              <Text
                position={'absolute'}
                left={responsiveWidth(widthPersentage(112))}
                top={responsiveHeight(heightPersentage(35))}
                color={'#0fefbd'}
                fontSize={responsiveFontSize(fontSizePersentage(28))}
                bold>
                영상 챌린지
              </Text>
            </HStack>
          </Pressable>
        </BlurView>
        {/* 영상 챌린지 버튼 end */}
        {/* 연주 챌린지 버튼 start */}
        <BlurView
          style={{
            width: responsiveWidth(widthPersentage(320)),
            height: responsiveHeight(heightPersentage(104)),
            marginTop: 4,
            marginBottom: 4,
          }}
          blurType="light"
          blurAmount={15}
          reducedTransparencyFallbackColor="white">
          <Pressable
            onPress={() => props.navigation.navigate('MyPlaying')}
            borderWidth={1}
            borderColor={'#0fefbd'}
            rounded={8}
            backgroundColor={'#fafafa19'}
            width="100%"
            height="100%">
            <HStack>
              <Image
                position={'absolute'}
                left={responsiveWidth(widthPersentage(56))}
                top={responsiveHeight(heightPersentage(32))}
                source={PlayingMusicIcon}
                style={{
                  width: responsiveWidth(widthPersentage(40)),
                  height: responsiveHeight(heightPersentage(40)),
                }}
                resizeMode={'contain'}
              />
              <Text
                position={'absolute'}
                left={responsiveWidth(widthPersentage(112))}
                top={responsiveHeight(heightPersentage(35))}
                color={'#0fefbd'}
                fontSize={responsiveFontSize(fontSizePersentage(28))}
                bold>
                연주 챌린지
              </Text>
            </HStack>
          </Pressable>
        </BlurView>
        {/* 연주 챌린지 버튼 end */}
        {/* 편곡 챌린지 버튼 start */}
        <BlurView
          style={{
            width: responsiveWidth(widthPersentage(320)),
            height: responsiveHeight(heightPersentage(104)),
            marginTop: 4,
            marginBottom: 4,
          }}
          blurType="light"
          blurAmount={15}
          reducedTransparencyFallbackColor="white">
          <Pressable
            onPress={() => props.navigation.navigate('MyComposing')}
            borderWidth={1}
            borderColor={'#0fefbd'}
            rounded={8}
            backgroundColor={'#fafafa19'}
            width="100%"
            height="100%">
            <HStack>
              <Image
                position={'absolute'}
                left={responsiveWidth(widthPersentage(56))}
                top={responsiveHeight(heightPersentage(32))}
                source={PreviewIcon}
                style={{
                  width: responsiveWidth(widthPersentage(40)),
                  height: responsiveHeight(heightPersentage(40)),
                }}
                resizeMode={'contain'}
              />
              <Text
                position={'absolute'}
                left={responsiveWidth(widthPersentage(112))}
                top={responsiveHeight(heightPersentage(35))}
                color={'#0fefbd'}
                fontSize={responsiveFontSize(fontSizePersentage(28))}
                bold>
                편곡 챌린지
              </Text>
            </HStack>
          </Pressable>
        </BlurView>
        {/* 편곡 챌린지 버튼 end */}
      </VStack>
    </Box>
  );
}

export default MyChallenge;
