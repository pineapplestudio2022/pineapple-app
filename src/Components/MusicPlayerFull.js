//음악플레이어 큰화면
import {BlurView} from '@react-native-community/blur';
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
import {Pressable} from 'react-native';
import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../Commons/DeviceWHPersentage';

import CdDumpImage from '../Assets/Image/img_dump_cd.png';
import HeartIcon from '../Assets/Image/icon_musicplayer_heart_green.png';
import FireIcon from '../Assets/Image/icon_musicplayer_fire_green.png';
import MicIcon from '../Assets/Image/icon_musicplayer_mic_green.png';

import MusicPlayBarComponent from '../Components/MusicPlayBarComponent';

import APIKit from '../API/APIkit';
import {UserDispatch} from '../Commons/UserDispatchProvider';
import Gbutton from './GbuttonComponent';

function MusicPlayerFull(props) {
  const {userId, dispatch} = useContext(UserDispatch);
  const [replyList, setReplyList] = useState();
  const [replyUpdateCheck, setReplyUpdateCheck] = useState(false); //댓글 업데이트 체크
  const [comment, setComment] = useState('');

  const scrollEnd = useRef(); //scrollview

  useEffect(() => {
    const payload = {challengeId: props.id};

    const onSuccess = response => {
      console.log(response);
      setReplyList(response.data.IBparams.rows);
      setReplyUpdateCheck(false);
    };

    const onFailure = error => {
      console.log(error && error.response);
    };

    const getReply = async () => {
      await APIKit.post('/challenge/getSongReply', payload)
        .then(onSuccess)
        .catch(onFailure);
    };
    if (props.id) {
      getReply();
    }
    return () => {
      console.log('api unmount');
    };
  }, [props.id, replyUpdateCheck]);
  // server api수정 되면 다시 수정 필요
  // const addCheeringCount = () => {
  //   APIKit.post('/challenge/addCheeringCount', 1)
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };
  // const addLikesCount = () => {
  //   APIKit.post('/challenge/addLikesCount', 1)
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };
  // const addGetTogetherCount = () => {
  //   APIKit.post('/challenge/addGetTogetherCount', 1)
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  //댓글 입력
  const submitComment = async () => {
    const payload = {userId: userId, reply: comment, challengeId: props.id};
    console.log(payload);
    await APIKit.post('/challenge/AddSongReply', payload)
      .then(response => {
        console.log(response);
        setReplyUpdateCheck(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleScrollEnd = () => {
    scrollEnd.current.scrollToEnd({animated: false});
  };

  return (
    <BlurView
      style={{
        height: '100%',
        width: '100%',
        borderRadius: 16,
      }}
      blurType="light"
      blurAmount={10}
      reducedTransparencyFallbackColor="white">
      <Box flex={1} backgroundColor={'#fafafacc'} borderRadius={16}>
        <VStack alignItems={'center'} space={2}>
          <Box
            style={{
              width: responsiveWidth(widthPersentage(228)),
              height: responsiveHeight(heightPersentage(228)),
              marginTop: responsiveHeight(heightPersentage(34)),
              marginBottom: responsiveHeight(heightPersentage(14)),
            }}>
            <Image
              source={CdDumpImage}
              resizeMode={'contain'}
              style={{width: '100%', height: '100%'}}
              alt={' '}
            />
          </Box>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(28))}
            bold
            color={'#1a1b1c'}
            noOfLines={1}>
            {props.title ? props.title : '제 목'}
          </Text>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(20))}
            bold
            color={'#858c92'}>
            {props.owner ? props.owner : '소유자'}
          </Text>
        </VStack>
        {/* 슬라이더 */}
        <Center>
          <Box
            style={{
              width: responsiveWidth(widthPersentage(320)),
              height: responsiveHeight(heightPersentage(80)),
            }}
            mb={1}>
            <MusicPlayBarComponent />
          </Box>
        </Center>
        {/* 슬라이더 */}
        <HStack justifyContent={'center'} space={10} mb={4}>
          <VStack>
            <Pressable
              style={{
                width: responsiveWidth(widthPersentage(60)),
                height: responsiveHeight(heightPersentage(80)),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#a5a8ae'}>
                {props.cheering}
              </Text>
              <Image
                source={FireIcon}
                alt={' '}
                style={{
                  width: responsiveWidth(widthPersentage(38)),
                  height: responsiveHeight(heightPersentage(38)),
                }}
                resizeMode={'contain'}
              />
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#0fefbd'}>
                응원해요
              </Text>
            </Pressable>
          </VStack>
          <VStack>
            <Pressable
              style={{
                width: responsiveWidth(widthPersentage(60)),
                height: responsiveHeight(heightPersentage(80)),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#a5a8ae'}>
                {props.likes}
              </Text>
              <Image
                source={HeartIcon}
                style={{
                  width: responsiveWidth(widthPersentage(38)),
                  height: responsiveHeight(heightPersentage(38)),
                }}
                alt={' '}
                resizeMode={'contain'}
              />
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#0fefbd'}>
                찜
              </Text>
            </Pressable>
          </VStack>
          <VStack>
            <Pressable
              style={{
                width: responsiveWidth(widthPersentage(60)),
                height: responsiveHeight(heightPersentage(80)),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#a5a8ae'}>
                {props.together}
              </Text>
              <Image
                source={MicIcon}
                style={{
                  width: responsiveWidth(widthPersentage(38)),
                  height: responsiveHeight(heightPersentage(38)),
                }}
                alt={' '}
                resizeMode={'contain'}
              />
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#0fefbd'}>
                함께해요
              </Text>
            </Pressable>
          </VStack>
        </HStack>
        {/* 댓글 start */}
        <Center>
          <Box
            style={{
              width: responsiveWidth(widthPersentage(320)),
              height: responsiveHeight(heightPersentage(90)),
            }}>
            <ScrollView
              ref={scrollEnd}
              showsVerticalScrollIndicator={false}
              onTouchStart={() => props.onScroll(false)}
              onTouchEnd={() => props.onScroll(true)}
              onTouchCancel={() => props.onScroll(false)}
              onContentSizeChange={handleScrollEnd}>
              {replyList &&
                replyList.map(rows => (
                  <HStack justifyContent={'space-around'} my={1} key={rows.id}>
                    <Text
                      width={responsiveScreenWidth(widthPersentage(90))}
                      fontSize={responsiveFontSize(fontSizePersentage(14))}
                      bold
                      color={'#1a1b1c'}
                      textAlign={'right'}
                      noOfLines={1}>
                      {rows.email}
                    </Text>
                    <Text
                      width={responsiveScreenWidth(widthPersentage(200))}
                      fontSize={responsiveFontSize(fontSizePersentage(14))}
                      fontWeight={500}>
                      {rows.reply}
                    </Text>
                  </HStack>
                ))}
            </ScrollView>
          </Box>
          <Input
            mt={4}
            borderWidth={1}
            borderColor={'#a5a8ae4c'}
            backgroundColor={'#fafafab3'}
            placeholder={'응원의 한 줄을 남겨주세요~'}
            onChangeText={text => setComment(text)}
            fontSize={responsiveFontSize(fontSizePersentage(16))}
            w={responsiveWidth(widthPersentage(320))}
            InputRightElement={
              <Box mr={3}>
                <Gbutton
                  wp={70}
                  hp={24}
                  fs={18}
                  fw={600}
                  rounded={4}
                  onPress={submitComment}
                  text={'등록'}
                />
              </Box>
            }
          />
        </Center>
        {/* 댓글 end */}
      </Box>
    </BlurView>
  );
}

export default MusicPlayerFull;
