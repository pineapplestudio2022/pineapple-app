// Challenge 화면

import React from 'react';
import {ImageBackground} from 'react-native';
import {
  Box,
  VStack,
  HStack,
  Center,
  Text,
  Stack,
  Image,
  Pressable,
  HamburgerIcon,
  Heading,
} from 'native-base';
import MenuComponent from '../Components/MenuComponent';
import MainBackground from '../Assets/Image/bg_main.png';
import ChallengeDancer from '../Assets/Image/challenge/image_challenge_dancer.png';
import HeadPhoneIcon from '../Assets/Image/challenge/btn_challenge_headphones.png';
import SingingIcon from '../Assets/Image/challenge/btn_challenge_singing.png';
import PlayingMusicIcon from '../Assets/Image/challenge/btn_challenge_playingmusic.png';
import PreviewIcon from '../Assets/Image/challenge/btn_challenge_preview.png';
import CameraIcon from '../Assets/Image/challenge/btn_challenge_camera.png';

function Challenge(props) {
  return (
    <Box flex={1}>
      <MenuComponent name={props.route.name} navigation={props.navigation} />
      <Box>
        <Stack space={5} alignItems="center">
          <VStack space={5} alignItems="center">
            <HStack space={5} alignItems="center">
              <Center
                size={140}
                rounded="xl"
                borderWidth="1"
                borderColor="#0fefbd">
                {/* 색은 확인차 적용함 나중에 수정 필요 */}
                <Image source={SingingIcon} resizeMode={'contain'} />
                <Text marginTop="2" color="#0fefbd" bold>
                  노래 부르기 참여
                </Text>
              </Center>
              <Center
                size={140}
                rounded="xl"
                borderWidth="1"
                borderColor="#0fefbd"
                backgroundColor="#fafafa80">
                <Image source={CameraIcon} resizeMode={'contain'} />
                <Text marginTop="2" color="#0fefbd" textAlign={'center'} bold>
                  15초 영상 챌린지
                </Text>
              </Center>
            </HStack>
          </VStack>
          <VStack space={5} alignItems="center">
            <HStack space={5} alignItems="center">
              <Center
                size={140}
                rounded="xl"
                borderWidth="1"
                borderColor="#0fefbd"
                backgroundColor="#fafafa80">
                <Image source={PlayingMusicIcon} resizeMode={'contain'} />
                <Text marginTop="2" color="#0fefbd" bold>
                  연주 참여
                </Text>
              </Center>
              <Center
                size={140}
                rounded="xl"
                borderWidth="1"
                borderColor="#0fefbd"
                backgroundColor="#fafafa80">
                <Image source={PreviewIcon} resizeMode={'contain'} />
                <Text marginTop="2" color="#0fefbd" bold>
                  작곡 참여
                </Text>
              </Center>
            </HStack>
          </VStack>
          <Pressable
            w="80%"
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
