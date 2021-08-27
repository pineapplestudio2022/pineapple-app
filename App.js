import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/navigation/MainNavigation';
import UserDispatchProvider from './src/Commons/UserDispatchProvider';
import SplashScreen from 'react-native-splash-screen';
// import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const App = () => {
  // // 음성인식 권한 체크
  // const checkRecord = async () => {
  //   try {
  //     const result = await request(PERMISSIONS.IOS.SPEECH_RECOGNITION);
  //     if (result === RESULTS.GRANTED) {
  //       console.log('succese');
  //     }
  //   } catch (e) {
  //     console.log(`error \n ${e}`);
  //   }
  // };
  // React.useEffect(() => {
  //   checkRecord();
  // }, []);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <UserDispatchProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <MainNavigation />
        </NativeBaseProvider>
      </NavigationContainer>
    </UserDispatchProvider>
  );
};

export default App;
