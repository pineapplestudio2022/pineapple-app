import React from 'react';
import {Box, Center, FlatList, HStack, Image, Text} from 'native-base';

import MenuComponent from '../../Components/MenuComponent';
import Gbutton from '../../Components/GbuttonComponent';
import VideoBox from '../../Components/VideoBoxComponent';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
  YouTubeAPIKey,
} from '../../Commons/CommonUtil';
import {TouchableOpacity} from 'react-native';
import ArrowDownIcon from '../../Assets/Image/icon_musicplayer_arrow_down.png';
import YouTube from 'react-native-youtube';
const youtubeApiKey = YouTubeAPIKey();
const PineClipPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'PineClip'}
        navigation={props.navigation}
      />
      <Box flex={1} bgColor={'#fafafacc'} rounded={16}>
        <HStack space={2} justifyContent={'center'} mt={6}>
          <Gbutton
            wp={56}
            hp={26}
            disable={props.category === 1 ? false : true}
            onPressActive
            text={'세탁기'}
            fs={13}
            fw={'500'}
            rounded={4}
            onPress={() => props.handlerCategory(1)}
          />
          <Gbutton
            wp={70}
            hp={26}
            disable={props.category === 2 ? false : true}
            onPressActive
            text={'PineDoll'}
            fs={13}
            fw={'500'}
            rounded={4}
            onPress={() => props.handlerCategory(2)}
          />
          <Gbutton
            wp={130}
            hp={26}
            disable={props.category === 3 ? false : true}
            onPressActive
            text={'PineDoll Interview'}
            fs={13}
            fw={'500'}
            rounded={4}
            onPress={() => props.handlerCategory(3)}
          />
        </HStack>
        <FlatList
          mt={2}
          data={props.videoList}
          //   onEndReached={props.handleLoadMore}
          //   onEndReachedThreshold={0.2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={3}
          renderItem={({item, index}) => (
            <Box my={3} alignItems={'center'}>
              <VideoBox
                id={item.id}
                title={item.title}
                participant={item.category}
                videoUrl={item.url}
                onPress={() => props.openVideoPlayer(item.url, item.title)}
                wp={320}
                hp={230}
              />
            </Box>
          )}
          keyExtractor={item => item.id}
        />
      </Box>
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

export default PineClipPresenter;
