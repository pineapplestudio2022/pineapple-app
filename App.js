import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
// import MainNavigation from './src/navigation/MainNavigation';
import UserDispatchProvider from './src/Commons/UserDispatchProvider';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './src/navigation/MainNavigation';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

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
