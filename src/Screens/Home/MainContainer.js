import React, {useContext, useEffect, useState} from 'react';
import APIKit from '../../API/APIkit';
import {defaultAlertMessage} from '../../Commons/CommonUtil';
import {UserDispatch} from '../../Commons/UserDispatchProvider';
import MainPresenter from './MainPresenter';

const MainContainer = props => {
  //랭킹 음원 10개 가져오기
  const [musicList, setMusicList] = useState();
  const {userId} = useContext(UserDispatch);

  useEffect(() => {
    if (__DEV__) {
      console.log('api get');
    }

    const onFailure = error => {
      if (__DEV__) {
        console.log(error && error.response);
      }
    };

    const getRankedChallenges = async () => {
      await APIKit.post('/challenge/getRankedChallenges')
        .then(({data}) => {
          if (data.IBcode === '1000') {
            setMusicList(data.IBparams.rows);
          }
        })
        .catch(onFailure);
    };

    getRankedChallenges();

    return () => {
      if (__DEV__) {
        console.log('api unmount');
      }
    };
  }, []);
  const handlerMoveToBGMStudio = () => {
    if (userId === '' || userId === undefined || userId === null) {
      defaultAlertMessage('로그인 후 이용가능합니다.');
      return;
    }
    props.navigation.navigate('BgmStudio');
  };

  return (
    <MainPresenter
      musicList={musicList}
      handlerMoveToBGMStudio={handlerMoveToBGMStudio}
      {...props}
    />
  );
};
export default MainContainer;
