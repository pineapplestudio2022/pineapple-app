// Challenge 화면

import React from 'react';
import {Box, VStack, HStack, Stack, Image} from 'native-base';

import MenuComponent from '../../Components/MenuComponent';
import ChallengeDancer from '../../Assets/Image/challenge/image_challenge_dancer.png';
import Wbutton from '../../Components/WbuttonComponent';
import {heightPersentage, widthPersentage} from '../../Commons/CommonUtil';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const CoArHomePresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'작곡/편곡 매칭'}
        navigation={props.navigation}
      />
      <Image
        source={ChallengeDancer}
        resizeMode={'contain'}
        position={'absolute'}
        bottom={0}
        right={3}
        alt=" "
        style={{
          width: responsiveWidth(widthPersentage(125)),
          height: responsiveHeight(heightPersentage(273)),
        }}
      />
      <Box>
        <Stack space={5} alignItems="center">
          <Wbutton
            wp={300}
            hp={104}
            fs={28}
            fw={800}
            rounded={8}
            text={'작곡 매칭'}
            onPress={() => props.navigation.navigate('CompositionMatching')}
          />
          <Wbutton
            wp={300}
            hp={104}
            fs={28}
            fw={800}
            rounded={8}
            text={'편곡 매칭'}
            onPress={() => props.navigation.navigate('ArrangementMatching')}
          />
          {/* composition arrangement */}
        </Stack>
      </Box>
    </Box>
  );
};

export default CoArHomePresenter;
