//작곡 참여 View
import React from 'react';
import {Box, HStack, Pressable, ScrollView, Text, VStack} from 'native-base';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../../../Commons/CommonUtil';
import MenuComponent from '../../../Components/MenuComponent';
import AIMusicBoxComponent from '../../../Components/AIMusicBoxComponent';

const ChallengePlayingPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'편곡 참여'}
        navigation={props.navigation}
      />
      <ScrollView>
        <Box alignItems={'center'} my={3}>
          <Pressable
            onPress={() => props.navigation.navigate('MyChallengeNavigation')}
            width={responsiveWidth(widthPersentage(220))}
            height={responsiveHeight(heightPersentage(40))}
            backgroundColor={'#0fefbd'}
            alignItems={'center'}
            justifyContent={'center'}
            rounded={8}
            mb={1}>
            <Text
              color="white"
              fontSize={responsiveFontSize(fontSizePersentage(18))}
              fontWeight={600}>
              MY CHALLENGE
            </Text>
          </Pressable>
          <Text
            my={1}
            fontSize={responsiveFontSize(fontSizePersentage(18))}
            bold
            color={'#a5a8ae'}>
            AI가 만든 음악을 편곡해보세요.
          </Text>
        </Box>
        <VStack space={22}>
          <HStack space={22} justifyContent={'center'}>
            <AIMusicBoxComponent
              navigation={props.navigation}
              nextView={'PlayingDetail'}
            />
            <AIMusicBoxComponent
              navigation={props.navigation}
              nextView={'PlayingDetail'}
            />
          </HStack>
          <HStack space={22} justifyContent={'center'}>
            <AIMusicBoxComponent
              navigation={props.navigation}
              nextView={'PlayingDetail'}
            />
            <AIMusicBoxComponent
              navigation={props.navigation}
              nextView={'PlayingDetail'}
            />
          </HStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default ChallengePlayingPresenter;
