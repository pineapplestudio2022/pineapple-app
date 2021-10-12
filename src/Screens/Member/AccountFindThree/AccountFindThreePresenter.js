import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
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
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../../../Commons/CommonUtil';
import MenuComponent from '../../../Components/MenuComponent';
import Gbutton from '../../../Components/GbuttonComponent';
import PhoneIcon from '../../../Assets/Image/member/icon_member_phone_gray.png';
import AuthIcon from '../../../Assets/Image/member/icon_member_auth_gray.png';

const AccountFindThreePresenter = props => {
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
                value={props.phoneNum}
                isDisabled={props.nextBtn}
                onChangeText={props.setPhoneNum}
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
                      disable={props.getAuthNum}
                      onPress={props.onAuthRequest}
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
                value={props.authNum}
                isDisabled={props.nextBtn}
                onChangeText={props.setAuthNum}
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
                      disable={props.nextBtn}
                      onPress={props.onAuthCheck}
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
                disable={!props.nextBtn}
                text={'다음'}
                onPress={() =>
                  props.navigation.navigate('FindAccount4', {
                    email: props.email,
                  })
                }
              />
            </Center>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default AccountFindThreePresenter;
