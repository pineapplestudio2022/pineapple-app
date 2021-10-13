//My Challenge > 영상 챌린지 화면

import React, {useContext, useEffect, useState} from 'react';
import {defaultAlertMessage, domainRegex} from '../../../Commons/CommonUtil';
import APIKit from '../../../API/APIkit';
import {UserDispatch} from '../../../Commons/UserDispatchProvider';
import MyVideoPresenter from './MyVideoPresenter';

const MyVideoContainer = props => {
  const {userId, email} = useContext(UserDispatch);
  const [originalVideoList, setOriginalVideoList] = useState();
  const [selected, setSelected] = useState();
  const [inputValue, setInputValue] = useState({
    originalWorkId: '',
    shareLink: '',
  });
  const [uploadCheck, setUploadCheck] = useState(false);

  useEffect(() => {
    const getAllOriginalVideo = () => {
      APIKit.post('originalWorks/getAllOriginalVideo').then(({data}) => {
        if (data.IBcode === '1000') {
          setOriginalVideoList(data.IBparams.rows);
        }
      });
    };

    getAllOriginalVideo();

    return () => {
      if (__DEV__) {
        console.log('unmount');
      }
    };
  }, []);

  const submitVideo = () => {
    if (
      inputValue.shareLink === '' ||
      inputValue.shareLink === undefined ||
      inputValue.shareLink === null
    ) {
      defaultAlertMessage('링크를 입력해주세요.');
      return;
    }

    if (!domainRegex(inputValue.shareLink)) {
      defaultAlertMessage('올바른 형식의 링크를 등록해주세요');
      return;
    }

    const payload = {
      shareLink: inputValue.shareLink.toString(),
      userId: userId.toString(),
      owner: email.toString(),
      originalWorkId: inputValue.originalWorkId.toString(),
    };

    APIKit.post('challenge/updateMyChallengeVideo', payload)
      .then(({data}) => {
        if (__DEV__) {
          console.log(data);
        }
        setUploadCheck(true);
        setInputValue({...inputValue, shareLink: ''});
      })
      .catch(error => {
        if (__DEV__) {
          console.log(error);
        }
        setUploadCheck(false);
      });
  };

  const handlerValue = (text, id) => {
    setInputValue({originalWorkId: id, shareLink: text});
    if (__DEV__) {
      console.log(inputValue);
    }
  };
  return (
    <MyVideoPresenter
      {...props}
      selected={selected}
      setSelected={setSelected}
      handlerValue={handlerValue}
      inputValue={inputValue}
      submitVideo={submitVideo}
      uploadCheck={uploadCheck}
      originalVideoList={originalVideoList}
    />
  );
};

export default MyVideoContainer;
