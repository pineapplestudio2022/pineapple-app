// Challenge 화면

import React from 'react';
import {Box, VStack, HStack, Stack, Image} from 'native-base';

import MenuComponent from '../../Components/MenuComponent';
import ChallengeDancer from '../../Assets/Image/challenge/image_challenge_dancer.png';
import Wbutton from '../../Components/WbuttonComponent';

function Challenge(props) {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'Challenge'}
        navigation={props.navigation}
      />
      <Box>
        <Stack space={5} alignItems="center">
          <VStack space={5} alignItems="center">
            <HStack space={5}>
              <Wbutton
                wp={140}
                hp={140}
                fs={14}
                fw={800}
                imgName={'singing'}
                rounded={8}
                text={'노래 부르기 참여'}
                onPress={() => props.navigation.navigate('SingingScreen')}
              />
              <Wbutton
                wp={140}
                hp={140}
                fs={14}
                fw={800}
                imgName={'camera'}
                rounded={8}
                text={'15초 영상 챌린지'}
                onPress={() => props.navigation.navigate('ChallengeVideo')}
              />
            </HStack>
          </VStack>
          <VStack space={5} alignItems="center">
            <HStack space={5} alignItems="center">
              <Wbutton
                wp={140}
                hp={140}
                fs={14}
                fw={800}
                imgName={'playingMusic'}
                rounded={8}
                text={'연주 참여'}
                ready={'2차 챌린지 오픈 예정'}
                disable
                // onPress={() => props.navigation.navigate('ComposingScreen')}
              />
              <Wbutton
                wp={140}
                hp={140}
                fs={14}
                fw={800}
                imgName={'preview'}
                rounded={8}
                text={'편곡 참여'}
                ready={'2차 챌린지 오픈 예정'}
                disable
                // onPress={() => props.navigation.navigate('PlayingScreen')}
              />
            </HStack>
          </VStack>
          <Wbutton
            wp={300}
            hp={104}
            fs={28}
            fw={800}
            leftImgName={'headphone'}
            rounded={8}
            text={'챌린지 감상'}
            onPress={() =>
              props.navigation.navigate('ChallengeEnjoy', {id: ''})
            }
          />
        </Stack>
      </Box>
      <Box mt="7" flex={1} safeAreaBottom>
        <Image
          source={ChallengeDancer}
          resizeMode={'contain'}
          position={'absolute'}
          right={3}
          h="100%"
          alt=" "
        />
      </Box>
    </Box>
  );
}

export default Challenge;
