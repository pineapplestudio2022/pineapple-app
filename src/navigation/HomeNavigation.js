//MainScreen Navigation
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
// import MainScreen from '../Screens/MainScreen';
import ChallengeScreen from './ChallengeNavigation';
import LyricsScreen from '../navigation/LyricsNavigation';
import Home from '../Screens/Home';
import Ranking from '../Screens/Ranking';

const HomeStack = createStackNavigator();

function HomeStackNavi() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <HomeStack.Screen name={'Home'} component={Home} />
      <HomeStack.Screen name={'Ranking'} component={Ranking} />
      <HomeStack.Screen name={'ChallengeScreen'} component={ChallengeScreen} />
      <HomeStack.Screen name={'LyricsScreen'} component={LyricsScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeStackNavi;
