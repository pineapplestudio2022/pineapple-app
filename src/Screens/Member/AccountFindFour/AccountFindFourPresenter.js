import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Box, Center, HStack, Image, Input, Text, VStack} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../../../Commons/CommonUtil';
import MenuComponent from '../../../Components/MenuComponent';
import Gbutton from '../../../Components/GbuttonComponent';
import KeyIcon from '../../../Assets/Image/member/icon_login_key_gray.png';

const AccountFindFourPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={'Mypage'}
        titleName={'마이페이지'}
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
            <Center style={{marginTop: 64}}>
              <Gbutton
                wp={220}
                hp={40}
                fs={18}
                fw={600}
                rounded={8}
                disable={!props.authPW}
                text={'완료'}
                onPress={props.resetPassword}
              />
            </Center>
          </Box>
        </Box>
      </KeyboardAwareScrollView>
    </Box>
  );
};
export default AccountFindFourPresenter;
