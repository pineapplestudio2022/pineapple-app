import React from 'react';

import {Text, Center, Box, HStack, FlatList, Image} from 'native-base';
import MenuComponent from '../../../Components/MenuComponent';
import YouTube from 'react-native-youtube';
import {
  YouTubeAPIKey,
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../../../Commons/CommonUtil';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import Gbutton from '../../../Components/GbuttonComponent';
import VideoBox from '../../../Components/VideoBoxComponent';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {TouchableOpacity} from 'react-native';
import ArrowDownIcon from '../../../Assets/Image/icon_musicplayer_arrow_down.png';

const youtubeApiKey = YouTubeAPIKey();

const ChallengeVideoPresenter = props => {
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
          onPress={() => props.navigation.navigate('MyChallengeNavigation')}
        />
        <FlatList
          mt={4}
          data={props.challengeList}
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
                onPress={() => props.openVideoPlayer(item.videoUrl, item.title)}
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
                onPress={() => props.addChallengeTicket(item.id)}
              />
            </Box>
          )}
          keyExtractor={item => item.id}
        />
      </Center>
      <SlidingUpPanel
        ref={props.videoPanel}
        allowDragging={false}
        backdropOpacity={0.98}
        friction={0.01}
        draggableRange={{
          top: responsiveHeight(heightPersentage(600)),
          bottom: responsiveHeight(heightPersentage(0)),
        }}
        onMomentumDragStart={() => props.setIsBottom(false)}
        onBottomReached={() => props.setIsBottom(true)}
        showBackdrop={false}>
        {props.isBottom ? (
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
                    {props.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => props.videoPanel.current.hide()}
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
                  videoId={props.videoUrl}
                  apiKey={youtubeApiKey}
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
};

export default ChallengeVideoPresenter;
