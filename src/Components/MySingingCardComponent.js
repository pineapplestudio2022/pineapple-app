//My Challenge > 노래 챌린지의 Card
import React from 'react';
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
// import {BlurView} from '@react-native-community/blur';
import PlayIcon from '../Assets/Image/challenge/icon_challenge_playmusic2.png';
import MicIcon from '../Assets/Image/challenge/icon_challenge_mic.png';
import TrashIcon from '../Assets/Image/challenge/icon_challenge_trash.png';
import {TouchableOpacity} from 'react-native';
import Cover1 from '../Assets/Image/Top_music/top_music_1.jpg';
import Cover2 from '../Assets/Image/Top_music/top_music_2.jpg';
import Cover3 from '../Assets/Image/Top_music/top_music_3.jpg';
import Cover4 from '../Assets/Image/Top_music/top_music_4.jpg';
import Cover5 from '../Assets/Image/Top_music/top_music_5.jpg';
import Cover6 from '../Assets/Image/Top_music/top_music_6.jpg';
import Cover7 from '../Assets/Image/Top_music/top_music_7.jpg';
import Cover8 from '../Assets/Image/Top_music/top_music_8.jpg';
import Cover9 from '../Assets/Image/Top_music/top_music_9.jpg';
import Cover10 from '../Assets/Image/Top_music/top_music_10.jpg';
function MySingingCardComponent(props) {
  const getImage = () => {
    const number = Math.floor(Math.random() * 10) + 1;
    switch (number) {
      case 1:
        return Cover1;
      case 2:
        return Cover2;
      case 3:
        return Cover3;
      case 4:
        return Cover4;
      case 5:
        return Cover5;
      case 6:
        return Cover6;
      case 7:
        return Cover7;
      case 8:
        return Cover8;
      case 9:
        return Cover9;
      case 10:
        return Cover10;
      default:
        return DumpImage;
    }
  };
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
      backgroundColor={'#fafafa'}
      width={responsiveWidth(widthPersentage(320))}
      height={responsiveHeight(heightPersentage(104))}>
      <Box
        style={{
          width: '100%',
          height: '100%',
        }}
        // blurType="light"
        // blurAmount={5}
        // reducedTransparencyFallbackColor="white"
      >
        <HStack space={4}>
          <Box
            width={responsiveWidth(widthPersentage(95))}
            height={responsiveHeight(heightPersentage(95))}
            rounded={4}
            overflow={'hidden'}
            m={1}>
            <Image
              source={getImage}
              width="100%"
              height="100%"
              resizeMode={'cover'}
              alt={' '}
            />
          </Box>
          <VStack>
            <HStack>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(17))}
                fontWeight={600}
                color={'#1a1b1c'}
                py={1}>
                {props.title}
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

            <Text
              noOfLines={1}
              fontSize={responsiveFontSize(fontSizePersentage(11))}
              fontWeight={500}
              color={'#858c92'}
              style={{
                width: responsiveWidth(widthPersentage(170)),
                height: responsiveHeight(heightPersentage(18)),
              }}>
              {props.detail}
            </Text>
            <HStack
              space={1}
              style={{
                width: responsiveWidth(widthPersentage(170)),
                height: responsiveHeight(heightPersentage(17)),
              }}
              alignItems={'center'}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(11))}
                fontWeight={500}
                color={'#000000'}>
                장르 :
              </Text>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(11))}
                fontWeight={500}
                color={'#858c92'}>
                {props.genre}
              </Text>
            </HStack>
            <HStack mt={1} space={9}>
              <TouchableOpacity
                style={{
                  width: responsiveWidth(widthPersentage(76)),
                  height: responsiveHeight(heightPersentage(24)),
                  justifyContent: 'center',
                  borderRadius: 4,
                  backgroundColor: '#0fefbd',
                }}
                onPress={() =>
                  props.navigation.navigate('ChallengeEnjoy', {id: props.id})
                }>
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
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: responsiveWidth(widthPersentage(76)),
                  height: responsiveHeight(heightPersentage(24)),
                  justifyContent: 'center',
                  borderRadius: 4,
                  backgroundColor: '#0fefbd',
                }}
                onPress={() =>
                  props.navigation.navigate('Listening', {
                    id: props.originalWorkId,
                  })
                }>
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
              </TouchableOpacity>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}

export default MySingingCardComponent;
