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

import HeadPhoneWhiteIcon from '../Assets/Image/challenge/icon_challenge_headphones_white.png';
import HeadPhoneGreenIcon from '../Assets/Image/challenge/icon_challenge_headphones_green.png';
import StopGreenIcon from '../Assets/Image/challenge/icon_challenge_stop_green.png';
import StopWhiteIcon from '../Assets/Image/challenge/icon_challenge_stop_white.png';
import MicIcon from '../Assets/Image/challenge/icon_challenge_mic_white.png';
import PulseGreenIcon from '../Assets/Image/challenge/icon_challenge_pulse_green.png';
import PulseWhiteIcon from '../Assets/Image/challenge/icon_challenge_pulse_white.png';
import XgreenIcon from '../Assets/Image/challenge/icon_challenge_x_green.png';
import XIcon from '../Assets/Image/challenge/icon_challenge_x_white.png';
import CheckIcon from '../Assets/Image/challenge/icon_challenge_check_white.png';
import CheckgreenIcon from '../Assets/Image/challenge/icon_challenge_check_green.png';
import UploadGreenIcon from '../Assets/Image/challenge/icon_challenge_upload_green.png';
import UploadWhiteIcon from '../Assets/Image/challenge/icon_challenge_upload_white.png';
import HomeIcon from '../Assets/Image/challenge/icon_challenge_home_white.png';
class Gbutton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bgColor: '#0fefbd',
      bwidth: 0,
      textColor: '#fafafa',
      imgrvs: false,
    };
  }

  render() {
    const getImage = name => {
      switch (name) {
        case 'headphone':
          return HeadPhoneWhiteIcon;
        case 'headphone-reverse':
          return HeadPhoneGreenIcon;
        case 'mic':
        case 'mic-reverse':
          return MicIcon;
        case 'x':
          return XIcon;
        case 'x-reverse':
          return XgreenIcon;
        case 'check':
          return CheckIcon;
        case 'check-reverse':
          return CheckgreenIcon;
        case 'pulse':
          return PulseWhiteIcon;
        case 'pulse-reverse':
          return PulseGreenIcon;
        case 'stop':
          return StopWhiteIcon;
        case 'stop-reverse':
          return StopGreenIcon;
        case 'upload':
          return UploadWhiteIcon;
        case 'upload-reverse':
          return UploadGreenIcon;
        case 'home':
        case 'home-reverse':
          return HomeIcon;
        default:
          return undefined;
      }
    };
    const pressIn = () => {
      this.setState({
        bgColor: '#ffffff',
        bwidth: 2,
        textColor: '#0fefbd',
        imgrvs: true,
      });
    };
    const pressOut = () => {
      this.setState({
        bgColor: '#0fefbd',
        bwidth: 0,
        textColor: '#fafafa',
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
          backgroundColor: this.props.disable ? '#a5a8ae' : this.state.bgColor,
          borderWidth: this.state.bwidth,
          borderRadius: this.props.rounded,
          borderColor: '#0fefbd',
          shadowColor: '#00000033',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 4,
          shadowOpacity: 1,
        }}>
        <Box
          w={'100%'}
          h={'100%'}
          justifyContent={'center'}
          alignItems={'center'}>
          {this.props.imgName ? (
            <Image
              source={
                this.state.imgrvs
                  ? getImage(this.props.imgName + '-reverse')
                  : getImage(this.props.imgName)
              }
              style={{
                position: 'absolute',
                left: 10,
                height: responsiveHeight(heightPersentage(this.props.hp)) / 1.6,
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
              fontSize: responsiveFontSize(fontSizePersentage(this.props.fs)),
            }}>
            {this.props.text}
          </Text>
        </Box>
      </Pressable>
    );
  }
}

Gbutton.defaultProps = {
  fs: 20, //font size
  fw: 'normal', //font weight
  text: '', //텍스트
  wp: 390, //width
  hp: 843, //height
  rounded: 0, //borderRadius
  disable: false, //disalbe
  onPressActive: false, //onPress 활성화
};

export default Gbutton;
