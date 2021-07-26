import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Challenge from '../Screens/Challenge/Challenge';
import ChallengeComposing from '../Screens/Challenge/ChallengeComposing';
import ChallengeComposingDetail from '../Screens/Challenge/ChallengeComposingDetail';
import ChallengeListening from '../Screens/Challenge/ChallengeListening';
import ChallengeSinging from '../Screens/Challenge/ChallengeSinging';
import ChallengeLyricsView from '../Screens/Challenge/ChallengeLyricsView';
import ChallengePlaying from '../Screens/Challenge/ChallengePlaying';
import ChallengePlayingDetail from '../Screens/Challenge/ChallengePlayingDetail';
import MyChallengeScreen from './MyChallengeNavigation';
import ChallengeVideo from '../Screens/Challenge/ChallengeVideo';

const ChallengeStack = createStackNavigator();
const SingingStack = createStackNavigator();
const ComposingStack = createStackNavigator();
const PlayingStack = createStackNavigator();
const VideoStack = createStackNavigator();

// Challenge > 연주 참여 nav
const PlayingScreen = () => {
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
      <PlayingStack.Screen name={'MyChallenge'} component={MyChallengeScreen} />
    </PlayingStack.Navigator>
  );
};

//Challenge > 15초 영상챌린지
const VideoScreen = () => {
  return (
    <VideoStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <VideoStack.Screen name={'Video'} component={ChallengeVideo} />
      <VideoStack.Screen name={'MyChallenge'} component={MyChallengeScreen} />
    </VideoStack.Navigator>
  );
};

// Challenge > 작곡 참여 nav
const ComposingScreen = () => {
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
        name={'MyChallenge'}
        component={MyChallengeScreen}
      />
    </ComposingStack.Navigator>
  );
};

// Challenge > 노래 부르기 참여 nav
const SingingScreen = () => {
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
export default ChallengeScreen = () => {
  return (
    <ChallengeStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <ChallengeStack.Screen name={'Challenge'} component={Challenge} />
      <ChallengeStack.Screen name={'SingingScreen'} component={SingingScreen} />
      <ChallengeStack.Screen
        name={'ComposingScreen'}
        component={ComposingScreen}
      />
      <SingingStack.Screen name={'PlayingScreen'} component={PlayingScreen} />
      <ChallengeStack.Screen name={'VideoScreen'} component={VideoScreen} />
    </ChallengeStack.Navigator>
  );
};
