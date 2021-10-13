// My Challenge View

import React from 'react';
import {Box, VStack} from 'native-base';

import MenuComponent from '../../../Components/MenuComponent';
import Wbutton from '../../../Components/WbuttonComponent';

const MyChallengeListPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'My Challenge'}
        navigation={props.navigation}
      />
      <VStack alignItems={'center'} space={4}>
        <Wbutton
          wp={320}
          hp={104}
          fs={28}
          fw={800}
          leftImgName={'singing'}
          rounded={8}
          text={'노래 챌린지'}
          onPress={() => props.loginChecktoMove('MySingingNavigation')}
        />
        <Wbutton
          wp={320}
          hp={104}
          fs={28}
          fw={800}
          leftImgName={'camera'}
          rounded={8}
          text={'영상 챌린지'}
          onPress={() => props.loginChecktoMove('MyVideoNavigation')}
        />
        <Wbutton
          wp={320}
          hp={104}
          fs={28}
          fw={800}
          leftImgName={'playingMusic'}
          rounded={8}
          text={'연주 챌린지'}
          ready={'2차 챌린지 오픈 예정'}
          disable
        />
        <Wbutton
          wp={320}
          hp={104}
          fs={28}
          fw={800}
          leftImgName={'preview'}
          rounded={8}
          text={'편곡 챌린지'}
          ready={'2차 챌린지 오픈 예정'}
          disable
        />
      </VStack>
    </Box>
  );
};

export default MyChallengeListPresenter;
