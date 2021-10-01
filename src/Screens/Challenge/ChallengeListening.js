//Challenge -> 15초감상 View

import React, {useEffect, useState, useRef, useContext} from 'react';
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
import {ImageBackground, Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import {RNFFmpeg} from 'react-native-ffmpeg';
import APIKit from '../../API/APIkit';
import LinearGradient from 'react-native-linear-gradient';
import {UserDispatch} from '../../Commons/UserDispatchProvider';
import {defaultAlertMessage} from '../../Commons/CommonUtil';
import {
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';

function ChallengeListening(props) {
  const {userId, email} = useContext(UserDispatch);

  const [isAlreadyPlay, setIsAlreadyPlay] = useState(false); //재생 | 일시정지 상태
  const [duration, setDuration] = useState('00:00'); //트랙 길이
  const [timeElapsed, setTimeElapsed] = useState('00:00'); //트랙 경과 시간
  const [percent, setPercent] = useState(0); //트랙 경과시간에 따른 slider 표시
  const [spinner, setSpinner] = useState(false); //로딩 중 표시

  const [recordBtn, setRecordBtn] = useState(false); //녹음 시작 버튼 활성화
  const [stopRecordBtn, setStopRecordBtn] = useState(false); // 녹음 중지 버튼 활성화
  const [uploadBtn, setUploadBtn] = useState(false); //업로드 버튼
  const [uploadFinish, setUploadFinish] = useState(false); //업로드 완료 유무

  const ARPlayer = useRef(AudioRecorderPlayer);
  const ARRecord = useRef(AudioRecorderPlayer);

  const [uri, setUri] = useState(''); //녹음 파일 경로
  const [title, setTitle] = useState(''); //제목
  const [genre, setGenre] = useState(''); //장르
  const [lyrics, setLyrics] = useState(''); //가사
  const [filepath, setFilePath] = useState(''); //파일 저장 경로
  const [fileName, setFileName] = useState(''); //파일 이름
  const [outputFile, setOutputFile] = useState(''); //mix된 파일 이름

  //권한 가져오기
  useEffect(() => {
    getPermission();
  }, []);

  useEffect(() => {
    ARPlayer.current = new AudioRecorderPlayer(); //재생
    ARPlayer.current.setSubscriptionDuration(1);
    ARRecord.current = new AudioRecorderPlayer(); //녹음
    ARRecord.current.setSubscriptionDuration(1);

    const getOriginalSong = async () => {
      const payload = {id: props.route.params.id.toString()};

      await APIKit.post('originalWorks/getOriginalSong', payload)
        .then(response => {
          if (__DEV__) {
            console.log(response);
          }
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
                setSpinner(true);
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
                        if (__DEV__) {
                          console.log(percentage);
                        }
                      })
                      .then(resp => {
                        setSpinner(false);
                        if (__DEV__) {
                          console.log('The file saved to ', resp.path());
                        }
                      });
                  })
                  .catch(error => {
                    if (__DEV__) {
                      console.log(error);
                    }
                  });
              }
              setFilePath(path);
              setFileName(filename);
              if (__DEV__) {
                console.log('setfilepath : ' + path + filename);
              }
            })
            .catch(error => {
              if (__DEV__) {
                console.log(error);
              }
            });
        })
        .catch(error => {
          if (__DEV__) {
            console.log(error && error.response);
          }
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
    ios: encodeURI('file://' + filepath + fileName),
    android: filepath + fileName,
  });

  //녹음파일 저장 경로
  const recordPath = Platform.select({
    ios: 'file://' + filepath + 'recording.m4a',
    android: filepath + 'recording.mp4',
  });

  const onStartPlay = async () => {
    try {
      const msg = await ARPlayer.current.startPlayer(playPath);
      const volume = await ARPlayer.current.setVolume(1.0);
      if (__DEV__) {
        console.log(`file: ${msg}`, `volume: ${volume}`);
      }
      setIsAlreadyPlay(true);
      ARPlayer.current.addPlayBackListener(e => {
        if (
          ARPlayer.current.mmss(Math.floor(e.currentPosition / 1000)) >= '00:15'
        ) {
          ARPlayer.current.stopPlayer();
          setIsAlreadyPlay(false);
        }
        let percentage = Math.round(
          (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100,
        );
        setTimeElapsed(
          ARPlayer.current.mmss(Math.floor(e.currentPosition / 1000)),
        );
        setPercent(percentage);
        setDuration(ARPlayer.current.mmss(Math.floor(e.duration / 1000)));

        return;
      });
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      }
    }
  };

  const onStopPlay = async e => {
    setTimeElapsed('00:00');
    // setDuration('00:00');
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
    if (__DEV__) {
      console.log('audioSet : ', audioSet);
    }
    try {
      //음악 재생
      const msg = await ARPlayer.current.startPlayer(playPath);
      const volume = await ARPlayer.current.setVolume(1.0);
      if (__DEV__) {
        console.log(`file: ${msg}`, `volume: ${volume}`);
      }

      //녹음 시작
      setUri(await ARRecord.current.startRecorder(recordPath, audioSet));
      if (__DEV__) {
        console.log('recording file name : ' + recordPath);
      }
      setStopRecordBtn(true);

      //노래 재생 리스너
      ARPlayer.current.addPlayBackListener(e => {
        if (e.currentPosition >= e.duration) {
          ARPlayer.current.stopPlayer();
          ARRecord.current.stopRecorder();
        }
        let percentage = Math.round(
          (Math.floor(e.currentPosition) / Math.floor(e.duration)) * 100,
        );
        setTimeElapsed(
          ARPlayer.current.mmss(Math.floor(e.currentPosition / 1000)),
        );
        setPercent(percentage);
        setDuration(ARPlayer.current.mmss(Math.floor(e.duration / 1000)));
      });

      //녹음 리스너
      ARRecord.current.addRecordBackListener();

      if (__DEV__) {
        console.log(`uri: ${uri}`);
      }
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      }
    }
  };

  const onStopRecord = async () => {
    try {
      setSpinner(true);
      onStopPlay();
      await ARRecord.current.stopRecorder();
      ARRecord.current.removeRecordBackListener();
      setStopRecordBtn(false);

      const outputFileName =
        fileName.substring(0, fileName.lastIndexOf('.')) +
        `_${new Date().getTime().toString()}.mp4`;
      // here's code start to audio mix.
      const options = [
        '-i',
        uri,
        '-i',
        filepath + fileName,
        '-filter_complex',
        '[0]volume=volume=15dB,highpass=f=200,lowpass=f=3000[a0];[1]volume=volume=0.5[a1];[a1]adelay=0s|0s[a2];[a0][a2]amix=inputs=2[a]',
        '-map',
        '[a]',
        `${filepath}${outputFileName}`,
        // '-acodec',
        // 'libmp3lame',
      ];
      if (__DEV__) {
        console.log('[onStopRecord] handler is started');
        console.log(`[input file 1]: ${uri}`);
        console.log(`[input file 2]: ${filepath + fileName}`);
        console.log(`[output file name] : ${outputFileName}`);
        console.log(`[options]: ${options}`);
      }

      RNFFmpeg.executeWithArguments(options).then(result => {
        if (__DEV__) {
          console.log(`FFmpeg process exited with rc=${result}.`);
        }
        setUploadBtn(true);
        setOutputFile(outputFileName);
        setSpinner(false);
      });
    } catch (error) {
      if (__DEV__) {
        console.log(error);
      }
    }
  };
  const getPermission = async () => {
    if (Platform.OS === 'ios') {
      const granted = await request(PERMISSIONS.IOS.MICROPHONE);
      if (granted !== RESULTS.GRANTED) {
        defaultAlertMessage('마이크 권한을 허용해주세요');
        return;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const grants = await requestMultiple([
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.RECORD_AUDIO,
        ]);

        if (__DEV__) {
          console.log('write external stroage', grants);
        }

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] === RESULTS.GRANTED
        ) {
          if (__DEV__) {
            console.log('permissions granted');
          }
        } else {
          if (__DEV__) {
            console.log('All required permissions not granted');
          }
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

  //참여버튼
  const handlerJoin = async () => {
    if (userId === '' || userId === undefined || userId === null) {
      defaultAlertMessage('로그인 후 참여가능합니다.');
      return;
    }
    setRecordBtn(true);
    onStopPlay();
    // const payload = {userId: userId.toString(), cType: '1'};
    // APIKit.post('challenge/addChallengeTicket', payload)
    //   .then(({data}) => {
    //     defaultAlertMessage('참여신청이 완료되었습니다');
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };
  // blob test code
  // const uploadFile = (apiUri, userId, originalWorkId, uri, mime) => {
  //   return new Promise((resolve, reject) => {
  //     const uploadUri =
  //       Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

  //     let uploadBlob = null;
  //     const Blob = RNFetchBlob.polyfill.Blob;
  //     const fs = RNFetchBlob.fs;

  //     console.log(`uri:${uri}`);
  //     console.log(uploadUri);
  //     fs.readFile(uploadUri, 'base64')
  //       .then(data => {
  //         return Blob.build(data, {type: `${mime};BASE64`});
  //       })
  //       .then(blob => {
  //         const payload = new FormData();
  //         payload.append('title', title);
  //         payload.append('fileName', fileName);
  //         payload.append('userId', userId);
  //         payload.append('originSongId', originalWorkId);
  //         payload.append('mimeType', 'video/mp4');
  //         // payload.append('fileContents', {
  //         //   name: outputFile,
  //         //   type: 'video/mp4',
  //         //   uri: `${filepath}${outputFile}`,
  //         // });
  //         payload.append('fileContents', blob);

  //         console.log(blob);

  //         APIKit.post(apiUri, payload, {
  //           headers: {'Content-Type': 'multipart/form-data'},
  //         }).then(response => {
  //           // console.log(JSON.stringify(response.data, null, 2));
  //           resolve(response.data);
  //         });
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // };

  //업로드 버튼       //////////////수정중
  const onFileUpload = async () => {
    setSpinner(true);
    if (__DEV__) {
      console.log(`fileName : ${fileName}`);
    }
    const originalWorkId = props.route.params.id;
    const mimeType = 'video/mp4';

    const payload = new FormData();
    payload.append('title', title);
    payload.append(
      'fileName',
      fileName.substring(0, fileName.lastIndexOf('.')),
    );
    payload.append('userId', userId);
    payload.append('owner', email);
    payload.append('originalWorkId', originalWorkId);
    payload.append('mimeType', mimeType);
    if (Platform.OS === 'android') {
      payload.append('fileContents', {
        name: outputFile,
        type: 'video/mp4',
        uri: `file://${filepath}${outputFile}`,
      });
    } else if (Platform.OS === 'ios') {
      payload.append('fileContents', {
        name: outputFile,
        // type: 'video/mp4',
        uri: `${filepath}${outputFile}`,
      });
    }

    if (__DEV__) {
      console.log('payload : ');
      console.log(payload);
    }
    await APIKit.post('/challenge/updateMyChallengeSong', payload, {
      headers: {'Content-Type': 'multipart/form-data'},
    }).then(({data}) => {
      if (__DEV__) {
        console.log(data);
      }
      setSpinner(false);
      setUploadFinish(true);
    });
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
                    {spinner ? (
                      <Center h={'100%'}>
                        <Spinner color="white" />
                      </Center>
                    ) : (
                      <></>
                    )}
                    {recordBtn ? (
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
                            value={percent}>
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
                    {timeElapsed}
                  </Text>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(12))}
                    fontWeight={500}
                    color={'#0fefbd'}>
                    {duration}
                  </Text>
                </HStack>
                {uploadFinish ? (
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
                    {recordBtn ? (
                      uploadBtn ? (
                        <Gbutton
                          wp={220}
                          hp={40}
                          fs={18}
                          fw={600}
                          rounded={8}
                          disable={spinner}
                          imgName={'upload'}
                          text={'Upload'}
                          onPress={onFileUpload}
                        />
                      ) : (
                        <Gbutton
                          wp={220}
                          hp={40}
                          fs={18}
                          fw={600}
                          rounded={8}
                          disable={spinner}
                          imgName={stopRecordBtn ? 'pulse' : 'mic'}
                          onPress={stopRecordBtn ? onStopRecord : onStartRecord}
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
                        disable={spinner}
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
                        textAlign={'center'}
                        borderWidth={0}
                        editable={false}
                        px={8}
                        pt={2}>
                        {lyrics}
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
            {uploadFinish ? (
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
                onPress={handlerJoin}
              />
            )}
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}

export default ChallengeListening;
