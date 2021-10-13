//파인애플 뮤직 화면
import React, {useState} from 'react';

import {useRef} from 'react';
import PineappleMusicPresenter from './PineappleMusicPresenter';

const PineappleMusicContainer = props => {
  const [scroll, setScroll] = useState(true);
  const HandlerScroll = bool => setScroll(bool);

  const [isBottom, setIsBottom] = useState(true);
  const panel = useRef();
  const openFullPlayer = () => {
    setIsBottom(false);
    panel.current.show();
  };

  return (
    <PineappleMusicPresenter
      {...props}
      openFullPlayer={openFullPlayer}
      panel={panel}
      scroll={scroll}
      setIsBottom={setIsBottom}
      HandlerScroll={HandlerScroll}
      isBottom={isBottom}
    />
  );
};

export default PineappleMusicContainer;
