// My Challenge View

import React, {useContext} from 'react';
import {Box, VStack} from 'native-base';

import MenuComponent from '../../Components/MenuComponent';
import Wbutton from '../../Components/WbuttonComponent';
import {UserDispatch} from '../../Commons/UserDispatchProvider';
import {defaultAlertMessage} from '../../Commons/CommonUtil';

function MyChallenge(props) {
  const {userId} = useContext(UserDispatch);
  const loginChecktoMove = navigation => {
    if (userId === '' || userId === undefined) {
      defaultAlertMessage('로그인 후 사용가능합니다.');
      return;
    }
    props.navigation.navigate(navigation);
  };
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
          onPress={() => loginChecktoMove('MySingingScreen')}
        />
        <Wbutton
          wp={320}
          hp={104}
          fs={28}
          fw={800}
          leftImgName={'camera'}
          rounded={8}
          text={'영상 챌린지'}
          onPress={() => loginChecktoMove('MyVideoScreen')}
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
}

export default MyChallenge;
