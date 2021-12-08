//가사 쓰기 Navigation
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BgmStudio from '../Screens/BgmStudio';

const BGMStudioStack = createStackNavigator();

const BGMStudioNavigation = props => {
  return (
    <BGMStudioStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <BGMStudioStack.Screen name={'BGMStudio'} component={BgmStudio} />
    </BGMStudioStack.Navigator>
  );
};

export default BGMStudioNavigation;
