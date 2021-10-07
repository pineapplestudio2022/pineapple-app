//가사 쓰기 Navigation
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Lyrics from '../Screens/WriteLyrics/ToggleScreen2';
import WriteLyrics from '../Screens/WriteLyrics/Wrtinglyrics';

const LyricsStack = createStackNavigator();

const LyricsNavigation = props => {
  return (
    <LyricsStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <LyricsStack.Screen name={'Lyrics'} component={Lyrics} />
      <LyricsStack.Screen name={'WriteLyrics'} component={WriteLyrics} />
    </LyricsStack.Navigator>
  );
};

export default LyricsNavigation;
