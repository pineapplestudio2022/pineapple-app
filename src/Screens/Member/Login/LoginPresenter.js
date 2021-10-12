import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, HStack, Image, Input, Spinner, Text, VStack} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {fontSizePersentage, widthPersentage} from '../../../Commons/CommonUtil';
import MenuComponent from '../../../Components/MenuComponent';
import Gbutton from '../../../Components/GbuttonComponent';

import CharacterIcon from '../../../Assets/Image/member/icon_login_character.png';
import EmailIcon from '../../../Assets/Image/member/icon_login_email_gray.png';
import KeyIcon from '../../../Assets/Image/member/icon_login_key_gray.png';

const LoginPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={'Login'}
        titleName={'파인애플스튜디오'}
        navigation={props.navigation}
        notGB
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        scrollEnabled={true}
        resetScrollToCoords={{x: 0, y: 0}}
        enableAutomaticScroll={true}>
        <Box
          alignItems={'center'}
          style={{
            marginTop: 50,
            shadowColor: '#858c9233',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 4,
            shadowOpacity: 1,
          }}>
          <Box
            backgroundColor={'#f9f9f9'}
            style={{
              width: responsiveWidth(widthPersentage(350)),
              borderRadius: 20,
              overflow: 'hidden',
            }}>
            <Box flex={1} paddingBottom={10}>
              <VStack alignItems={'center'} space={6}>
                {props.loading ? (
                  <Spinner position={'absolute'} left={'44%'} top={'44%'} />
                ) : (
                  <></>
                )}
                <Image
                  source={CharacterIcon}
                  resizeMode={'contain'}
                  style={{width: responsiveWidth(widthPersentage(50))}}
                  alt={' '}
                  mt={8}
                />
                <Text
                  textAlign={'center'}
                  fontSize={responsiveFontSize(fontSizePersentage(17))}
                  color={'#000000'}>
                  당신만의 음악세상을 {'\n'} 선물합니다.
                </Text>
                <Input
                  width={responsiveWidth(widthPersentage(300))}
                  rounded={8}
                  backgroundColor={'#fafafab3'}
                  borderWidth={1}
                  placeholder={'Email'}
                  autoFocus
                  onChangeText={props.setSignInEmail}
                  value={props.signInEmail}
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
                  onChangeText={props.setSignInPassword}
                  value={props.signInPassword}
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
                <Gbutton
                  wp={220}
                  hp={40}
                  fs={18}
                  fw={600}
                  rounded={8}
                  text={'LOG IN'}
                  onPress={props.submit}
                />
                <HStack
                  justifyContent={'space-around'}
                  mt={4}
                  mx={10}
                  w={'80%'}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('MemberNavigation')
                    }>
                    <Text
                      fontSize={responsiveFontSize(fontSizePersentage(16))}
                      fontWeight={600}
                      color={'#0fefbd'}>
                      회원가입 →
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('FindAccount1')}>
                    <Text
                      fontSize={responsiveFontSize(fontSizePersentage(16))}
                      fontWeight={600}
                      color={'#0fefbd'}>
                      계정찾기 →
                    </Text>
                  </TouchableOpacity>
                </HStack>
              </VStack>
            </Box>
          </Box>
        </Box>
        {/* <Box h={250} /> */}
      </KeyboardAwareScrollView>
    </Box>
  );
};
export default LoginPresenter;
