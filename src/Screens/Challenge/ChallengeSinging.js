// 노래부르기 화면
import React from 'react';
import {Box, ScrollView} from 'native-base';
import MenuComponent from '../../Components/MenuComponent';
import SingingCardComponent from '../../Components/SingingCardComponent';

function Singing(props) {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'노래부르기'}
        navigation={props.navigation}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          alignItems: 'center',
        }}>
        <SingingCardComponent navigation={props.navigation} />
        <SingingCardComponent navigation={props.navigation} />
        <SingingCardComponent navigation={props.navigation} />
        <SingingCardComponent navigation={props.navigation} />
      </ScrollView>
    </Box>
  );
}

export default Singing;
