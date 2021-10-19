import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChallengeList from '../Screens/Challenge/ChallengeList';
import ChallengeComposing from '../Screens/Challenge/ChallengeComposing';
import ChallengeComposingDetail from '../Screens/Challenge/ChallengeComposingDetail';
import ChallengeListening from '../Screens/Challenge/ChallengeListening';
import ChallengeSinging from '../Screens/Challenge/ChallengeSinging';
import ChallengePlaying from '../Screens/Challenge/ChallengePlaying';
import ChallengeLyricsView from '../Screens/Challenge/ChallengeLyricsView';
import ChallengePlayingDetail from '../Screens/Challenge/ChallengePlayingDetail';
import MyChallengeNavigation from './MyChallengeNavigation';

const ChallengeStack = createStackNavigator();
const SingingStack = createStackNavigator();
const ComposingStack = createStackNavigator();
const PlayingStack = createStackNavigator();

// Challenge > 연주 참여 nav
const PlayingNavigation = () => {
  return (
    <PlayingStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <PlayingStack.Screen name={'Playing'} component={ChallengePlaying} />
      <PlayingStack.Screen
        name={'PlayingDetail'}
        component={ChallengePlayingDetail}
      />
      <PlayingStack.Screen
        name={'MyChallengeNavigation'}
        component={MyChallengeNavigation}
      />
    </PlayingStack.Navigator>
  );
};

// Challenge > 작곡 참여 nav
const ComposingNavigation = () => {
  return (
    <ComposingStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <ComposingStack.Screen
        name={'Composing'}
        component={ChallengeComposing}
      />
      <ComposingStack.Screen
        name={'ComposingDetail'}
        component={ChallengeComposingDetail}
      />
      <ComposingStack.Screen
        name={'MyChallengeNavigation'}
        component={MyChallengeNavigation}
      />
    </ComposingStack.Navigator>
  );
};

// Challenge > 노래 부르기 참여 nav
const SingingNavigation = () => {
  return (
    <SingingStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}
      initialRouteName={'Singing'}>
      <SingingStack.Screen name={'Singing'} component={ChallengeSinging} />
      <SingingStack.Screen name={'Lyrics'} component={ChallengeLyricsView} />
      <SingingStack.Screen name={'Listening'} component={ChallengeListening} />
    </SingingStack.Navigator>
  );
};

// Challenge > 15초 영상 챌린지

// Challenge nav
const ChallengeNavigation = props => {
  return (
    <ChallengeStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <ChallengeStack.Screen name={'ChallengeList'} component={ChallengeList} />
      <ChallengeStack.Screen
        name={'SingingNavigation'}
        component={SingingNavigation}
      />
      <ChallengeStack.Screen
        name={'PlayingNavigation'}
        component={PlayingNavigation}
      />
      <ChallengeStack.Screen
        name={'ComposingNavigation'}
        component={ComposingNavigation}
      />
    </ChallengeStack.Navigator>
  );
};

export default ChallengeNavigation;
