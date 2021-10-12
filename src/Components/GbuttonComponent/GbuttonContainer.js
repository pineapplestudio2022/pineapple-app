import React, {useState} from 'react';

import HeadPhoneWhiteIcon from '../../Assets/Image/challenge/icon_challenge_headphones_white.png';
import HeadPhoneGreenIcon from '../../Assets/Image/challenge/icon_challenge_headphones_green.png';
import StopGreenIcon from '../../Assets/Image/challenge/icon_challenge_stop_green.png';
import StopWhiteIcon from '../../Assets/Image/challenge/icon_challenge_stop_white.png';
import MicIcon from '../../Assets/Image/challenge/icon_challenge_mic_white.png';
import PulseGreenIcon from '../../Assets/Image/challenge/icon_challenge_pulse_green.png';
import PulseWhiteIcon from '../../Assets/Image/challenge/icon_challenge_pulse_white.png';
import XgreenIcon from '../../Assets/Image/challenge/icon_challenge_x_green.png';
import XIcon from '../../Assets/Image/challenge/icon_challenge_x_white.png';
import CheckIcon from '../../Assets/Image/challenge/icon_challenge_check_white.png';
import CheckgreenIcon from '../../Assets/Image/challenge/icon_challenge_check_green.png';
import UploadGreenIcon from '../../Assets/Image/challenge/icon_challenge_upload_green.png';
import UploadWhiteIcon from '../../Assets/Image/challenge/icon_challenge_upload_white.png';
import HomeIcon from '../../Assets/Image/challenge/icon_challenge_home_white.png';
import GbuttonPresenter from './GbuttonPresenter';

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
const GbuttonContainer = props => {
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
    <GbuttonPresenter
      {...props}
      pressIn={pressIn}
      pressOut={pressOut}
      bwidth={bwidth}
      imgrvs={imgrvs}
      getImage={getImage}
      textColor={textColor}
      bgColor={bgColor}
    />
  );
};

export default GbuttonContainer;
