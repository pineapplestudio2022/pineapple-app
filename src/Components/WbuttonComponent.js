import {Box, Center, HStack, Image, Pressable, Text} from 'native-base';
import React from 'react';
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

import MagazineIcon from '../Assets/Image/btn_main_magazine.png';
import MusicNoteIcon from '../Assets/Image/btn_main_music_note.png';
import BgmStudioIcon from '../Assets/Image/btn_main_bgm_studio.png';
import PhotoGreenIcon from '../Assets/Image/btn_main_photo.png';
import WriteMusicGreenIcon from '../Assets/Image/btn_main_write_music.png';
import WriteMusicWhiteIcon from '../Assets/Image/btn_main_write_music_white.png';
import ChallengeGreenIcon from '../Assets/Image/btn_main_speaker.png';
import ChallengeWhiteIcon from '../Assets/Image/btn_main_speaker_white.png';

import SingingGreenIcon from '../Assets/Image/challenge/btn_challenge_singing.png';
import SingingWhiteIcon from '../Assets/Image/challenge/btn_challenge_singing_white.png';
import CameraGreenIcon from '../Assets/Image/challenge/btn_challenge_camera.png';
import CameraWhiteIcon from '../Assets/Image/challenge/btn_challenge_camera_white.png';
import PlayingMusicGreenIcon from '../Assets/Image/challenge/btn_challenge_playingmusic.png';
import PreviewGreenIcon from '../Assets/Image/challenge/btn_challenge_preview.png';
import HeadPhoneWhiteIcon from '../Assets/Image/challenge/icon_challenge_headphones_white.png';
import HeadPhoneGreenIcon from '../Assets/Image/challenge/icon_challenge_headphones_green.png';
import {useState} from 'react';
const getImage = name => {
  switch (name) {
    case 'challenge':
      return ChallengeGreenIcon;
    case 'challenge-reverse':
      return ChallengeWhiteIcon;
    case 'lyrics':
      return WriteMusicGreenIcon;
    case 'lyrics-reverse':
      return WriteMusicWhiteIcon;
    case 'photo':
    case 'photo-reverse':
      return PhotoGreenIcon;
    case 'bgm':
    case 'bgm-reverse':
      return BgmStudioIcon;
    case 'magazine':
    case 'magazine-reverse':
      return MagazineIcon;
    case 'musicNote':
    case 'musicNote-reverse':
      return MusicNoteIcon;
    case 'singing':
      return SingingGreenIcon;
    case 'singing-reverse':
      return SingingWhiteIcon;
    case 'camera':
      return CameraGreenIcon;
    case 'camera-reverse':
      return CameraWhiteIcon;
    case 'preview':
    case 'preview-reverse':
      return PreviewGreenIcon;
    case 'playingMusic':
    case 'playingMusic-reverse':
      return PlayingMusicGreenIcon;
    case 'headphone':
      return HeadPhoneGreenIcon;
    case 'headphone-reverse':
      return HeadPhoneWhiteIcon;
    default:
      return undefined;
  }
};
const Wbutton = props => {
  const [bgColor, setBgColor] = useState('#fafafa80');
  const [textColor, setTextColor] = useState('#0fefbd');
  const [imgrvs, setImgrvs] = useState(false);

  const pressIn = () => {
    if (props.disable) {
      return;
    }
    setBgColor('#4be3ac');
    setTextColor('#fafafa');
    setImgrvs(true);
  };
  const pressOut = () => {
    if (props.disable) {
      return;
    }
    setBgColor('#fafafa80');
    setTextColor('#0fefbd');
    setImgrvs(false);
  };

  const handlerGetImage = () => {
    if (imgrvs) {
      return getImage(props.imgName + '-reverse');
    } else {
      return getImage(props.imgName);
    }
  };
  const handlerGetImageLeft = () => {
    if (imgrvs) {
      return getImage(props.leftImgName + '-reverse');
    } else {
      return getImage(props.leftImgName);
    }
  };

  return (
    <Pressable
      onPress={
        props.disable
          ? props.onPressActive
            ? props.onPress
            : () => {}
          : props.onPress
      }
      onPressIn={pressIn}
      onPressOut={pressOut}
      style={{
        width: responsiveWidth(widthPersentage(props.wp)),
        height: responsiveHeight(heightPersentage(props.hp)),
        backgroundColor: props.disable ? '#fafafa80' : bgColor,
        borderWidth: 1,
        borderRadius: props.rounded,
        borderColor: '#0fefbd',
      }}>
      <Box>
        <Center h={'100%'}>
          {props.ready ? (
            <Text
              position={'absolute'}
              top={2}
              color="#858c92"
              fontSize={responsiveFontSize(fontSizePersentage(14))}
              bold>
              {props.ready}
            </Text>
          ) : (
            <></>
          )}

          {props.imgName ? (
            <Image
              source={handlerGetImage}
              style={{
                width: responsiveWidth(widthPersentage(48)),
                marginBottom: 8,
              }}
              resizeMode={'contain'}
              alt={' '}
            />
          ) : (
            <></>
          )}
          <HStack alignItems={'center'} justifyContent={'center'} w={'100%'}>
            {props.leftImgName ? (
              <Image
                source={handlerGetImageLeft}
                style={{
                  width: responsiveWidth(widthPersentage(40)),
                  marginRight: responsiveWidth(widthPersentage(16)),
                }}
                resizeMode={'contain'}
                alt={' '}
              />
            ) : (
              <></>
            )}
            <Text
              fontWeight={props.fw}
              style={{
                color: textColor,
                fontSize: responsiveFontSize(fontSizePersentage(props.fs)),
                textAlign: 'center',
              }}>
              {props.text}
            </Text>
          </HStack>
        </Center>
      </Box>
    </Pressable>
  );
};

Wbutton.defaultProps = {
  fs: 20, //font size
  fw: 'normal', //font weight
  text: '', //텍스트
  wp: 390, //width
  hp: 843, //height
  rounded: 0, //borderRadius
  disable: false, //disalbe
  onPressActive: false, //onPress 활성화
};

export default Wbutton;
