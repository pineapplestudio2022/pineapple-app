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
} from '../../Commons/DeviceWHPersentage';
import {
  Box,
  Center,
  HStack,
  Image,
  Input,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import MenuComponent from '../../Components/MenuComponent';
// import {BlurView} from '@react-native-community/blur';
import Gbutton from '../../Components/GbuttonComponent';
import KeyIcon from '../../Assets/Image/member/icon_login_key_gray.png';
import {passwordRegex} from '../../Commons/CommonUtil';
import APIKit from '../../API/APIkit';

const FindAccounFour = props => {
  const {email} = props.route.params;
  const [password, setPassword] = useState(''); //첫번째 비밀번호
  const [rePassword, setRePassword] = useState(''); //두번째 비밀번호
  const [pMessage, setpMessage] = useState(''); //유효성 체크 메시지
  const [authPW, setAuthPW] = useState(false); //비밀번호 유효성 체크

  //password valid check
  const handlePassword = value => {
    setPassword(value);
    if (value === '' || value === undefined || value === null) {
      setpMessage('');
      setAuthPW(false);
    } else if (passwordRegex(value)) {
      setpMessage('');
    } else {
      setpMessage('영문,숫자,특수문자 1개 이상 포함');
      setAuthPW(false);
    }
  };

  //password check
  const handleRePassword = value => {
    setRePassword(value);
    if (value === '' || value === undefined || value === null) {
      setpMessage('');
      setAuthPW(false);
    } else if (value !== password) {
      setpMessage('비밀번호가 일치하지 않습니다.');
      setAuthPW(false);
    } else {
      setpMessage('');
      setAuthPW(true);
    }
  };
  const payload = {
    email: email,
    password: password,
  };

  const onSuccess = response => {
    if (__DEV__) {
      console.log(response);
    }
    if (response.data.IBcode === '1000') {
      props.navigation.navigate('FindAccount5');
    }
  };
  const onFailure = error => {
    if (__DEV__) {
      console.log(error && error.response);
    }
  };
  const resetPassword = () => {
    APIKit.post('/login/resetPassword', payload)
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <Box flex={1}>
      <MenuComponent
        name={'Mypage'}
        titleName={'마이페이지'}
        navigation={props.navigation}
        notGB
      />
      <ScrollView>
        <Box
          alignItems={'center'}
          style={{
            shadowColor: '#858c9233',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 4,
            shadowOpacity: 1,
            marginTop: 70,
          }}>
          <Box
            style={{
              width: responsiveWidth(widthPersentage(350)),
              height: responsiveHeight(heightPersentage(440)),
              borderRadius: 20,
              overflow: 'hidden',
            }}>
            <Box
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#f9f9f9',
              }}
              // blurType="xlight"
              // blurAmount={25}
              // reducedTransparencyFallbackColor="white"
            >
              <VStack alignItems={'center'} space={3}>
                <Box
                  alignItems={'center'}
                  style={{
                    width: responsiveWidth(widthPersentage(104)),
                    height: responsiveHeight(heightPersentage(24)),
                    marginTop: 10,
                    marginBottom: 22,
                  }}>
                  <HStack>
                    {['1', '2', '3', '4', '5'].map((name, index) => (
                      <Box
                        key={name + index}
                        style={{
                          width: responsiveWidth(widthPersentage(10)),
                          height: responsiveHeight(heightPersentage(10)),
                          backgroundColor: index == 3 ? '#0fefbd' : '#0fefbd30',
                          borderRadius: 5,
                          margin: 4,
                        }}
                      />
                    ))}
                  </HStack>
                </Box>
                <Text
                  fontSize={responsiveFontSize(fontSizePersentage(17))}
                  fontWeight={600}
                  color={'#1a1b1c'}
                  textAlign={'center'}
                  style={{marginBottom: 70}}>
                  사용하실 암호를 입력해주세요
                </Text>
                <Input
                  width={responsiveWidth(widthPersentage(300))}
                  rounded={8}
                  backgroundColor={'#fafafab3'}
                  borderWidth={1}
                  type={'password'}
                  placeholder={'PW'}
                  value={password}
                  onChangeText={handlePassword}
                  InputLeftElement={
                    <Image
                      alt={' '}
                      source={KeyIcon}
                      resizeMode={'contain'}
                      style={{
                        width: responsiveWidth(widthPersentage(25)),
                        marginLeft: 13,
                      }}
                    />
                  }
                />
                <Input
                  width={responsiveWidth(widthPersentage(300))}
                  rounded={8}
                  backgroundColor={'#fafafab3'}
                  borderWidth={1}
                  type={'password'}
                  placeholder={'PW check'}
                  value={rePassword}
                  onChangeText={handleRePassword}
                  InputLeftElement={
                    <Image
                      alt={' '}
                      source={KeyIcon}
                      resizeMode={'contain'}
                      style={{
                        width: responsiveWidth(widthPersentage(25)),
                        marginLeft: 13,
                      }}
                    />
                  }
                />
                <Box h={responsiveHeight(heightPersentage(15))}>
                  <Text
                    h={'100%'}
                    color={'#ff0000'}
                    bold
                    fontSize={responsiveFontSize(fontSizePersentage(14))}>
                    {pMessage}
                  </Text>
                </Box>
              </VStack>
              <Center style={{marginTop: 64}}>
                <Gbutton
                  wp={220}
                  hp={40}
                  fs={18}
                  fw={600}
                  rounded={8}
                  disable={!authPW}
                  text={'완료'}
                  onPress={resetPassword}
                />
              </Center>
            </Box>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default FindAccounFour;
