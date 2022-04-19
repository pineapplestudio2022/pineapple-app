import React, {useContext} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Alert, Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import APIKit from '../../API/APIkit';
import {defaultAlertMessage} from '../../Commons/CommonUtil';
import {UserDispatch} from '../../Commons/UserDispatchProvider';
import MyBGMCardPresenter from './MyBGMCardPresenter';

const MyBGMCardContainer = props => {
  const [percent, setPercent] = useState(0); //트랙 경과시간에 따른 slider 표시
  const [isPlay, setIsPlay] = useState(false);
  const {userId} = useContext(UserDispatch);
  const handlerPlay = () => {
    if (!isPlay) {
      setIsPlay(true);
    } else {
      setIsPlay(false);
      setPercent(0);
    }
  };
  useEffect(() => {
    let intPercent;
    if (isPlay) {
      intPercent = setInterval(() => {
        setPercent(percent + 2);
        if (percent >= 100) {
          clearInterval(intPercent);
          console.log('clear');
        }
      }, 1000);
    }
    return () => clearInterval(intPercent);
  }, [isPlay, percent]);
  const handlerDownload = async () => {
    console.log(props.url);
    const filename = 'AIMusic';
    const ext = props.url.substring(props.url.lastIndexOf('.'));
    // const path = dirs + '/' + filename + '_' + Date.now() + ext;

    if (Platform.OS === 'android') {
      const dirs = RNFetchBlob.fs.dirs.DCIMDir;
      const path = dirs + '/' + filename + '_' + Date.now() + ext;
      console.log(path);

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
        .fetch('GET', props.url)
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
        .fetch('GET', props.url)
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
    const bgmStudioId = props?.bgmStudioId;
    const payload = {
      userId: userId.toString(),
      bgmStudioId: bgmStudioId?.toString(),
    };

    await APIKit.post('/bgmStudio/deleteMybgmById', payload)
      .then(res => {
        if (res.data.IBcode === '1000') {
          props.handlerDeleteItem(bgmStudioId);
        } else {
          defaultAlertMessage(res.data.IBmessage);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <MyBGMCardPresenter
      {...props}
      percent={percent}
      isPlay={isPlay}
      handlerPlay={handlerPlay}
      handlerDownload={handlerDownload}
      deleteAlert={deleteAlert}
    />
  );
};

export default MyBGMCardContainer;
