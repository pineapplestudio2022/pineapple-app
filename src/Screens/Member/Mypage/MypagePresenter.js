import React from 'react';
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
import EmailIcon from '../../../Assets/Image/member/icon_login_email_gray.png';
import KeyIcon from '../../../Assets/Image/member/icon_login_key_gray.png';
import Gbutton from '../../../Components/GbuttonComponent';
import TermsandConditionModal from '../../../Components/TermsandConditionModal';

const MypagePresenter = props => {
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
            pb={8}
            rounded={20}
            backgroundColor={'#f9f9f9'}
            overflow={'hidden'}
            width={responsiveWidth(widthPersentage(358))}>
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
                borderWidth={1}
                placeholder={props.email}
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
                placeholder={'변경할 암호를 입력해주세요'}
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
                placeholder={'변경할 암호를 재확인해주세요'}
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
              회원 구분
            </Text>
            <Radio.Group
              colorScheme={'rgb(15,239,189)'}
              accessibilityLabel={'pick a job'}
              name="jobGroup"
              value={props.uType}
              onChange={props.setUType}
              alignItems={'center'}
              style={{marginBottom: 35}}>
              <VStack
                w={responsiveWidth(widthPersentage(270))}
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
              <VStack space={4} alignItems={'center'} w={'76%'}>
                <Checkbox.Group
                  accessibilityLabel={'Accept the terms and conditions'}
                  colorScheme={'rgb(15,239,189)'}
                  value={props.marketingPolicy}
                  w={'100%'}
                  onChange={props.setMarketingPolicy}>
                  <Checkbox
                    value={'1'}
                    isDisabled
                    accessibilityLabel={
                      'Consent to collection and use of personal information'
                    }>
                    <HStack
                      w={'100%'}
                      justifyContent={'space-between'}
                      alignItems={'center'}>
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(15))}
                        bold
                        color={'#a5a8ae'}>
                        개인정보 수집•이용 동의{'('}필수{')'}
                      </Text>
                      <TermsandConditionModal terms={1} />
                    </HStack>
                  </Checkbox>
                  <Checkbox
                    value={'2'}
                    isDisabled
                    accessibilityLabel={'Subscribe Terms of Service'}>
                    <HStack
                      w={'100%'}
                      justifyContent={'space-between'}
                      alignItems={'center'}>
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(15))}
                        bold
                        color={'#a5a8ae'}>
                        서비스 이용약관 동의{'('}필수{')'}
                      </Text>
                      <TermsandConditionModal terms={2} />
                    </HStack>
                  </Checkbox>
                  <Checkbox
                    value={'3'}
                    accessibilityLabel={
                      'Consent to receive advertising marketing'
                    }>
                    <HStack w={'100%'} alignItems={'center'}>
                      <Text
                        fontSize={responsiveFontSize(fontSizePersentage(15))}
                        bold
                        color={'#a5a8ae'}>
                        광고•마케팅 수신 동의{'('}선택{')'}
                      </Text>
                    </HStack>
                  </Checkbox>
                </Checkbox.Group>
              </VStack>
            </Center>
            <Center mt={10}>
              <Gbutton
                wp={220}
                hp={40}
                fs={18}
                fw={600}
                rounded={8}
                disable={!props.authPW}
                text={'저장하기'}
                onPress={props.modifyAccountInfo}
              />
            </Center>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default MypagePresenter;
