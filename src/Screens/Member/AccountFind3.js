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
import {BlurView} from '@react-native-community/blur';
import Gbutton from '../../Components/GbuttonComponent';
import PhoneIcon from '../../Assets/Image/member/icon_member_phone_gray.png';
import AuthIcon from '../../Assets/Image/member/icon_member_auth_gray.png';
const FindAccountThree = props => {
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
            <BlurView
              style={{
                width: '100%',
                height: '100%',
              }}
              blurType="xlight"
              blurAmount={25}
              reducedTransparencyFallbackColor="white">
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
                    <Gbutton
                      wp={70}
                      hp={24}
                      fs={12}
                      fw={800}
                      rounded={4}
                      text={'인증번호'}
                    />
                  }
                />
                <Input
                  width={responsiveWidth(widthPersentage(300))}
                  rounded={8}
                  backgroundColor={'#fafafab3'}
                  borderWidth={0}
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
                    <Gbutton
                      wp={70}
                      hp={24}
                      fs={12}
                      fw={800}
                      rounded={4}
                      text={'확인'}
                      onPress={() => {}}
                    />
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
                  text={'다음'}
                  onPress={() => props.navigation.navigate('FindAccount4')}
                />
              </Center>
            </BlurView>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default FindAccountThree;
