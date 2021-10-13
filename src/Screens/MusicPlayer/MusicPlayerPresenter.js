//음악플레이어
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, FlatList, HStack, Image, Input, Text, VStack} from 'native-base';
import Slider from '@react-native-community/slider';
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
} from '../../Commons/CommonUtil';

import CdDumpImage from '../../Assets/Image/img_dump_cd.png';
import HeartIcon from '../../Assets/Image/icon_musicplayer_heart_green.png';
import FireIcon from '../../Assets/Image/icon_musicplayer_fire_green.png';
import MicIcon from '../../Assets/Image/icon_musicplayer_mic_green.png';

import PulseIcon from '../../Assets/Image/icon_musicplayer_pulse.png';
import SkipBackIcon from '../../Assets/Image/icon_musicplayer_skip_back.png';
import SkipForwordIcon from '../../Assets/Image/icon_musicplayer_skip_forword.png';
import RewindLeftIcon from '../../Assets/Image/icon_musicplayer_rewind_left.png';
import RewindRightIcon from '../../Assets/Image/icon_musicplayer_rewind_right.png';
import PlayIcon from '../../Assets/Image/icon_musicplayer_play_green.png';
import Gbutton from '../../Components/GbuttonComponent';

const MusicPlayerPresenter = props => {
  return (
    <Box
      style={{
        height: responsiveHeight(heightPersentage(740)),
        width: '100%',
        borderRadius: 16,
        backgroundColor: '#fafafa',
      }}>
      {props.playerSize ? (
        <VStack
          safeAreaBottom
          flex={1}
          alignItems={'center'}
          borderRadius={16}
          justifyContent={'space-around'}>
          <Box alignItems={'center'}>
            <Box
              style={{
                width: responsiveWidth(widthPersentage(200)),
                height: responsiveHeight(heightPersentage(200)),
                marginTop: responsiveHeight(heightPersentage(20)),
                marginBottom: responsiveHeight(heightPersentage(10)),
              }}>
              <Image
                source={CdDumpImage}
                resizeMode={'contain'}
                style={{width: '100%', height: '100%'}}
                alt={' '}
              />
            </Box>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(28))}
              bold
              color={'#1a1b1c'}
              noOfLines={1}>
              {props.title && props.title}
            </Text>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(20))}
              bold
              color={'#858c92'}>
              {props.participant && props.participant}
            </Text>
            <Box
              style={{
                width: responsiveWidth(widthPersentage(320)),
              }}>
              <Slider
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={props.percent}
                thumbTintColor="#0fefbd"
                minimumTrackTintColor="#0fefbd"
                maximumTrackTintColor="#a5a8ae"
                onSlidingStart={props.onPausePlay}
                onSlidingComplete={props.changeTime}
                onTouchStart={() => props.onScroll(false)}
                onTouchEnd={() => props.onScroll(true)}
                onTouchCancel={() => props.onScroll(false)}
              />
              <Box>
                <HStack justifyContent={'space-between'}>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(12))}
                    fontWeight={500}
                    color={'#0fefbd'}>
                    {props.playTime}
                  </Text>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(12))}
                    fontWeight={500}
                    color={'#0fefbd'}>
                    {props.duration}
                  </Text>
                </HStack>
              </Box>
              <HStack
                justifyContent={'space-around'}
                alignItems={'center'}
                onTouchStart={() => props.onScroll(false)}
                onTouchEnd={() => props.onScroll(true)}
                onTouchCancel={() => props.onScroll(false)}>
                <TouchableOpacity
                  onPress={
                    props.onPreviousMusic
                      ? () => props.onPreviousMusic()
                      : () => {}
                  }
                  style={{
                    width: responsiveWidth(widthPersentage(36)),
                    height: responsiveHeight(heightPersentage(36)),
                  }}>
                  <Image
                    source={SkipBackIcon}
                    resizeMode={'contain'}
                    style={{width: '100%', height: '100%'}}
                    alt={' '}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: responsiveWidth(widthPersentage(36)),
                    height: responsiveHeight(heightPersentage(36)),
                  }}
                  onPress={props.rewindLeft}>
                  <Image
                    source={RewindLeftIcon}
                    resizeMode={'contain'}
                    style={{width: '100%', height: '100%'}}
                    alt={' '}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: responsiveWidth(widthPersentage(48)),
                    height: responsiveHeight(heightPersentage(48)),
                  }}
                  onPress={
                    props.isPlay
                      ? props.isPause
                        ? props.onResumePlay
                        : props.onPausePlay
                      : props.onStartPlay
                  }>
                  <Image
                    source={
                      props.isPlay
                        ? props.isPause
                          ? PlayIcon
                          : PulseIcon
                        : PlayIcon
                    }
                    resizeMode={'contain'}
                    alt={' '}
                    w={'100%'}
                    h={'100%'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: responsiveWidth(widthPersentage(36)),
                    height: responsiveHeight(heightPersentage(36)),
                  }}
                  onPress={props.rewindRight}>
                  <Image
                    source={RewindRightIcon}
                    resizeMode={'contain'}
                    alt={' '}
                    style={{width: '100%', height: '100%'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={
                    props.onNextMusic ? () => props.onNextMusic() : () => {}
                  }
                  style={{
                    width: responsiveWidth(widthPersentage(36)),
                    height: responsiveHeight(heightPersentage(36)),
                  }}>
                  <Image
                    source={SkipForwordIcon}
                    resizeMode={'contain'}
                    alt={' '}
                    style={{width: '100%', height: '100%'}}
                  />
                </TouchableOpacity>
              </HStack>
            </Box>
            <HStack
              justifyContent={'center'}
              space={10}
              onTouchStart={() => props.onScroll(false)}
              onTouchEnd={() => props.onScroll(true)}
              onTouchCancel={() => props.onScroll(false)}>
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
          </Box>
          {/* 댓글 start */}
          <Box>
            <Box
              style={{
                width: responsiveWidth(widthPersentage(320)),
                height: responsiveHeight(heightPersentage(90)),
              }}>
              <FlatList
                ref={props.scrollEnd}
                onContentSizeChange={props.handleScrollEnd}
                numColumns={1}
                data={props.replyList}
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
              onChangeText={props.setComment}
              value={props.comment}
              fontSize={responsiveFontSize(fontSizePersentage(16))}
              w={responsiveWidth(widthPersentage(320))}
              InputRightElement={
                <Box mr={3}>
                  <Gbutton
                    wp={70}
                    hp={30}
                    fs={18}
                    fw={600}
                    rounded={4}
                    onPress={props.submitComment}
                    text={'등록'}
                  />
                </Box>
              }
            />
          </Box>
          {/* 댓글 end */}
        </VStack>
      ) : (
        //small player start
        <Box
          style={{
            width: responsiveWidth(widthPersentage(390)),
            height: responsiveHeight(heightPersentage(157)),
          }}
          backgroundColor={'#fafafa'}
          borderRadius={16}>
          <VStack
            style={{
              width: responsiveWidth(widthPersentage(163)),
              marginTop: 32,
              marginLeft: 39,
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(fontSizePersentage(14)),
                color: '#1a1b1c',
                textAlign: 'right',
              }}
              noOfLines={1}
              bold>
              {props.title}
            </Text>
            <Text
              noOfLines={1}
              style={{
                fontSize: responsiveFontSize(fontSizePersentage(12)),
                color: '#858c92',
                textAlign: 'right',
              }}>
              {props.participant}
            </Text>
            <HStack
              justifyContent={'space-between'}
              my={4}
              alignItems={'center'}
              onTouchStart={() => props.onScroll(false)}
              onTouchEnd={() => props.onScroll(true)}
              onTouchCancel={() => props.onScroll(false)}>
              <TouchableOpacity
                onPress={
                  props.onPreviousMusic
                    ? () => props.onPreviousMusic()
                    : () => {}
                }
                style={{
                  width: responsiveWidth(widthPersentage(36)),
                  height: responsiveHeight(heightPersentage(36)),
                }}>
                <Image
                  source={SkipBackIcon}
                  resizeMode={'contain'}
                  style={{width: '100%', height: '100%'}}
                  alt={' '}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: responsiveWidth(widthPersentage(48)),
                  height: responsiveHeight(heightPersentage(48)),
                }}
                onPress={
                  props.isPlay
                    ? props.isPause
                      ? props.onResumePlay
                      : props.onPausePlay
                    : props.onStartPlay
                }>
                <Image
                  source={
                    props.isPlay
                      ? props.isPause
                        ? PlayIcon
                        : PulseIcon
                      : PlayIcon
                  }
                  resizeMode={'contain'}
                  alt={' '}
                  w={'100%'}
                  h={'100%'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={
                  props.onNextMusic ? () => props.onNextMusic() : () => {}
                }
                style={{
                  width: responsiveWidth(widthPersentage(36)),
                  height: responsiveHeight(heightPersentage(36)),
                }}>
                <Image
                  source={SkipForwordIcon}
                  resizeMode={'contain'}
                  style={{width: '100%', height: '100%'}}
                  alt={' '}
                />
              </TouchableOpacity>
            </HStack>
          </VStack>
          {/* CD Image start */}
          <Box
            style={{
              position: 'absolute',
              top: 26,
              right: 41,
              width: responsiveWidth(widthPersentage(107)),
              height: responsiveHeight(heightPersentage(107)),
            }}>
            <Image
              source={CdDumpImage}
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode={'contain'}
              alt={' '}
            />
          </Box>
          {/* CD Image end */}
        </Box>
        //small player end
      )}
    </Box>
  );
};

export default MusicPlayerPresenter;
