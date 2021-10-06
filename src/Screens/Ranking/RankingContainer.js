//파인애플 뮤직 화면
import React, {useState, useRef, useEffect} from 'react';

import APIKit from '../../API/APIkit';
import RankingPresenter from './RankingPresenter';

const RankingContainer = props => {
  const musicPanel = useRef();
  const [scroll, setScroll] = useState(true);
  const HandlerScroll = bool => setScroll(bool);
  const [isBottom, setIsBottom] = useState(true);

  //음원 랭킹 리스트 10
  const [musicList, setMusicList] = useState();

  //플레이어
  const [id, setId] = useState(''); //id
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0); //현재 재생 중인 곡 index

  //다음곡
  const handlerNextMusic = () => {
    if (currentMusicIndex + 1 === musicList.length) {
      return;
    }
    setId(musicList[currentMusicIndex + 1].id);
    setCurrentMusicIndex(currentMusicIndex + 1);
  };

  //이전곡
  const handlerPreviousMusic = () => {
    if (currentMusicIndex === 0) {
      return;
    }
    setId(musicList[currentMusicIndex - 1].id);
    setCurrentMusicIndex(currentMusicIndex - 1);
  };

  const openMusicPlayer = index => {
    setId(musicList[index].id);
    setCurrentMusicIndex(index);
    setIsBottom(false);
    musicPanel.current.show();
  };

  useEffect(() => {
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
            //음악 직접 선택해서 진입시 플레이어 바로 오픈
            if (props.route.params.id !== undefined) {
              setId(props.route.params.id);
              setIsBottom(false);
              musicPanel.current.show();
            }
          }
        })
        .catch(onFailure);
    };
    getRankedChallenges();

    return () => {
      setMusicList();
      if (__DEV__) {
        console.log('api unmount');
      }
    };
  }, [props.route.params.id]);

  return (
    <RankingPresenter
      {...props}
      musicList={musicList}
      handlerNextMusic={handlerNextMusic}
      handlerPreviousMusic={handlerPreviousMusic}
      openMusicPlayer={openMusicPlayer}
      HandlerScroll={HandlerScroll}
      musicPanel={musicPanel}
      scroll={scroll}
      id={id}
      isBottom={isBottom}
      setIsBottom={setIsBottom}
    />
  );
};

export default RankingContainer;
