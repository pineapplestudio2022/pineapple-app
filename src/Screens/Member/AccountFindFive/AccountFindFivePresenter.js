import React from 'react';
import {Box, Center, HStack, ScrollView, Text, VStack} from 'native-base';
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

const AccountFindFivePresenter = props => {
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
              height: responsiveHeight(heightPersentage(440)),
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
                        backgroundColor: index == 4 ? '#0fefbd' : '#0fefbd30',
                        borderRadius: 5,
                        margin: 4,
                      }}
                    />
                  ))}
                </HStack>
              </Box>

              <Text
                fontSize={responsiveFontSize(fontSizePersentage(28))}
                fontWeight={800}
                color={'#1a1b1c'}
                textAlign={'center'}
                style={{
                  marginTop: responsiveHeight(heightPersentage(100)),
                }}>
                암호 변경이{'\n'}완료되었습니다.
              </Text>
            </VStack>
            <Center mt={responsiveHeight(heightPersentage(125))}>
              <Gbutton
                wp={220}
                hp={40}
                fs={18}
                fw={600}
                rounded={8}
                disable={false}
                text={'로그인'}
                onPress={() => props.navigation.navigate('Login')}
              />
            </Center>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default AccountFindFivePresenter;
