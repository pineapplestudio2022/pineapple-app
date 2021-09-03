//파인애플 뮤직 화면
import {Box, Center, Flex, ScrollView} from 'native-base';
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
  const [fileName, setFileName] = useState('');

  //임시
  const fn = [{fileName: 'futurehouse1-2.mp3'}, {fileName: '210708_folk.mp3'}];

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

  // const openFullPlayer = index => {
  //   setId(musicList.rows[index].id.toString());
  //   // setFileName(musicList.rows[index].fileName);
  //   setFileName(fn[0].fileName); //임시

  //   setIsBottom(false);
  //   panel.current.show();
  // };

  useEffect(() => {
    const onFailure = error => {
      console.log(error && error.response);
    };

    const getRankedChallenges = async () => {
      await APIKit.post('/challenge/getRankedChallenges')
        .then(({data}) => {
          setMusicList(data.IBparams.rows);
          //음악 직접 선택해서 진입시 플레이어 바로 오픈
          if (props.route.params.id !== undefined) {
            setId(props.route.params.id);
            setIsBottom(false);
            musicPanel.current.show();
          }
        })
        .catch(onFailure);
    };
    getRankedChallenges();

    return () => {
      console.log('api unmount');
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
      <ScrollView>
        <Center>
          <Flex
            width={'82%'}
            flexWrap={'wrap'}
            direction={'row'}
            justifyContent={'space-between'}>
            {musicList &&
              musicList.map((rows, index) => (
                <Box my={5} key={rows.id}>
                  <MusicBox
                    id={rows.id}
                    badge={index + 1}
                    cover={index + 1}
                    music={rows.title}
                    owner={rows.participant}
                    onPress={() => openMusicPlayer(index)}
                  />
                </Box>
              ))}
          </Flex>
        </Center>
      </ScrollView>
      {/* 앨범 리스트 end */}

      <SlidingUpPanel
        ref={musicPanel}
        allowDragging={scroll}
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
