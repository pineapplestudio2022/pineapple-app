//Challenge -> 15초감상 View

import React from 'react';
import {
  Box,
  Center,
  Text,
  VStack,
  HStack,
  TextArea,
  Slider,
  Spinner,
} from 'native-base';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import MenuComponent from '../../../Components/MenuComponent';
import DumpImg from '../../../Assets/Image/image_singing_dumpimage.jpg';
import Gbutton from '../../../Components/GbuttonComponent';

import {ImageBackground} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../../../Commons/CommonUtil';

const ChallengeListeningPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'노래부르기'}
        navigation={props.navigation}
      />
      <Box safeAreaBottom alignItems="center">
        <VStack space={2} w={responsiveWidth(widthPersentage(345))}>
          {/* 제목 start */}
          <Center>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(20))}
              bold
              color={'#1a1b1c'}
              px={2}
              noOfLines={1}>
              {props.title}
            </Text>
            <Text />
          </Center>
          {/* 제목 end */}
          {/* 자곡가, 작사가 start */}
          <HStack space={10} justifyContent={'center'} p={2}>
            <HStack>
              <Text
                color={'#4be3ac'}
                fontSize={responsiveFontSize(fontSizePersentage(17))}
                bold>
                장르 :{'  '}
              </Text>
              <Text
                color={'#1a1b1c'}
                fontSize={responsiveFontSize(fontSizePersentage(17))}
                bold>
                {props.genre}
              </Text>
            </HStack>
          </HStack>
          {/* 자곡가, 작사가 end */}
          {/* GlassBox start */}
          <Box
            style={{
              height: responsiveHeight(heightPersentage(440)),
              shadowColor: '#858c9233',
              shadowOffset: {width: 0, height: 2},
              shadowRadius: 4,
              shadowOpacity: 1,
            }}>
            <Box borderRadius={20} overflow={'hidden'}>
              <Center w={'100%'} h={'100%'} backgroundColor={'#f9f9f9'}>
                <Box
                  style={{
                    width: responsiveWidth(widthPersentage(209)),
                    height: responsiveHeight(heightPersentage(188)),
                  }}
                  rounded={8}
                  overflow={'hidden'}
                  mt={5}>
                  <ImageBackground
                    source={DumpImg}
                    resizeMode="cover"
                    alt={' '}
                    style={{width: '100%', height: '100%'}}>
                    {props.spinner ? (
                      <Center h={'100%'}>
                        <Spinner color="white" />
                      </Center>
                    ) : (
                      <></>
                    )}
                    {props.recordBtn ? (
                      <Box
                        style={{
                          width: '100%',
                          height: '100%',
                        }}>
                        <LinearGradient
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          colors={['#0fefbd4c', '#f9fbce4c']}
                          style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'transparent',
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
                        </LinearGradient>
                      </Box>
                    ) : (
                      <></>
                    )}
                  </ImageBackground>
                </Box>
                <HStack
                  style={{
                    width: responsiveWidth(widthPersentage(209)),
                    justifyContent: 'space-between',
                  }}>
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
                {props.uploadFinish ? (
                  <VStack w="100%" alignItems={'center'} mt={5} space={5}>
                    <Text
                      fontSize={responsiveFontSize(fontSizePersentage(28))}
                      color={'#000000'}
                      bold>
                      업로드가 완료 되었습니다.
                    </Text>
                    <Text
                      fontSize={responsiveFontSize(fontSizePersentage(20))}
                      color={'#858c92'}
                      bold>
                      감사합니다
                    </Text>
                  </VStack>
                ) : (
                  <Center>
                    {props.recordBtn ? (
                      props.uploadBtn ? (
                        <Gbutton
                          wp={220}
                          hp={40}
                          fs={18}
                          fw={600}
                          rounded={8}
                          disable={props.spinner}
                          imgName={'upload'}
                          text={'Upload'}
                          onPress={props.onFileUpload}
                        />
                      ) : (
                        <Gbutton
                          wp={220}
                          hp={40}
                          fs={18}
                          fw={600}
                          rounded={8}
                          disable={props.spinner}
                          imgName={props.stopRecordBtn ? 'pulse' : 'mic'}
                          onPress={
                            props.stopRecordBtn
                              ? props.onStopRecord
                              : props.onStartRecord
                          }
                          text={'RECORD'}
                        />
                      )
                    ) : (
                      <Gbutton
                        wp={220}
                        hp={40}
                        fs={18}
                        fw={600}
                        rounded={8}
                        disable={props.spinner}
                        imgName={props.isAlreadyPlay ? 'stop' : 'headphone'}
                        text={'15초 듣기'}
                        onPress={
                          props.isAlreadyPlay
                            ? props.onStopPlay
                            : props.onStartPlay
                        }
                      />
                    )}

                    <Box
                      bg={'#fafafa80'}
                      style={{
                        width: responsiveWidth(widthPersentage(240)),
                        height: responsiveHeight(heightPersentage(136)),
                      }}
                      my={2}
                      rounded={16}>
                      <TextArea
                        h="100%"
                        fontSize={responsiveFontSize(fontSizePersentage(13))}
                        textAlign={'center'}
                        borderWidth={0}
                        editable={false}
                        px={8}
                        pt={2}>
                        {props.lyrics}
                      </TextArea>
                    </Box>
                  </Center>
                )}
              </Center>
            </Box>
          </Box>
          <HStack space={5} justifyContent={'space-around'} mt={4}>
            <Gbutton
              wp={120}
              hp={40}
              fs={13}
              fw={800}
              imgName={'x'}
              text={'닫기'}
              rounded={6}
              onPress={() => props.navigation.goBack()}
            />
            {props.uploadFinish ? (
              <Gbutton
                wp={120}
                hp={40}
                fs={13}
                fw={800}
                rounded={6}
                imgName={'home'}
                text={'HOME'}
                onPress={() => props.navigation.navigate('MainScreen')}
              />
            ) : (
              <Gbutton
                wp={120}
                hp={40}
                fs={13}
                fw={800}
                rounded={6}
                imgName={'check'}
                text={'참여'}
                onPress={props.handlerJoin}
              />
            )}
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ChallengeListeningPresenter;
