//My Challenge > 노래 챌린지의 Card
import React, {Component} from 'react';
import {Image, Text, Box, VStack, HStack, Pressable} from 'native-base';
import DumpImage from '../Assets/Image/image_singing_dumpimage.jpg';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../Commons/DeviceWHPersentage';
import {BlurView} from '@react-native-community/blur';
import PlayIcon from '../Assets/Image/challenge/icon_challenge_playmusic2.png';
import MicIcon from '../Assets/Image/challenge/icon_challenge_mic.png';
import TrashIcon from '../Assets/Image/challenge/icon_challenge_trash.png';
export default class MySingingCardComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Box
        style={{
          shadowColor: '#8799a45b',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowRadius: 10,
          shadowOpacity: 1,
        }}
        rounded={8}
        backgroundColor={'#fafafa80'}
        width={responsiveWidth(widthPersentage(320))}
        height={responsiveHeight(heightPersentage(104))}>
        <BlurView
          style={{
            width: '100%',
            height: '100%',
          }}
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor="white">
          <HStack space={4}>
            <Box
              width={responsiveWidth(widthPersentage(95))}
              height={responsiveHeight(heightPersentage(95))}
              rounded={4}
              overflow={'hidden'}
              m={1}>
              <Image
                source={DumpImage}
                width="100%"
                height="100%"
                resizeMode={'cover'}
                alt={' '}
              />
            </Box>
            <VStack space={1}>
              <HStack>
                <Text
                  fontSize={responsiveFontSize(fontSizePersentage(17))}
                  fontWeight={600}
                  color={'#1a1b1c'}
                  py={1}>
                  곡 제목이 들어갈 공간
                </Text>
                <Pressable
                  position={'absolute'}
                  right={0}
                  top={2}
                  width={responsiveWidth(widthPersentage(16))}
                  height={responsiveHeight(heightPersentage(16))}>
                  <Image
                    source={TrashIcon}
                    width="100%"
                    height="100%"
                    resizeMode={'contain'}
                    alt={' '}
                  />
                </Pressable>
              </HStack>

              <HStack space={1}>
                <Text
                  fontSize={responsiveFontSize(fontSizePersentage(11))}
                  fontWeight={500}
                  color={'#000000'}>
                  작곡가:
                </Text>
                <Text
                  fontSize={responsiveFontSize(fontSizePersentage(11))}
                  fontWeight={500}
                  color={'#858c92'}>
                  김하나
                </Text>
              </HStack>
              <HStack space={1}>
                <Text
                  fontSize={responsiveFontSize(fontSizePersentage(11))}
                  fontWeight={500}
                  color={'#000000'}>
                  작사가:
                </Text>
                <Text
                  fontSize={responsiveFontSize(fontSizePersentage(11))}
                  fontWeight={500}
                  color={'#858c92'}>
                  뮤지아
                </Text>
              </HStack>
              <HStack mt={1} space={9}>
                <Pressable
                  width={responsiveWidth(widthPersentage(76))}
                  height={responsiveHeight(heightPersentage(24))}
                  backgroundColor={'#0fefbd'}
                  rounded={4}
                  justifyContent={'center'}>
                  <HStack>
                    <Image
                      source={PlayIcon}
                      resizeMode={'contain'}
                      style={{
                        width: responsiveWidth(widthPersentage(16)),
                        marginLeft: 7,
                      }}
                      alt={' '}
                    />
                    <Text
                      fontSize={responsiveFontSize(fontSizePersentage(12))}
                      bold
                      marginLeft={3}
                      color={'#fafafa'}>
                      재 생
                    </Text>
                  </HStack>
                </Pressable>
                <Pressable
                  width={responsiveWidth(widthPersentage(76))}
                  height={responsiveHeight(heightPersentage(24))}
                  backgroundColor={'#0fefbd'}
                  rounded={4}
                  justifyContent={'center'}>
                  <HStack>
                    <Image
                      source={MicIcon}
                      resizeMode={'contain'}
                      style={{
                        width: responsiveWidth(widthPersentage(16)),
                        marginLeft: 7,
                      }}
                      alt={' '}
                    />
                    <Text
                      fontSize={responsiveFontSize(fontSizePersentage(12))}
                      bold
                      marginLeft={1}
                      color={'#fafafa'}>
                      재 도 전
                    </Text>
                  </HStack>
                </Pressable>
              </HStack>
            </VStack>
          </HStack>
        </BlurView>
      </Box>
    );
  }
}
