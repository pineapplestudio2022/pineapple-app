import React, {useEffect, useState} from 'react';
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
import {HStack, Box, ScrollView, VStack, Text, Center} from 'native-base';
import MenuComponent from '../../Components/MenuComponent';
import {BlurView} from '@react-native-community/blur';
import Gbutton from '../../Components/GbuttonComponent';
import APIKit from '../../API/APIkit';

const FindAccountTwo = props => {
  const email = props.route.params.email;
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
              // eslint-disable-next-line react-native/no-inline-styles
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
                          backgroundColor: index == 1 ? '#0fefbd' : '#0fefbd30',
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
                  textAlign={'center'}>
                  아이디는 아래와 같습니다.
                </Text>
                <Box
                  style={{
                    width: responsiveWidth(widthPersentage(240)),
                    height: responsiveHeight(heightPersentage(104)),
                    borderRadius: 8,
                    marginTop: 10,
                    marginBottom: 28,
                  }}
                  alignItems={'center'}
                  justifyContent={'center'}
                  backgroundColor={'#a5a8ae'}>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(17))}
                    fontWeight={600}
                    color={'#fafafa'}>
                    {email}
                  </Text>
                </Box>
                <Text
                  fontSize={responsiveFontSize(fontSizePersentage(17))}
                  fontWeight={600}
                  color={'#1a1b1c'}
                  textAlign={'center'}>
                  비밀번호를 분실하셨다면{'\n'}다음을 눌러 초기화를 진행합니다.
                </Text>
                <Center style={{marginTop: 48}}>
                  <HStack space={10}>
                    <Gbutton
                      wp={120}
                      hp={40}
                      fs={16}
                      fw={800}
                      rounded={6}
                      text={'로그인'}
                    />
                    <Gbutton
                      wp={120}
                      hp={40}
                      fs={16}
                      fw={800}
                      rounded={6}
                      text={'다음'}
                      onPress={() =>
                        props.navigation.navigate('FindAccount3', {
                          email: email,
                        })
                      }
                    />
                  </HStack>
                </Center>
              </VStack>
            </BlurView>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default FindAccountTwo;
