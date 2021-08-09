import {BlurView} from '@react-native-community/blur';
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
import MenuComponent from '../../Components/MenuComponent';
import EmailIcon from '../../Assets/Image/member/icon_login_email_gray.png';
import KeyIcon from '../../Assets/Image/member/icon_login_key_gray.png';
import ExternalLinkIcon from '../../Assets/Image/member/icon_signup_externallink_gray.png';
import Gbutton from '../../Components/GbuttonComponent';
import {TouchableOpacity} from 'react-native';
const Mypage = props => {
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
            style={{
              width: responsiveWidth(widthPersentage(358)),
              height: responsiveHeight(heightPersentage(620)),
              borderRadius: 20,
              overflow: 'hidden',
            }}>
            <BlurView
              style={{
                width: '100%',
                height: '100%',
              }}
              blurType="xlight"
              blurAmount={20}
              reducedTransparencyFallbackColor="white">
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
                  borderWidth={0}
                  placeholder={'abdf@gmail.com'}
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
                  borderWidth={0}
                  type={'password'}
                  placeholder={'변경할 암호를 입력해주세요'}
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
                  borderWidth={0}
                  type={'password'}
                  placeholder={'변경할 암호를 재확인해주세요'}
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
                defaultValue="1"
                name="jobGroup"
                alignItems={'center'}
                style={{marginBottom: 35}}>
                <VStack
                  w={'72%'}
                  h={responsiveHeight(heightPersentage(88))}
                  justifyContent={'space-between'}>
                  <HStack w="100%" space={4}>
                    <Radio value="1">
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        일반인
                      </Text>
                    </Radio>
                    <Radio value="2">
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        실연자
                      </Text>
                    </Radio>
                    <Radio value="3">
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
                    <Radio value="4">
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        작사가
                      </Text>
                    </Radio>
                    <Radio value="5">
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        연습생
                      </Text>
                    </Radio>
                    <Radio value="6">
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
                    <Radio value="7">
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(16))}
                        color={'#a5a8ae'}
                        fontWeight={600}
                        pl={2}>
                        퍼포먼서
                      </Text>
                    </Radio>
                    <Radio value="8">
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
              <VStack space={4} alignItems={'center'}>
                <Checkbox
                  value="1"
                  isDisabled
                  defaultIsChecked
                  colorScheme={'rgb(15,239,189)'}>
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
                    <TouchableOpacity>
                      <Image
                        alt={' '}
                        source={ExternalLinkIcon}
                        style={{width: responsiveWidth(widthPersentage(24))}}
                      />
                    </TouchableOpacity>
                  </HStack>
                </Checkbox>
                <Checkbox
                  value="2"
                  defaultIsChecked
                  isDisabled
                  colorScheme={'rgb(15,239,189)'}>
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
                    <TouchableOpacity>
                      <Image
                        alt={' '}
                        source={ExternalLinkIcon}
                        style={{width: responsiveWidth(widthPersentage(24))}}
                      />
                    </TouchableOpacity>
                  </HStack>
                </Checkbox>
                <Checkbox value="3" colorScheme={'rgb(15,239,189)'}>
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
                      <Image
                        alt={' '}
                        source={ExternalLinkIcon}
                        style={{width: responsiveWidth(widthPersentage(24))}}
                      />
                    </TouchableOpacity>
                  </HStack>
                </Checkbox>
              </VStack>
              <Center mt={10}>
                <Gbutton
                  wp={220}
                  hp={40}
                  fs={18}
                  fw={600}
                  rounded={8}
                  text={'저장하기'}
                />
              </Center>
            </BlurView>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default Mypage;
