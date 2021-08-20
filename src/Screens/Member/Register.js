import React from 'react';
import {
  Box,
  Center,
  HStack,
  Image,
  Input,
  Radio,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
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
import {emailRegex, passwordRegex} from '../../Commons/CommonUtil';

import MenuComponent from '../../Components/MenuComponent';
import {BlurView} from '@react-native-community/blur';
import Gbutton from '../../Components/GbuttonComponent';
import EmailIcon from '../../Assets/Image/member/icon_login_email_gray.png';
import KeyIcon from '../../Assets/Image/member/icon_login_key_gray.png';
import PhoneIcon from '../../Assets/Image/member/icon_member_phone_gray.png';
import AuthIcon from '../../Assets/Image/member/icon_member_auth_gray.png';
import APIKit from '../../API/APIkit';
import {Alert} from 'react-native';

const Register = props => {
  const [email, setEmail] = React.useState(''); //이메일 주소
  const [password, setPassword] = React.useState(''); //첫번째 비밀번호
  const [rePassword, setRePassword] = React.useState(''); //두번째 비밀번호
  const [pMessage, setpMessage] = React.useState(''); //유효성 체크 메시지

  const [authEmail, setAuthEmail] = React.useState(false); //이메일 유효성 체크
  const [authPW, setAuthPW] = React.useState(false); //비밀번호 유효성 체크
  const [authPhone, setAuthPhone] = React.useState(false); //번호인증 유효성 체크

  const [phoneNum, setPhoneNum] = React.useState(''); //핸드폰 번호
  const [authNo, setAuthNo] = React.useState(''); //인증번호
  const [job, setJob] = React.useState('0'); //default = 일반인

  const [authBtn, setAuthBtn] = React.useState(false); //인증번호 요청 버튼 활성화
  const [authCheckBtn, setAuthCheckBtn] = React.useState(false); //인증번호 확인 버튼 활성화

  const {marketing} = props.route.params; //마케팅 동의 여부

  const payload = {
    email: email,
    password: password,
    phone: phoneNum,
    uType: job,
    marketingPolicy: marketing,
  };

  const onSuccess = response => {
    // Set JSON Web Token on success
    console.log(response);
    if (response.data.IBcode === '1000') {
      Alert.alert('회원가입 완료', '로그인 화면으로 이동합니다', [
        {text: '확인', onPress: () => props.navigation.navigate('Login')},
      ]);
    }
  };
  const onFailure = error => {
    console.log(error && error.response);
  };
  //회원가입 api 요청
  const submit = async () => {
    console.log(payload);
    APIKit.post('/login/signup', payload).then(onSuccess).catch(onFailure);
  };

  //인증번호 전송 버튼 활성화
  const handleAuthButoon = value => {
    if (value === '' || value === undefined || value === null) {
      setAuthBtn(false);
    } else {
      setAuthBtn(true);
    }
    setPhoneNum(value);
  };

  //인증번호 요청
  const onAuthRequest = async () => {
    //인증번호 확인 버튼 활성화
    setAuthCheckBtn(true);
    const payl = {phoneNo: '+82' + phoneNum.substring(1)};
    try {
      APIKit.post('/auth/getAuthNo', payl)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  //인증번호 유효성 체크
  const onAuthCheck = async () => {
    const payl = {authNo: authNo, phone: '+82' + phoneNum.substring(1)};
    console.log(payl);
    APIKit.post('/auth/submitAuthNo', payl)
      .then(response => {
        console.log(response.data);
        if (response.data.IBcode === '1000') {
          setAuthPhone(true);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  //email valid check
  const handleEmail = value => {
    setEmail(value);
    if (value === '' || value === undefined || value === null) {
      setpMessage('');
      setAuthEmail(false);
    } else if (emailRegex(value)) {
      setpMessage('');
      setAuthEmail(true);
    } else {
      setpMessage('올바른 이메일 형식을 입력해주세요');
      setAuthEmail(false);
    }
  };

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

  return (
    <Box flex={1}>
      <MenuComponent
        name={'Mypage'}
        titleName={'회원가입'}
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
          }}>
          <Box
            style={{
              width: responsiveWidth(widthPersentage(358)),
              height: responsiveHeight(heightPersentage(620)),
              borderRadius: 20,
              overflow: 'hidden',
            }}>
            <BlurView
              style={{
                width: '100%',
                height: '100%',
              }}
              blurType="xlight"
              blurAmount={20}
              reducedTransparencyFallbackColor="white">
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(17))}
                fontWeight={600}
                color={'#000000'}
                style={{
                  marginLeft: 54,
                  marginTop: 22,
                  marginBottom: 14,
                }}>
                계정 정보
              </Text>
              <VStack alignItems={'center'} space={3}>
                <Input
                  width={responsiveWidth(widthPersentage(300))}
                  rounded={8}
                  backgroundColor={'#fafafab3'}
                  borderWidth={0}
                  placeholder={'Email'}
                  value={email}
                  onChangeText={handleEmail}
                  InputLeftElement={
                    <Image
                      alt={' '}
                      source={EmailIcon}
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
                  borderWidth={0}
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
                  borderWidth={0}
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
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(17))}
                fontWeight={600}
                color={'#000000'}
                style={{
                  marginLeft: 54,
                  marginTop: 10,
                  marginBottom: 14,
                }}>
                본인 인증
              </Text>
              <VStack alignItems={'center'} space={3}>
                <Input
                  width={responsiveWidth(widthPersentage(300))}
                  rounded={8}
                  keyboardType={'numeric'}
                  onChangeText={handleAuthButoon}
                  value={phoneNum}
                  backgroundColor={'#fafafab3'}
                  borderWidth={0}
                  placeholder={'전화번호'}
                  InputLeftElement={
                    <Image
                      alt={' '}
                      source={PhoneIcon}
                      resizeMode={'contain'}
                      style={{
                        width: responsiveWidth(widthPersentage(25)),
                        marginLeft: 13,
                      }}
                    />
                  }
                  InputRightElement={
                    authBtn ? (
                      <Gbutton
                        wp={70}
                        hp={24}
                        fs={12}
                        fw={800}
                        rounded={4}
                        text={'인증번호'}
                        onPress={onAuthRequest}
                        disable={authPhone}
                      />
                    ) : (
                      <></>
                    )
                  }
                />
                <Input
                  width={responsiveWidth(widthPersentage(300))}
                  rounded={8}
                  keyboardType={'numeric'}
                  backgroundColor={'#fafafab3'}
                  borderWidth={0}
                  onChangeText={setAuthNo}
                  value={authNo}
                  placeholder={'인증번호'}
                  InputLeftElement={
                    <Image
                      alt={' '}
                      source={AuthIcon}
                      resizeMode={'contain'}
                      style={{
                        width: responsiveWidth(widthPersentage(25)),
                        marginLeft: 13,
                      }}
                    />
                  }
                  InputRightElement={
                    authCheckBtn ? (
                      <Gbutton
                        wp={70}
                        hp={24}
                        fs={12}
                        fw={800}
                        rounded={4}
                        text={'확인'}
                        onPress={onAuthCheck}
                        disable={authPhone}
                      />
                    ) : (
                      <></>
                    )
                  }
                />
              </VStack>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(17))}
                fontWeight={600}
                color={'#000000'}
                style={{
                  marginLeft: 54,
                  marginTop: 27,
                  marginBottom: 14,
                }}>
                회원 구분
              </Text>
              <Radio.Group
                colorScheme={'rgb(15,239,189)'}
                defaultValue={job}
                name="jobGroup"
                alignItems={'center'}
                onChange={setJob}
                style={{marginBottom: 20}}>
                <VStack
                  w={'72%'}
                  h={responsiveHeight(heightPersentage(88))}
                  justifyContent={'space-between'}>
                  <HStack w="100%" space={4}>
                    <Radio value="0">
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        일반인
                      </Text>
                    </Radio>
                    <Radio value="1">
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        실연자
                      </Text>
                    </Radio>
                    <Radio value="2">
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        작곡가
                      </Text>
                    </Radio>
                  </HStack>
                  <HStack w="100%" space={4}>
                    <Radio value="3">
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        작사가
                      </Text>
                    </Radio>
                    <Radio value="4">
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        연습생
                      </Text>
                    </Radio>
                    <Radio value="5">
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        엔지니어
                      </Text>
                    </Radio>
                  </HStack>
                  <HStack w="100%" space={2}>
                    <Radio value="6">
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        퍼포먼서
                      </Text>
                    </Radio>
                    <Radio value="7">
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        인플루언서
                      </Text>
                    </Radio>
                  </HStack>
                </VStack>
              </Radio.Group>
              <Center>
                {authEmail && authPW && authPhone ? (
                  <Gbutton
                    wp={220}
                    hp={40}
                    fs={18}
                    fw={600}
                    rounded={8}
                    text={'SIGN UP'}
                    onPress={submit}
                  />
                ) : (
                  <Gbutton
                    wp={220}
                    hp={40}
                    fs={18}
                    fw={600}
                    rounded={8}
                    disable
                    text={'SIGN UP'}
                  />
                )}
              </Center>
            </BlurView>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default Register;