import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import MyBGMCardPresenter from './MyBGMCardPresenter';

const MyBGMCardContainer = props => {
  const [percent, setPercent] = useState(0); //트랙 경과시간에 따른 slider 표시
  const [isPlay, setIsPlay] = useState(false);
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

  return (
    <MyBGMCardPresenter
      {...props}
      percent={percent}
      isPlay={isPlay}
      handlerPlay={handlerPlay}
    />
  );
};

export default MyBGMCardContainer;
