//파인애플 뮤직 화면
import {
  Box,
  Center,
  Flex,
  HStack,
  Image,
  Input,
  ScrollView,
  VStack,
} from 'native-base';
import React, {useRef, useState, useEffect} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../../Commons/DeviceWHPersentage';

import MenuComponent from '../../Components/MenuComponent';
import SlidingUpPanel from 'rn-sliding-up-panel';
import MusicPlayer from '../../Components/MusicPlayer';
import SearchIcon from '../../Assets/Image/icon_main_search.png';
import MusicBox from '../../Components/MusicBoxComponent';
import Gbutton from '../../Components/GbuttonComponent';
import APIKit from '../../API/APIkit';
import VideoBox from '../../Components/VideoBoxComponent';
import VideoPlayer from '../../Components/VideoPlayer';

function ChallengeEnjoy(props) {
  const musicPanel = useRef();
  const videoPanel = useRef();
  const [scroll, setScroll] = useState(true);

  const [isBottom, setIsBottom] = useState(true);
  const HandlerScroll = bool => setScroll(bool);

  const [cType, setCType] = useState(1); //태그 선택 1:노래, 2:영상, 3:연주, 4:편곡

  const [musicList, setMusicList] = useState(); //노래 챌린지 리스트
  const [videoList, setVideoList] = useState(); //비디오 챌린지 리스트

  const [id, setId] = useState(''); //id

  const openMusicPlayer = index => {
    setId(musicList.rows[index].id);
    setIsBottom(false);
    musicPanel.current.show();
  };

  const openVideoPlayer = index => {
    // setId(videoList.rows[index].id.toString());
    setIsBottom(false);
    videoPanel.current.show();
  };

  useEffect(() => {
    console.log('api get');
    if (cType === 2) {
      setIsBottom(true);
      videoPanel.current.hide();
    }
    const onSuccess = response => {
      console.log(response.data.IBparams);
      setMusicList(response.data.IBparams);
    };

    const onFailure = error => {
      console.log(error && error.response);
    };

    const payload = {cType: cType.toString()};
    const getAllChallenges = async () => {
      await APIKit.post('/challenge/getAllChallenges', payload)
        .then(onSuccess)
        .catch(onFailure);
    };
    getAllChallenges();

    return () => {
      console.log('api unmount');
    };
  }, [cType]);

  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'모두의 챌린지'}
        navigation={props.navigation}
      />
      <ScrollView>
        {/* Search Box start */}
        <VStack>
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
        </VStack>
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
              onPress={() => alert('준비중입니다')}
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
              onPress={() => alert('준비중입니다')}
              disable
            />
          </HStack>
        </VStack>
        {/* HashTag end */}
        {/* 노래 리스트 start  */}
        {cType === 1 ? (
          <Center>
            <Flex
              width={'82%'}
              flexWrap={'wrap'}
              direction={'row'}
              justifyContent={'space-between'}>
              {musicList &&
                musicList.rows.map((rows, index) => (
                  <Box my={5} key={rows.id + index}>
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
        ) : (
          <></>
        )}
        {/* 노래 리스트 end */}
        {/* 영상 리스트 start  */}
        {cType === 2 ? (
          <Center>
            {/* {musicList &&
              musicList.rows.map((rows, index) => (
                <VideoBox onPress={() => openVideoPlayer()} />
              ))} */}
            <VideoBox
              id={1}
              onScroll={HandlerScroll}
              onPress={() => openVideoPlayer()}
            />
          </Center>
        ) : (
          <></>
        )}
        {/* 영상 리스트 end */}
      </ScrollView>
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
          <VideoPlayer
            onScroll={HandlerScroll}
            playerSize={isBottom ? false : true}
          />
        </SlidingUpPanel>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default ChallengeEnjoy;
