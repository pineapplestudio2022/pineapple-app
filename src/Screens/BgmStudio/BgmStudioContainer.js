import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import React, {useContext, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

import APIKit from '../../API/APIkit';
import BgmStudioPresenter from './BgmStudioPresenter';
import {defaultAlertMessage} from '../../Commons/CommonUtil';
import {UserDispatch} from '../../Commons/UserDispatchProvider';

/* toggle includeExtra */
const includeExtra = true;

const BgmStudioContainer = props => {
  const [whereUse, setWhereUse] = useState('');
  const [loading, setLoading] = useState(false);
  const [bgmResult, setBgmResult] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [keywordList, setKeywordList] = useState([]);
  const [image, setImage] = useState({
    uri: null,
    type: null,
    name: null,
  });
  const {userId} = useContext(UserDispatch);

  const handleMovetoMyBGM = () => {
    props.navigation.navigate('BGMStudioNavigation');
  };

  const addKeyword = () => {
    setKeywordList(keywordList.concat(keyword));
    setKeyword('');
  };

  const updateBgmStudio = async s3Url => {
    if (s3Url === null || s3Url === undefined || s3Url === '') {
      return;
    }
    const payload = {
      keyword: keywordList,
      whereUse: whereUse.toString(),
      url: s3Url.toString(),
      userId: userId.toString(),
    };
    console.log(payload);
    const result = await APIKit.post('/bgmStudio/updateBgmStudio', payload);
    if (result?.data) {
      console.log(result.data);
      if (result?.data?.IBcode === '1000') {
        console.log('success');
      }
    }
  };
  const handlerCreate = async () => {
    if (image === null || image === '') {
      defaultAlertMessage('이미지를 선택해주세요');
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      name: image.name,
      type: image.type,
    });

    const result = await axios({
      method: 'post',
      url: 'http://3.37.96.74:9779/pineapple/api',
      headers: {'content-type': 'multipart/form-data'},
      data: formData,
    });

    if (result?.data) {
      const s3Url = result?.data.data.toString();
      console.log(`s3Url : ${s3Url}`);
      const dirs = RNFetchBlob.fs.dirs.DocumentDir;
      const filename = image.name.substring(0, image.name.lastIndexOf('.'));
      const ext = s3Url.substring(s3Url.lastIndexOf('.'));
      const path = dirs + '/bgmstudio/' + filename + '_' + Date.now() + ext;
      console.log(path);

      //mp3 다운로드
      await RNFetchBlob.config({
        fileCache: true,
        path: path,
      })
        .fetch('GET', s3Url)
        // .progress((received, total) => {
        //   if (__DEV__) {
        //     const percentage = Math.floor((received / total) * 100) + '%';
        //     console.log(percentage);
        //   }
        // })
        .then(async resp => {
          const payload = {
            keyword: keywordList,
            whereUse: whereUse.toString(),
            url: s3Url.toString(),
            userId: userId.toString(),
          };
          console.log(payload);
          const res = await APIKit.post('/bgmStudio/updateBgmStudio', payload);
          if (res?.data?.IBcode === '1000') {
            setLoading(false);
            setBgmResult(true);
          } else {
            setLoading(false);
          }
          if (__DEV__) {
            console.log('The file saved to ', resp.path());
          }
        })
        .catch(e => {
          setLoading(false);
          console.log(e);
        });
    }
  };

  const handlePicker = async () => {
    const res = await launchImageLibrary({
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
      quality: 1,
    });
    console.log(res);
    setImage({
      uri: res?.assets[0].uri,
      type: res?.assets[0].type,
      name: res?.assets[0].fileName,
    });
  };

  const handleRemoveImage = () => {
    setImage({
      uri: null,
      type: null,
      name: null,
    });
  };

  return (
    <BgmStudioPresenter
      {...props}
      whereUse={whereUse}
      setWhereUse={setWhereUse}
      loading={loading}
      handlerCreate={handlerCreate}
      keyword={keyword}
      setKeyword={setKeyword}
      addKeyword={addKeyword}
      keywordList={keywordList}
      bgmResult={bgmResult}
      handleMovetoMyBGM={handleMovetoMyBGM}
      image={image}
      handlePicker={handlePicker}
      handleRemoveImage={handleRemoveImage}
    />
  );
};

export default BgmStudioContainer;
