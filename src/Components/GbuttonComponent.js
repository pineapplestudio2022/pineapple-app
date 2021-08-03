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

import HeadPhoneIcon from '../Assets/Image/challenge/icon_challenge_headphones_white.png';
import StopIcon from '../Assets/Image/challenge/icon_challenge_stop_green.png';
import MicIcon from '../Assets/Image/challenge/icon_challenge_mic_white.png';
import PulseIcon from '../Assets/Image/challenge/icon_challenge_pulse_green.png';
import XgreenIcon from '../Assets/Image/challenge/icon_challenge_x_green.png';
import XIcon from '../Assets/Image/challenge/icon_challenge_x_white.png';
import CheckIcon from '../Assets/Image/challenge/icon_challenge_check_white.png';
import CheckgreenIcon from '../Assets/Image/challenge/icon_challenge_check_green.png';
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
        case 'headphone-reverse':
          return HeadPhoneIcon;
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
        case 'pulse-reverse':
          return PulseIcon;
        case 'stop':
        case 'stop-reverse':
          return StopIcon;
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
        onPress={this.props.onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={{
          width: responsiveWidth(widthPersentage(this.props.wp)),
          height: responsiveHeight(heightPersentage(this.props.hp)),
          backgroundColor: this.state.bgColor,
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
              marginLeft: 20,
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
};

export default Gbutton;
