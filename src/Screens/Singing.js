// 노래부르기 화면

import React from 'react';
import {Box} from 'native-base';
import {ImageBackground} from 'react-native';
import MenuComponent from '../Components/MenuComponent';
import MainBackground from '../Assets/Image/main_background.png';
import CardComponent from '../Components/CardComponent';

function Singing(props) {
  return (
    <Box flex={1}>
      <ImageBackground
        source={MainBackground}
        resizeMode={'cover'}
        style={{width: '100%', height: '100%'}}>
        <MenuComponent name={props.route.name} navigation={props.navigation} />
        <CardComponent />
      </ImageBackground>
    </Box>
  );
}

export default Singing;
