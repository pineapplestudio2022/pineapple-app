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
} from '../../../Commons/CommonUtil';
import {
  Box,
  Center,
  Checkbox,
  Divider,
  HStack,
  ScrollView,
  Text,
  VStack,
} from 'native-base';

import MenuComponent from '../../../Components/MenuComponent';
import Gbutton from '../../../Components/GbuttonComponent';
import TermsandConditionModal from '../../../Components/TermsandConditionModal';

const AgreementPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={'Mypage'}
        titleName={'회원가입'}
        navigation={props.navigation}
        notGB
      />
      <ScrollView>
        <Box
          alignItems={'center'}
          style={{
            shadowColor: '#00000023',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowRadius: 1,
            shadowOpacity: 1,
          }}>
          <Box
            style={{
              width: responsiveWidth(widthPersentage(355)),
              height: responsiveHeight(heightPersentage(620)),
              borderRadius: 8,
              backgroundColor: '#ffffff',
              overflow: 'hidden',
            }}>
            <VStack alignItems={'center'} space={8}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(17))}
                fontWeight={600}
                color={'#1a1b1c'}
                style={{
                  width: responsiveWidth(widthPersentage(235)),
                  height: responsiveHeight(heightPersentage(68)),
                  marginTop: responsiveHeight(heightPersentage(59)),
                  marginBottom: responsiveHeight(heightPersentage(46)),
                }}>
                회원가입을 위해 개인정보 수집 및 마케팅 동의 약관에 동의해주세요
              </Text>
              <Checkbox
                accessibilityLabel={'I fully agree to the terms'}
                colorScheme={'rgb(15,239,189)'}
                size={'md'}
                onChange={props.handelAllCheck}>
                <HStack
                  w={'85%'}
                  justifyContent={'space-around'}
                  alignItems={'center'}>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(22))}
                    bold
                    color={'#1a1b1c'}>
                    약관에 전체 동의합니다
                  </Text>
                </HStack>
              </Checkbox>
              <Divider />
              <Checkbox
                accessibilityLabel={
                  'Consent to collection and use of personal information'
                }
                colorScheme={'rgb(15,239,189)'}
                onChange={props.handlerPrivacy}
                isChecked={props.privacy}>
                <HStack
                  w={'85%'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(15))}
                    bold
                    color={'#a5a8ae'}>
                    개인정보수집•이용 동의{'('}필수{')'}
                  </Text>
                  <TermsandConditionModal terms={1} />
                </HStack>
              </Checkbox>
              <Checkbox
                accessibilityLabel={'Subscribe Terms of Service'}
                colorScheme={'rgb(15,239,189)'}
                onChange={props.handlerTerms}
                isChecked={props.terms}>
                <HStack
                  w={'85%'}
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
                accessibilityLabel={'Consent to receive advertising marketing'}
                colorScheme={'rgb(15,239,189)'}
                onChange={props.handlerMarketing}
                isChecked={props.marketing}>
                <HStack w={'85%'} alignItems={'center'}>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(15))}
                    bold
                    color={'#a5a8ae'}>
                    광고•마케팅 수신 동의(선택)
                  </Text>
                  {/* <TermsandConditionModal terms={3} /> */}
                </HStack>
              </Checkbox>
            </VStack>
            <Center style={{marginTop: responsiveHeight(heightPersentage(45))}}>
              <Gbutton
                wp={220}
                hp={40}
                fs={18}
                fw={600}
                rounded={8}
                disable={false}
                text={'동의'}
                onPress={props.handleAgreement}
              />
            </Center>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default AgreementPresenter;
