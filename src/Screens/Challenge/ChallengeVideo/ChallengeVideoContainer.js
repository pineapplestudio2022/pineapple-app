import React, {useContext, useEffect, useState, useRef} from 'react';

import APIKit from '../../../API/APIkit';
import {defaultAlertMessage} from '../../../Commons/CommonUtil';

import {UserDispatch} from '../../../Commons/UserDispatchProvider';
import ChallengeVideoPresenter from './ChallengeVideoPresenter';

const ChallengeVideoContainer = props => {
  const {userId} = useContext(UserDispatch);
  const videoPanel = useRef();
  const [isBottom, setIsBottom] = useState(true);

  const [challengeList, setChallengeList] = useState();
  const [title, setTitle] = useState();
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const getAllOriginalVideo = () => {
      APIKit.post('originalWorks/getAllOriginalVideo', {
        offset: '0',
        limit: '10',
      })
        .then(({data}) => {
          if (data.IBcode === '1000') {
            setChallengeList(data.IBparams.rows);
          }
        })
        .catch(error => {
          if (__DEV__) {
            console.log(error);
          }
        });
    };

    getAllOriginalVideo();

    return () => {
      if (__DEV__) {
        console.log('api unmount');
      }
    };
  }, []);
  const addChallengeTicket = id => {
    if (userId === '' || userId === undefined || userId === null) {
      defaultAlertMessage('로그인 후 이용해 주세요');
      return;
    }
    const payload = {userId: userId.toString(), cType: '2'};
    APIKit.post('challenge/addChallengeTicket', payload)
      .then(({data}) => {
        if (data.IBcode === '1000') {
          defaultAlertMessage('참여신청이 완료되었습니다');
        }
        console.log(data);
      })
      .catch(error => {
        if (__DEV__) {
          console.log(error);
        }
      });
  };
  const openVideoPlayer = (url, titleName) => {
    // setVideoUrl(url);
    setVideoUrl(url.substring(url.lastIndexOf('/') + 1));
    setTitle(titleName);
    setIsBottom(false);
    videoPanel.current.show();
  };

  return (
    <ChallengeVideoPresenter
      {...props}
      challengeList={challengeList}
      openVideoPlayer={openVideoPlayer}
      addChallengeTicket={addChallengeTicket}
      videoPanel={videoPanel}
      isBottom={isBottom}
      setIsBottom={setIsBottom}
      title={title}
      videoUrl={videoUrl}
    />
  );
};

export default ChallengeVideoContainer;
