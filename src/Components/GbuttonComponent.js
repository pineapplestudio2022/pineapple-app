import {Box, Center, Image, Pressable, Text} from 'native-base';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../Commons/CommonUtil';
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
const Gbutton = props => {
  const [bgColor, setBgColor] = useState('#0fefbd');
  const [bwidth, setBwidth] = useState(0);
  const [textColor, setTextColor] = useState('#fafafa');
  const [imgrvs, setImgrvs] = useState(false);

  const pressIn = () => {
    if (props.disable) {
      return;
    }
    setBgColor('#ffffff');
    setBwidth(2);
    setTextColor('#0fefbd');
    setImgrvs(true);
  };
  const pressOut = () => {
    if (props.disable) {
      return;
    }
    setBgColor('#0fefbd');
    setBwidth(0);
    setTextColor('#fafafa');
    setImgrvs(false);
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
        backgroundColor: props.disable ? '#a5a8ae' : bgColor,
        borderWidth: bwidth,
        borderRadius: props.rounded,
        borderColor: '#0fefbd',
        shadowColor: '#00000033',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
      }}>
      <Box>
        <Center h={'100%'}>
          {props.imgName ? (
            <Image
              source={
                imgrvs
                  ? getImage(props.imgName + '-reverse')
                  : getImage(props.imgName)
              }
              style={{
                position: 'absolute',
                left: 10,
                height: responsiveHeight(heightPersentage(props.hp)) / 1.6,
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
            }}>
            {props.text}
          </Text>
        </Center>
      </Box>
    </Pressable>
  );
};

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
