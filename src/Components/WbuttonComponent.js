import {Box, HStack, Image, Pressable, Text} from 'native-base';
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
import {BlurView} from '@react-native-community/blur';

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
class Wbutton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: '#fafafa80',
      textColor: '#0fefbd',
      imgrvs: false,
    };
  }

  render() {
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
    const pressIn = () => {
      this.setState({
        bgColor: '#4be3ac',
        textColor: '#fafafa',
        imgrvs: true,
      });
    };
    const pressOut = () => {
      this.setState({
        bgColor: '#fafafa80',
        textColor: '#0fefbd',
        imgrvs: false,
      });
    };
    return (
      <Pressable
        onPress={
          this.props.disable
            ? this.props.onPressActive
              ? this.props.onPress
              : () => {}
            : this.props.onPress
        }
        onPressIn={this.props.disable ? () => {} : pressIn}
        onPressOut={this.props.disable ? () => {} : pressOut}
        style={{
          width: responsiveWidth(widthPersentage(this.props.wp)),
          height: responsiveHeight(heightPersentage(this.props.hp)),
          backgroundColor: this.props.disable
            ? '#fafafa80'
            : this.state.bgColor,
          borderWidth: 1,
          borderRadius: this.props.rounded,
          borderColor: '#0fefbd',
        }}>
        <BlurView
          style={{
            height: '100%',
            width: '100%',
            borderRadius: this.props.rounded,
          }}
          blurType="light"
          blurAmount={this.props.blur}
          reducedTransparencyFallbackColor="white">
          <Box
            w={'100%'}
            h={'100%'}
            justifyContent={'center'}
            alignItems={'center'}>
            {this.props.ready ? (
              <Text
                position={'absolute'}
                top={2}
                color="#858c92"
                fontSize={responsiveFontSize(fontSizePersentage(14))}
                bold>
                {this.props.ready}
              </Text>
            ) : (
              <></>
            )}

            {this.props.imgName ? (
              <Image
                source={
                  this.state.imgrvs
                    ? getImage(this.props.imgName + '-reverse')
                    : getImage(this.props.imgName)
                }
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
              {this.props.leftImgName ? (
                <Image
                  source={
                    this.state.imgrvs
                      ? getImage(this.props.leftImgName + '-reverse')
                      : getImage(this.props.leftImgName)
                  }
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
                fontWeight={this.props.fw}
                style={{
                  color: this.state.textColor,
                  fontSize: responsiveFontSize(
                    fontSizePersentage(this.props.fs),
                  ),
                  textAlign: 'center',
                }}>
                {this.props.text}
              </Text>
            </HStack>
          </Box>
        </BlurView>
      </Pressable>
    );
  }
}

Wbutton.defaultProps = {
  fs: 20, //font size
  fw: 'normal', //font weight
  text: '', //텍스트
  wp: 390, //width
  hp: 843, //height
  rounded: 0, //borderRadius
  disable: false, //disalbe
  onPressActive: false, //onPress 활성화
  blur: 4, //blurAmount 값
};

export default Wbutton;
