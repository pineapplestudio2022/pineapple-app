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

  const handlerCreate = async () => {
    if (image === null || image === '') {
      defaultAlertMessage('이미지를 선택해주세요');
      return;
    }
    if (keywordList.length === 0) {
      defaultAlertMessage('키워드를 1개이상 등록해주세요');
      return;
    }
    if (whereUse === null || whereUse === '' || whereUse === undefined) {
      defaultAlertMessage('사용처를 입력해주세요');
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append('image', {
      uri: image.uri,
      name: image.name,
      type: image.type,
    });
    keywordList.forEach((item, index) => {
      formData.append(`keyword[${index}]`, item);
    });
    formData.append('whereUse', whereUse);
    formData.append('userId', userId);
    console.log(formData);
    const result = await APIKit.post('/bgmStudio/updateBgmStudio', formData, {
      headers: {'content-type': 'multipart/form-data'},
    });
    console.log(result);
    if (result?.data.IBcode === '1000') {
      setLoading(false);
      setBgmResult(true);
    } else if (result?.data.IBcode === '6000') {
      defaultAlertMessage('잠시 후 다시 시도해주세요');
      setLoading(false);
    } else {
      setLoading(false);
    }

    // if (result?.data) {
    //   const s3Url = result?.data.data.toString();
    //   console.log(`s3Url : ${s3Url}`);
    //   const dirs = RNFetchBlob.fs.dirs.DocumentDir;
    //   const filename = image.name.substring(0, image.name.lastIndexOf('.'));
    //   const ext = s3Url.substring(s3Url.lastIndexOf('.'));
    //   const path = dirs + '/bgmstudio/' + filename + '_' + Date.now() + ext;
    //   console.log(path);

    //   //mp3 다운로드
    //   await RNFetchBlob.config({
    //     fileCache: true,
    //     path: path,
    //   })
    //     .fetch('GET', s3Url)
    //     // .progress((received, total) => {
    //     //   if (__DEV__) {
    //     //     const percentage = Math.floor((received / total) * 100) + '%';
    //     //     console.log(percentage);
    //     //   }
    //     // })
    //     .then(async resp => {
    //       if (userId === '' || userId === undefined || userId === null) {
    //         defaultAlertMessage(
    //           '로그인시에만 키워드와 사용처를 등록할 수 있습니다.',
    //         );
    //         setBgmResult(true);
    //         setLoading(false);
    //         return;
    //       }
    //       const payload = {
    //         keyword: keywordList,
    //         whereUse: whereUse.toString(),
    //         url: s3Url.toString(),
    //         userId: userId.toString(),
    //       };
    //       console.log(payload);
    //       const res = await APIKit.post('/bgmStudio/updateBgmStudio', payload);
    //       if (res?.data?.IBcode === '1000') {
    //         setLoading(false);
    //         setBgmResult(true);
    //       } else {
    //         setLoading(false);
    //       }
    //       if (__DEV__) {
    //         console.log('The file saved to ', resp.path());
    //       }
    //     })
    //     .catch(e => {
    //       setLoading(false);
    //       console.log(e);
    //     });
    // }
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
