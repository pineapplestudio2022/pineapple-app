import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Box,
  Center,
  HStack,
  Image,
  Input,
  Radio,
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
} from '../../../Commons/CommonUtil';

import MenuComponent from '../../../Components/MenuComponent';
import Gbutton from '../../../Components/GbuttonComponent';
import EmailIcon from '../../../Assets/Image/member/icon_login_email_gray.png';
import KeyIcon from '../../../Assets/Image/member/icon_login_key_gray.png';
import PhoneIcon from '../../../Assets/Image/member/icon_member_phone_gray.png';
import AuthIcon from '../../../Assets/Image/member/icon_member_auth_gray.png';

const RegisterPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={'Mypage'}
        titleName={'회원가입'}
        navigation={props.navigation}
        notGB
      />
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
            height: responsiveHeight(heightPersentage(700)),
            borderRadius: 20,
            overflow: 'hidden',
          }}>
          <Box
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#f9f9f9',
            }}>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              scrollEnabled={true}
              // resetScrollToCoords={{x: 0, y: 0}}
            >
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
                  borderWidth={1}
                  placeholder={'Email'}
                  value={props.email}
                  onChangeText={props.handleEmail}
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
                  placeholder={'PW'}
                  value={props.password}
                  onChangeText={props.handlePassword}
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
                  value={props.rePassword}
                  onChangeText={props.handleRePassword}
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
                  {props.pMessage}
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
                본인 인증
              </Text>
              <VStack alignItems={'center'} space={3}>
                <Input
                  width={responsiveWidth(widthPersentage(300))}
                  rounded={8}
                  keyboardType={'numeric'}
                  onChangeText={props.handleAuthButoon}
                  value={props.phoneNum}
                  backgroundColor={'#fafafab3'}
                  borderWidth={1}
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
                    props.authBtn ? (
                      <Box mr={2}>
                        <Gbutton
                          wp={70}
                          hp={24}
                          fs={12}
                          fw={800}
                          rounded={4}
                          text={'인증번호'}
                          onPress={props.onAuthRequest}
                          disable={props.getAuthNum}
                        />
                      </Box>
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
                  borderWidth={1}
                  onChangeText={props.setAuthNo}
                  value={props.authNo}
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
                    props.authCheckBtn ? (
                      <Box mr={2}>
                        <Gbutton
                          wp={70}
                          hp={24}
                          fs={12}
                          fw={800}
                          rounded={4}
                          text={'확인'}
                          onPress={props.onAuthCheck}
                          disable={props.authPhone}
                        />
                      </Box>
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
                defaultValue={props.job}
                name="jobGroup"
                alignItems={'center'}
                accessibilityLabel={'pick a job'}
                onChange={props.setJob}
                style={{marginBottom: 20}}>
                <VStack
                  w={'72%'}
                  h={responsiveHeight(heightPersentage(88))}
                  justifyContent={'space-between'}>
                  <HStack w="100%" space={4}>
                    <Radio value="0" accessibilityLabel={'public'}>
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        일반인
                      </Text>
                    </Radio>
                    <Radio value="1" accessibilityLabel={'performer'}>
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        실연자
                      </Text>
                    </Radio>
                    <Radio value="2" accessibilityLabel={'composer'}>
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
                    <Radio value="3" accessibilityLabel={'lyricist'}>
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        작사가
                      </Text>
                    </Radio>
                    <Radio value="4" accessibilityLabel={'Trainee'}>
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        연습생
                      </Text>
                    </Radio>
                    <Radio value="5" accessibilityLabel={'engineer'}>
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
                    <Radio value="6" accessibilityLabel={'performer'}>
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        퍼포먼서
                      </Text>
                    </Radio>
                    <Radio value="7" accessibilityLabel={'influencer'}>
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
                {props.authEmail && props.authPW && props.authPhone ? (
                  <Gbutton
                    wp={220}
                    hp={40}
                    fs={18}
                    fw={600}
                    rounded={8}
                    text={'SIGN UP'}
                    onPress={props.submit}
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
              <Box h={30} />
            </KeyboardAwareScrollView>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default RegisterPresenter;
