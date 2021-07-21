// 노래부르기 화면

import React from 'react';
import {Box, ScrollView} from 'native-base';
import MenuComponent from '../Components/MenuComponent';
import SingingCardComponent from '../Components/SingingCardComponent';

function Singing(props) {
  return (
    <Box flex={1}>
      <MenuComponent name={props.route.name} navigation={props.navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          alignItems: 'center',
        }}>
        <SingingCardComponent />
        <SingingCardComponent />
        <SingingCardComponent />
        <SingingCardComponent />
        <SingingCardComponent />
        <SingingCardComponent />
        <SingingCardComponent />
      </ScrollView>
    </Box>
  );
}

export default Singing;
