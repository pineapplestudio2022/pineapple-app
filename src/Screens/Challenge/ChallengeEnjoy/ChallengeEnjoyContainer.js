//파인애플 뮤직 화면
import React, {useRef, useState, useEffect} from 'react';
import APIKit from '../../../API/APIkit';
import ChallengeEnjoyPresenter from './ChallengeEnjoyPresenter';

const ChallengeEnjoyContainer = props => {
  const musicPanel = useRef();
  const videoPanel = useRef();
  const [scroll, setScroll] = useState(true);
  const [offset, setOffset] = useState(10);
  const [isBottom, setIsBottom] = useState(true);
  const HandlerScroll = bool => setScroll(bool);

  const [cType, setCType] = useState(1); //태그 선택 1:노래, 2:영상, 3:연주, 4:편곡

  const [musicList, setMusicList] = useState(); //노래 챌린지 리스트
  const [videoList, setVideoList] = useState(); //비디오 챌린지 리스트

  const [id, setId] = useState(''); //challenge id

  const [currentMusicIndex, setCurrentMusicIndex] = useState(0); //현재 재생 중인 곡 index

  const [shareLink, setShareLink] = useState('');

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

  const openVideoPlayer = index => {
    setId(videoList[index].id);
    setShareLink(videoList[index].shareLink);
    setIsBottom(false);
    videoPanel.current.show();
  };

  const HandlerVideoPanel = () => {
    videoPanel.current.hide();
  };

  useEffect(() => {
    const propsId = props.route.params.id.toString();
    if (cType === 2) {
      setIsBottom(true);
      videoPanel.current.hide();
    }

    const onFailure = error => {
      if (__DEV__) {
        console.log(error && error.response);
      }
    };

    const getAllChallenges = async () => {
      const payload = {cType: cType.toString()};
      await APIKit.post('/challenge/getAllChallenges', payload)
        .then(({data}) => {
          if (data.IBcode === '1000') {
            if (cType === 2) {
              setVideoList(data.IBparams.rows);
            }
            if (cType === 1) {
              musicPanel.current.hide();
              setMusicList(data.IBparams.rows);
              //challengeId 값이 있으면 MusicPlayer Open
              if (propsId === undefined || propsId === '' || propsId === null) {
                return;
              }
              setId(propsId);
              setIsBottom(false);
              musicPanel.current.show();
            }
          }
        })
        .catch(onFailure);
    };
    getAllChallenges();

    return () => {
      setOffset(10);
      setMusicList();
      setVideoList();
    };
  }, [cType, props.route.params.id]);

  const handleLoadMore = async () => {
    const payload = {cType: cType.toString(), offset: offset.toString()};
    await APIKit.post('/challenge/getAllChallenges', payload)
      .then(({data}) => {
        if (cType === 1) {
          setMusicList([...musicList, ...data.IBparams.rows]);
        } else if (cType === 2) {
          setVideoList([...videoList, ...data.IBparams.rows]);
        }
        setOffset(offset + 10);
      })
      .catch(error => {
        if (__DEV__) {
          console.log(error);
        }
      });
  };

  return (
    <ChallengeEnjoyPresenter
      {...props}
      id={id}
      cType={cType}
      scroll={scroll}
      setCType={setCType}
      musicPanel={musicPanel}
      videoPanel={videoPanel}
      HandlerVideoPanel={HandlerVideoPanel}
      musicList={musicList}
      videoList={videoList}
      handleLoadMore={handleLoadMore}
      isBottom={isBottom}
      setIsBottom={setIsBottom}
      openMusicPlayer={openMusicPlayer}
      openVideoPlayer={openVideoPlayer}
      HandlerScroll={HandlerScroll}
      handlerNextMusic={handlerNextMusic}
      handlerPreviousMusic={handlerPreviousMusic}
      shareLink={shareLink}
    />
  );
};

export default ChallengeEnjoyContainer;
