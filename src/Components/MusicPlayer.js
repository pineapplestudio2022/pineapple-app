//음악플레이어 큰화면
import {BlurView} from '@react-native-community/blur';
import {
  Box,
  Center,
  HStack,
  Image,
  Input,
  ScrollView,
  Slider,
  Text,
  VStack,
} from 'native-base';
import {Platform, Pressable, TouchableOpacity} from 'react-native';
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

import PulseIcon from '../Assets/Image/icon_musicplayer_pulse.png';
import SkipBackIcon from '../Assets/Image/icon_musicplayer_skip_back.png';
import SkipForwordIcon from '../Assets/Image/icon_musicplayer_skip_forword.png';
import RewindLeftIcon from '../Assets/Image/icon_musicplayer_rewind_left.png';
import RewindRightIcon from '../Assets/Image/icon_musicplayer_rewind_right.png';
import PlayIcon from '../Assets/Image/icon_musicplayer_play_green.png';

import APIKit from '../API/APIkit';
import {UserDispatch} from '../Commons/UserDispatchProvider';
import Gbutton from './GbuttonComponent';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';

function MusicPlayer(props) {
  const {userId, dispatch} = useContext(UserDispatch);
  const [playerSize, setPlayerSize] = useState(true); //플레이어 사이즈 true: full, false: small

  const [replyList, setReplyList] = useState(); //댓글 리스트
  const [replyUpdateCheck, setReplyUpdateCheck] = useState(false); //댓글 업데이트 체크
  const [comment, setComment] = useState('');

  const [title, setTitle] = useState(''); //노래 제목
  const [participant, setParticipant] = useState(''); //소유자
  const [cheeringCount, setCheeringCount] = useState(0); //응원해요
  const [cheeringEnalbe, setCheeringEnable] = useState(false); //응원해요 버튼 활성화
  const [likesCount, setLikesCount] = useState(0); //찜
  const [likesEnable, setLikesEnable] = useState(false); //찜 버튼 활성화
  const [togetherCount, setTogetherCount] = useState(0); //함께해요
  const [togetherEnable, setTogetherEnalbe] = useState(false); //함께해요 버튼 활성화

  const scrollEnd = useRef(); //scrollview

  const [isAlreadyPlay, setIsAlreadyPlay] = useState(false); //재생 | 일시정지 상태
  const [duration, setDuration] = useState('00:00:00'); //트랙 길이
  const [timeElapsed, setTimeElapsed] = useState('00:00:00'); //트랙 경과 시간
  const [percent, setPercent] = useState(0); //트랙 경과시간에 따른 slider 표시

  const ARPlayer = useRef(AudioRecorderPlayer);

  useEffect(() => {
    const payload = {challengeId: props.id, userId: userId};

    const onFailure = error => {
      console.log(error && error.response);
    };

    const getReply = async () => {
      await APIKit.post('/challenge/getSongReply', payload)
        .then(response => {
          setReplyList(response.data.IBparams.rows);
          setReplyUpdateCheck(false);
        })
        .catch(onFailure);
    };

    const getChallenge = async () => {
      await APIKit.post('/challenge/getChallenge', payload)
        .then(response => {
          console.log(response);
          setTitle(response.data.IBparams.title);
          setParticipant(response.data.IBparams.participant);
          setCheeringCount(response.data.IBparams.cheering);
          setLikesCount(response.data.IBparams.likes);
          setTogetherCount(response.data.IBparams.getTogether);
          setCheeringEnable(response.data.IBparams.enableAddCheeringCount);
          setLikesEnable(response.data.IBparams.enableAddLikesCount);
          setTogetherEnalbe(response.data.IBparams.enableAddGetTogetherCount);
        })
        .catch(onFailure);
    };
    if (props.id) {
      getReply();
      getChallenge();
    }

    //플레이어 초기화
    ARPlayer.current = new AudioRecorderPlayer();
    ARPlayer.current.setSubscriptionDuration(0.1);

    return () => {
      console.log('api unmount');
      //재생, 녹음중 다른화면으로 나갈시 해제
      ARPlayer.current.stopPlayer();
      ARPlayer.current.removePlayBackListener();
      ARPlayer.current.stopRecorder();
      ARPlayer.current.removeRecordBackListener();
    };
  }, [props.id, replyUpdateCheck, userId]);

  //응원,찜,함께해요 handler
  const handleCount = async name => {
    if (userId === '') {
      alert('로그인 후 사용가능합니다.');
      return;
    }
    const payload = {
      challengeId: props.id,
      userId: userId,
      likeTypeString: name,
    };
    await APIKit.post('/challenge/addLikeCount', payload).catch(error => {
      console.log(error);
    });
  };

  const dirs = RNFetchBlob.fs.dirs.DocumentDir;
  const fileName = props.fileName;
  const filePath = dirs + '/' + fileName;
  const path = Platform.select({
    ios: 'file://' + filePath,
    android: 'file://' + filePath,
  });

  const onStartPlay = async () => {
    try {
      // const msg = await ARPlayer.current.startPlayer(path + fileName);
      RNFetchBlob.fs
        .exists(filePath)
        .then(exist => {
          console.log(`file ${exist ? '' : 'not'} exists`);
          return;
        })
        .catch(() => {
          console.log('error');
        });
      const msg = await ARPlayer.current.startPlayer(path);
      // const msg = await ARPlayer.current.startPlayer(assetPath);
      console.log(msg);
      const volume = await ARPlayer.current.setVolume(1.0);
      console.log(`file: ${msg}`, `volume: ${volume}`);
      setIsAlreadyPlay(true);
      ARPlayer.current.addPlayBackListener(e => {
        let percent = Math.round(
          (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100,
        );
        setTimeElapsed(ARPlayer.current.mmssss(e.currentPosition));
        setPercent(percent);
        setDuration(ARPlayer.current.mmssss(e.duration));
        return;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onStopPlay = async e => {
    setTimeElapsed('00:00:00');
    setDuration('00:00:00');
    setPercent(0);
    ARPlayer.current.stopPlayer();
    ARPlayer.current.removePlayBackListener();
    setIsAlreadyPlay(false);
  };

  //댓글 입력
  const submitComment = async () => {
    if (userId === '') {
      alert('로그인 후 사용 가능합니다.');
      return;
    }
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

  //댓글 창 스크롤 밑으로 이동
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
      {props.playerSize ? (
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
              {title && title}
            </Text>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(20))}
              bold
              color={'#858c92'}>
              {participant}
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
              <Box>
                <Slider defaultValue={0} value={percent}>
                  <Slider.Track bg={'#a5a8ae'}>
                    <Slider.FilledTrack bg={'#0fefbd'} />
                  </Slider.Track>
                </Slider>
                <Box>
                  <HStack justifyContent={'space-between'}>
                    <Text
                      fontSize={responsiveFontSize(fontSizePersentage(12))}
                      fontWeight={500}
                      color={'#0fefbd'}>
                      {timeElapsed}
                    </Text>
                    <Text
                      fontSize={responsiveFontSize(fontSizePersentage(12))}
                      fontWeight={500}
                      color={'#0fefbd'}>
                      {duration}
                    </Text>
                  </HStack>
                </Box>
                <HStack justifyContent={'space-around'} alignItems={'center'}>
                  <Pressable
                    style={{
                      width: responsiveWidth(widthPersentage(36)),
                      height: responsiveHeight(heightPersentage(36)),
                    }}>
                    <Image
                      source={SkipBackIcon}
                      resizeMode={'contain'}
                      style={{width: '100%', height: '100%'}}
                      alt={' '}
                    />
                  </Pressable>
                  <Pressable
                    style={{
                      width: responsiveWidth(widthPersentage(36)),
                      height: responsiveHeight(heightPersentage(36)),
                    }}>
                    <Image
                      source={RewindLeftIcon}
                      resizeMode={'contain'}
                      style={{width: '100%', height: '100%'}}
                      alt={' '}
                    />
                  </Pressable>
                  <Pressable
                    style={{
                      width: responsiveWidth(widthPersentage(48)),
                      height: responsiveHeight(heightPersentage(48)),
                    }}
                    onPress={onStartPlay}>
                    <Image
                      source={PlayIcon}
                      resizeMode={'contain'}
                      alt={' '}
                      w={'100%'}
                      h={'100%'}
                    />
                  </Pressable>
                  <Pressable
                    style={{
                      width: responsiveWidth(widthPersentage(48)),
                      height: responsiveHeight(heightPersentage(48)),
                    }}
                    onPress={onStopPlay}>
                    <Image
                      source={PulseIcon}
                      resizeMode={'contain'}
                      alt={' '}
                      w={'100%'}
                      h={'100%'}
                    />
                  </Pressable>
                  <Pressable
                    style={{
                      width: responsiveWidth(widthPersentage(36)),
                      height: responsiveHeight(heightPersentage(36)),
                    }}>
                    <Image
                      source={RewindRightIcon}
                      resizeMode={'contain'}
                      alt={' '}
                      style={{width: '100%', height: '100%'}}
                    />
                  </Pressable>
                  <Pressable
                    style={{
                      width: responsiveWidth(widthPersentage(36)),
                      height: responsiveHeight(heightPersentage(36)),
                    }}>
                    <Image
                      source={SkipForwordIcon}
                      resizeMode={'contain'}
                      alt={' '}
                      style={{width: '100%', height: '100%'}}
                    />
                  </Pressable>
                </HStack>
              </Box>
            </Box>
          </Center>
          {/* 슬라이더 */}
          <HStack justifyContent={'center'} space={10} mb={4}>
            <VStack>
              <TouchableOpacity
                onPress={handleCount}
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
                  {cheeringCount}
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
              </TouchableOpacity>
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
                  {likesCount}
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
                  {togetherCount}
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
                    <HStack
                      justifyContent={'space-around'}
                      my={1}
                      key={rows.id}>
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
      ) : (
        //small player start
        <Box
          style={{
            width: responsiveWidth(widthPersentage(390)),
            height: responsiveHeight(heightPersentage(157)),
          }}
          backgroundColor={'#fafafacc'}
          borderRadius={16}>
          <VStack
            style={{
              width: responsiveWidth(widthPersentage(163)),
              marginTop: 32,
              marginLeft: 39,
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(fontSizePersentage(14)),
                color: '#1a1b1c',
                textAlign: 'right',
              }}
              noOfLines={1}
              bold>
              {title}
            </Text>
            <Text
              noOfLines={1}
              style={{
                fontSize: responsiveFontSize(fontSizePersentage(12)),
                color: '#858c92',
                textAlign: 'right',
              }}>
              {participant}
            </Text>
            <HStack
              justifyContent={'space-between'}
              my={4}
              alignItems={'center'}>
              <Pressable
                style={{
                  width: responsiveWidth(widthPersentage(36)),
                  height: responsiveHeight(heightPersentage(36)),
                }}>
                <Image
                  source={SkipBackIcon}
                  resizeMode={'contain'}
                  style={{width: '100%', height: '100%'}}
                  alt={' '}
                />
              </Pressable>
              <Pressable
                onPress={isAlreadyPlay ? onStopPlay : onStartPlay}
                style={{
                  width: responsiveWidth(widthPersentage(38)),
                  height: responsiveHeight(heightPersentage(38)),
                }}>
                <Image
                  source={isAlreadyPlay ? PulseIcon : PlayIcon}
                  resizeMode={'contain'}
                  style={{width: '100%', height: '100%'}}
                  alt={' '}
                />
              </Pressable>
              <Pressable
                style={{
                  width: responsiveWidth(widthPersentage(36)),
                  height: responsiveHeight(heightPersentage(36)),
                }}>
                <Image
                  source={SkipForwordIcon}
                  resizeMode={'contain'}
                  style={{width: '100%', height: '100%'}}
                  alt={' '}
                />
              </Pressable>
            </HStack>
          </VStack>
          {/* CD Image start */}
          <Box
            style={{
              position: 'absolute',
              top: 26,
              right: 41,
              width: responsiveWidth(widthPersentage(107)),
              height: responsiveHeight(heightPersentage(107)),
            }}>
            <Image
              source={CdDumpImage}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode={'contain'}
              alt={' '}
            />
          </Box>
          {/* CD Image end */}
        </Box>
        //small player end
      )}
    </BlurView>
  );
}

export default MusicPlayer;
