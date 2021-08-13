//파인애플 뮤직 화면
import {Box, Center, Flex, ScrollView} from 'native-base';
import React, {useState, useRef, useEffect} from 'react';

import {responsiveHeight} from 'react-native-responsive-dimensions';
import {heightPersentage} from '../Commons/DeviceWHPersentage';

import MenuComponent from '../Components/MenuComponent';
import SlidingUpPanel from 'rn-sliding-up-panel';
import MusicPlayerFull from '../Components/MusicPlayerFull';
import MusicPlayerSmall from '../Components/MusicPlayerSmall';
import MusicBox from '../Components/MusicBoxComponent';
import APIKit from '../API/APIkit';
function MusicRacking(props) {
  const [scroll, setScroll] = useState(true);
  const HandlerScroll = bool => setScroll(bool);

  const [playerOpen, setPlayerOpen] = useState(false);
  const [isBottom, setIsBottom] = useState(true);
  const panel = useRef();

  //음원 랭킹 리스트 10
  const [musicList, setMusicList] = useState();

  //플레이어
  const [id, setId] = useState(); //id
  const [title, setTitile] = useState(''); //곡 제목
  const [participant, setParticipant] = useState(''); // 참여자 이름
  const [cover, setCover] = useState();
  const [cheering, setCheering] = useState(0); //응원해요
  const [likes, setLikes] = useState(0); //찜
  const [getTogether, setGetTogether] = useState(0); //함께해요

  const openFullPlayer = index => {
    setId(musicList.rows[index].id);
    setTitile(musicList.rows[index].title);
    setParticipant(musicList.rows[index].participant);
    setCheering(musicList.rows[index].cheering);
    setLikes(musicList.rows[index].likes);
    setGetTogether(musicList.rows[index].getTogether);
    setCover(index);
    setPlayerOpen(true);
    setIsBottom(false);
    panel.current.show();
  };

  console.log('musicid : ' + props.route.params.musicId);

  useEffect(() => {
    console.log('api get');

    const onSuccess = response => {
      setMusicList(response.data.IBparams);
    };

    const onFailure = error => {
      console.log(error && error.response);
    };

    const getRankedChallenges = async () => {
      await APIKit.get('/challenge/getRankedChallenges')
        .then(onSuccess)
        .catch(onFailure);
    };
    getRankedChallenges();
    return () => {
      console.log('api unmount');
    };
  }, []);

  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'Ranking'}
        navigation={props.navigation}
      />
      <ScrollView>
        {/* 앨범 리스트 start  */}
        <Center>
          <Flex
            width={'82%'}
            flexWrap={'wrap'}
            direction={'row'}
            justifyContent={'space-between'}>
            {musicList &&
              musicList.rows.map((rows, index) => (
                <Box my={5}>
                  <MusicBox
                    key={rows.id}
                    badge={index + 1}
                    cover={index + 1}
                    music={rows.title}
                    owner={rows.participant}
                    onPress={() => openFullPlayer(index)}
                  />
                </Box>
              ))}
          </Flex>
        </Center>
      </ScrollView>
      {/* 앨범 리스트 end */}

      <SlidingUpPanel
        ref={panel}
        allowDragging={scroll}
        draggableRange={{
          top: responsiveHeight(heightPersentage(740)),
          bottom: responsiveHeight(heightPersentage(157)),
        }}
        onMomentumDragStart={() => setIsBottom(false)}
        onBottomReached={() => setIsBottom(true)}
        showBackdrop={false}>
        {isBottom ? (
          <MusicPlayerSmall id={id} title={title} owner={participant} />
        ) : (
          <MusicPlayerFull
            onScroll={HandlerScroll}
            id={id}
            cover={cover}
            title={title}
            owner={participant}
            cheering={cheering}
            likes={likes}
            together={getTogether}
          />
        )}
      </SlidingUpPanel>
    </Box>
  );
}

export default MusicRacking;
