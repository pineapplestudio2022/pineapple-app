import RNFetchBlob from 'rn-fetch-blob';
import {Alert, Platform} from 'react-native';
import React, {useContext, useState} from 'react';

import APIKit from '../../API/APIkit';
import MyBGMCardPresenter from './MyBGMCardPresenter';
import {defaultAlertMessage} from '../../Commons/CommonUtil';
import {UserDispatch} from '../../Commons/UserDispatchProvider';

const MyBGMCardContainer = props => {
  const {userId} = useContext(UserDispatch);
  const [percent, setPercent] = useState(0);
  const [isPlay, setIsPlay] = useState(false);

  const {ARPlayer, bgmStudioId, handlerDeleteItem, url, handlePlayId, playId} =
    props;
  const handlerDownload = async () => {
    console.log(url);
    const filename = 'AIMusic';
    const ext = url.substring(url.lastIndexOf('.'));

    if (Platform.OS === 'android') {
      const dirs = RNFetchBlob.fs.dirs.DCIMDir;
      const path = dirs + '/' + filename + '_' + Date.now() + ext;
      await RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          description: 'Downloading the file',
          path: path,
          mediaScannable: true,
          mime: 'audio/mpeg',
        },
      })
        .fetch('GET', url)
        .then(res =>
          RNFetchBlob.fs.scanFile([{path: res.path(), mime: 'audio/mpeg'}]),
        )
        .catch(e => {
          console.log(e);
        });
    } else if (Platform.OS === 'ios') {
      const dirs = RNFetchBlob.fs.dirs.DocumentDir;
      const path = dirs + '/' + filename + '_' + Date.now() + ext;
      await RNFetchBlob.config({
        fileCache: true,
        path: path,
      })
        .fetch('GET', url)
        .then(async resp => {
          console.log(`The file is save to : ${resp.path()}`);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const deleteAlert = () => {
    Alert.alert('Pineapple', '삭제하시겠습니까?', [
      {
        text: '취소',
        onPress: () => {},
      },
      {
        text: '확인',
        onPress: () => handleDelete(),
      },
    ]);
  };

  const handleDelete = async () => {
    // const bgmStudioId = props?.bgmStudioId;
    const payload = {
      userId: userId.toString(),
      bgmStudioId: bgmStudioId?.toString(),
    };

    await APIKit.post('/bgmStudio/deleteMybgmById', payload)
      .then(res => {
        if (res.data.IBcode === '1000') {
          handlerDeleteItem(bgmStudioId);
        } else {
          defaultAlertMessage(res.data.IBmessage);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onStartPlay = async () => {
    try {
      const msg = await ARPlayer.current.startPlayer(url);
      const volume = await ARPlayer.current.setVolume(1.0);
      setIsPlay(true);
      if (__DEV__) {
        console.log(`file: ${msg}`, `volume: ${volume}`);
      }
      ARPlayer.current.addPlayBackListener(e => {
        let percentage = Math.round(
          (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100,
        );
        setPercent(percentage);
        return;
      });
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      }
    }
  };

  const onStopPlay = () => {
    setPercent(0);
    setIsPlay(false);
    ARPlayer.current.stopPlayer();
    ARPlayer.current.removePlayBackListener();
  };
  //재생
  const handlePlay = () => {
    handlePlayId(bgmStudioId);
    if (isPlay && playId === bgmStudioId) {
      onStopPlay();
    } else {
      onStopPlay();
      onStartPlay();
    }
  };

  return (
    <MyBGMCardPresenter
      {...props}
      percent={percent}
      isPlay={playId === bgmStudioId ? isPlay : false}
      handlerDownload={handlerDownload}
      deleteAlert={deleteAlert}
      handlePlay={handlePlay}
    />
  );
};

export default MyBGMCardContainer;
