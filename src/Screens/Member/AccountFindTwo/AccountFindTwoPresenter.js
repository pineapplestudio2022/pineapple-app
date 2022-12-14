import React from 'react';
import {HStack, Box, ScrollView, VStack, Text, Center} from 'native-base';
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

const AccountFindTwoPresenter = props => {
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
                  {props.email}
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
                    onPress={() => props.navigation.navigate('Login')}
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
                        email: props.email,
                      })
                    }
                  />
                </HStack>
              </Center>
            </VStack>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default AccountFindTwoPresenter;
