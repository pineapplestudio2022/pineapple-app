import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {ImageBackground} from 'react-native';
import MyDrawer from './src/navigation/MyDrawer';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <MyDrawer />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
