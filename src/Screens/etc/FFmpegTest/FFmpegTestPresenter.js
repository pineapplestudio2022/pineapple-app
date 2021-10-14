//Challenge -> 15초감상 View

import React from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {
  Box,
  Center,
  Text,
  VStack,
  HStack,
  Slider,
  Spinner,
  TextArea,
  FlatList,
} from 'native-base';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import DumpImg from '../../../Assets/Image/image_singing_dumpimage.jpg';

import MenuComponent from '../../../Components/MenuComponent';
import Gbutton from '../../../Components/GbuttonComponent';
import {fontSizePersentage, widthPersentage} from '../../../Commons/CommonUtil';

const FFMpegTestPresenter = props => {
  return (
    <Box flex={1} safeAreaBottom>
      <MenuComponent
        name={props.route.name}
        titleName={'노래부르기'}
        navigation={props.navigation}
      />
      <Box>
        <Text
          textAlign={'center'}
          fontSize={responsiveFontSize(fontSizePersentage(20))}
          bold
          color={'#1a1b1c'}
          px={2}
          noOfLines={1}>
          {props.title}
        </Text>
      </Box>
      <Box flex={2} p={4}>
        <ImageBackground
          source={DumpImg}
          resizeMode="cover"
          alt={' '}
          style={{
            width: '100%',
            height: '100%',
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            overflow: 'hidden',
          }}>
          {props.spinner ? (
            <Center h={'100%'}>
              <Spinner color="white" />
            </Center>
          ) : (
            <></>
          )}
          <Box
            style={{
              width: '100%',
              height: '100%',
            }}>
            <Slider
              style={{
                position: 'absolute',
                bottom: '-5%',
              }}
              defaultValue={0}
              value={props.percent}>
              <Slider.Track bg={'#a5a8ae'}>
                <Slider.FilledTrack bg={'#0fefbd'} />
              </Slider.Track>
            </Slider>
          </Box>
        </ImageBackground>
        <HStack justifyContent={'space-between'}>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(12))}
            fontWeight={500}
            color={'#0fefbd'}>
            {props.timeElapsed}
          </Text>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(12))}
            fontWeight={500}
            color={'#0fefbd'}>
            {props.duration}
          </Text>
        </HStack>
      </Box>
      <Box
        flex={7}
        flexDirection={'row'}
        flexWrap={'wrap'}
        m={2}
        justifyContent={'space-around'}>
        <Gbutton
          wp={170}
          hp={40}
          fs={18}
          fw={600}
          rounded={8}
          disable={props.spinner}
          imgName={props.isAlreadyPlay ? 'stop' : 'headphone'}
          text={'음원 재생'}
          onPress={props.isAlreadyPlay ? props.onStopPlay : props.onStartPlay}
        />
        <Gbutton
          wp={170}
          hp={40}
          fs={18}
          fw={600}
          rounded={8}
          disable={props.spinner}
          imgName={props.stopRecordBtn ? 'pulse' : 'mic'}
          onPress={
            props.stopRecordBtn ? props.onStopRecord : props.onStartRecord
          }
          text={'녹음'}
        />
        <Gbutton
          wp={170}
          hp={40}
          fs={18}
          fw={600}
          rounded={8}
          disable={props.spinner}
          imgName={props.isAlreadyPlay ? 'stop' : 'headphone'}
          onPress={
            props.isAlreadyPlay ? props.onStopPlay : props.onStartOutputFilePlay
          }
          text={'합성 파일 재생'}
        />
        <Gbutton
          wp={170}
          hp={40}
          fs={13}
          fw={800}
          imgName={'x'}
          text={props.customOptionUse ? 'Custom 사용' : 'Custom 미사용'}
          rounded={6}
          disable={!props.customOptionUse}
          onPressActive
          onPress={props.handlerOptionToggle}
        />
        <Box mt={4} w={'100%'}>
          FFmpeg Command Input(filter_complex)
        </Box>
        <TextArea
          m={4}
          w={'100%'}
          isDisabled={!props.customOptionUse}
          borderWidth={1}
          backgroundColor={'#ffffff'}
          onChangeText={text =>
            props.setFFmpegCommand({
              ...props.ffmpegCommand,
              command: text,
            })
          }
          value={props.ffmpegCommand.command}
        />
        <Gbutton
          wp={170}
          hp={40}
          fs={18}
          fw={600}
          rounded={8}
          disable={props.spinner || !props.customOptionUse}
          text={'Command 적용'}
        />
        <Gbutton
          wp={170}
          hp={40}
          fs={18}
          fw={600}
          rounded={8}
          disable={props.spinner || !props.customOptionUse}
          text={'Command 저장'}
          onPress={props.writeFiletoLocal}
        />
        <Box w={'100%'} borderWidth={1} h={150} mt={4}>
          <FlatList
            borderWidth={1}
            numColumns={1}
            data={props.fileList}
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
            onEndReachedThreshold={0.2}
            initialNumToRender={5}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <TouchableOpacity
                disabled={!props.customOptionUse}
                style={{padding: 3}}
                onPress={() => props.readFiletoLocal(item.name)}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FFMpegTestPresenter;
