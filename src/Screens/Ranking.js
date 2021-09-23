//파인애플 뮤직 화면
import {Box, Center, FlatList} from 'native-base';
import React, {useState, useRef, useEffect} from 'react';

import {responsiveHeight} from 'react-native-responsive-dimensions';
import {heightPersentage} from '../Commons/DeviceWHPersentage';

import MenuComponent from '../Components/MenuComponent';
import SlidingUpPanel from 'rn-sliding-up-panel';
import MusicPlayer from '../Components/MusicPlayer';
import MusicBox from '../Components/MusicBoxComponent';
import APIKit from '../API/APIkit';
function MusicRacking(props) {
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
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'Ranking'}
        navigation={props.navigation}
      />
      {/* 앨범 리스트 start  */}
      <Center
        flex={1}
        style={{paddingBottom: responsiveHeight(heightPersentage(157))}}>
        <FlatList
          numColumns={2}
          data={musicList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Box m={3}>
              <MusicBox
                id={item.id}
                badge={index + 1}
                cover={index + 1}
                music={item.title}
                owner={item.participant}
                onPress={() => openMusicPlayer(index)}
              />
            </Box>
          )}
          keyExtractor={item => item.id}
        />
      </Center>
      {/* 앨범 리스트 end */}

      <SlidingUpPanel
        ref={musicPanel}
        allowDragging={scroll}
        friction={0.4}
        draggableRange={{
          top: responsiveHeight(heightPersentage(740)),
          bottom: responsiveHeight(heightPersentage(157)),
        }}
        onMomentumDragStart={() => setIsBottom(false)}
        onBottomReached={() => setIsBottom(true)}
        showBackdrop={false}>
        <MusicPlayer
          onScroll={HandlerScroll}
          onNextMusic={handlerNextMusic}
          onPreviousMusic={handlerPreviousMusic}
          id={id}
          playerSize={isBottom ? false : true}
        />
      </SlidingUpPanel>
    </Box>
  );
}

export default MusicRacking;
