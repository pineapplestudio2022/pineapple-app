import React, {useContext, useEffect, useState} from 'react';

import {Text, Center, Box, ScrollView, HStack} from 'native-base';
import MenuComponent from '../../Components/MenuComponent';
import APIKit from '../../API/APIkit';
import YouTube from 'react-native-youtube';
import {defaultAlertMessage, YouTubeAPIKey} from '../../Commons/CommonUtil';
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

/*윤호님 카드 컴포넌트 작성법 참조해서 상단에 배경화면들 임포트하기*/
export default function ChallengeVideo(props) {
  const {userId} = useContext(UserDispatch);
  const [challengeList, setChallengeList] = useState();

  useEffect(() => {
    const getAllOriginalVideo = () => {
      APIKit.post('originalWorks/getAllOriginalVideo', {
        offset: '0',
        limit: '10',
      })
        .then(({data}) => {
          if (data.IBcode === '1000') {
            setChallengeList(data.IBparams);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };

    getAllOriginalVideo();

    return () => {
      console.log('api unmount');
    };
  }, []);

  const addChallengeTicket = id => {
    const payload = {userId: userId.toString(), cType: '2'};
    APIKit.post('challenge/addChallengeTicket', payload)
      .then(({data}) => {
        console.log(data);
        defaultAlertMessage('참여신청이 완료되었습니다');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'15초 영상챌린지'}
        navigation={props.navigation}
      />
      <ScrollView safeAreaBottom>
        <Center>
          <Gbutton
            wp={220}
            hp={40}
            fw={800}
            fs={18}
            rounded={8}
            text={'MY CHANLLENGE'}
            onPress={() => props.navigation.navigate('MyChallenge')}
          />
          {challengeList &&
            challengeList.rows.map(rows => (
              <>
                <Text
                  mt={5}
                  mb={3}
                  bold
                  color={'#1a1b1c'}
                  fontSize={responsiveFontSize(fontSizePersentage(22))}>
                  {rows.title}
                </Text>
                <Box
                  rounded={8}
                  overflow={'hidden'}
                  style={{
                    width: responsiveWidth(widthPersentage(320)),
                    height: responsiveHeight(heightPersentage(274)),
                  }}>
                  <YouTube
                    videoId={rows.videoUrl.substring(
                      rows.videoUrl.lastIndexOf('/') + 1,
                    )}
                    apiKey={YouTubeAPIKey}
                    play={false}
                    fullscreen={false}
                    loop={false}
                    controls={0}
                    style={{width: '100%', height: '100%'}}
                  />
                </Box>
                <HStack
                  my={1}
                  justifyContent={'space-around'}
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
                      {rows.songWriter}
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
                      {rows.songComposer}
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
                      {rows.danceCreator}
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
                  onPress={() => addChallengeTicket(rows.id)}
                />
              </>
            ))}
        </Center>
        <Box h={100} />
      </ScrollView>
    </Box>
  );
}
