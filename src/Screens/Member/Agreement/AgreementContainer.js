import React, {useState} from 'react';
import {Alert} from 'react-native';
import AgreementPresenter from './AgreementPresenter';

const AgreementContainer = props => {
  const [privacy, setPrivacy] = useState(false); //개인정보
  const handlerPrivacy = () => setPrivacy(!privacy);
  const [terms, setTerms] = useState(false); //이용약관
  const handlerTerms = () => setTerms(!terms);
  const [marketing, setMarketing] = useState(false); //마케팅
  const handlerMarketing = () => setMarketing(!marketing);

  //전체동의
  const handelAllCheck = value => {
    if (value) {
      setPrivacy(true);
      setTerms(true);
      setMarketing(true);
    } else {
      setPrivacy(false);
      setTerms(false);
      setMarketing(false);
    }
  };

  const handleAgreement = () => {
    if (privacy && terms) {
      props.navigation.navigate('Register', {
        marketing: marketing ? '1' : '0',
      });
    } else {
      Alert.alert(
        'PineApple',
        '서비스 이용약관과 개인정보 수집 및 이용에 대한 안내 모두 동의해주세요.',
        [{text: '확인'}],
      );
    }
  };

  return (
    <AgreementPresenter
      {...props}
      handleAgreement={handleAgreement}
      handelAllCheck={handelAllCheck}
      privacy={privacy}
      handlerPrivacy={handlerPrivacy}
      terms={terms}
      handlerTerms={handlerTerms}
      marketing={marketing}
      handlerMarketing={handlerMarketing}
    />
  );
};
export default AgreementContainer;
