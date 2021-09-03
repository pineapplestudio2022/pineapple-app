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
import {Pressable, TouchableOpacity} from 'react-native';
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

function MusicPlayer(props) {
  const {userId, dispatch} = useContext(UserDispatch);
  const scrollEnd = useRef(); //scrollview

  const [replyList, setReplyList] = useState(); //댓글 리스트
  const [replyUpdateCheck, setReplyUpdateCheck] = useState(false); //댓글 업데이트 체크
  const [comment, setComment] = useState('');

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
  const [playTime, setPlayTime] = useState('00:00:00'); //트랙 재생 시간(시간)
  const [duration, setDuration] = useState('00:00:00'); //트랙 길이(시간)

  const [percent, setPercent] = useState(0); //트랙 경과시간에 따른 slider 표시

  const ARPlayer = useRef(AudioRecorderPlayer);

  useEffect(() => {
    const onFailure = error => {
      console.log(error && error.response);
    };

    const getReply = async () => {
      const payload = {
        challengeId: props.id.toString(),
        userId: userId.toString(),
      };
      await APIKit.post('/challenge/getChallengeReply', payload)
        .then(({data}) => {
          console.log(data);
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
          console.log(data);
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

    getReply();
    getChallenge();

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
      setCurrentPositionSec('0');
      setCurrentDurationSec('0');
      setDuration('00:00:00');
      setPlayTime('00:00:00');
      setPercent(0);
      setIsPlay(false);
      setIsPause(false);
    };
  }, [props.id, replyUpdateCheck, userId]);

  //응원,찜,함께해요 handler
  const handleCount = async name => {
    if (userId === '') {
      alert('로그인 후 사용가능합니다.');
      return;
    }
    const payload = {
      challengeId: props.id.toString(),
      userId: userId.toString(),
      likeTypeString: name.toString(),
    };
    await APIKit.post('/challenge/addLikeCount', payload).catch(error => {
      console.log(error);
    });
  };

  const onStartPlay = async () => {
    try {
      // const msg = await ARPlayer.current.startPlayer(
      //   'https://pineappleresources.s3.ap-northeast-2.amazonaws.com/works/music/music4.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAX4TL5GZU76DSEP7D%2F20210901%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20210901T073823Z&X-Amz-Expires=3600&X-Amz-Signature=df73a6940e7c3185d61c145b318bb491c8ce9b110dd65c3b116831ab1684e2cb&X-Amz-SignedHeaders=host&x-id=GetObject',
      // );
      const msg = await ARPlayer.current.startPlayer(musicUrl);
      const volume = await ARPlayer.current.setVolume(1.0);
      console.log(`file: ${msg}`, `volume: ${volume}`);
      setIsPlay(true);
      ARPlayer.current.addPlayBackListener(e => {
        if (e.currentPosition === e.duration) {
          console.log('끝');
        }
        let per = Math.round(
          (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100,
        );
        setCurrentDurationSec(e.duration);
        setCurrentPositionSec(e.currentPosition);
        setPlayTime(ARPlayer.current.mmssss(e.currentPosition));
        setDuration(ARPlayer.current.mmssss(e.duration));
        setPercent(per);
        return;
      });
    } catch (error) {
      console.log(error);
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
    const currentPosition = Math.round(currentPositionSec);
    const addSecs = Math.round(currentPosition + 10000);
    await ARPlayer.current.seekToPlayer(addSecs);
  };

  //뒤로(10초)
  const rewindLeft = async () => {
    const currentPosition = Math.round(currentPositionSec);
    const addSecs = Math.round(currentPosition - 10000);
    await ARPlayer.current.seekToPlayer(addSecs);
  };

  //slider bar 직접 컨트롤
  const changeTime = async value => {
    const currentDuration = Math.round(currentDurationSec);
    let seekTime = value * currentDuration * 0.01;
    await ARPlayer.current.seekToPlayer(seekTime);
  };

  // const onStopPlay = async e => {
  //   setCurrentPositionSec('0');
  //   setCurrentDurationSec('0');
  //   setDuration('00:00:00');
  //   setPlayTime('00:00:00');
  //   setPercent(0);
  //   setIsPlay(false);
  //   setIsPause(false);
  //   ARPlayer.current.stopPlayer();
  //   ARPlayer.current.removePlayBackListener();
  // };

  //댓글 입력
  const submitComment = async () => {
    if (userId === '') {
      alert('로그인 후 사용 가능합니다.');
      return;
    }
    const payload = {
      userId: userId.toString(),
      reply: comment.toString(),
      challengeId: props.id.toString(),
    };
    console.log(payload);
    await APIKit.post('/challenge/AddChallengeReply', payload)
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
          <Center>
            <Box
              style={{
                width: responsiveWidth(widthPersentage(320)),
                height: responsiveHeight(heightPersentage(80)),
              }}
              mb={1}>
              <Box>
                <Slider
                  defaultValue={0}
                  value={percent}
                  onChange={value => {
                    changeTime(value);
                  }}
                  onTouchStart={() => props.onScroll(false)}
                  onTouchEnd={() => props.onScroll(true)}
                  onTouchCancel={() => props.onScroll(false)}>
                  <Slider.Track bg={'#a5a8ae'}>
                    <Slider.FilledTrack bg={'#0fefbd'} />
                  </Slider.Track>
                  <Slider.Thumb bg={'#0fefbd'} />
                </Slider>
                <Box>
                  <HStack justifyContent={'space-between'}>
                    <Text
                      fontSize={responsiveFontSize(fontSizePersentage(12))}
                      fontWeight={500}
                      color={'#0fefbd'}>
                      {playTime}
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
            </Box>
          </Center>
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
