//음악플레이어
import {Box, HStack, Image, Input, ScrollView, Text, VStack} from 'native-base';
import {Platform, Pressable, TouchableOpacity} from 'react-native';
import React, {useState, useContext, useEffect, useRef} from 'react';
import Slider from '@react-native-community/slider';
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
import {defaultAlertMessage} from '../Commons/CommonUtil';

function MusicPlayer(props) {
  const {userId} = useContext(UserDispatch);
  const scrollEnd = useRef(); //scrollview

  const [replyList, setReplyList] = useState(); //댓글 리스트
  const [replyUpdateCheck, setReplyUpdateCheck] = useState(false); //댓글 업데이트 체크
  const [comment, setComment] = useState(''); //댓글 입력

  const [title, setTitle] = useState(''); //노래 제목
  const [participant, setParticipant] = useState(''); //소유자
  const [cheeringCount, setCheeringCount] = useState(0); //응원해요
  const [musicUrl, setMusicUrl] = useState(); //음악 주소
  const [cheeringEnalbe, setCheeringEnable] = useState(false); //응원해요 버튼 활성화
  const [likesCount, setLikesCount] = useState(0); //찜
  const [likesEnable, setLikesEnable] = useState(false); //찜 버튼 활성화
  const [togetherCount, setTogetherCount] = useState(0); //함께해요
  const [togetherEnable, setTogetherEnalbe] = useState(false); //함께해요 버튼 활성화

  const [isPlay, setIsPlay] = useState(false); //재생 여부
  const [isPause, setIsPause] = useState(false); //일시정지 여부
  const [currentPositionSec, setCurrentPositionSec] = useState('0'); //트랙 재생 시간
  const [currentDurationSec, setCurrentDurationSec] = useState('0'); //트랙 길이

  const [percent, setPercent] = useState(0); //트랙 경과시간에 따른 slider 표시

  const ARPlayer = useRef(AudioRecorderPlayer);

  useEffect(() => {
    const onFailure = error => {
      if (__DEV__) {
        console.log(error && error.response);
      }
    };

    const getReply = async () => {
      const payload = {
        challengeId: props.id.toString(),
        userId: userId.toString(),
      };
      await APIKit.post('/challenge/getChallengeReply', payload)
        .then(({data}) => {
          if (data.IBcode === '1000') {
            setReplyList(data.IBparams.rows);
            setReplyUpdateCheck(false);
          }
        })
        .catch(onFailure);
    };

    const getChallenge = async () => {
      const payload = {
        userId: userId.toString(),
        challengeId: props.id.toString(),
      };

      if (userId === '' || userId === undefined) {
        delete payload.userId;
      }

      await APIKit.post('/challenge/getChallenge', payload)
        .then(({data}) => {
          if (data.IBcode === '1000') {
            setTitle(data.IBparams.title);
            setParticipant(data.IBparams.participant);
            setCheeringCount(data.IBparams.cheering);
            setLikesCount(data.IBparams.likes);
            setTogetherCount(data.IBparams.getTogether);
            setCheeringEnable(data.IBparams.enableAddCheeringCount);
            setLikesEnable(data.IBparams.enableAddLikesCount);
            setTogetherEnalbe(data.IBparams.enableAddGetTogetherCount);
            getS3SignedUrl(data.IBparams.musicKey);
          }
        })
        .catch(onFailure);
    };

    const getS3SignedUrl = async musicKey => {
      if (musicKey === '' || musicKey === undefined) {
        return;
      }
      await APIKit.post('aws/getS3SignedUrl', {musicKey: musicKey}).then(
        ({data}) => {
          setMusicUrl(data);
        },
      );
    };
    if (props.id !== '' && props.id !== undefined) {
      getReply();
      getChallenge();
    }

    //플레이어 초기화
    ARPlayer.current = new AudioRecorderPlayer();
    ARPlayer.current.setSubscriptionDuration(1);

    return () => {
      if (__DEV__) {
        console.log('api unmount');
      }
      onStopPlay();
    };
  }, [props.id, replyUpdateCheck, userId]);

  //응원,찜,함께해요 handler
  const handleCount = async name => {
    if (userId === '') {
      defaultAlertMessage('로그인 후 사용가능합니다.');
      return;
    }
    const payload = {
      challengeId: props.id.toString(),
      userId: userId.toString(),
      likeTypeString: name.toString(),
    };

    await APIKit.post('/challenge/addLikeCount', payload)
      .then(({data}) => {
        if (data.IBcode === '1000') {
          getLikeCount();
        }
      })
      .catch(error => {
        if (__DEV__) {
          console.log(error);
        }
      });
  };

  //응원,찜,함께해요 업데이트
  const getLikeCount = async () => {
    const payload = {
      userId: userId.toString(),
      challengeId: props.id.toString(),
    };
    if (__DEV__) {
      console.log(payload);
    }
    await APIKit.post('/challenge/getChallenge', payload)
      .then(({data}) => {
        if (__DEV__) {
          console.log(data);
        }
        if (data.IBcode === '1000') {
          setCheeringCount(data.IBparams.cheering);
          setLikesCount(data.IBparams.likes);
          setTogetherCount(data.IBparams.getTogether);

          setCheeringEnable(data.IBparams.enableAddCheeringCount);
          setLikesEnable(data.IBparams.enableAddLikesCount);
          setTogetherEnalbe(data.IBparams.enableAddGetTogetherCount);
        }
      })
      .catch(error => {
        if (__DEV__) {
          console.log(error);
        }
      });
  };

  const onStopPlay = async () => {
    ARPlayer.current.stopPlayer();
    ARPlayer.current.removePlayBackListener();
    setCurrentPositionSec('0');
    setCurrentDurationSec('0');
    setPercent(0);
    setIsPlay(false);
    setIsPause(false);
  };

  const onStartPlay = async () => {
    try {
      if (musicUrl === '' || musicUrl === null || musicUrl === undefined) {
        return;
      }
      setIsPlay(true);
      const msg = await ARPlayer.current.startPlayer(musicUrl);
      const volume = await ARPlayer.current.setVolume(1.0);
      if (__DEV__) {
        console.log(`file: ${msg}`, `volume: ${volume}`);
      }
      ARPlayer.current.addPlayBackListener(e => {
        if (e.currentPosition === e.duration) {
          onStopPlay();
        }
        let du = Math.floor(e.duration / 1000);
        let cu = Math.floor(e.currentPosition / 1000);
        let per = Math.round(
          (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100,
        );
        if (du > 0 && cu > 0 && per > 0) {
          setCurrentDurationSec(du);
          setCurrentPositionSec(cu);
          setPercent(per);
        }
        return;
      });
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      }
    }
  };

  //일시정지
  const onPausePlay = async () => {
    await ARPlayer.current.pausePlayer();
    setIsPause(true);
  };

  //다시시작
  const onResumePlay = async () => {
    await ARPlayer.current.resumePlayer();
    setIsPause(false);
  };

  //앞으로(10초)
  const rewindRight = async () => {
    if (!isPlay) {
      return;
    }
    if (Platform.OS === 'ios') {
      const currentPosition = currentPositionSec * 1000;
      const addSecs = currentPosition + 10000;
      await ARPlayer.current.seekToPlayer(addSecs);
    }
    if (Platform.OS === 'android') {
      const addSecs = currentPositionSec + 10;
      await ARPlayer.current.seekToPlayer(addSecs);
    }
  };

  //뒤로(10초)
  const rewindLeft = async () => {
    if (!isPlay) {
      return;
    }
    if (Platform.OS === 'ios') {
      const currentPosition = currentPositionSec * 1000;
      const addSecs = currentPosition - 10000;
      await ARPlayer.current.seekToPlayer(addSecs);
    }
    if (Platform.OS === 'android') {
      const addSecs = currentPositionSec - 10;
      await ARPlayer.current.seekToPlayer(addSecs);
    }
  };

  //slider bar 직접 컨트롤
  const changeTime = async value => {
    if (!isPlay) {
      return;
    }

    if (Platform.OS === 'ios') {
      const currentDuration = currentDurationSec * 1000;
      let seekTime = value * currentDuration * 0.01;
      await ARPlayer.current.seekToPlayer(seekTime);
    }

    if (Platform.OS === 'android') {
      let seekTime = value * currentDurationSec * 0.01;
      await ARPlayer.current.seekToPlayer(seekTime);
    }
    onResumePlay();
  };

  //댓글 입력
  const submitComment = async () => {
    if (userId === '') {
      defaultAlertMessage('로그인 후 사용 가능합니다.');
      return;
    }
    const payload = {
      userId: userId.toString(),
      reply: comment.toString(),
      challengeId: props.id.toString(),
    };
    await APIKit.post('/challenge/AddChallengeReply', payload)
      .then(response => {
        if (__DEV__) {
          console.log(response);
        }
        setReplyUpdateCheck(true);
      })
      .catch(error => {
        if (__DEV__) {
          console.log(error);
        }
      });
  };

  //댓글 창 스크롤 밑으로 이동
  const handleScrollEnd = () => {
    scrollEnd.current.scrollToEnd({animated: false});
  };
  return (
    <Box
      style={{
        height: responsiveHeight(heightPersentage(740)),
        width: '100%',
        borderRadius: 16,
        backgroundColor: '#fafafa',
      }}>
      {props.playerSize ? (
        <VStack
          safeAreaBottom
          flex={1}
          alignItems={'center'}
          borderRadius={16}
          justifyContent={'space-around'}>
          <Box alignItems={'center'}>
            <Box
              style={{
                width: responsiveWidth(widthPersentage(200)),
                height: responsiveHeight(heightPersentage(200)),
                marginTop: responsiveHeight(heightPersentage(20)),
                marginBottom: responsiveHeight(heightPersentage(10)),
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
            <Box
              style={{
                width: responsiveWidth(widthPersentage(320)),
              }}>
              <Slider
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={percent}
                thumbTintColor="#0fefbd"
                minimumTrackTintColor="#0fefbd"
                maximumTrackTintColor="#a5a8ae"
                onSlidingStart={onPausePlay}
                onSlidingComplete={value => changeTime(value)}
                onTouchStart={() => props.onScroll(false)}
                onTouchEnd={() => props.onScroll(true)}
                onTouchCancel={() => props.onScroll(false)}
              />
              <Box>
                <HStack justifyContent={'space-between'}>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(12))}
                    fontWeight={500}
                    color={'#0fefbd'}>
                    {ARPlayer.current.mmss(currentPositionSec)}
                  </Text>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(12))}
                    fontWeight={500}
                    color={'#0fefbd'}>
                    {ARPlayer.current.mmss(currentDurationSec)}
                  </Text>
                </HStack>
              </Box>
              <HStack
                justifyContent={'space-around'}
                alignItems={'center'}
                onTouchStart={() => props.onScroll(false)}
                onTouchEnd={() => props.onScroll(true)}
                onTouchCancel={() => props.onScroll(false)}>
                <TouchableOpacity
                  onPress={
                    props.onPreviousMusic
                      ? () => props.onPreviousMusic()
                      : () => {}
                  }
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
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: responsiveWidth(widthPersentage(36)),
                    height: responsiveHeight(heightPersentage(36)),
                  }}
                  onPress={rewindLeft}>
                  <Image
                    source={RewindLeftIcon}
                    resizeMode={'contain'}
                    style={{width: '100%', height: '100%'}}
                    alt={' '}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: responsiveWidth(widthPersentage(48)),
                    height: responsiveHeight(heightPersentage(48)),
                  }}
                  onPress={
                    isPlay
                      ? isPause
                        ? onResumePlay
                        : onPausePlay
                      : onStartPlay
                  }>
                  <Image
                    source={
                      isPlay ? (isPause ? PlayIcon : PulseIcon) : PlayIcon
                    }
                    resizeMode={'contain'}
                    alt={' '}
                    w={'100%'}
                    h={'100%'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: responsiveWidth(widthPersentage(36)),
                    height: responsiveHeight(heightPersentage(36)),
                  }}
                  onPress={rewindRight}>
                  <Image
                    source={RewindRightIcon}
                    resizeMode={'contain'}
                    alt={' '}
                    style={{width: '100%', height: '100%'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={
                    props.onNextMusic ? () => props.onNextMusic() : () => {}
                  }
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
                </TouchableOpacity>
              </HStack>
            </Box>
            <HStack
              justifyContent={'center'}
              space={10}
              onTouchStart={() => props.onScroll(false)}
              onTouchEnd={() => props.onScroll(true)}
              onTouchCancel={() => props.onScroll(false)}>
              <VStack>
                <TouchableOpacity
                  onPress={
                    cheeringEnalbe ? () => handleCount('cheering') : () => {}
                  }
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
                    color={cheeringEnalbe ? '#0fefbd' : '#a1b1c1'}>
                    응원해요
                  </Text>
                </TouchableOpacity>
              </VStack>
              <VStack>
                <TouchableOpacity
                  onPress={likesEnable ? () => handleCount('likes') : () => {}}
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
                    color={likesEnable ? '#0fefbd' : '#a1b1c1'}>
                    찜
                  </Text>
                </TouchableOpacity>
              </VStack>
              <VStack>
                <TouchableOpacity
                  onPress={
                    togetherEnable ? () => handleCount('getTogether') : () => {}
                  }
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
                    color={togetherEnable ? '#0fefbd' : '#a1b1c1'}>
                    함께해요
                  </Text>
                </TouchableOpacity>
              </VStack>
            </HStack>
          </Box>
          {/* 댓글 start */}
          <Box>
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
                <Box
                  mr={3}
                  onTouchStart={() => props.onScroll(false)}
                  onTouchEnd={() => props.onScroll(true)}
                  onTouchCancel={() => props.onScroll(false)}>
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
          </Box>
          {/* 댓글 end */}
        </VStack>
      ) : (
        //small player start
        <Box
          style={{
            width: responsiveWidth(widthPersentage(390)),
            height: responsiveHeight(heightPersentage(157)),
          }}
          backgroundColor={'#fafafa'}
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
              alignItems={'center'}
              onTouchStart={() => props.onScroll(false)}
              onTouchEnd={() => props.onScroll(true)}
              onTouchCancel={() => props.onScroll(false)}>
              <TouchableOpacity
                onPress={
                  props.onPreviousMusic
                    ? () => props.onPreviousMusic()
                    : () => {}
                }
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
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: responsiveWidth(widthPersentage(48)),
                  height: responsiveHeight(heightPersentage(48)),
                }}
                onPress={
                  isPlay ? (isPause ? onResumePlay : onPausePlay) : onStartPlay
                }>
                <Image
                  source={isPlay ? (isPause ? PlayIcon : PulseIcon) : PlayIcon}
                  resizeMode={'contain'}
                  alt={' '}
                  w={'100%'}
                  h={'100%'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  props.onNextMusic ? () => props.onNextMusic() : () => {}
                }
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
              </TouchableOpacity>
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
    </Box>
  );
}

export default MusicPlayer;
