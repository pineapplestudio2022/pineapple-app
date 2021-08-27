//Challenge -> 15초감상 View

import React, {useEffect, useState, useRef} from 'react';
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

import {RNFFmpeg} from 'react-native-ffmpeg';
import APIKit from '../../API/APIkit';

function ChallengeListening(props) {
  const [currentTrack, setCurrentTrack] = useState(1); //음악 트랙에 대한 인덱스
  const [isAlreadyPlay, setIsAlreadyPlay] = useState(false); //재생 | 일시정지 상태
  const [duration, setDuration] = useState('00:00:00'); //트랙 길이
  const [timeElapsed, setTimeElapsed] = useState('00:00:00'); //트랙 경과 시간
  const [percent, setPercent] = useState(0); //트랙 경과시간에 따른 slider 표시

  const [recordBtn, setRecordBtn] = useState(false); //녹음 시작 버튼 활성화
  const [stopRecordBtn, setStopRecordBtn] = useState(false); // 녹음 중지 버튼 활성화
  const ARPlayer = useRef(AudioRecorderPlayer);
  const ARRecord = useRef(AudioRecorderPlayer);

  const [uri, setUri] = useState('');

  const [title, setTitle] = useState(''); //제목
  const [genre, setGenre] = useState(''); //장르
  const [lyrics, setLyrics] = useState(''); //가사
  const [filepath, setFilePath] = useState(''); //파일 저장 경로
  const [fileName, setFileName] = useState(''); //파일 이름

  useEffect(() => {
    ARPlayer.current = new AudioRecorderPlayer(); //재생
    ARPlayer.current.setSubscriptionDuration(0.1);
    ARRecord.current = new AudioRecorderPlayer(); //녹음
    ARRecord.current.setSubscriptionDuration(0.1);

    const getOriginalSong = async () => {
      const payload = {id: props.route.params.id.toString()};

      await APIKit.post('originalWorks/getOriginalSong', payload)
        .then(response => {
          console.log(response);
          setTitle(response.data.IBparams.rows[0].title);
          setLyrics(response.data.IBparams.rows[0].lyrics);
          setGenre(response.data.IBparams.rows[0].genre);

          const keyname = response.data.IBparams.rows[0].musicKey.toString();
          const splitKey = keyname.split('/');
          const length = splitKey.length;
          const filename = splitKey[length - 1];

          const dirs = RNFetchBlob.fs.dirs.DocumentDir;
          const path = dirs + '/';
          RNFetchBlob.fs //로컬 파일 체크
            .exists(path + filename)
            .then(async exist => {
              if (!exist) {
                //없으면 다운로드
                await APIKit.post('aws/getS3SignedUrl', {musicKey: keyname})
                  .then(res => {
                    const s3Path = res.data;
                    RNFetchBlob.config({
                      fileCache: true,
                      path: path + filename,
                    })
                      .fetch('GET', s3Path)
                      .progress((received, total) => {
                        const percentage =
                          Math.floor((received / total) * 100) + '%';
                        console.log(percentage);
                      })
                      .then(resp => {
                        console.log('The file saved to ', resp.path());
                      });
                  })
                  .catch(error => {
                    console.log(error);
                  });
              }
              setFilePath(path);
              setFileName(filename);
              console.log('setfilepath : ' + path + filename);
            })
            .catch(error => {
              console.log(error);
            });

          // getS3SignedUrl(response.data.IBparams.rows[0].musicKey);
        })
        .catch(error => {
          console.log(error && error.response);
        });
    };
    getOriginalSong();

    return () => {
      //재생, 녹음중 다른화면으로 나갈시 해제
      ARPlayer.current.stopPlayer();
      ARPlayer.current.removePlayBackListener();
      ARRecord.current.stopRecorder();
      ARRecord.current.removeRecordBackListener();
    };
  }, [props.route.params.id]);

  //재생파일 경로
  const playPath = Platform.select({
    ios: 'file://' + filepath + fileName,
    android: 'file://' + filepath + fileName,
  });

  //녹음파일 저장 경로
  const recordPath = Platform.select({
    ios: 'file://' + filepath + 'recording.m4a',
    android: 'file://' + filepath + 'recording.mp4',
  });

  const onStartPlay = async () => {
    try {
      const msg = await ARPlayer.current.startPlayer(playPath);
      const volume = await ARPlayer.current.setVolume(1.0);
      console.log(`file: ${msg}`, `volume: ${volume}`);
      setIsAlreadyPlay(true);

      ARPlayer.current.addPlayBackListener(e => {
        if (ARPlayer.current.mmssss(e.currentPosition) >= '00:15:00') {
          ARPlayer.current.stopPlayer();
          setIsAlreadyPlay(false);
        }
        let percentage = Math.round(
          (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100,
        );
        setTimeElapsed(ARPlayer.current.mmssss(e.currentPosition));
        setPercent(percentage);
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
      const msg = await ARPlayer.current.startPlayer(playPath);
      const volume = await ARPlayer.current.setVolume(1.0);
      console.log(`file: ${msg}`, `volume: ${volume}`);

      ARPlayer.current.addPlayBackListener(e => {
        let percentage = Math.round(
          (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100,
        );
        setTimeElapsed(ARPlayer.current.mmssss(e.currentPosition));
        setPercent(percentage);
        setDuration(ARPlayer.current.mmssss(e.duration));
      });

      //녹음 시작
      setUri(await ARRecord.current.startRecorder(recordPath, audioSet));
      console.log('recording file name : ' + uri);
      ARRecord.current.addRecordBackListener();
      setStopRecordBtn(true);

      console.log(`uri: ${uri}`);
      console.log();
    } catch (error) {
      console.log(error);
    }
  };

  const onStopRecord = async () => {
    try {
      onStopPlay();
      const result = await ARRecord.current.stopRecorder();
      ARRecord.current.removeRecordBackListener();
      setStopRecordBtn(false);
      console.log('[onStopRecord] handler is started');
      console.log(result);
      console.log(`[input file 1]: ${uri}`);
      console.log(`[input file 2]: ${filepath + fileName}`);
      console.log(
        `[output file name] : ${fileName}output_${new Date()
          .getTime()
          .toString()}.mp4`,
      );

      // here's code start to audio mix.
      const options = [
        '-i', //input
        uri, //recordingfile
        '-i',
        filepath + fileName, //originalMusic
        '-filter_complex',
        '[0]volume=volume=15dB,highpass=f=200,lowpass=f=3000[a0];[1]volume=volume=0.5[a1];[a1]adelay=0s|0s[a2];[a0][a2]amix=inputs=2[a]',
        '-map',
        '[a]',
        `${filepath}/${fileName}output_${new Date().getTime().toString()}.mp4`,
        // '-acodec',
        // 'libmp3lame',
      ];
      console.log(`[options]: ${options}`);
      RNFFmpeg.executeWithArguments(options).then(result =>
        console.log(`FFmpeg process exited with rc=${result}.`),
      );
    } catch (error) {
      console.log(error);
    }
  };

  //참여버튼
  const handlerJoin = () => {
    setRecordBtn(true);
    onStopPlay();
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
              {title}
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
                {genre}
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
                    <Gbutton
                      wp={220}
                      hp={40}
                      fs={18}
                      fw={600}
                      rounded={8}
                      imgName={stopRecordBtn ? 'pulse' : 'mic'}
                      onPress={stopRecordBtn ? onStopRecord : onStartRecord}
                      text={'RECORD'}
                    />
                  ) : (
                    <Gbutton
                      wp={220}
                      hp={40}
                      fs={18}
                      fw={600}
                      rounded={8}
                      imgName={isAlreadyPlay ? 'stop' : 'headphone'}
                      text={'15초 듣기'}
                      onPress={isAlreadyPlay ? onStopPlay : onStartPlay}
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
                      {lyrics}
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
                onPress={handlerJoin}
              />
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

export default ChallengeListening;
