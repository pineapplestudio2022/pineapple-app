//공통으로 사용되는 util 함수들

import {Alert} from 'react-native';

//password vaild check
export const passwordRegex = password => {
  //숫자, 영문, 특수문자 각 1자리 이상 ( 그외 글자 X )
  // eslint-disable-next-line prettier/prettier
  const re = new RegExp('^(?=.*[0-9])(?=.*[a-zZ-a])(?=.*[~!@#$%^&*\\(\\)\\-\\+_=]).{8,}$');
  return re.test(password);
};

export const emailRegex = email => {
  //email 형식
  const re = new RegExp(
    '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$',
  );
  return re.test(email);
};

export const YouTubeAPIKey = () => {
  return 'AIzaSyBHW-5vq9n_z0bvS3CsV3wDotDTZUpXxbY';
};

export const defaultAlertMessage = msg => {
  return Alert.alert('Pineapple', msg, [{text: '확인'}]);
};
