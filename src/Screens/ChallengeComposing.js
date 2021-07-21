//작곡 참여 View
import {
  Box,
  HStack,
  Pressable,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import MenuComponent from '../Components/MenuComponent';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../Commons/DeviceWHPersentage';
import AIMusicBoxComponent from '../Components/AIMusicBoxComponent';

function ChallengeComposing(props) {
  return (
    <Box flex={1}>
      <MenuComponent name={props.route.name} navigation={props.navigation} />
      <ScrollView>
        <Box alignItems={'center'} my={3}>
          <Pressable
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
            <AIMusicBoxComponent />
            <AIMusicBoxComponent />
          </HStack>
          <HStack space={22} justifyContent={'center'}>
            <AIMusicBoxComponent />
            <AIMusicBoxComponent />
          </HStack>
          <HStack space={22} justifyContent={'center'}>
            <AIMusicBoxComponent />
            <AIMusicBoxComponent />
          </HStack>
          <HStack space={22} justifyContent={'center'}>
            <AIMusicBoxComponent />
            <AIMusicBoxComponent />
          </HStack>
          <HStack space={22} justifyContent={'center'}>
            <AIMusicBoxComponent />
            <AIMusicBoxComponent />
          </HStack>
          <HStack space={22} justifyContent={'center'}>
            <AIMusicBoxComponent />
            <AIMusicBoxComponent />
          </HStack>
        </VStack>
      </ScrollView>
    </Box>
  );
}

export default ChallengeComposing;
