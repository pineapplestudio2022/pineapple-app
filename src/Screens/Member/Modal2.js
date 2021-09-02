import React from 'react';
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
  Checkbox,
  Divider,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';

import MenuComponent from '../../Components/MenuComponent';
import Gbutton from '../../Components/GbuttonComponent';
import ExternalLinkIcon from '../../Assets/Image/member/icon_signup_externallink_gray.png';
import {Alert, TouchableOpacity} from 'react-native';
import Modal1 from './Modal1';
const Modal2 = props => {
  const [allCheck, setAllCheck] = React.useState(false); //전체동의
  const [privacy, setPrivacy] = React.useState(false); //개인정보
  const [terms, setTerms] = React.useState(false); //이용약관
  const [marketing, setMarketing] = React.useState('0'); //마케팅 0:거부, 1:수신
  const [state, setUseState] = React.useState(false);

  //전체동의
  const handelAllCheck = value => {
    if (value) {
      setPrivacy(true);
      setTerms(true);
      setMarketing('1');
      setAllCheck(true);
    } else {
      setPrivacy(false);
      setTerms(false);
      setMarketing('0');
      setAllCheck(false);
    }
  };

  const handleAgreement = () => {
    if (privacy && terms) {
      props.navigation.navigate('Register', {
        marketing: marketing,
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
            shadowColor: '#00000023',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowRadius: 1,
            shadowOpacity: 1,
          }}>
          <Box
            style={{
              width: responsiveWidth(widthPersentage(355)),
              height: responsiveHeight(heightPersentage(620)),
              borderRadius: 8,
              backgroundColor: '#ffffff',
              overflow: 'hidden',
            }}>
            <VStack alignItems={'center'} space={8}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(17))}
                fontWeight={600}
                color={'#1a1b1c'}
                style={{
                  width: responsiveWidth(widthPersentage(235)),
                  height: responsiveHeight(heightPersentage(68)),
                  marginTop: responsiveHeight(heightPersentage(59)),
                  marginBottom: responsiveHeight(heightPersentage(46)),
                }}>
                회원가입을 위하여 개인정보 수집 및 마케팅 동의에 관련한 약관
                동의를 부탁드려요!
              </Text>
              <Checkbox
                value="1"
                colorScheme={'rgb(15,239,189)'}
                size={'md'}
                onChange={handelAllCheck}>
                <HStack
                  w={'85%'}
                  justifyContent={'space-around'}
                  alignItems={'center'}>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(22))}
                    bold
                    color={'#1a1b1c'}>
                    약관에 전체 동의합니다.
                  </Text>

                  <Modal1 Image source={ExternalLinkIcon} />
                </HStack>
              </Checkbox>
              <Divider />
              <Checkbox
                value="2"
                colorScheme={'rgb(15,239,189)'}
                onChange={() => setPrivacy(!privacy)}
                isChecked={privacy}>
                <HStack
                  w={'85%'}
                  justifyContent={'space-around'}
                  alignItems={'center'}>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(15))}
                    bold
                    color={'#a5a8ae'}>
                    개인정보 수집•이용 동의{'('}필수{')'}
                  </Text>

                  <Box>
                    <Modal1
                      src={''}
                      source={ExternalLinkIcon}
                      style={{width: responsiveWidth(widthPersentage(24))}}
                    />
                  </Box>
                </HStack>
              </Checkbox>
              <Checkbox
                value="3"
                colorScheme={'rgb(15,239,189)'}
                onChange={() => setTerms(!terms)}
                isChecked={terms}>
                <HStack
                  w={'85%'}
                  justifyContent={'space-around'}
                  alignItems={'center'}>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(15))}
                    bold
                    color={'#a5a8ae'}>
                    서비스 이용약관 동의{'('}필수{')'}
                  </Text>
                  <Modal1 />
                  <TouchableOpacity />
                </HStack>
              </Checkbox>
              <Checkbox
                value="4"
                colorScheme={'rgb(15,239,189)'}
                onChange={() => setMarketing(!marketing)}
                isChecked={marketing === '0' ? false : true}>
                <HStack
                  w={'85%'}
                  justifyContent={'space-around'}
                  alignItems={'center'}>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(15))}
                    bold
                    color={'#a5a8ae'}>
                    광고•마케팅 수신 동의{'('}선택{')'}
                  </Text>
                  <TouchableOpacity>
                    <Modal1
                      alt={' '}
                      style={{width: responsiveWidth(widthPersentage(24))}}
                    />
                  </TouchableOpacity>
                </HStack>
              </Checkbox>
            </VStack>
            <Center style={{marginTop: responsiveHeight(heightPersentage(45))}}>
              <Gbutton
                wp={220}
                hp={40}
                fs={18}
                fw={600}
                rounded={8}
                disable={false}
                text={'동의'}
                onPress={handleAgreement}
              />
            </Center>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default Modal2;