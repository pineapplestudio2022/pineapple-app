//Challenge -> 15초감상 View

import React, {useEffect, useState, useRef, useContext} from 'react';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import {RNFFmpeg, RNFFmpegConfig} from 'react-native-ffmpeg';
import {
  PERMISSIONS,
  request,
  requestMultiple,
  RESULTS,
} from 'react-native-permissions';

import APIKit from '../../../API/APIkit';
import {UserDispatch} from '../../../Commons/UserDispatchProvider';
import {defaultAlertMessage} from '../../../Commons/CommonUtil';
import FFMpegTestPresenter from './FFmpegTestPresenter';

const FFMpegTestContainer = props => {
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

  const [adjustVolume, setAdjustVolume] = useState(0); // bgm - vocal 볼륨차
  const [bgmVolume, setBgmVolume] = useState(0);

  const [customOptionUse, setCustomOptionUse] = useState(false); //custom command 사용
  const handlerOptionToggle = () => setCustomOptionUse(!customOptionUse);

  const [fileList, setFileList] = useState();
  const [ffmpegCommand, setFFmpegCommand] = useState({
    time: '',
    command: '',
  });
  const [refreshing, setRefreshing] = useState(false);

  const getCommandList = async () => {
    const dirs = RNFetchBlob.fs.dirs.DocumentDir;
    const path = `${dirs}/ffmpegcmd/`;

    const assetsDirExists = await RNFetchBlob.fs.isDir(path);
    if (!assetsDirExists) {
      RNFetchBlob.fs
        .mkdir(path)
        .then(res => {
          if (__DEV__) {
            console.log('App directory created..');
          }
        })
        .catch(err => {
          if (__DEV__) {
            console.log(err);
          }
        });
    }
    RNFetchBlob.fs.ls(path).then(files => {
      setFileList(
        files.map((name, index) => ({
          key: `${index}`,
          name: `${name}`,
        })),
      );
    });
  };

  const writeFiletoLocal = () => {
    const dirs = RNFetchBlob.fs.dirs.DocumentDir;
    const path = `${dirs}/ffmpegcmd/command_${new Date()
      .getTime()
      .toString()}.text`;
    const time = new Date().getTime().toString();
    setFFmpegCommand({...ffmpegCommand, time: time});
    RNFetchBlob.fs
      .writeFile(path, JSON.stringify(ffmpegCommand), 'utf8')
      .then(() => {
        if (__DEV__) {
          console.log(`path: ${path}`);
          console.log(JSON.stringify(ffmpegCommand));
        }
        onRefresh();
      });
  };

  const readFiletoLocal = filename => {
    const dirs = RNFetchBlob.fs.dirs.DocumentDir;
    const path = `${dirs}/ffmpegcmd/${filename}`;
    RNFetchBlob.fs.exists(path).then(async exist => {
      if (!exist) {
        return;
      }
      RNFetchBlob.fs.readFile(path, 'utf8').then(data => {
        const {time, command} = JSON.parse(data);
        setFFmpegCommand({time: time, command: command});
        if (__DEV__) {
          console.log(JSON.parse(data));
        }
      });
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    getCommandList();
    setRefreshing(false);
  };
  const originalSongIdNum = 35; //원곡 id

  //권한 가져오기
  useEffect(() => {
    getPermission();
    getCommandList();
  }, []);

  useEffect(() => {
    if (__DEV__) {
      console.log(`bgmVolume: ${bgmVolume}`);
      console.log(`BGMVolume - VocalVolume: ${adjustVolume}`);
    }
  }, [adjustVolume, bgmVolume]);

  useEffect(() => {
    ARPlayer.current = new AudioRecorderPlayer(); //재생
    ARPlayer.current.setSubscriptionDuration(1);
    ARRecord.current = new AudioRecorderPlayer(); //녹음
    ARRecord.current.setSubscriptionDuration(1);

    // RNFFmpegConfig.setLogLevel(LogLevel.AV_LOG_VERBOSE);

    RNFFmpegConfig.enableLogCallback(ffmpegLogCallback);

    const getOriginalSong = async () => {
      const payload = {id: originalSongIdNum.toString()};

      await APIKit.post('originalWorks/getOriginalSong', payload)
        .then(({data}) => {
          if (__DEV__) {
            console.log(data);
          }
          setTitle(data.IBparams.rows[0].title);
          setLyrics(data.IBparams.rows[0].lyrics);
          setGenre(data.IBparams.rows[0].genre);

          const keyname = data.IBparams.rows[0].musicKey.toString();
          const splitKey = keyname.split('/');
          const length = splitKey.length;
          const filename = splitKey[length - 1];

          const dirs = RNFetchBlob.fs.dirs.DocumentDir;
          const path = dirs + '/';
          RNFetchBlob.fs
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
                        if (__DEV__) {
                          const percentage =
                            Math.floor((received / total) * 100) + '%';
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
  }, []);

  const ffmpegLogCallback = log => {
    const a = log;
  };
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

  const onStartOutputFilePlay = async () => {
    try {
      const outputFilePath = Platform.select({
        ios: encodeURI('file://' + filepath + outputFile),
        android: filepath + outputFile,
      });
      const msg = await ARPlayer.current.startPlayer(outputFilePath);
      const volume = await ARPlayer.current.setVolume(1.0);
      if (__DEV__) {
        console.log(`file: ${msg}`, `volume: ${volume}`);
      }
      setIsAlreadyPlay(true);
      ARPlayer.current.addPlayBackListener(e => {
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
  const onStartPlay = async () => {
    try {
      const msg = await ARPlayer.current.startPlayer(playPath);
      const volume = await ARPlayer.current.setVolume(1.0);
      if (__DEV__) {
        console.log(`file: ${msg}`, `volume: ${volume}`);
      }
      setIsAlreadyPlay(true);
      ARPlayer.current.addPlayBackListener(e => {
        // if (
        //   ARPlayer.current.mmss(Math.floor(e.currentPosition / 1000)) >= '00:15'
        // ) {
        //   onStopPlay();
        //   return;
        // }
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

  const onStopPlay = () => {
    ARPlayer.current.stopPlayer();
    ARPlayer.current.removePlayBackListener();
    setIsAlreadyPlay(false);
    setPercent(0);
    setDuration('00:00');
    setTimeElapsed('00:00');
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
      const foo = await ARRecord.current.startRecorder(recordPath, audioSet);
      setUri(foo);
      if (__DEV__) {
        console.log('recording file name : ' + recordPath);
        console.log('foo : ' + foo);
      }
      setStopRecordBtn(true);

      //노래 재생 리스너
      ARPlayer.current.addPlayBackListener(e => {
        // if (e.currentPosition === e.duration) {
        //   // ARPlayer.current.stopPlayer();
        //   // ARRecord.current.stopRecorder();
        //   onStopRecord();
        //   return;
        // }
        // if (
        //   ARPlayer.current.mmss(Math.floor(e.currentPosition / 1000)) >= '00:05'
        // ) {
        //   onStopRecord();
        //   return;
        // }
        if (e.currentPosition >= e.duration) {
          ARPlayer.current.stopPlayer();
          ARRecord.current.stopRecorder();
          // onStopRecord();
          return;
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

      const vocalLUFSError = await RNFFmpeg.executeWithArguments([
        '-i',
        uri,
        '-af',
        'ebur128=framelog=verbose',
        '-f',
        'null',
        '-',
      ]);
      if (__DEV__) {
        console.log(`FFmpeg process exited with vocal rc=${vocalLUFSError}.`);
      }

      const vocalLUFSOutput = await RNFFmpegConfig.getLastCommandOutput();
      const vocalLUFSSummary = vocalLUFSOutput.toString().split('Summary:')[1];
      const avgVocalVolume = `-${vocalLUFSSummary.split('-')[1]}`;
      if (__DEV__) {
        console.log(
          '======================Vocal LUFS(인지음량) 측정==========================',
        );
        console.log(`Vocal LUFS Summary:${vocalLUFSSummary}`);
        console.log(`avgVocalVolume: ${avgVocalVolume}`);
      }
      const bgmLUFSError = await RNFFmpeg.executeWithArguments([
        '-i',
        filepath + fileName,
        '-af',
        'ebur128=framelog=verbose',
        '-f',
        'null',
        '-',
      ]);
      if (__DEV__) {
        console.log(`FFmpeg process exited with bgmlufs rc=${bgmLUFSError}.`);
      }

      const bgmLUFSOutput = await RNFFmpegConfig.getLastCommandOutput();
      const bgmLUFSSummary = bgmLUFSOutput.split('Summary:')[1];
      const avgBGMVolume = `-${bgmLUFSSummary.split('-')[1]}`;
      if (__DEV__) {
        console.log(
          '======================BGM LUFS(인지음량) 측정======================',
        );
        console.log(`BGM LUFS Summary:${bgmLUFSSummary}`);
        console.log(`avgBGMVolume: ${avgBGMVolume}`);
      }
      setBgmVolume(avgBGMVolume);
      setAdjustVolume(
        Math.floor(parseFloat(avgBGMVolume) - parseFloat(avgVocalVolume)),
      );

      const outputFileName =
        fileName.substring(0, fileName.lastIndexOf('.')) +
        `_${new Date().getTime().toString()}.mp4`;
      // here's code start to audio mix.

      const IRSampleAudioIos =
        RNFetchBlob.fs.dirs.DocumentDir + '/IR_tunnel_entrance_d_1way_mono.m4a';

      const options = [
        '-i',
        uri,
        '-i',
        filepath + fileName,
        '-i',
        IRSampleAudioIos,
        '-filter_complex',
        `[0]volume=volume=${adjustVolume}dB,afftdn=nf=-20[a0];[a0][2]afir=dry=10:wet=10[a00];[1]adelay=0s|0s[a1];[a00][a1]amix=inputs=2:dropout_transition=10000[a]`,
        '-map',
        '[a]',
        `${filepath}${outputFileName}`,
      ];

      const customOptions = [
        '-i',
        uri,
        '-i',
        filepath + fileName,
        '-i',
        IRSampleAudioIos,
        '-filter_complex',
        `${ffmpegCommand.command}`,
        '-map',
        '[a]',
        `${filepath}${outputFileName}`,
      ];

      if (__DEV__) {
        console.log('[onStopRecord] handler is started');
        console.log(`[input file 1]: ${uri}`);
        console.log(`[input file 2]: ${filepath + fileName}`);
        console.log(`[input file 3]: ${IRSampleAudioIos}`);
        console.log(`[output file name] : ${outputFileName}`);
        console.log(`[options]: ${options}`);
        console.log(`[customOption]: ${customOptions}`);
        console.log(`[device dir path]: ${filepath}`);
      }
      if (customOptionUse) {
        RNFFmpeg.executeWithArguments(customOptions).then(async result => {
          if (__DEV__) {
            console.log(`FFmpeg process exited with rc=${result}.`);
          }

          setUploadBtn(true);
          setOutputFile(outputFileName);
          setSpinner(false);
        });
      } else {
        RNFFmpeg.executeWithArguments(options).then(async result => {
          if (__DEV__) {
            console.log(`FFmpeg process exited with rc=${result}.`);
          }

          setUploadBtn(true);
          setOutputFile(outputFileName);
          setSpinner(false);
        });
      }

      // const options2 = [
      //   '-i',
      //   uri,
      //   '-i',
      //   filepath + fileName,
      //   '-filter_complex',
      //   '[0]volume=volume=15dB,highpass=f=200,lowpass=f=3000[a0];[1]volume=volume=0.5[a1];[a1]adelay=0s|0s[a2];[a0][a2]amix=inputs=2[a]',
      //   // '[0]volume=volume=15dB,highpass=f=200,lowpass=f=3000[a0];[a0]aecho=0.8:0.9:40|50|70:0.4|0.3|0.2[a1];[1]volume=volume=0.5[a2];[a2]adelay=0s|0s[a3];[a1][a3]amix=inputs=2:dropout_transition=10000[a]',
      //   // '[0] [2] afir=dry=10:wet=10[a0]; [1]adelay=0s|0s[a1]; [a0][a1]amix=inputs=2:dropout_transition=10000[a]',
      //   '-map',
      //   '[a]',
      //   `${filepath}original_${outputFileName}`,
      // ];

      // if (__DEV__) {
      //   console.log('[onStopRecord] handler is started');
      //   console.log(`[input file 1]: ${uri}`);
      //   console.log(`[input file 2]: ${filepath + fileName}`);
      //   console.log(`[output file name] : ${outputFileName}`);
      //   console.log(`[options]: ${options}`);
      // }

      // RNFFmpeg.executeWithArguments(options2).then(async result => {
      //   if (__DEV__) {
      //     console.log(`FFmpeg process exited with rc=${result}.`);
      //   }

      //   setUploadBtn(true);
      //   setOutputFile(outputFileName);
      //   setSpinner(false);
      // });
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

  return (
    <FFMpegTestPresenter
      {...props}
      title={title}
      genre={genre}
      lyrics={lyrics}
      spinner={spinner}
      recordBtn={recordBtn}
      uploadBtn={uploadBtn}
      percent={percent}
      timeElapsed={timeElapsed}
      duration={duration}
      uploadFinish={uploadFinish}
      // onFileUpload={onFileUpload}
      stopRecordBtn={stopRecordBtn}
      onStopRecord={onStopRecord}
      onStartRecord={onStartRecord}
      isAlreadyPlay={isAlreadyPlay}
      onStopPlay={onStopPlay}
      onStartPlay={onStartPlay}
      fileList={fileList}
      writeFiletoLocal={writeFiletoLocal}
      ffmpegCommand={ffmpegCommand}
      setFFmpegCommand={setFFmpegCommand}
      readFiletoLocal={readFiletoLocal}
      refreshing={refreshing}
      onRefresh={onRefresh}
      customOptionUse={customOptionUse}
      handlerOptionToggle={handlerOptionToggle}
      onStartOutputFilePlay={onStartOutputFilePlay}
    />
  );
};

export default FFMpegTestContainer;
