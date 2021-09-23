import React, {useContext, useEffect, useState, useRef} from 'react';

import {Text, Center, Box, HStack, FlatList, Image} from 'native-base';
import MenuComponent from '../../Components/MenuComponent';
import APIKit from '../../API/APIkit';
import YouTube from 'react-native-youtube';
import {defaultAlertMessage} from '../../Commons/CommonUtil';
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
import Gbutton from '../../Components/GbuttonComponent';
import {UserDispatch} from '../../Commons/UserDispatchProvider';
import VideoBox from '../../Components/VideoBoxComponent';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {TouchableOpacity} from 'react-native';
import ArrowDownIcon from '../../Assets/Image/icon_musicplayer_arrow_down.png';
/*윤호님 카드 컴포넌트 작성법 참조해서 상단에 배경화면들 임포트하기*/
export default function ChallengeVideo(props) {
  const {userId} = useContext(UserDispatch);
  const videoPanel = useRef();
  const [isBottom, setIsBottom] = useState(true);

  const [challengeList, setChallengeList] = useState();
  const [title, setTitle] = useState();
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const getAllOriginalVideo = () => {
      APIKit.post('originalWorks/getAllOriginalVideo', {
        offset: '0',
        limit: '10',
      })
        .then(({data}) => {
          if (data.IBcode === '1000') {
            setChallengeList(data.IBparams.rows);
          }
        })
        .catch(error => {
          if (__DEV__) {
            console.log(error);
          }
        });
    };

    getAllOriginalVideo();

    return () => {
      if (__DEV__) {
        console.log('api unmount');
      }
    };
  }, []);
  const addChallengeTicket = id => {
    if (userId === '' || userId === undefined || userId === null) {
      defaultAlertMessage('로그인 후 이용해 주세요');
      return;
    }
    const payload = {userId: userId.toString(), cType: '2'};
    APIKit.post('challenge/addChallengeTicket', payload)
      .then(({data}) => {
        defaultAlertMessage('참여신청이 완료되었습니다');
      })
      .catch(error => {
        if (__DEV__) {
          console.log(error);
        }
      });
  };
  const openVideoPlayer = (url, titleName) => {
    setVideoUrl(url);
    setTitle(titleName);
    setIsBottom(false);
    videoPanel.current.show();
  };

  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'15초 영상챌린지'}
        navigation={props.navigation}
      />
      <Center flex={1}>
        <Gbutton
          wp={220}
          hp={40}
          fw={800}
          fs={18}
          rounded={8}
          text={'MY CHANLLENGE'}
          onPress={() => props.navigation.navigate('MyChallenge')}
        />
        <FlatList
          mt={4}
          data={challengeList}
          onEndReachedThreshold={1}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Box my={5} alignItems={'center'}>
              <VideoBox
                id={item.id}
                title={item.title}
                cover={(index % 10) + 1}
                participant={item.participant}
                onPress={() => openVideoPlayer(item.videoUrl, item.title)}
              />
              <HStack
                my={2}
                justifyContent={'space-between'}
                style={{width: responsiveWidth(widthPersentage(320))}}>
                <HStack space={1}>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(16))}
                    fontWeight={800}
                    color={'#858c92'}>
                    작곡 :
                  </Text>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(16))}
                    fontWeight={500}
                    color={'#858c92'}
                    noOfLines={1}
                    style={{maxWidth: responsiveWidth(widthPersentage(58))}}>
                    {item.songWriter}
                  </Text>
                </HStack>
                <HStack space={1}>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(16))}
                    fontWeight={800}
                    color={'#858c92'}>
                    편곡 :
                  </Text>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(16))}
                    fontWeight={500}
                    color={'#858c92'}
                    noOfLines={1}
                    style={{maxWidth: responsiveWidth(widthPersentage(58))}}>
                    {item.songComposer}
                  </Text>
                </HStack>
                <HStack space={1}>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(16))}
                    fontWeight={800}
                    color={'#858c92'}>
                    안무 :
                  </Text>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(16))}
                    fontWeight={500}
                    color={'#858c92'}
                    noOfLines={1}
                    style={{maxWidth: responsiveWidth(widthPersentage(58))}}>
                    {item.danceCreator}
                  </Text>
                </HStack>
              </HStack>
              <Gbutton
                wp={220}
                hp={40}
                fw={800}
                fs={18}
                rounded={8}
                text={'참여신청'}
                onPress={() => addChallengeTicket(item.id)}
              />
            </Box>
          )}
          keyExtractor={item => item.id}
        />
      </Center>
      <SlidingUpPanel
        ref={videoPanel}
        allowDragging={true}
        backdropOpacity={0.98}
        friction={0.01}
        draggableRange={{
          top: responsiveHeight(heightPersentage(600)),
          bottom: responsiveHeight(heightPersentage(0)),
        }}
        onMomentumDragStart={() => setIsBottom(false)}
        onBottomReached={() => setIsBottom(true)}
        showBackdrop={false}>
        {isBottom ? (
          <></>
        ) : (
          <Box
            style={{
              width: '100%',
              height: responsiveHeight(heightPersentage(340)),
            }}>
            <Center>
              <Box bgColor="white" pt={3} w="100%">
                <HStack px={5} alignItems={'center'}>
                  <Text
                    color={'#0a0b0c'}
                    fontSize={responsiveFontSize(fontSizePersentage(24))}
                    noOfLines={1}
                    style={{width: responsiveWidth(widthPersentage(300))}}>
                    {title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => videoPanel.current.hide()}
                    style={{position: 'absolute', right: 20}}>
                    <Image
                      source={ArrowDownIcon}
                      alt={' '}
                      style={{
                        width: responsiveWidth(widthPersentage(24)),
                        height: responsiveHeight(heightPersentage(24)),
                      }}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                </HStack>
              </Box>
              <Box bgColor="white" p={3} w="100%">
                <YouTube
                  videoId={videoUrl.substring(videoUrl.lastIndexOf('/') + 1)}
                  apiKey={'AIzaSyBiuFMJXY3vEGRrkZ00XupTLQeuY7BkyLA'}
                  play={false}
                  fullscreen={false}
                  loop={false}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
            </Center>
          </Box>
        )}
      </SlidingUpPanel>
    </Box>
  );
}
