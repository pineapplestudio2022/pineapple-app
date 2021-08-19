//Challenge -> 15초감상 View

import React, {useEffect} from 'react';
import {
  Box,
  Center,
  Text,
  VStack,
  HStack,
  TextArea,
  Image,
  Slider,
} from 'native-base';
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
import MenuComponent from '../../Components/MenuComponent';
import DumpImg from '../../Assets/Image/image_singing_dumpimage.jpg';
import Gbutton from '../../Components/GbuttonComponent';

import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import {BlurView} from '@react-native-community/blur';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

function ChallengeListening(props) {
  const [currentTrack, setCurrentTrack] = React.useState(1); //음악 트랙에 대한 인덱스
  const [isAlreadyPlay, setIsAlreadyPlay] = React.useState(false); //재생 | 일시정지 상태
  const [duration, setDuration] = React.useState('00:00:00'); //트랙 길이
  const [timeElapsed, setTimeElapsed] = React.useState('00:00:00'); //트랙 경과 시간
  const [percent, setPercent] = React.useState(0); //트랙 경과시간에 따른 slider 표시

  const [recordBtn, setRecordBtn] = React.useState(false); //녹음 시작 버튼 활성화
  const [stopRecordBtn, setStopRecordBtn] = React.useState(false); // 녹음 중지 버튼 활성화
  const ARPlayer = React.useRef(AudioRecorderPlayer);

  useEffect(() => {
    ARPlayer.current = new AudioRecorderPlayer();
    ARPlayer.current.setSubscriptionDuration(0.1);
    return () => {
      //재생, 녹음중 다른화면으로 나갈시 해제
      ARPlayer.current.stopPlayer();
      ARPlayer.current.removePlayBackListener();
      ARPlayer.current.stopRecorder();
      ARPlayer.current.removeRecordBackListener();
    };
  }, []);
  //임시 데이터
  const playlist = [
    {title: 'test tilte', path: 'futurehouse1-2.mp3', cover: ''},
    {title: 'test tilte2', path: '210708_folk.mp3', cover: ''},
    {title: 'test tilte3', path: '210719_5.mp3', cover: ''},
    {title: 'test tilte4', path: 'trap_1.mp3', cover: ''},
  ];

  const dirs = RNFetchBlob.fs.dirs.DocumentDir;
  const path = Platform.select({
    ios: 'file://' + dirs + '/',
    android: 'file://' + dirs + '/',
  });
  console.log('path: ' + path);

  const onStartPlay = async () => {
    try {
      const msg = await ARPlayer.current.startPlayer(
        path + playlist[currentTrack].path,
      );
      const volume = await ARPlayer.current.setVolume(1.0);
      console.log(`file: ${msg}`, `volume: ${volume}`);
      setIsAlreadyPlay(true);

      ARPlayer.current.addPlayBackListener(e => {
        if (ARPlayer.current.mmssss(e.currentPosition) >= '00:15:00') {
          ARPlayer.current.stopPlayer();
          setIsAlreadyPlay(false);
        }
        let percent = Math.round(
          (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100,
        );
        setTimeElapsed(ARPlayer.current.mmssss(e.currentPosition));
        setPercent(percent);
        setDuration(ARPlayer.current.mmssss(e.duration));

        return;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onStopPlay = async e => {
    setTimeElapsed('00:00:00');
    setDuration('00:00:00');
    setPercent(0);
    ARPlayer.current.stopPlayer();
    ARPlayer.current.removePlayBackListener();
    setIsAlreadyPlay(false);
  };

  //녹음 시작
  const onStartRecord = async () => {
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    console.log('audioSet', audioSet);

    try {
      //음악 재생
      const msg = await ARPlayer.current.startPlayer(
        path + playlist[currentTrack].path,
      );
      const volume = await ARPlayer.current.setVolume(1.0);
      console.log(`file: ${msg}`, `volume: ${volume}`);

      ARPlayer.current.addPlayBackListener(e => {
        let percent = Math.round(
          (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100,
        );
        setTimeElapsed(ARPlayer.current.mmssss(e.currentPosition));
        setPercent(percent);
        setDuration(ARPlayer.current.mmssss(e.duration));
      });

      //녹음 시작
      const uri = await ARPlayer.current.startRecorder(
        path + 'recording.m4a',
        audioSet,
      );
      console.log('recording file name : ' + path + 'recording.mp3');
      ARPlayer.current.addRecordBackListener();

      setStopRecordBtn(true);
      console.log(`uri: ${uri}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onStopRecord = async () => {
    try {
      onStopPlay();
      const result = await ARPlayer.current.stopRecorder();
      ARPlayer.current.removeRecordBackListener();
      setStopRecordBtn(false);
      console.log(result);
    } catch (error) {
      console.log(error);
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
                일렉트로닉
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
              <BlurView
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#ededed59',
                }}
                blurType="light"
                blurAmount={12}
                reducedTransparencyFallbackColor="white">
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
                      alt={' '}
                    />
                    {recordBtn ? (
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
                    ) : (
                      undefined || null
                    )}
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
                      {timeElapsed}
                    </Text>
                    <Text
                      fontSize={responsiveFontSize(fontSizePersentage(12))}
                      fontWeight={500}
                      color={'#0fefbd'}>
                      {duration}
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
                        text={'RECORD'}
                      />
                    )
                  ) : isAlreadyPlay ? (
                    <Gbutton
                      wp={220}
                      hp={40}
                      fs={18}
                      fw={600}
                      rounded={8}
                      imgName={'stop'}
                      text={'15초 듣기'}
                      onPress={onStopPlay}
                    />
                  ) : (
                    <Gbutton
                      wp={220}
                      hp={40}
                      fs={18}
                      fw={600}
                      rounded={8}
                      imgName={'headphone'}
                      text={'15초 듣기'}
                      onPress={onStartPlay}
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
              </BlurView>
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
