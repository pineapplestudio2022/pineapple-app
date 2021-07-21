// My Challenge > 노래챌린지 화면

import React from 'react';
import {Box, ScrollView, VStack} from 'native-base';
import MenuComponent from '../Components/MenuComponent';
import MySingingCardComponent from '../Components/MySingingCardComponent';

function MyChallengeSinging(props) {
  return (
    <Box flex={1}>
      <MenuComponent name={props.route.name} navigation={props.navigation} />
      <ScrollView>
        <VStack alignItems={'center'} space={2.5}>
          <MySingingCardComponent />
          <MySingingCardComponent />
          <MySingingCardComponent />
          <MySingingCardComponent />
          <MySingingCardComponent />
          <MySingingCardComponent />
          <MySingingCardComponent />
        </VStack>
      </ScrollView>
    </Box>
  );
}

export default MyChallengeSinging;
