// My Challenge > 노래챌린지 화면

import React, {useContext, useState, useEffect} from 'react';
import APIKit from '../../../API/APIkit';
import {UserDispatch} from '../../../Commons/UserDispatchProvider';
import MySingingPresenter from './MySingingPresenter';

const MySingingContainer = props => {
  const [myChallengeList, setMyChallengeList] = useState();
  // const [offset, setOffset] = useState(10);
  const {userId} = useContext(UserDispatch);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getMyChallengeSongs = () => {
      const payload = {userId: userId.toString()};
      APIKit.post('challenge/getMyChallengeSongs', payload)
        .then(({data}) => {
          if (__DEV__) {
            console.log(data);
          }
          if (data.IBcode === '1000') {
            setMyChallengeList(data.IBparams.rows);
          }
          setRefresh(false);
        })
        .catch(error => {
          if (__DEV__) {
            console.log(error);
          }
        });
    };
    getMyChallengeSongs();
    return () => {
      if (__DEV__) {
        console.log('unmount');
      }
    };
  }, [userId, refresh]);

  // const handleLoadMore = async () => {
  //   const payload = {userId: userId.toString()};
  //   await APIKit.post('/challenge/getMyChallengeSongs', payload)
  //     .then(({data}) => {
  //       setMyChallengeList([...myChallengeList, ...data.IBparams.rows]);
  //       setOffset(offset + 10);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  return (
    <MySingingPresenter
      {...props}
      myChallengeList={myChallengeList}
      setRefresh={setRefresh}
    />
  );
};

export default MySingingContainer;
