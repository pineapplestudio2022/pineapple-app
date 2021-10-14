import {Box, Heading} from 'native-base';
import React from 'react';
import MenuComponent from '../../Components/MenuComponent';

const IntroPresenter = props => {
  return (
    <Box>
      <MenuComponent name={props.route.nate} navigation={props.navigation} />
      <Heading>Intro</Heading>
    </Box>
  );
};

export default IntroPresenter;