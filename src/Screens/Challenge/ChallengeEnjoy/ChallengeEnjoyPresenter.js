//파인애플 뮤직 화면
import React from 'react';
import {Box, Center, FlatList, HStack, VStack} from 'native-base';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {
  heightPersentage,
  defaultAlertMessage,
} from '../../../Commons/CommonUtil';

import MenuComponent from '../../../Components/MenuComponent';
import MusicPlayer from '../../../Components/MusicPlayer';
import MusicBox from '../../../Components/MusicBoxComponent';
import Gbutton from '../../../Components/GbuttonComponent';
import VideoBox from '../../../Components/VideoBoxComponent';
import VideoPlayer from '../../../Components/VideoPlayer';

const ChallengeEnjoyPresenter = props => {
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
            disable={props.cType === 1 ? false : true}
            onPressActive={true}
            onPress={() => props.setCType(1)}
          />
          <Gbutton
            wp={56}
            hp={26}
            fs={13}
            fw={500}
            rounded={4}
            text={'# 영상'}
            disable={props.cType === 2 ? false : true}
            onPressActive={true}
            onPress={() => props.setCType(2)}
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
      {props.cType === 1 ? (
        <Center
          flex={1}
          style={{paddingBottom: responsiveHeight(heightPersentage(157))}}>
          <FlatList
            numColumns={2}
            data={props.musicList}
            onEndReached={props.handleLoadMore}
            onEndReachedThreshold={0.2}
            initialNumToRender={8}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Box m={3}>
                <MusicBox
                  id={item.id}
                  cover={(index % 10) + 1}
                  music={item.title}
                  owner={item.participant}
                  onPress={() => props.openMusicPlayer(index)}
                />
              </Box>
            )}
            keyExtractor={item => item.id}
          />
        </Center>
      ) : (
        <></>
      )}
      {/* 노래 리스트 end */}
      {/* 영상 리스트 start  */}
      {props.cType === 2 ? (
        <Center flex={1}>
          <FlatList
            data={props.videoList}
            onEndReached={props.handleLoadMore}
            onEndReachedThreshold={0.2}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Box my={5}>
                <VideoBox
                  id={item.id}
                  title={item.title}
                  cover={(index % 10) + 1}
                  participant={item.participant}
                  onScroll={props.HandlerScroll}
                  onPress={() => props.openVideoPlayer(index)}
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
      {props.cType === 1 ? (
        <SlidingUpPanel
          ref={props.musicPanel}
          allowDragging={props.scroll}
          friction={0.2}
          draggableRange={{
            top: responsiveHeight(heightPersentage(740)),
            bottom: responsiveHeight(heightPersentage(157)),
          }}
          onMomentumDragStart={() => props.setIsBottom(false)}
          onBottomReached={() => props.setIsBottom(true)}
          showBackdrop={false}>
          <MusicPlayer
            onScroll={props.HandlerScroll}
            onNextMusic={props.handlerNextMusic}
            onPreviousMusic={props.handlerPreviousMusic}
            id={props.id}
            playerSize={props.isBottom ? false : true}
          />
        </SlidingUpPanel>
      ) : (
        <></>
      )}
      {props.cType === 2 ? (
        <SlidingUpPanel
          ref={props.videoPanel}
          allowDragging={props.scroll}
          backdropOpacity={0.98}
          draggableRange={{
            top: responsiveHeight(heightPersentage(740)),
            bottom: responsiveHeight(heightPersentage(0)),
          }}
          friction={0.2}
          onMomentumDragStart={() => props.setIsBottom(false)}
          onBottomReached={() => props.setIsBottom(true)}
          showBackdrop={false}>
          {props.isBottom ? (
            <></>
          ) : (
            <VideoPlayer
              onScroll={props.HandlerScroll}
              id={props.id}
              videoPanel={props.HandlerVideoPanel}
              shareLink={props.shareLink}
              playerSize={props.isBottom ? false : true}
            />
          )}
        </SlidingUpPanel>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ChallengeEnjoyPresenter;
