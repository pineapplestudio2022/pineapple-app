//가사 쓰기 Navigation
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import WriteLyrics from '../Screens/WriteLyrics/Wrtinglyrics';
import LyricsListView from '../Screens/WriteLyrics/LyricsListView';

const LyricsStack = createStackNavigator();

const LyricsNavigation = props => {
  return (
    <LyricsStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <LyricsStack.Screen name={'LyricsListView'} component={LyricsListView} />
      <LyricsStack.Screen name={'WriteLyrics'} component={WriteLyrics} />
    </LyricsStack.Navigator>
  );
};

export default LyricsNavigation;
