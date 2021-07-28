// Challenge 화면

import React from 'react';
import {Box, VStack, HStack, Text, Stack, Image, Pressable} from 'native-base';
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
import ChallengeDancer from '../../Assets/Image/challenge/image_challenge_dancer.png';
import HeadPhoneIcon from '../../Assets/Image/challenge/btn_challenge_headphones.png';
import SingingIcon from '../../Assets/Image/challenge/btn_challenge_singing.png';
import PlayingMusicIcon from '../../Assets/Image/challenge/btn_challenge_playingmusic.png';
import PreviewIcon from '../../Assets/Image/challenge/btn_challenge_preview.png';
import CameraIcon from '../../Assets/Image/challenge/btn_challenge_camera.png';

function Challenge(props) {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'Challenge'}
        navigation={props.navigation}
      />
      <Box>
        <Stack space={5} alignItems="center">
          <VStack space={5} alignItems="center">
            <HStack space={5}>
              <Pressable
                onPress={() => props.navigation.navigate('SingingScreen')}
                size={responsiveWidth(widthPersentage(140))}
                alignItems="center"
                justifyContent="center"
                rounded="8"
                borderWidth="1"
                borderColor="#0fefbd">
                <Image source={SingingIcon} resizeMode={'contain'} />
                <Text
                  marginTop="2"
                  color="#0fefbd"
                  fontSize={responsiveFontSize(fontSizePersentage(14))}
                  bold>
                  노래 부르기 참여
                </Text>
              </Pressable>
              <Pressable
                onPress={() => props.navigation.navigate('VideoScreen')}
                size={responsiveWidth(widthPersentage(140))}
                alignItems="center"
                justifyContent="center"
                rounded="8"
                borderWidth="1"
                borderColor="#0fefbd"
                backgroundColor="#fafafa80">
                <Image source={CameraIcon} resizeMode={'contain'} />
                <Text marginTop="2" color="#0fefbd" textAlign={'center'} bold>
                  15초 영상 챌린지
                </Text>
              </Pressable>
            </HStack>
          </VStack>
          <VStack space={5} alignItems="center">
            <HStack space={5} alignItems="center">
              <Pressable
                onPress={() => props.navigation.navigate('ComposingScreen')}
                size={responsiveWidth(widthPersentage(140))}
                alignItems="center"
                justifyContent="center"
                rounded="xl"
                borderWidth="1"
                borderColor="#0fefbd"
                backgroundColor="#fafafa80">
                <Image source={PlayingMusicIcon} resizeMode={'contain'} />
                <Text marginTop="2" color="#0fefbd" bold>
                  연주 참여
                </Text>
              </Pressable>
              <Pressable
                onPress={() => props.navigation.navigate('PlayingScreen')}
                size={responsiveWidth(widthPersentage(140))}
                alignItems="center"
                justifyContent="center"
                rounded="xl"
                borderWidth="1"
                borderColor="#0fefbd"
                backgroundColor="#fafafa80">
                <Image source={PreviewIcon} resizeMode={'contain'} />
                <Text marginTop="2" color="#0fefbd" bold>
                  작곡 참여
                </Text>
              </Pressable>
            </HStack>
          </VStack>
          <Pressable
            onPress={() => props.navigation.navigate('ChallengeEnjoy')}
            w={responsiveWidth(widthPersentage(320))}
            borderWidth={1}
            borderColor="#0fefbd"
            alignItems="center"
            pt="35"
            pb="35"
            rounded="xl">
            <HStack space={5} alignItems="center">
              <Image source={HeadPhoneIcon} resizeMode={'contain'} />
              <Text fontSize="28" color={'#0fefbd'} bold>
                챌린지 감상
              </Text>
            </HStack>
          </Pressable>
        </Stack>
      </Box>
      <Box mt="7" flex={1} safeAreaBottom>
        <Image
          source={ChallengeDancer}
          resizeMode={'contain'}
          position={'absolute'}
          right={3}
          h="100%"
        />
      </Box>
    </Box>
  );
}

export default Challenge;
