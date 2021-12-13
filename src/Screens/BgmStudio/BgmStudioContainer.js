import React, {useState} from 'react';
import BgmStudioPresenter from './BgmStudioPresenter';

import TempImage from '../../Assets/Image/image_temp_yoga.jpg';

const BgmStudioContainer = props => {
  const [whereUse, setWhereUse] = useState('');
  const [loading, setLoading] = useState(false);
  const [bgmResult, setBgmResult] = useState(false);

  const handlerCreate = () => {
    setLoading(!loading);
    setTimeout(() => {
      setLoading(false);
      setBgmResult(true);
    }, 3000);
  };

  const [keyword, setKeyword] = useState('');
  const [keywordList, setKeywordList] = useState([]);
  const addKeyword = () => {
    setKeywordList(keywordList.concat(keyword));
    setKeyword('');
  };

  const handleMovetoMyBGM = () => {
    props.navigation.navigate('BGMStudioNavigation');
  };
  const [image, setImage] = useState(null);
  const imageUpload = () => {
    setTimeout(() => {
      console.log('image');
      setImage(TempImage);
    }, 3000);
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
      imageUpload={imageUpload}
      image={image}
    />
  );
};

export default BgmStudioContainer;
