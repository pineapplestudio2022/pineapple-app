// 노래부르기 화면

import React from 'react';
import {Box, Center, ScrollView} from 'native-base';
import {ImageBackground} from 'react-native';
import MenuComponent from '../Components/MenuComponent';
import MainBackground from '../Assets/Image/bg_main.png';
import CardComponent from '../Components/CardComponent';

function Singing(props) {
  return (
    <Box flex={1}>
      <MenuComponent name={props.route.name} navigation={props.navigation} />
      <ScrollView
        _contentContainerStyle={{
          alignItems: 'center',
        }}>
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
        <CardComponent />
      </ScrollView>
    </Box>
  );
}

export default Singing;
