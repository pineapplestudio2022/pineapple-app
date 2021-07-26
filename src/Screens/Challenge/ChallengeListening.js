//Challenge -> 15초감상 View

import React from 'react';
import {
  Box,
  Center,
  Text,
  VStack,
  HStack,
  TextArea,
  Icon,
  Image,
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
} from '../../Commons/DeviceWHPersentage';
import {ImageBackground, TouchableOpacity} from 'react-native';
import MenuComponent from '../../Components/MenuComponent';
import LyricsViewBackground from '../../Assets/Image/challenge/bg_lyricsView_glassbox.png';
import XIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import DumpImg from '../../Assets/Image/image_singing_dumpimage.jpg';
import HeadPhoneIcon from '../../Assets/Image/challenge/icon_challenge_headphones_white.png';
function ChallengeListening(props) {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'노래부르기'}
        navigation={props.navigation}
      />
      <Box safeAreaBottom alignItems="center">
        <VStack space={2} w={responsiveWidth(widthPersentage(345))}>
          <Center>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(20))}
              bold
              color={'#1a1b1c'}
              lineHeight={28}
              px={2}
              noOfLines={1}>
              곡 제목 들어갈 공간
            </Text>
            <Text></Text>
          </Center>
          <HStack space={10} justifyContent={'center'} p={2}>
            <HStack>
              <Text
                color={'#4be3ac'}
                fontSize={responsiveFontSize(fontSizePersentage(17))}
                bold>
                작곡가 :{'  '}
              </Text>
              <Text
                color={'#1a1b1c'}
                fontSize={responsiveFontSize(fontSizePersentage(17))}
                bold>
                뮤지아
              </Text>
            </HStack>
            <HStack>
              <Text
                color={'#4be3ac'}
                fontSize={responsiveFontSize(fontSizePersentage(17))}
                bold>
                작사가 :{'  '}
              </Text>
              <Text
                color={'#1a1b1c'}
                fontSize={responsiveFontSize(fontSizePersentage(17))}
                bold>
                김하나
              </Text>
            </HStack>
          </HStack>
          <Box
            style={{
              height: responsiveHeight(heightPersentage(440)),
              shadowColor: '#858c9233',
              shadowOffset: {width: 0, height: 2},
              shadowRadius: 4,
              shadowOpacity: 1,
            }}>
            <Box borderRadius={20} overflow={'hidden'}>
              <ImageBackground
                source={LyricsViewBackground}
                resizeMode={'cover'}
                style={{
                  width: '100%',
                  height: '100%',
                }}>
                <Center>
                  <Box
                    backgroundColor={'#aabbcc'}
                    style={{
                      width: responsiveWidth(widthPersentage(209)),
                      height: responsiveHeight(heightPersentage(188)),
                    }}
                    rounded={8}
                    overflow={'hidden'}
                    my={5}>
                    <Image
                      source={DumpImg}
                      w="100%"
                      h="100%"
                      resizeMode="center"
                    />
                  </Box>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#0fefbd',
                      borderRadius: 6,
                      shadowColor: '#00000033',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowRadius: 4,
                      shadowOpacity: 1,
                      width: responsiveWidth(widthPersentage(220)),
                      height: responsiveHeight(heightPersentage(40)),
                    }}>
                    <HStack space={1}>
                      <Image
                        source={HeadPhoneIcon}
                        style={{
                          position: 'absolute',
                          top: responsiveHeight(heightPersentage(8)),
                          left: responsiveWidth(widthPersentage(15)),
                          width: responsiveWidth(widthPersentage(24)),
                          height: responsiveHeight(heightPersentage(24)),
                        }}
                      />
                      <Text
                        style={{
                          position: 'absolute',
                          top: responsiveHeight(heightPersentage(8)),
                          left: responsiveWidth(widthPersentage(44)),
                          width: responsiveWidth(widthPersentage(162)),
                        }}
                        fontSize={responsiveFontSize(fontSizePersentage(18))}
                        fontWeight={600}
                        textAlign={'center'}
                        color={'white'}>
                        15초 듣기
                      </Text>
                    </HStack>
                  </TouchableOpacity>
                  <Box
                    bg={'#fafafa80'}
                    style={{
                      width: responsiveWidth(widthPersentage(240)),
                      height: responsiveHeight(heightPersentage(136)),
                    }}
                    my={2}
                    rounded={16}>
                    <TextArea
                      h="100%"
                      fontSize={responsiveFontSize(fontSizePersentage(13))}
                      lineHeight={18}
                      textAlign={'center'}
                      borderWidth={0}
                      editable={false}
                      px={8}
                      pt={2}>
                      If you’ve ever been in love before {'\n'}I know you feel
                      this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}
                      If you’ve ever been in love before {'\n'}I know you feel
                      this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}
                    </TextArea>
                  </Box>
                </Center>
              </ImageBackground>
            </Box>
            <HStack space={5} justifyContent={'space-around'} mt={4}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#0fefbd',
                  borderRadius: 6,
                  shadowColor: '#00000033',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowRadius: 4,
                  shadowOpacity: 1,
                  justifyContent: 'center',
                  width: responsiveWidth(widthPersentage(120)),
                  height: responsiveHeight(heightPersentage(40)),
                }}>
                <HStack
                  space={4}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <Icon
                    as={<XIcon name="file-excel-box" />}
                    size={responsiveWidth(widthPersentage(21))}
                    color={'white'}
                  />
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(13))}
                    fontWeight={800}
                    color={'white'}>
                    닫 기
                  </Text>
                </HStack>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#0fefbd',
                  borderRadius: 6,
                  shadowColor: '#00000033',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowRadius: 4,
                  shadowOpacity: 1,
                  justifyContent: 'center',
                  width: responsiveWidth(widthPersentage(120)),
                  height: responsiveHeight(heightPersentage(40)),
                }}>
                <HStack
                  space={4}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <Icon
                    as={<XIcon name="checkbox-marked" />}
                    size={responsiveWidth(widthPersentage(21))}
                    color={'white'}
                  />
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(13))}
                    fontWeight={800}
                    color={'white'}>
                    참 여
                  </Text>
                </HStack>
              </TouchableOpacity>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

export default ChallengeListening;
