import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import UserDispatchProvider from './src/Commons/UserDispatchProvider';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './src/navigation/RootNavigation';
import RNFetchBlob from 'rn-fetch-blob';
import APIKit from './src/API/APIkit';

const App = () => {
  useEffect(() => {
    getIRAudioFiletoS3();
    SplashScreen.hide();
  }, []);
  const getIRAudioFiletoS3 = async () => {
    const dirs = RNFetchBlob.fs.dirs.DocumentDir;
    const path = dirs + '/IR_tunnel_entrance_d_1way_mono.m4a';
    RNFetchBlob.fs.exists(path).then(async exist => {
      if (exist) {
        return;
      }
      await APIKit.post('aws/getS3SignedUrl', {
        musicKey:
          'resources/audio/IRSampleAudio/IR_tunnel_entrance_d_1way_mono.m4a',
      })
        .then(res => {
          const s3Path = res.data;
          RNFetchBlob.config({
            fileCache: true,
            path: path,
          })
            .fetch('GET', s3Path)
            .progress((received, total) => {
              const percentage = Math.floor((received / total) * 100) + '%';
              if (__DEV__) {
                console.log(percentage);
              }
            })
            .then(resp => {
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
    });
  };

  return (
    <UserDispatchProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <RootNavigation />
        </NativeBaseProvider>
      </NavigationContainer>
    </UserDispatchProvider>
  );
};

export default App;
