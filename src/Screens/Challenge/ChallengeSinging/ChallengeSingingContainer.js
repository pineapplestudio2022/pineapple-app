// 노래부르기 화면
import React, {useEffect, useState} from 'react';
import APIKit from '../../../API/APIkit';
import ChallengeSingingPresenter from './ChallengeSingingPresenter';

const ChallengeSingingContainer = props => {
  const [AISongList, setAISongList] = useState(); //AI 음원 리스트

  useEffect(() => {
    if (__DEV__) {
      console.log('api get');
    }

    const getAllOriginalSong = () => {
      APIKit.post('/originalWorks/getAllOriginalSong')
        .then(({data}) => {
          if (data.IBcode === '1000') {
            setAISongList(data.IBparams.rows);
          }
        })
        .catch(error => {
          if (__DEV__) {
            console.log(error && error.response);
          }
        });
    };
    getAllOriginalSong();

    return () => {
      if (__DEV__) {
        console.log('api unmount');
      }
    };
  }, []);

  return <ChallengeSingingPresenter {...props} AISongList={AISongList} />;
};

export default ChallengeSingingContainer;
