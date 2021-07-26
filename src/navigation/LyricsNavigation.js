import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Lyrics from '../Screens/WriteLyrics/ToggleScreen2';
import WriteLyrics from '../Screens/WriteLyrics/Wrtinglyrics';
const LyricsStack = createStackNavigator();

function LyricsScreen() {
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
}

export default LyricsScreen;
