//파인애플 뮤직 화면
import {Box, Center, FlatList, HStack, VStack} from 'native-base';
import React, {useRef, useState, useEffect} from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {heightPersentage} from '../../Commons/DeviceWHPersentage';

import MenuComponent from '../../Components/MenuComponent';
import SlidingUpPanel from 'rn-sliding-up-panel';
import MusicPlayer from '../../Components/MusicPlayer';
import MusicBox from '../../Components/MusicBoxComponent';
import Gbutton from '../../Components/GbuttonComponent';
import APIKit from '../../API/APIkit';
import VideoBox from '../../Components/VideoBoxComponent';
import VideoPlayer from '../../Components/VideoPlayer';
import {defaultAlertMessage} from '../../Commons/CommonUtil';

function ChallengeEnjoy(props) {
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
    setIsBottom(false);
    videoPanel.current.show();
  };

  useEffect(() => {
    console.log('api get');
    const propsId = props.route.params.id.toString();
    if (cType === 2) {
      setIsBottom(true);
      videoPanel.current.hide();
    }

    const onFailure = error => {
      console.log(error && error.response);
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
              console.log(`propsId:${propsId}`);
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
      console.log('api unmount');
    };
  }, [cType, props.route.params.id]);

  const handleLoadMore = async () => {
    const payload = {cType: cType.toString(), offset: offset.toString()};
    console.log(payload);
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
        console.log(error);
      });
  };

  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'모두의 챌린지'}
        navigation={props.navigation}
      />
      {/* <ScrollView> */}
      {/* Search Box start */}
      {/* <VStack>
        <Center>
          <Box
            style={{
              width: responsiveWidth(widthPersentage(300)),
              height: responsiveHeight(heightPersentage(35)),
              paddingTop: 2,
              paddingBottom: 2,
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: '#fafafa80',
              borderRadius: 8,
              marginBottom: 5,
            }}>
            <Input
              variant="underlined"
              placeholder="Search"
              fontSize={responsiveFontSize(fontSizePersentage(16))}
              borderBottomColor="#0fefbd"
              InputLeftElement={
                <Image
                  source={SearchIcon}
                  resizeMode={'contain'}
                  alt={' '}
                  style={{
                    width: responsiveWidth(widthPersentage(25)),
                    height: responsiveHeight(heightPersentage(24)),
                  }}
                />
              }
            />
          </Box>
        </Center>
      </VStack> */}
      {/* Search Box end */}
      <VStack mb={5}>
        {/* HashTag start */}
        <HStack justifyContent={'center'} space={2}>
          <Gbutton
            wp={56}
            hp={26}
            fs={13}
            fw={500}
            rounded={4}
            text={'# 노래'}
            disable={cType === 1 ? false : true}
            onPressActive={true}
            onPress={() => setCType(1)}
          />
          <Gbutton
            wp={56}
            hp={26}
            fs={13}
            fw={500}
            rounded={4}
            text={'# 영상'}
            disable={cType === 2 ? false : true}
            onPressActive={true}
            onPress={() => setCType(2)}
          />
          <Gbutton
            wp={56}
            hp={26}
            fs={13}
            fw={500}
            rounded={4}
            text={'# 연주'}
            onPressActive
            onPress={() => defaultAlertMessage('준비중입니다')}
            disable
          />
          <Gbutton
            wp={56}
            hp={26}
            fs={13}
            fw={500}
            rounded={4}
            text={'# 편곡'}
            onPressActive
            onPress={() => defaultAlertMessage('준비중입니다')}
            disable
          />
        </HStack>
      </VStack>
      {/* HashTag end */}
      {/* 노래 리스트 start  */}
      {cType === 1 ? (
        <Center
          flex={1}
          style={{paddingBottom: responsiveHeight(heightPersentage(157))}}>
          <FlatList
            numColumns={2}
            data={musicList}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Box m={3}>
                <MusicBox
                  id={item.id}
                  cover={1}
                  music={item.title}
                  owner={item.participant}
                  onPress={() => openMusicPlayer(index)}
                />
              </Box>
            )}
            keyExtractor={item => item.id + item.participant}
          />
        </Center>
      ) : (
        <></>
      )}
      {/* 노래 리스트 end */}
      {/* 영상 리스트 start  */}
      {cType === 2 ? (
        <Center flex={1}>
          <FlatList
            data={videoList}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={1}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Box my={5}>
                <VideoBox
                  id={item.id}
                  title={item.title}
                  participant={item.participant}
                  onScroll={HandlerScroll}
                  onPress={() => openVideoPlayer(index)}
                />
              </Box>
            )}
            keyExtractor={item => item.id}
          />
        </Center>
      ) : (
        <></>
      )}
      {/* 영상 리스트 end */}
      {/* </ScrollView> */}
      {cType === 1 ? (
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
      ) : (
        <></>
      )}
      {cType === 2 ? (
        <SlidingUpPanel
          ref={videoPanel}
          allowDragging={scroll}
          backdropOpacity={0.98}
          draggableRange={{
            top: responsiveHeight(heightPersentage(740)),
            bottom: responsiveHeight(heightPersentage(0)),
          }}
          onMomentumDragStart={() => setIsBottom(false)}
          onBottomReached={() => setIsBottom(true)}
          showBackdrop={false}>
          {isBottom ? (
            <></>
          ) : (
            <VideoPlayer
              onScroll={HandlerScroll}
              id={id}
              playerSize={isBottom ? false : true}
            />
          )}
        </SlidingUpPanel>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default ChallengeEnjoy;
