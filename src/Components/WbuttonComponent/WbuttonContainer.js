import React, {useState} from 'react';

import BGMGreenIcon from '../../Assets/Image/icon_main_bgm_green.png';
import BGMWhiteIcon from '../../Assets/Image/icon_main_bgm_white.png';
import WriteMusicGreenIcon from '../../Assets/Image/btn_main_write_music.png';
import WriteMusicWhiteIcon from '../../Assets/Image/btn_main_write_music_white.png';
import ChallengeGreenIcon from '../../Assets/Image/btn_main_speaker.png';
import ChallengeWhiteIcon from '../../Assets/Image/btn_main_speaker_white.png';

import SingingGreenIcon from '../../Assets/Image/challenge/btn_challenge_singing.png';
import SingingWhiteIcon from '../../Assets/Image/challenge/btn_challenge_singing_white.png';
import CameraGreenIcon from '../../Assets/Image/challenge/btn_challenge_camera.png';
import CameraWhiteIcon from '../../Assets/Image/challenge/btn_challenge_camera_white.png';
import PlayingMusicGreenIcon from '../../Assets/Image/challenge/btn_challenge_playingmusic.png';
import PreviewGreenIcon from '../../Assets/Image/challenge/btn_challenge_preview.png';
import HeadPhoneWhiteIcon from '../../Assets/Image/challenge/icon_challenge_headphones_white.png';
import HeadPhoneGreenIcon from '../../Assets/Image/challenge/icon_challenge_headphones_green.png';
import CoArGreenIcon from '../../Assets/Image/icon_main_coar_green.png';
import CoArWhiteIcon from '../../Assets/Image/icon_main_coar_white.png';
import PineClipGreenIcon from '../../Assets/Image/icon_main_pineclip_green.png';
import PineClipWhiteIcon from '../../Assets/Image/icon_main_pineclip_white.png';

import WbuttonPresenter from './WbuttonPresenter';

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
    case 'bgm':
      return BGMGreenIcon;
    case 'bgm-reverse':
      return BGMWhiteIcon;
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
    case 'coar':
      return CoArGreenIcon;
    case 'coar-reverse':
      return CoArWhiteIcon;
    case 'pineclip':
      return PineClipGreenIcon;
    case 'pineclip-reverse':
      return PineClipWhiteIcon;
    default:
      return undefined;
  }
};

const WbuttonContainer = props => {
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
    <WbuttonPresenter
      {...props}
      pressIn={pressIn}
      pressOut={pressOut}
      bgColor={bgColor}
      handlerGetImage={handlerGetImage}
      handlerGetImageLeft={handlerGetImageLeft}
      textColor={textColor}
    />
  );
};

export default WbuttonContainer;
