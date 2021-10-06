//작곡 참여 View
import {
  Box,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React from 'react';
import MenuComponent from '../../Components/MenuComponent';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../../Commons/CommonUtil';
import {ImageBackground} from 'react-native';
import IconHeaphone from '../../Assets/Image/challenge/icon_challenge_headphone.png';
import IconClose from '../../Assets/Image/icon_check_close.png';
import DumpImage from '../../Assets/Image/challenge/bg_challenge_ai_3.jpg';
import SingingMiniCardComponent from '../../Components/SingingMiniCardComponent';
function ChallengePlayingDetail(props) {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'편곡 참여'}
        navigation={props.navigation}
      />
      <VStack alignItems={'center'}>
        <Text
          fontSize={responsiveFontSize(fontSizePersentage(20))}
          bold
          color={'#1a1b1c'}>
          곡 제목이 들어갈 공간입니다.
        </Text>
        <Box
          style={{
            shadowColor: '#00000080',
            shadowOffset: {
              width: 1,
              height: 1,
            },
            shadowRadius: 3,
            shadowOpacity: 1,
          }}>
          <Box
            width={responsiveWidth(widthPersentage(240))}
            height={responsiveHeight(heightPersentage(216))}
            rounded={8}
            overflow={'hidden'}
            my={4}>
            <ImageBackground
              source={DumpImage}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          </Box>
        </Box>
        <HStack space={37} justifyContent={'center'}>
          <HStack space={1}>
            <Text
              color={'#4be3ac'}
              fontSize={responsiveFontSize(fontSizePersentage(17))}
              bold>
              작곡 :
            </Text>
            <Text
              color={'#1a1b1c'}
              fontSize={responsiveFontSize(fontSizePersentage(17))}
              bold>
              MUSIA{'('}AI{')'}
            </Text>
          </HStack>
          <HStack space={1}>
            <Text
              color={'#4be3ac'}
              fontSize={responsiveFontSize(fontSizePersentage(17))}
              bold>
              참여자 :
            </Text>
            <Text
              color={'#1a1b1c'}
              fontSize={responsiveFontSize(fontSizePersentage(17))}
              bold>
              111
            </Text>
          </HStack>
        </HStack>
        <HStack space={10} my={3}>
          <Box
            style={{
              shadowColor: '#00000033',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowRadius: 4,
              shadowOpacity: 1,
            }}>
            <Pressable
              backgroundColor={'#0fefbd'}
              w={responsiveWidth(widthPersentage(120))}
              h={responsiveHeight(heightPersentage(40))}
              rounded={6}
              justifyContent={'center'}>
              <HStack pl={18} space={4}>
                <Image
                  source={IconHeaphone}
                  size={responsiveWidth(widthPersentage(21))}
                  resizeMode={'contain'}
                  alt={' '}
                />
                <Text
                  pt={0.5}
                  fontSize={responsiveFontSize(fontSizePersentage(14))}
                  bold
                  color={'#fafafa'}>
                  듣 기
                </Text>
              </HStack>
            </Pressable>
          </Box>
          <Box
            style={{
              shadowColor: '#00000033',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowRadius: 4,
              shadowOpacity: 1,
            }}>
            <Pressable
              backgroundColor={'#0fefbd'}
              w={responsiveWidth(widthPersentage(120))}
              h={responsiveHeight(heightPersentage(40))}
              rounded={6}
              justifyContent={'center'}>
              <HStack pl={18} space={4}>
                <Image
                  source={IconClose}
                  size={responsiveWidth(widthPersentage(21))}
                  resizeMode={'contain'}
                  alt={' '}
                />
                <Text
                  pt={0.5}
                  fontSize={responsiveFontSize(fontSizePersentage(14))}
                  bold
                  color={'#fafafa'}>
                  참 여
                </Text>
              </HStack>
            </Pressable>
          </Box>
        </HStack>
      </VStack>

      <VStack>
        <Text
          fontSize={responsiveFontSize(fontSizePersentage(18))}
          bold
          color={'#1a1b1c'}
          ml={8}
          mt={4}>
          다른 Artist의 작품 감상하기
        </Text>
        <ScrollView>
          <VStack space={1}>
            <SingingMiniCardComponent />
            <SingingMiniCardComponent />
            <SingingMiniCardComponent />
            <SingingMiniCardComponent />
            <SingingMiniCardComponent />
          </VStack>
        </ScrollView>
      </VStack>
    </Box>
  );
}

export default ChallengePlayingDetail;
