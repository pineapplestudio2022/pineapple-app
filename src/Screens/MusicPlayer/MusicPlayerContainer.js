//음악플레이어
import {Platform} from 'react-native';
import React, {useState, useContext, useEffect, useRef} from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import APIKit from '../../API/APIkit';
import {defaultAlertMessage} from '../../Commons/CommonUtil';
import {UserDispatch} from '../../Commons/UserDispatchProvider';
import MusicPlayerPresenter from './MusicPlayerPresenter';

const MusicPlayerContainer = props => {
  const {userId} = useContext(UserDispatch);
  const scrollEnd = useRef(); //scrollview

  const [replyList, setReplyList] = useState([]); //댓글 리스트
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
  const [playTime, setPlayTime] = useState('00:00'); //트랙 재생 시간(시간)
  const [duration, setDuration] = useState('00:00'); //트랙 길이(시간)

  const [percent, setPercent] = useState(0); //트랙 경과시간에 따른 slider 표시

  const ARPlayer = useRef(AudioRecorderPlayer);

  useEffect(() => {
    //플레이어 초기화
    ARPlayer.current = new AudioRecorderPlayer();
    ARPlayer.current.setSubscriptionDuration(1);
    return () => {};
  }, []);

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

    return () => {
      if (__DEV__) {
        console.log('api unmount');
      }
      onStopPlay();
      setReplyList([]);
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
  const authMessage = () => {
    if (userId === '') {
      defaultAlertMessage('로그인 후 사용가능합니다.');
      return;
    }
    if (!cheeringEnalbe || !likesEnable || !togetherEnable) {
      defaultAlertMessage('1번만 추천가능합니다');
      return;
    }
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
    setPlayTime('00:00');
    setDuration('00:00');
    setPercent(0);
    setIsPlay(false);
    setIsPause(false);
  };

  const onStartPlay = async () => {
    try {
      if (musicUrl === '' || musicUrl === null || musicUrl === undefined) {
        return;
      }
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
          setPlayTime(ARPlayer.current.mmss(cu));
          setDuration(ARPlayer.current.mmss(du));
        }
        return;
      });
      setIsPlay(true);
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      }
      setIsPlay(false);
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
    if (comment === '') {
      defaultAlertMessage('댓글을 입력해주세요.');
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
        setComment('');
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
    <MusicPlayerPresenter
      {...props}
      title={title}
      participant={participant}
      onPausePlay={onPausePlay}
      changeTime={changeTime}
      playTime={playTime}
      duration={duration}
      rewindLeft={rewindLeft}
      isPlay={isPlay}
      isPause={isPause}
      onResumePlay={onResumePlay}
      onStartPlay={onStartPlay}
      rewindRight={rewindRight}
      cheeringEnalbe={cheeringEnalbe}
      handleCount={handleCount}
      cheeringCount={cheeringCount}
      likesEnable={likesEnable}
      likesCount={likesCount}
      togetherEnable={togetherEnable}
      togetherCount={togetherCount}
      scrollEnd={scrollEnd}
      handleScrollEnd={handleScrollEnd}
      replyList={replyList}
      setComment={setComment}
      comment={comment}
      submitComment={submitComment}
      percent={percent}
      authMessage={authMessage}
    />
  );
};

export default MusicPlayerContainer;
