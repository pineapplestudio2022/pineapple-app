//My Challenge > 노래 챌린지의 Card
import React, {useContext} from 'react';
import {Alert, TouchableOpacity} from 'react-native';
import {Image, Text, Box, VStack, HStack} from 'native-base';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  getImage,
  heightPersentage,
  widthPersentage,
} from '../Commons/CommonUtil';

import PlayIcon from '../Assets/Image/challenge/icon_challenge_playmusic2.png';
import MicIcon from '../Assets/Image/challenge/icon_challenge_mic.png';
import TrashIcon from '../Assets/Image/challenge/icon_challenge_trash.png';

import APIKit from '../API/APIkit';
import {UserDispatch} from '../Commons/UserDispatchProvider';
const MySingingCardComponent = props => {
  const {userId} = useContext(UserDispatch);

  const handlerDelete = () => {
    const payload = {
      userId: userId.toString(),
      challengeId: props.id.toString(),
    };
    if (__DEV__) {
      console.log(payload);
    }
    APIKit.post('challenge/deleteMyChallenge', payload)
      .then(({data}) => {
        if (data.IBcode === '1000') {
          props.setRefresh(true);
        }
      })
      .catch(error => {
        if (__DEV__) {
          console.log(error);
        }
      });
  };

  const handlerMessage = () => {
    Alert.alert('Pineapple', '삭제하시겠습니까?', [
      {
        text: '취소',
        onPress: () => {},
      },
      {
        text: '확인',
        onPress: () => handlerDelete(),
      },
    ]);
  };
  const handlerGoEnjoy = () => {
    props.navigation.navigate('ChallengeEnjoy', {id: props.id});
  };

  const handlerGoListening = name => {
    props.navigation.navigate('Listening', {
      id: props.originalWorkId,
    });
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
      <Box>
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
              <TouchableOpacity
                onPress={handlerMessage}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 8,
                  width: responsiveWidth(widthPersentage(16)),
                  height: responsiveHeight(heightPersentage(16)),
                }}>
                <Image
                  source={TrashIcon}
                  width="100%"
                  height="100%"
                  resizeMode={'contain'}
                  alt={' '}
                />
              </TouchableOpacity>
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
                onPress={handlerGoEnjoy}>
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
                onPress={handlerGoListening}>
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
};

export default MySingingCardComponent;
