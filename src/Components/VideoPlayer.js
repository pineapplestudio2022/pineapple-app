//음악플레이어 큰화면
import {
  Box,
  Center,
  Divider,
  HStack,
  Image,
  Input,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../Commons/DeviceWHPersentage';

import HeartIcon from '../Assets/Image/icon_musicplayer_heart_green.png';
import FireIcon from '../Assets/Image/icon_musicplayer_fire_green.png';
import MicIcon from '../Assets/Image/icon_musicplayer_mic_green.png';
import ArrowDownIcon from '../Assets/Image/icon_musicplayer_arrow_down.png';

import APIKit from '../API/APIkit';
import {UserDispatch} from '../Commons/UserDispatchProvider';
import Gbutton from './GbuttonComponent';
import {YouTubeAPIKey} from '../Commons/CommonUtil';
import YouTube from 'react-native-youtube';

function VideoPlayer(props) {
  const {userId, dispatch} = useContext(UserDispatch);

  const [replyList, setReplyList] = useState(); //댓글 리스트
  const [replyUpdateCheck, setReplyUpdateCheck] = useState(false); //댓글 업데이트 체크
  const [comment, setComment] = useState('');

  const [title, setTitle] = useState(''); //노래 제목
  const [participant, setParticipant] = useState(''); //소유자
  const [cheeringCount, setCheeringCount] = useState(0); //응원해요
  const [cheeringEnalbe, setCheeringEnable] = useState(false); //응원해요 버튼 활성화
  const [likesCount, setLikesCount] = useState(0); //찜
  const [likesEnable, setLikesEnable] = useState(false); //찜 버튼 활성화
  const [togetherCount, setTogetherCount] = useState(0); //함께해요
  const [togetherEnable, setTogetherEnalbe] = useState(false); //함께해요 버튼 활성화

  const scrollEnd = useRef(); //scrollview

  useEffect(() => {
    const payload = {challengeId: props.id, userId: userId};

    const onFailure = error => {
      console.log(error && error.response);
    };

    const getReply = async () => {
      await APIKit.post('/challenge/getChallengeReply', payload)
        .then(response => {
          setReplyList(response.data.IBparams.rows);
          setReplyUpdateCheck(false);
        })
        .catch(onFailure);
    };

    const getChallenge = async () => {
      await APIKit.post('/challenge/getChallenge', payload)
        .then(response => {
          console.log(response);
          setTitle(response.data.IBparams.title);
          setParticipant(response.data.IBparams.participant);
          setCheeringCount(response.data.IBparams.cheering);
          setLikesCount(response.data.IBparams.likes);
          setTogetherCount(response.data.IBparams.getTogether);
          setCheeringEnable(response.data.IBparams.enableAddCheeringCount);
          setLikesEnable(response.data.IBparams.enableAddLikesCount);
          setTogetherEnalbe(response.data.IBparams.enableAddGetTogetherCount);
        })
        .catch(onFailure);
    };
    if (props.id) {
      getReply();
      getChallenge();
    }

    return () => {
      console.log('api unmount');
    };
  }, [props.id, replyUpdateCheck, userId]);

  //응원,찜,함께해요 handler
  const handleCount = async name => {
    if (userId === '') {
      alert('로그인 후 사용가능합니다.');
      return;
    }
    const payload = {
      challengeId: props.id,
      userId: userId,
      likeTypeString: name,
    };
    await APIKit.post('/challenge/addLikeCount', payload).catch(error => {
      console.log(error);
    });
  };

  //댓글 입력
  const submitComment = async () => {
    if (userId === '') {
      alert('로그인 후 사용 가능합니다.');
      return;
    }
    const payload = {userId: userId, reply: comment, challengeId: props.id};
    console.log(payload);
    await APIKit.post('/challenge/AddSongReply', payload)
      .then(response => {
        console.log(response);
        setReplyUpdateCheck(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  //댓글 창 스크롤 밑으로 이동
  const handleScrollEnd = () => {
    scrollEnd.current.scrollToEnd({animated: false});
  };

  return (
    <Box flex={1} backgroundColor={'#fafafa'} borderRadius={16} safeAreaBottom>
      <VStack space={2}>
        <Box
          style={{
            width: '100%',
            height: responsiveHeight(heightPersentage(214)),
          }}
          borderWidth={1}>
          <YouTube
            videoId="KVZ-P-ZI6W4"
            apiKey={YouTubeAPIKey}
            play={false}
            fullscreen={false}
            loop={false}
            // controls={0}
            onReady={e => console.log('onReady')}
            onChangeState={e => console.log('onChangeState:', e.state)}
            onChangeQuality={e => console.log('onChangeQuality: ', e.quality)}
            onError={e => console.log('onError: ', e.error)}
            style={{width: '100%', height: '100%'}}
          />
        </Box>
        <Box pl={3} py={1}>
          <Pressable
            position={'absolute'}
            right={11}
            top={1}
            style={{
              width: responsiveWidth(widthPersentage(24)),
              height: responsiveHeight(heightPersentage(24)),
            }}>
            <Image
              source={ArrowDownIcon}
              alt={' '}
              style={{width: '100%', height: '100%'}}
              resizeMode={'contain'}
            />
          </Pressable>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(28))}
            color={'#1a1b1c'}
            bold
            w={'100%'}
            noOfLines={1}>
            {title}곡 제목이 들어갈 공간입니다
          </Text>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(20))}
            color={'#858c92'}
            w={'100%'}
            noOfLines={1}>
            {participant}참여자 이름
          </Text>
        </Box>
        <Divider />
        {/* 응원해요, 찜, 함꼐해요 start */}
        <HStack justifyContent={'center'} space={10}>
          <VStack>
            <TouchableOpacity
              onPress={handleCount}
              style={{
                width: responsiveWidth(widthPersentage(60)),
                height: responsiveHeight(heightPersentage(80)),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#a5a8ae'}>
                {cheeringCount}
              </Text>
              <Image
                source={FireIcon}
                alt={' '}
                style={{
                  width: responsiveWidth(widthPersentage(38)),
                  height: responsiveHeight(heightPersentage(38)),
                }}
                resizeMode={'contain'}
              />
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#0fefbd'}>
                응원해요
              </Text>
            </TouchableOpacity>
          </VStack>
          <VStack>
            <Pressable
              style={{
                width: responsiveWidth(widthPersentage(60)),
                height: responsiveHeight(heightPersentage(80)),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#a5a8ae'}>
                {likesCount}
              </Text>
              <Image
                source={HeartIcon}
                style={{
                  width: responsiveWidth(widthPersentage(38)),
                  height: responsiveHeight(heightPersentage(38)),
                }}
                alt={' '}
                resizeMode={'contain'}
              />
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#0fefbd'}>
                찜
              </Text>
            </Pressable>
          </VStack>
          <VStack>
            <Pressable
              style={{
                width: responsiveWidth(widthPersentage(60)),
                height: responsiveHeight(heightPersentage(80)),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#a5a8ae'}>
                {togetherCount}
              </Text>
              <Image
                source={MicIcon}
                style={{
                  width: responsiveWidth(widthPersentage(38)),
                  height: responsiveHeight(heightPersentage(38)),
                }}
                alt={' '}
                resizeMode={'contain'}
              />
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#0fefbd'}>
                함께해요
              </Text>
            </Pressable>
          </VStack>
        </HStack>
        {/* 응원해요, 찜, 함꼐해요 end */}
        <Divider />
        {/* 댓글 start */}
        <Center>
          <Box
            w={'100%'}
            style={{
              height: responsiveHeight(heightPersentage(230)),
            }}>
            <HStack space={2}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                fontWeight={500}
                color={'#1a1b1c'}>
                Comments
              </Text>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(14))}
                color={'#a5a8ae'}>
                {/* 댓글 카운트 수 */}
              </Text>
            </HStack>

            <ScrollView
              ref={scrollEnd}
              showsVerticalScrollIndicator={false}
              onTouchStart={() => props.onScroll(false)}
              onTouchEnd={() => props.onScroll(true)}
              onTouchCancel={() => props.onScroll(false)}
              onContentSizeChange={handleScrollEnd}>
              {replyList &&
                replyList.map(rows => (
                  <HStack justifyContent={'space-around'} my={1} key={rows.id}>
                    <Text
                      width={responsiveScreenWidth(widthPersentage(90))}
                      fontSize={responsiveFontSize(fontSizePersentage(14))}
                      bold
                      color={'#1a1b1c'}
                      textAlign={'right'}
                      noOfLines={1}>
                      {rows.email}
                    </Text>
                    <Text
                      width={responsiveScreenWidth(widthPersentage(200))}
                      fontSize={responsiveFontSize(fontSizePersentage(14))}
                      fontWeight={500}>
                      {rows.reply}
                    </Text>
                  </HStack>
                ))}
            </ScrollView>
          </Box>
          <Input
            mt={4}
            borderWidth={1}
            borderColor={'#a5a8ae4c'}
            backgroundColor={'#fafafab3'}
            placeholder={'응원의 한 줄을 남겨주세요~'}
            onChangeText={text => setComment(text)}
            fontSize={responsiveFontSize(fontSizePersentage(16))}
            w={responsiveWidth(widthPersentage(320))}
            InputRightElement={
              <Box mr={3}>
                <Gbutton
                  wp={70}
                  hp={24}
                  fs={18}
                  fw={600}
                  rounded={4}
                  onPress={submitComment}
                  text={'등록'}
                />
              </Box>
            }
          />
        </Center>
        {/* 댓글 end */}
      </VStack>
    </Box>
  );
}

export default VideoPlayer;