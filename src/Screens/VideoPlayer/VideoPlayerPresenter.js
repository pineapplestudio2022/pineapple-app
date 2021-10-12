//VideoPlayer
import React from 'react';
import {
  Box,
  Center,
  Divider,
  FlatList,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import YouTube from 'react-native-youtube';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  YouTubeAPIKey,
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../../Commons/CommonUtil';
import Gbutton from '../../Components/GbuttonComponent';

import HeartIcon from '../../Assets/Image/icon_musicplayer_heart_green.png';
import FireIcon from '../../Assets/Image/icon_musicplayer_fire_green.png';
import MicIcon from '../../Assets/Image/icon_musicplayer_mic_green.png';
import ArrowDownIcon from '../../Assets/Image/icon_musicplayer_arrow_down.png';

const youtubeApiKey = YouTubeAPIKey();

const VideoPlayerPresenter = props => {
  return (
    <Box flex={1} backgroundColor={'#fafafa'} borderRadius={16} safeAreaBottom>
      <VStack space={2}>
        <Box
          style={{
            width: '100%',
            height: responsiveHeight(heightPersentage(214)),
          }}>
          <YouTube
            videoId={props.shareLink}
            apiKey={youtubeApiKey}
            play={false}
            fullscreen={false}
            loop={false}
            style={{width: '100%', height: '100%'}}
          />
        </Box>
        <HStack justifyContent={'space-between'} px={3}>
          <VStack>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(28))}
              color={'#1a1b1c'}
              bold
              w={'100%'}
              noOfLines={1}>
              {props.title}
            </Text>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(20))}
              color={'#858c92'}
              w={'100%'}
              noOfLines={1}>
              {props.participant}
            </Text>
          </VStack>
          <TouchableOpacity onPress={() => props.videoPanel()}>
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

        <Divider />
        {/* 응원해요, 찜, 함꼐해요 start */}
        <HStack justifyContent={'center'} space={10} mb={4}>
          <VStack>
            <TouchableOpacity
              onPress={
                props.cheeringEnalbe
                  ? () => props.handleCount('cheering')
                  : props.authMessage
              }
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
                {props.cheeringCount}
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
                color={props.cheeringEnalbe ? '#0fefbd' : '#a1b1c1'}>
                응원해요
              </Text>
            </TouchableOpacity>
          </VStack>
          <VStack>
            <TouchableOpacity
              onPress={
                props.likesEnable
                  ? () => props.handleCount('likes')
                  : props.authMessage
              }
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
                {props.likesCount}
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
                color={props.likesEnable ? '#0fefbd' : '#a1b1c1'}>
                찜
              </Text>
            </TouchableOpacity>
          </VStack>
          <VStack>
            <TouchableOpacity
              onPress={
                props.togetherEnable
                  ? () => props.handleCount('getTogether')
                  : props.authMessage
              }
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
                {props.togetherCount}
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
                color={props.togetherEnable ? '#0fefbd' : '#a1b1c1'}>
                함께해요
              </Text>
            </TouchableOpacity>
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

            <FlatList
              ref={props.scrollEnd}
              onContentSizeChange={props.handleScrollEnd}
              numColumns={1}
              data={props.replyList && props.replyList}
              initialNumToRender={5}
              onTouchStart={() => props.onScroll(false)}
              onTouchEnd={() => props.onScroll(true)}
              onTouchCancel={() => props.onScroll(false)}
              // onEndReached={handleLoadMore}
              onEndReachedThreshold={0.2}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <HStack justifyContent={'space-around'} my={1}>
                  <Text
                    width={responsiveScreenWidth(widthPersentage(90))}
                    fontSize={responsiveFontSize(fontSizePersentage(14))}
                    bold
                    color={'#1a1b1c'}
                    textAlign={'left'}
                    noOfLines={1}>
                    {item.email}
                  </Text>
                  <Text
                    width={responsiveScreenWidth(widthPersentage(200))}
                    fontSize={responsiveFontSize(fontSizePersentage(14))}
                    fontWeight={500}>
                    {item.reply}
                  </Text>
                </HStack>
              )}
              keyExtractor={item => item.id}
            />
          </Box>
          <Input
            mt={4}
            borderWidth={1}
            borderColor={'#a5a8ae4c'}
            backgroundColor={'#fafafab3'}
            placeholder={'응원의 한 줄을 남겨주세요~'}
            value={props.comment}
            onChangeText={props.setComment}
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
                  onPress={props.submitComment}
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
};

export default VideoPlayerPresenter;
