import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Badge,
  Box,
  FlatList,
  HStack,
  Image,
  Slider,
  Text,
  VStack,
} from 'native-base';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {
  fontSizePersentage,
  getImageById,
  widthPersentage,
} from '../../Commons/CommonUtil';
import Gbutton from '../../Components/GbuttonComponent';

import TrashIcon from '../../Assets/Image/challenge/icon_challenge_trash.png';

const MyBGMCardPresenter = props => {
  const {
    percent,
    isPlay,
    createdAt,
    keyword,
    bgmStudioId,
    whereUse,
    handlerDownload,
    deleteAlert,
    handlePlay,
  } = props;
  return (
    <Box
      w={320}
      h={110}
      backgroundColor={'#ffffff80'}
      borderRadius={8}
      style={{
        shadowColor: '#8799a45b',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 10,
        shadowOpacity: 1,
      }}>
      <HStack space={3} w="100%" h="100%" padding={2} borderRadius={8}>
        <Box
          borderColor="red"
          width={responsiveWidth(widthPersentage(95))}
          height={95}
          alignSelf="center"
          rounded={4}
          overflow={'hidden'}>
          <Image
            source={getImageById(bgmStudioId)}
            alt=" "
            resizeMode="cover"
            width="100%"
            height="100%"
          />
          {isPlay ? (
            <Slider
              style={{
                position: 'absolute',
                bottom: '-5%',
              }}
              defaultValue={0}
              value={percent}>
              <Slider.Track bg={'#a5a8ae'}>
                <Slider.FilledTrack bg={'#0fefbd'} />
              </Slider.Track>
            </Slider>
          ) : null}
        </Box>
        <Box flex={1} justifyContent="center">
          <VStack space={1.5}>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(17))}
              fontWeight={600}
              numberOfLines={1}
              color="#1a1b1c">
              {createdAt}
            </Text>

            <FlatList
              data={keyword}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Box mr={1} rounded={4} overflow="hidden">
                  <Badge colorScheme={'gray'} px={2}>
                    <Text
                      fontSize={responsiveFontSize(fontSizePersentage(11))}
                      fontWeight={600}
                      color={'white'}>
                      {item}
                    </Text>
                  </Badge>
                </Box>
              )}
              keyExtractor={item => item + item.index}
            />
            <HStack space={1}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(11))}
                bold
                numberOfLines={1}
                color="#000000">
                사용처
              </Text>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(11))}
                bold
                numberOfLines={1}
                color="#858c92">
                {whereUse}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Gbutton
                wp={84}
                hp={26}
                rounded={4}
                text={isPlay ? '정 지' : '재 생'}
                imgName={isPlay ? 'stop' : 'play'}
                fs={13}
                fw={800}
                onPress={handlePlay}
              />
              <Gbutton
                wp={84}
                hp={26}
                rounded={4}
                text={'다운로드'}
                imgName={'download'}
                fs={13}
                fw={800}
                onPress={handlerDownload}
              />
            </HStack>
          </VStack>
        </Box>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 12,
            top: 8,
            padding: 4,
          }}
          onPress={deleteAlert}>
          <Image
            source={TrashIcon}
            resizeMode={'contain'}
            alt={' '}
            width={responsiveWidth(widthPersentage(16))}
            height={responsiveWidth(widthPersentage(16))}
          />
        </TouchableOpacity>
      </HStack>
    </Box>
  );
};

export default MyBGMCardPresenter;
