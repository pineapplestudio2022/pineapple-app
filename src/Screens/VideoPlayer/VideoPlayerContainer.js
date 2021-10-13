//VideoPlayer
import React, {useState, useContext, useEffect, useRef} from 'react';

import {defaultAlertMessage} from '../../Commons/CommonUtil';

import APIKit from '../../API/APIkit';
import {UserDispatch} from '../../Commons/UserDispatchProvider';

import VideoPlayerPresenter from './VideoPlayerPresenter';

const VideoPlayerContainer = props => {
  const {userId, dispatch} = useContext(UserDispatch);

  const [replyList, setReplyList] = useState([]); //댓글 리스트
  const [replyUpdateCheck, setReplyUpdateCheck] = useState(false); //댓글 업데이트 체크
  const [comment, setComment] = useState(''); //댓글 입력

  const [title, setTitle] = useState(''); //영상 제목
  const [participant, setParticipant] = useState(''); //소유자

  const [cheeringCount, setCheeringCount] = useState(0); //응원해요
  const [cheeringEnalbe, setCheeringEnable] = useState(false); //응원해요 버튼 활성화
  const [likesCount, setLikesCount] = useState(0); //찜
  const [likesEnable, setLikesEnable] = useState(false); //찜 버튼 활성화
  const [togetherCount, setTogetherCount] = useState(0); //함께해요
  const [togetherEnable, setTogetherEnalbe] = useState(false); //함께해요 버튼 활성화

  const scrollEnd = useRef(); //scrollview

  useEffect(() => {
    const onFailure = error => {
      if (__DEV__) {
        console.log(error && error.response);
      }
    };

    const getReply = async () => {
      const payload = {
        challengeId: props.id.toString(),
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
          if (__DEV__) {
            console.log(data);
          }
          setTitle(data.IBparams.title);
          setParticipant(data.IBparams.participant);
          setCheeringCount(data.IBparams.cheering);
          setLikesCount(data.IBparams.likes);
          setTogetherCount(data.IBparams.getTogether);
          setCheeringEnable(data.IBparams.enableAddCheeringCount);
          setLikesEnable(data.IBparams.enableAddLikesCount);
          setTogetherEnalbe(data.IBparams.enableAddGetTogetherCount);
        })
        .catch(onFailure);
    };

    if (props.id !== '' && props.id !== undefined) {
      getChallenge();
      getReply();
    }

    return () => {
      if (__DEV__) {
        console.log('api unmount');
      }
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
    if (__DEV__) {
      console.log(payload);
    }
    await APIKit.post('/challenge/addChallengeReply', payload)
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
    <VideoPlayerPresenter
      {...props}
      title={title}
      participant={participant}
      cheeringEnalbe={cheeringEnalbe}
      handleCount={handleCount}
      authMessage={authMessage}
      cheeringCount={cheeringCount}
      likesEnable={likesEnable}
      likesCount={likesCount}
      togetherEnable={togetherEnable}
      togetherCount={togetherCount}
      scrollEnd={scrollEnd}
      handleScrollEnd={handleScrollEnd}
      replyList={replyList}
      comment={comment}
      setComment={setComment}
      submitComment={submitComment}
    />
  );
};

export default VideoPlayerContainer;
