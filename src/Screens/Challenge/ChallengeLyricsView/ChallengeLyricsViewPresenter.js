//Challenge -> 가사보기 뷰

import React from 'react';
import {ImageBackground} from 'react-native';
import {Box, Center, Text, VStack, HStack, TextArea} from 'native-base';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {heightPersentage, widthPersentage} from '../../../Commons/CommonUtil';
import MenuComponent from '../../../Components/MenuComponent';
import LyricsViewBackground from '../../../Assets/Image/challenge/bg_lyricsView_glassbox.png';
import Gbutton from '../../../Components/GbuttonComponent';

const ChallengeLyricsViewPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'노래부르기'}
        navigation={props.navigation}
      />
      <Box safeAreaBottom alignItems="center">
        <VStack space={2} w="80%">
          <Center>
            <Text fontSize={20} bold color={'#1a1b1c'} px={2} noOfLines={1}>
              {props.title}
            </Text>
            <Text />
          </Center>
          <HStack space={10} justifyContent={'center'} p={2}>
            <Text color={'#4be3ac'} fontSize={17} bold noOfLines={1}>
              장르 :
            </Text>
            <Text color={'#1a1b1c'} fontSize={17} bold noOfLines={1}>
              {props.genre}
            </Text>
          </HStack>
          <Box
            style={{
              shadowColor: '#858c9233',
              shadowOffset: {width: 0, height: 2},
              shadowRadius: 4,
              shadowOpacity: 1,
              height: responsiveHeight(heightPersentage(440)),
            }}>
            <Box borderRadius={20} overflow={'hidden'}>
              <ImageBackground
                source={LyricsViewBackground}
                resizeMode={'cover'}
                style={{
                  width: '100%',
                  height: '100%',
                }}>
                <Center>
                  <Box
                    bg={'#fafafa80'}
                    w={responsiveWidth(widthPersentage(240))}
                    h={responsiveHeight(heightPersentage(408))}
                    my={5}
                    rounded={16}>
                    <TextArea
                      h="100%"
                      fontSize={13}
                      textAlign={'center'}
                      borderWidth={0}
                      editable={false}
                      px={8}
                      pt={2}>
                      {props.lyrics}
                    </TextArea>
                  </Box>
                </Center>
              </ImageBackground>
            </Box>
          </Box>
        </VStack>
        <HStack space={5} justifyContent={'space-around'} mt={4}>
          <Gbutton
            wp={120}
            hp={40}
            fs={13}
            fw={800}
            imgName={'x'}
            text={'닫 기'}
            rounded={6}
            onPress={() => props.navigation.goBack()}
          />
          <Gbutton
            wp={120}
            hp={40}
            fs={13}
            fw={800}
            imgName={'check'}
            text={'참 여'}
            rounded={6}
            onPress={() =>
              props.navigation.navigate('Listening', {
                id: props.route.params.id,
              })
            }
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ChallengeLyricsViewPresenter;
