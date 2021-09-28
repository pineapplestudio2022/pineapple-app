import {Box, Image, Modal} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import WebView from 'react-native-webview';
import ExternalLinkIcon from '../../Assets/Image/member/icon_signup_externallink_gray.png';
import {
  heightPersentage,
  widthPersentage,
} from '../../Commons/DeviceWHPersentage';
import Gbutton from '../../Components/GbuttonComponent';

const termsText = [
  {
    title: '개인정보 수집•이용 동의서',
    uri: 'https://pineapplestudio.app/privacypolicy',
  },
  {
    title: '서비스 이용약관 동의',
    uri: 'https://pineapplestudio.app/servicepolicy',
  },
  ,
];

const TermsandConditionModal = props => {
  const [showModal, setShowModal] = useState(false);
  const getText = terms => {
    switch (terms) {
      case 1:
        return termsText[0];
      case 2:
        return termsText[1];
      default:
        return;
    }
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={{
          width: responsiveWidth(widthPersentage(24)),
          height: responsiveHeight(heightPersentage(24)),
        }}>
        <Image
          alt={' '}
          source={ExternalLinkIcon}
          resizeMode={'contain'}
          style={{witdh: '100%'}}
        />
      </TouchableOpacity>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{getText(props.terms).title}</Modal.Header>
          <Modal.Body>
            <Box h={responsiveHeight(heightPersentage(500))}>
              <WebView
                style={{
                  width: '100%',
                  height: '100%',
                }}
                source={{uri: getText(props.terms).uri}}
              />
            </Box>
          </Modal.Body>
          <Modal.Footer justifyContent={'center'}>
            <Gbutton
              wp={140}
              hp={40}
              text={'Close'}
              rounded={8}
              onPress={() => setShowModal(false)}
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default TermsandConditionModal;
