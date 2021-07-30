//Challenge -> 15초감상 View

import React, {useEffect} from 'react';
import {Box, Center, Text, VStack, HStack, TextArea, Image} from 'native-base';
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
import {ImageBackground, TouchableOpacity} from 'react-native';
import MenuComponent from '../../Components/MenuComponent';
import LyricsViewBackground from '../../Assets/Image/challenge/bg_lyricsView_glassbox.png';
import DumpImg from '../../Assets/Image/image_singing_dumpimage.jpg';
import Gbutton from '../../Components/GbuttonComponent';

import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';

function ChallengeListening(props) {
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [recordSecs, setRecordSecs] = React.useState(0);
  const [recordTime, setRecordTime] = React.useState('00:00:00');
  const [currentPositionSec, setCurrentPositionSec] = React.useState(0);
  const [currentDurationSec, setCurrentDurationSec] = React.useState(0);
  const [playTime, setPlayTime] = React.useState('00:00:00');
  const [duration, setDuration] = React.useState('00:00:00');

  const [recordBtn, setRecordBtn] = React.useState(false);
  const [stopRecordBtn, setStopRecordBtn] = React.useState(false);

  const ARPlayer = React.useRef(AudioRecorderPlayer);

  useEffect(() => {
    ARPlayer.current = new AudioRecorderPlayer();
    // ARPlayer.current.setSubscriptionDuration(0.1);
  }, []);

  const onStartRecord = async () => {
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    console.log('audioSet', audioSet);

    if (ARPlayer.current) {
      const uri = await ARPlayer.current.startRecorder(undefined, audioSet);
      ARPlayer.current.addRecordBackListener(e => {
        console.log('record-back', e);
        setRecordSecs(e.currentPosition);
        setRecordTime(ARPlayer.current.mmssss(Math.floor(e.currentPosition)));
      });
      console.log(`uri: ${uri}`);
    }
    setStopRecordBtn(true);
  };

  const onStopRecord = async () => {
    if (ARPlayer.current) {
      const result = await ARPlayer.current.stopRecorder();
      ARPlayer.current.removeRecordBackListener();
      setRecordSecs(0);
      setStopRecordBtn(false);
      console.log(result);
    }
  };

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
              lineHeight={28}
              px={2}
              noOfLines={1}>
              곡 제목 들어갈 공간
            </Text>
            <Text></Text>
          </Center>
          {/* 제목 end */}
          {/* 자곡가, 작사가 start */}
          <HStack space={10} justifyContent={'center'} p={2}>
            <HStack>
              <Text
                color={'#4be3ac'}
                fontSize={responsiveFontSize(fontSizePersentage(17))}
                bold>
                작곡가 :{'  '}
              </Text>
              <Text
                color={'#1a1b1c'}
                fontSize={responsiveFontSize(fontSizePersentage(17))}
                bold>
                뮤지아
              </Text>
            </HStack>
            <HStack>
              <Text
                color={'#4be3ac'}
                fontSize={responsiveFontSize(fontSizePersentage(17))}
                bold>
                작사가 :{'  '}
              </Text>
              <Text
                color={'#1a1b1c'}
                fontSize={responsiveFontSize(fontSizePersentage(17))}
                bold>
                김하나
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
              <ImageBackground
                source={LyricsViewBackground}
                resizeMode={'cover'}
                style={{
                  width: '100%',
                  height: '100%',
                }}>
                <Center>
                  <Box
                    style={{
                      width: responsiveWidth(widthPersentage(209)),
                      height: responsiveHeight(heightPersentage(188)),
                    }}
                    rounded={8}
                    overflow={'hidden'}
                    mt={5}>
                    <Image
                      source={DumpImg}
                      w="100%"
                      h="100%"
                      resizeMode="center"
                      alt={''}
                    />
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
                      {recordSecs}
                    </Text>
                    <Text
                      fontSize={responsiveFontSize(fontSizePersentage(12))}
                      fontWeight={500}
                      color={'#0fefbd'}>
                      {recordTime}
                    </Text>
                  </HStack>
                  {recordBtn ? (
                    stopRecordBtn ? (
                      <Gbutton
                        wp={220}
                        hp={40}
                        fs={18}
                        fw={600}
                        rounded={8}
                        imgName={'pulse'}
                        onPress={onStopRecord}
                        text={'RECORD'}
                      />
                    ) : (
                      <Gbutton
                        wp={220}
                        hp={40}
                        fs={18}
                        fw={600}
                        rounded={8}
                        imgName={'mic'}
                        onPress={onStartRecord}
                        text={'Record'}
                      />
                    )
                  ) : (
                    <Gbutton
                      wp={220}
                      hp={40}
                      fs={18}
                      fw={600}
                      rounded={8}
                      imgName={'headphone'}
                      onPress={onStopRecord}
                      text={'15초 듣기'}
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
                      lineHeight={18}
                      textAlign={'center'}
                      borderWidth={0}
                      editable={false}
                      px={8}
                      pt={2}>
                      If you’ve ever been in love before {'\n'}I know you feel
                      this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}
                      If you’ve ever been in love before {'\n'}I know you feel
                      this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}
                    </TextArea>
                  </Box>
                </Center>
              </ImageBackground>
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
              <Gbutton
                wp={120}
                hp={40}
                fs={13}
                fw={800}
                rounded={6}
                imgName={'check'}
                text={'참여'}
                onPress={() => setRecordBtn(true)}
              />
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

export default ChallengeListening;
