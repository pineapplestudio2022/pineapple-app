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
import {BlurView} from '@react-native-community/blur';
import {ImageBackground, PermissionsAndroid, Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import {RNFFmpeg} from 'react-native-ffmpeg';
import APIKit from '../../API/APIkit';
import LinearGradient from 'react-native-linear-gradient';
import {UserDispatch} from '../../Commons/UserDispatchProvider';
import {defaultAlertMessage} from '../../Commons/CommonUtil';

function ChallengeListening(props) {
  const {userId} = useContext(UserDispatch);

  const [isAlreadyPlay, setIsAlreadyPlay] = useState(false); //재생 | 일시정지 상태
  const [duration, setDuration] = useState('00:00:00'); //트랙 길이
  const [timeElapsed, setTimeElapsed] = useState('00:00:00'); //트랙 경과 시간
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
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

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
      console.log('[onStopRecord] handler is started');
      console.log(`[input file 1]: ${uri}`);
      console.log(`[input file 2]: ${filepath + fileName}`);
      console.log(`[output file name] : ${outputFileName}`);
      console.log(`[options]: ${options}`);

      RNFFmpeg.executeWithArguments(options).then(result => {
        console.log(`FFmpeg process exited with rc=${result}.`);
        setUploadBtn(true);
        setOutputFile(outputFileName);
        setSpinner(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //참여버튼
  const handlerJoin = () => {
    if (userId === '' || userId === undefined || userId === null) {
      defaultAlertMessage('로그인 후 참여가능합니다.');
      return;
    }
    setRecordBtn(true);
    onStopPlay();
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
    console.log(`fileName : ${fileName}`);
    const originalWorkId = props.route.params.id;
    const mimeType = 'video/mp4';

    const payload = new FormData();
    payload.append('title', title);
    payload.append(
      'fileName',
      fileName.substring(0, fileName.lastIndexOf('.')),
    );
    payload.append('userId', userId);
    payload.append('originalWorkId', originalWorkId);
    payload.append('mimeType', mimeType);
    payload.append('fileContents', {
      name: outputFile,
      // type: 'video/mp4',
      uri: `${filepath}${outputFile}`,
    });

    console.log('payload : ');
    console.log(payload);
    // const {data: resData} = await APIKit.post(
    //   '/challenge/updateMyChallengeSong',
    //   payload,
    //   {
    //     headers: {'Content-Type': 'multipart/form-data'},
    //   },
    // );
    await APIKit.post('/challenge/updateMyChallengeSong', payload, {
      headers: {'Content-Type': 'multipart/form-data'},
    }).then(({data}) => {
      console.log(data);
      setSpinner(false);
      setUploadFinish(true);
    });

    // console.log(`
    // resData:
    // ${JSON.stringify(resData, null, 2)}`);

    // RNFetchBlob.fetch(
    //   'POST',
    //   APIKit.defaults.baseURL + '/challenge/updateMyChallengeSong',
    //   {
    //     Authorization: `Bearer ${token}`,
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   [
    //     {name: 'title', data: title},
    //     {
    //       name: 'fileName',
    //       data: fileName,
    //     },
    //     {name: 'userId', data: userId},
    //     {name: 'originSongId', data: originalWorkId},
    //     {
    //       name: 'fileContents',
    //       data: RNFetchBlob.wrap(filepath + outputFile),
    //       type: 'video/mp4',
    //     },
    //   ],
    // )
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(JSON.stringify(err));
    //   });
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
                    <ImageBackground
                      source={DumpImg}
                      resizeMode="center"
                      alt={' '}
                      style={{width: '100%', height: '100%'}}>
                      {recordBtn ? (
                        <BlurView
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                          blurType="light"
                          blurAmount={2}
                          reducedTransparencyFallbackColor="white">
                          <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            colors={['#0fefbd4c', '#f9fbce4c']}
                            style={{
                              width: '100%',
                              height: '100%',
                              backgroundColor: 'transparent',
                            }}>
                            {spinner ? (
                              <Center h={'100%'}>
                                <Spinner color="white" />
                              </Center>
                            ) : (
                              <></>
                            )}
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
                        </BlurView>
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
                    <>
                      {recordBtn ? (
                        uploadBtn ? (
                          <Gbutton
                            wp={220}
                            hp={40}
                            fs={18}
                            fw={600}
                            rounded={8}
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
                            imgName={stopRecordBtn ? 'pulse' : 'mic'}
                            onPress={
                              stopRecordBtn ? onStopRecord : onStartRecord
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
                    </>
                  )}
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
                // onPress={() => props.navigation.goBack()}
                onPress={onFileUpload}
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
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

export default ChallengeListening;
