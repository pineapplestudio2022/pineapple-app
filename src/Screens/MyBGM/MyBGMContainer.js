import React, {useContext, useEffect, useState} from 'react';
import MyBGMPresenter from './MyBGMPresenter';

import APIKit from '../../API/APIkit';
import {UserDispatch} from '../../Commons/UserDispatchProvider';

const ADD_OFFSET = 8;
const MyBGMContainer = props => {
  const {userId} = useContext(UserDispatch);
  const [limit, setLimit] = useState(8);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [myBGMList, setMyBGMList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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
    getMyBGMStudioList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    />
  );
};
export default MyBGMContainer;
