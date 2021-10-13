//공통으로 사용되는 util 함수들

import {Alert} from 'react-native';

const ZEPLIN_DEVICE_WIDTH = 390;
const ZEPLIN_DEVICE_HEIGHT = 843;

export function widthPersentage(width) {
  const persentage = (width / ZEPLIN_DEVICE_WIDTH) * 100;
  return persentage;
}
export function heightPersentage(height) {
  const persentage = (height / ZEPLIN_DEVICE_HEIGHT) * 100;
  return persentage;
}

export function fontSizePersentage(size) {
  const persentage = size * 0.13;
  return persentage;
}

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

export const domainRegex = value => {
  //youtube link
  const re = new RegExp('^https://youtu.be/(?=.*[0-9a-zZ-a])');
  return re.test(value);
};

export const YouTubeAPIKey = () => {
  return 'AIzaSyBiuFMJXY3vEGRrkZ00XupTLQeuY7BkyLA';
};

export const defaultAlertMessage = msg => {
  return Alert.alert('Pineapple', msg, [{text: '확인'}]);
};
