//가사 쓰기 Navigation
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyBGM from '../Screens/MyBGM';

const BGMStudioStack = createStackNavigator();

const BGMStudioNavigation = props => {
  return (
    <BGMStudioStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        animationEnabled: false,
      }}>
      <BGMStudioStack.Screen name={'MyBGM'} component={MyBGM} />
    </BGMStudioStack.Navigator>
  );
};

export default BGMStudioNavigation;
