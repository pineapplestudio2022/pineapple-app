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

import Cover1 from '../Assets/Image/Top_music/top_music_1.jpg';
import Cover2 from '../Assets/Image/Top_music/top_music_2.jpg';
import Cover3 from '../Assets/Image/Top_music/top_music_3.jpg';
import Cover4 from '../Assets/Image/Top_music/top_music_4.jpg';
import Cover5 from '../Assets/Image/Top_music/top_music_5.jpg';
import Cover6 from '../Assets/Image/Top_music/top_music_6.jpg';
import Cover7 from '../Assets/Image/Top_music/top_music_7.jpg';
import Cover8 from '../Assets/Image/Top_music/top_music_8.jpg';
import Cover9 from '../Assets/Image/Top_music/top_music_9.jpg';
import Cover10 from '../Assets/Image/Top_music/top_music_10.jpg';
import DumpImage from '../Assets/Image/image_singing_dumpimage.jpg';
import RNFetchBlob from 'rn-fetch-blob';

export const getImage = () => {
  const number = Math.floor(Math.random() * 10) + 1;
  switch (number) {
    case 1:
      return Cover1;
    case 2:
      return Cover2;
    case 3:
      return Cover3;
    case 4:
      return Cover4;
    case 5:
      return Cover5;
    case 6:
      return Cover6;
    case 7:
      return Cover7;
    case 8:
      return Cover8;
    case 9:
      return Cover9;
    case 10:
      return Cover10;
    default:
      return DumpImage;
  }
};

export const getImageById = number => {
  const value = number % 10;
  switch (value) {
    case 1:
      return Cover1;
    case 2:
      return Cover2;
    case 3:
      return Cover3;
    case 4:
      return Cover4;
    case 5:
      return Cover5;
    case 6:
      return Cover6;
    case 7:
      return Cover7;
    case 8:
      return Cover8;
    case 9:
      return Cover9;
    case 10:
      return Cover10;
    default:
      return DumpImage;
  }
};
export const getFilePathDCIMDir = () => {
  return RNFetchBlob.fs.dirs.DCIMDir;
};
export const getFilePathDCIMDirDATA = () => {
  return RNFetchBlob.fs.dirs.DCIMDir + '/.data';
};
export const getFilePathDocumentDir = () => {
  return RNFetchBlob.fs.dirs.DocumentDir;
};
export const getFilePathDocumentDirDATA = () => {
  return RNFetchBlob.fs.dirs.DocumentDir + '/.data';
};
