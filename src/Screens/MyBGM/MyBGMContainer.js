import React, {useContext, useEffect, useRef, useState} from 'react';
import MyBGMPresenter from './MyBGMPresenter';

import APIKit from '../../API/APIkit';
import {UserDispatch} from '../../Commons/UserDispatchProvider';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const ADD_OFFSET = 8;
const MyBGMContainer = props => {
  const {userId} = useContext(UserDispatch);

  const [limit, setLimit] = useState(8);
  const [offset, setOffset] = useState(0);
  const [myBGMList, setMyBGMList] = useState([]);
  const [refreshing, setRefreshing] = useState(false); //당겨서 새로고침 로딩중 상태

  const [loading, setLoading] = useState(false); //api 로딩 중 상태

  const ARPlayer = useRef(AudioRecorderPlayer);
  const [playId, setPlayId] = useState(null); //재생중인 bgmstudioI

  const getMyBGMStudioList = async () => {
    setLoading(true);
    const payload = {
      userId: userId.toString(),
      limit: limit.toString(),
      offset: offset.toString(),
    };
    await APIKit.post('/bgmStudio/getMyBGMStudioList', payload)
      .then(res => {
        if (res.data.IBparams.rows.length === 0) {
          setLoading(false);
          return;
        }
        if (res.data.IBcode === '1000') {
          setMyBGMList(myBGMList.concat(res.data.IBparams.rows));
        }
        setLimit(limit + ADD_OFFSET);
        setOffset(offset + ADD_OFFSET);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };

  const handlerDeleteItem = bgmStudioId => {
    setMyBGMList(myBGMList.filter(item => item.id !== bgmStudioId));
  };
  useEffect(() => {
    ARPlayer.current = new AudioRecorderPlayer(); //재생
    ARPlayer.current.setSubscriptionDuration(1);
    getMyBGMStudioList();
    return () => {
      //재생, 녹음중 다른화면으로 나갈시 해제
      ARPlayer.current.stopPlayer();
      ARPlayer.current.removePlayBackListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePlayId = id => {
    setPlayId(id);
  };
  const handleLoadMore = async () => {
    if (loading) {
      return;
    } else {
      getMyBGMStudioList();
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setLimit(8);
    setOffset(0);
    setMyBGMList([]);
    getMyBGMStudioList();
    setRefreshing(false);
  };

  return (
    <MyBGMPresenter
      {...props}
      myBGMList={myBGMList}
      handleLoadMore={handleLoadMore}
      handlerDeleteItem={handlerDeleteItem}
      refreshing={refreshing}
      handleRefresh={handleRefresh}
      ARPlayer={ARPlayer}
      handlePlayId={handlePlayId}
      playId={playId}
    />
  );
};
export default MyBGMContainer;
