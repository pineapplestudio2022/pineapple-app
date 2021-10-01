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
import Gbutton from '../../Components/GbuttonComponent';
import PhoneIcon from '../../Assets/Image/member/icon_member_phone_gray.png';
import AuthIcon from '../../Assets/Image/member/icon_member_auth_gray.png';
import APIKit from '../../API/APIkit';
import {defaultAlertMessage} from '../../Commons/CommonUtil';
const FindAccountThree = props => {
  const {email} = props.route.params;

  const [phoneNum, setPhoneNum] = useState(); //핸드폰번호
  const [authNum, setAuthNum] = useState(); //인증번호
  const [authPhone, setAuthPhone] = useState(false); //번호인증 완료 체크
  const [getAuthNum, setGetAuthNum] = useState(false); //인증번호 전송 체크
  const [nextBtn, setNextBtn] = useState(false);

  //인증번호 요청
  const onAuthRequest = async () => {
    setGetAuthNum(true);
    const payload = {phoneNo: '+82' + phoneNum.substring(1)};
    try {
      APIKit.post('/auth/getAuthNo', payload)
        .then(response => {
          if (__DEV__) {
            console.log(response.data);
          }
        })
        .catch(error => {
          if (__DEV__) {
            console.log(error);
          }
        });
    } catch (e) {
      if (__DEV__) {
        console.log(e);
      }
    }
  };

  //인증번호 유효성 체크
  const onAuthCheck = async () => {
    const payload = {authNo: authNum, phone: '+82' + phoneNum.substring(1)};
    if (phoneNum === '') {
      defaultAlertMessage('전화번호를 입력해주세요.');
      return;
    }
    if (authNum === '') {
      defaultAlertMessage('인증번호를 입력해주세요.');
      return;
    }
    if (__DEV__) {
      console.log(payload);
    }
    APIKit.post('/auth/submitAuthNo', payload)
      .then(({data}) => {
        if (__DEV__) {
          console.log(data);
        }
        if (data.IBcode === '1000') {
          defaultAlertMessage('인증되었습니다');
          setAuthPhone(true);
          setNextBtn(true);
        } else if (data.IBdetail) {
          defaultAlertMessage(data.IBdetail);
        }
      })
      .catch(error => {
        if (__DEV__) {
          console.log(error);
        }
      });
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
            paddingBottom={10}
            style={{
              width: responsiveWidth(widthPersentage(350)),
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: '#f9f9f9',
            }}>
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
                        backgroundColor: index == 2 ? '#0fefbd' : '#0fefbd30',
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
                비밀번호 초기화를 위한{'\n'}본인인증을 진행합니다.
              </Text>
              <Input
                width={responsiveWidth(widthPersentage(300))}
                rounded={8}
                keyboardType={'numeric'}
                backgroundColor={'#fafafab3'}
                borderWidth={1}
                value={phoneNum}
                isDisabled={nextBtn}
                onChangeText={setPhoneNum}
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
                  <Box mr={2}>
                    <Gbutton
                      wp={70}
                      hp={24}
                      fs={12}
                      fw={800}
                      rounded={4}
                      text={'인증번호'}
                      disable={getAuthNum}
                      onPress={onAuthRequest}
                    />
                  </Box>
                }
              />
              <Input
                width={responsiveWidth(widthPersentage(300))}
                rounded={8}
                backgroundColor={'#fafafab3'}
                borderWidth={1}
                placeholder={'인증번호'}
                value={authNum}
                isDisabled={nextBtn}
                onChangeText={setAuthNum}
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
                  <Box mr={2}>
                    <Gbutton
                      wp={70}
                      hp={24}
                      fs={12}
                      fw={800}
                      rounded={4}
                      text={'확인'}
                      disable={nextBtn}
                      onPress={onAuthCheck}
                    />
                  </Box>
                }
              />
            </VStack>
            <Center style={{marginTop: 70}}>
              <Gbutton
                wp={220}
                hp={40}
                fs={18}
                fw={600}
                rounded={8}
                disable={!nextBtn}
                text={'다음'}
                onPress={() =>
                  props.navigation.navigate('FindAccount4', {email: email})
                }
              />
            </Center>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default FindAccountThree;
