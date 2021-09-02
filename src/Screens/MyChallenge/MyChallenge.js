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
import Wbutton from '../../Components/WbuttonComponent';

function MyChallenge(props) {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'My Challenge'}
        navigation={props.navigation}
      />
      <VStack alignItems={'center'} space={4}>
        <Wbutton
          wp={320}
          hp={104}
          fs={28}
          fw={800}
          blur={15}
          leftImgName={'singing'}
          rounded={8}
          text={'노래 챌린지'}
          onPress={() => props.navigation.navigate('MySinging')}
        />
        <Wbutton
          wp={320}
          hp={104}
          fs={28}
          fw={800}
          blur={15}
          leftImgName={'camera'}
          rounded={8}
          text={'영상 챌린지'}
          onPress={() => props.navigation.navigate('MyVideo')}
        />
        <Wbutton
          wp={320}
          hp={104}
          fs={28}
          fw={800}
          blur={15}
          leftImgName={'playingMusic'}
          rounded={8}
          text={'연주 챌린지'}
          ready={'2차 챌린지 오픈 예정'}
          disable
        />
        <Wbutton
          wp={320}
          hp={104}
          fs={28}
          fw={800}
          blur={15}
          leftImgName={'preview'}
          rounded={8}
          text={'편곡 챌린지'}
          ready={'2차 챌린지 오픈 예정'}
          disable
        />
      </VStack>
    </Box>
  );
}

export default MyChallenge;
