import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ChallengeListening from '../Screens/Challenge/ChallengeListening';
import MyChallengeComposing from '../Screens/MyChallenge/MyChallengeComposing';
import MyChallengePlay from '../Screens/MyChallenge/MyChallengePlay';
import MyChallengeSinging from '../Screens/MyChallenge/MyChallengeSinging';
import MyChallengeVideo from '../Screens/MyChallenge/MyChallengeVideo';
import MyChallengeList from '../Screens/MyChallenge/MyChallengeList';

const MyChallengeStack = createStackNavigator();
const MyComposingStack = createStackNavigator();
const MyPlayingStack = createStackNavigator();
const MySingingStack = createStackNavigator();
const MyVideoStack = createStackNavigator();

//내 노래 챌린지 nav
const MySingingNavigation = props => {
  return (
    <MySingingStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <MySingingStack.Screen
        name={'MySinging'}
        component={MyChallengeSinging}
      />
      <MySingingStack.Screen
        name={'Listening'}
        component={ChallengeListening}
      />
    </MySingingStack.Navigator>
  );
};

//내 영상 챌린지 nav
const MyVideoNavigation = props => {
  return (
    <MyVideoStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <MyVideoStack.Screen name={'MyVideo'} component={MyChallengeVideo} />
    </MyVideoStack.Navigator>
  );
};

//내 연주 챌린지 nav
const MyPlayingNavigation = props => {
  return (
    <MyPlayingStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <MyPlayingStack.Screen name={'MyPlay'} component={MyChallengePlay} />
    </MyPlayingStack.Navigator>
  );
};

//내 팬곡 챌린지 nav
const MyComposingNavigation = props => {
  return (
    <MyComposingStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <MyComposingStack.Screen
        name={'MyComposing'}
        component={MyChallengeComposing}
      />
    </MyComposingStack.Navigator>
  );
};

const MyChallengeNavigation = props => {
  return (
    <MyChallengeStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <MyChallengeStack.Screen
        name={'MyChallenge'}
        component={MyChallengeList}
      />
      <MyChallengeStack.Screen
        name={'MyComposingNavigation'}
        component={MyComposingNavigation}
      />
      <MyChallengeStack.Screen
        name={'MyPlayingNavigation'}
        component={MyPlayingNavigation}
      />
      <MyChallengeStack.Screen
        name={'MySingingNavigation'}
        component={MySingingNavigation}
      />
      <MyChallengeStack.Screen
        name={'MyVideoNavigation'}
        component={MyVideoNavigation}
      />
    </MyChallengeStack.Navigator>
  );
};

export default MyChallengeNavigation;
