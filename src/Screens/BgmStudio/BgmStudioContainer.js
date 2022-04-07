import React, {useState} from 'react';
import BgmStudioPresenter from './BgmStudioPresenter';

import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {defaultAlertMessage} from '../../Commons/CommonUtil';
import FormData from 'form-data';
import RNFetchBlob from 'rn-fetch-blob';
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
      RNFetchBlob.config({
        fileCache: true,
        path: path,
      })
        .fetch('GET', s3Url)
        .progress((received, total) => {
          if (__DEV__) {
            const percentage = Math.floor((received / total) * 100) + '%';
            console.log(percentage);
          }
        })
        .then(resp => {
          console.log(keywordList);
          console.log(whereUse);
          // RNFetchBlob.fs.writeFile(path, JSON.stringify(lyrics), 'utf8').then(() => {

          // });
          setLoading(false);
          setBgmResult(true);
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

  // const test = async () => {
  //   const data = {
  //     whereUse: whereUse,
  //     keyword: keywordList,
  //   };
  //   console.log(data);
  //   console.log(JSON.stringify(data));
  // };

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
      // test={test}
    />
  );
};

export default BgmStudioContainer;
