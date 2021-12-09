//MainScreen Navigation
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../Screens/Home';
import Ranking from '../Screens/Ranking';
import LyricsNavigation from '../navigation/LyricsNavigation';
import ChallengeNavigation from './ChallengeNavigation';
import BgmStudio from '../Screens/BgmStudio';
import CoArMatching from '../Screens/CoArMatching';

const HomeStack = createStackNavigator();

const HomeNavigation = props => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <HomeStack.Screen name={'Home'} component={Home} />
      <HomeStack.Screen name={'Ranking'} component={Ranking} />
      <HomeStack.Screen
        name={'ChallengeNavigation'}
        component={ChallengeNavigation}
      />
      <HomeStack.Screen
        name={'LyricsNavigation'}
        component={LyricsNavigation}
      />
      <HomeStack.Screen name={'BgmStudio'} component={BgmStudio} />
      <HomeStack.Screen name={'CoArMatching'} component={CoArMatching} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigation;
