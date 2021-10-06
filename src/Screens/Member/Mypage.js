import {
  Box,
  HStack,
  Image,
  Input,
  Radio,
  ScrollView,
  Text,
  VStack,
  Center,
  Checkbox,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
  passwordRegex,
} from '../../Commons/CommonUtil';
import MenuComponent from '../../Components/MenuComponent';
import EmailIcon from '../../Assets/Image/member/icon_login_email_gray.png';
import KeyIcon from '../../Assets/Image/member/icon_login_key_gray.png';
import Gbutton from '../../Components/GbuttonComponent';
import APIKit from '../../API/APIkit';
import {UserDispatch} from '../../Commons/UserDispatchProvider';
import TermsandConditionModal from './TermsandConditionModal';
const Mypage = props => {
  const {userId} = useContext(UserDispatch);
  const [email, setEmail] = useState('');
  const [uType, setUType] = useState('1');
  const [marketingPolicy, setMarketingPolicy] = useState(['1', '2']);

  const [password, setPassword] = useState(''); //첫번째 비밀번호
  const [rePassword, setRePassword] = useState(''); //두번째 비밀번호
  const [pMessage, setpMessage] = useState(''); //유효성 체크 메시지
  const [authPW, setAuthPW] = useState(false); //비밀번호 유효성 체크

  useEffect(() => {
    const getAccountInfo = async () => {
      const payload = {userId: userId.toString()};
      await APIKit.post('login/getAccountInfo', payload)
        .then(({data}) => {
          if (data.IBcode === '1000') {
            setEmail(data.IBparams.user.email);
            setUType(data.IBparams.user.uType.toString());
            if (data.IBparams.user.marketing_policy.toString() === '1') {
              setMarketingPolicy(['1', '2', '3']);
            }
          }
        })
        .catch(error => {
          if (__DEV__) {
            console.log(error);
          }
        });
    };

    getAccountInfo();
    return () => {
      if (__DEV__) {
        console.log('unmount');
      }
    };
  }, [userId]);

  const modifyAccountInfo = () => {
    const payload = {
      email: email.toString(),
      uType: uType.toString(),
      marketingPolicy: marketingPolicy.indexOf('3') === -1 ? '0' : '1',
      password: password,
    };
    if (__DEV__) {
      console.log(payload);
    }
    APIKit.post('/login/modifyAccountInfo', payload)
      .then(({data}) => {
        if (__DEV__) {
          console.log(data);
        }
        props.navigation.goBack();
      })
      .catch(error => {
        if (__DEV__) {
          console.log(error);
        }
      });
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
    } else if (!passwordRegex(value)) {
      setpMessage('영문,숫자,특수문자 1개 이상 포함');
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
          }}>
          <Box
            pb={8}
            rounded={20}
            backgroundColor={'#f9f9f9'}
            overflow={'hidden'}
            width={responsiveWidth(widthPersentage(358))}>
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
            <VStack alignItems={'center'} space={4}>
              <Input
                width={responsiveWidth(widthPersentage(300))}
                rounded={8}
                isDisabled
                backgroundColor={'#fafafab3'}
                borderWidth={1}
                placeholder={email}
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
                borderWidth={1}
                type={'password'}
                placeholder={'변경할 암호를 입력해주세요'}
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
                placeholder={'변경할 암호를 재확인해주세요'}
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
              <Text
                color={'#ff0000'}
                bold
                fontSize={responsiveFontSize(fontSizePersentage(14))}>
                {pMessage}
              </Text>
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
              회원 구분
            </Text>
            <Radio.Group
              colorScheme={'rgb(15,239,189)'}
              accessibilityLabel={'pick a job'}
              name="jobGroup"
              value={uType}
              onChange={nextValue => {
                setUType(nextValue);
              }}
              alignItems={'center'}
              style={{marginBottom: 35}}>
              <VStack
                w={responsiveWidth(widthPersentage(270))}
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
              <VStack space={4} alignItems={'center'} w={'76%'}>
                <Checkbox.Group
                  colorScheme={'rgb(15,239,189)'}
                  value={marketingPolicy}
                  w={'100%'}
                  onChange={setMarketingPolicy}>
                  <Checkbox value={'1'} isDisabled>
                    <HStack
                      w={'100%'}
                      justifyContent={'space-between'}
                      alignItems={'center'}>
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(15))}
                        bold
                        color={'#a5a8ae'}>
                        개인정보 수집•이용 동의{'('}필수{')'}
                      </Text>
                      <TermsandConditionModal terms={1} />
                    </HStack>
                  </Checkbox>
                  <Checkbox value={'2'} isDisabled>
                    <HStack
                      w={'100%'}
                      justifyContent={'space-between'}
                      alignItems={'center'}>
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(15))}
                        bold
                        color={'#a5a8ae'}>
                        서비스 이용약관 동의{'('}필수{')'}
                      </Text>
                      <TermsandConditionModal terms={2} />
                    </HStack>
                  </Checkbox>
                  <Checkbox value={'3'}>
                    <HStack w={'100%'} alignItems={'center'}>
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(15))}
                        bold
                        color={'#a5a8ae'}>
                        광고•마케팅 수신 동의{'('}선택{')'}
                      </Text>
                      {/* <TermsandConditionModal terms={3} /> */}
                    </HStack>
                  </Checkbox>
                </Checkbox.Group>
              </VStack>
            </Center>
            <Center mt={10}>
              <Gbutton
                wp={220}
                hp={40}
                fs={18}
                fw={600}
                rounded={8}
                disable={!authPW}
                text={'저장하기'}
                onPress={modifyAccountInfo}
              />
            </Center>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Mypage;
