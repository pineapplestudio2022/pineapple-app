//Drawer Navigation

import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Box, Center, Pressable, Text, VStack} from 'native-base';
import MainScreen from '../Screens/MainScreen';
import Challenge from '../Screens/Challenge';
import Singing from '../Screens/Singing';
import LyricsView from '../Screens/ChallengeLyricsView';
import ListeningView from '../Screens/ChallengeListening';
import {ImageBackground} from 'react-native';
import MainBackground from '../Assets/Image/bg_main.png';
import ComposingView from '../Screens/ChallengeComposing';
import MyChallenge from '../Screens/MyChallenge';
import MyChallengeSinging from '../Screens/MyChallengeSinging';
import MyChallengeVideo from '../Screens/MyChallengeVideo';
import MyChallegePlay from '../Screens/MyChallengePlay';
import MyChallengeComposing from '../Screens/MyChallengeComposing';
import PinappleMusic from '../Screens/PineappleMusic';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  useResponsiveFontSize,
} from 'react-native-responsive-dimensions';
import {
  widthPersentage,
  heightPersentage,
  fontSizePersentage,
} from '../Commons/DeviceWHPersentage';
import {BlurView} from '@react-native-community/blur';
import ChallengeComposingDetail from '../Screens/ChallengeComposingDetail';

const Drawer = createDrawerNavigator();

// 햄버거메뉴 활성화시 보여지는 컨텐츠
function CustomDrawerContent(props) {
  return (
    <Box flex={1}>
      <BlurView
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 8,
        }}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white">
        <VStack safeAreaTop space={5} {...props} flex={1} mt={20}>
          {props.state.routeNames.map((name, index) =>
            index > 0 ? (
              <Pressable
                w="100%"
                onPress={() => props.navigation.navigate(name)}>
                <Center>
                  <Text
                    color={'#fafafa'}
                    bold
                    fontSize={responsiveFontSize(fontSizePersentage(18))}>
                    {name}
                  </Text>
                </Center>
              </Pressable>
            ) : null,
          )}
        </VStack>
        <VStack space={5} alignItems={'center'} safeAreaBottom mb={4}>
          {/* 로그인 시 마이페이지, 로그아웃으로 변경 */}
          <Pressable onPress={null} w="100%">
            <Center>
              <Text
                color={'#fafafa'}
                bold
                fontSize={responsiveFontSize(fontSizePersentage(18))}>
                회원 가입
              </Text>
            </Center>
          </Pressable>
          <Pressable onPress={null} w="100%">
            <Center>
              <Text
                color={'#fafafa'}
                bold
                fontSize={responsiveFontSize(fontSizePersentage(18))}>
                로그인
              </Text>
            </Center>
          </Pressable>
        </VStack>
      </BlurView>
    </Box>
  );
}

function MyDrawer() {
  return (
    <ImageBackground
      source={MainBackground}
      style={{width: '100%', height: '100%'}}>
      <Drawer.Navigator
        drawerStyle={{
          backgroundColor: '#595d6299',
          borderTopEndRadius: 8,
          borderBottomEndRadius: 8,
        }}
        overlayColor={'transparent'}
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="MainScreen" component={MainScreen} />
        <Drawer.Screen name="Singing" component={Singing} />
        <Drawer.Screen name="LyricsView" component={LyricsView} />
        <Drawer.Screen name="ListeningView" component={ListeningView} />
        <Drawer.Screen name="ComposingView" component={ComposingView} />
        <Drawer.Screen
          name="ComposingDetailView"
          component={ChallengeComposingDetail}
        />
        {/* <Drawer.Screen name="About" component={MainScreen} />
        <Drawer.Screen name="Price - 준비중" component={MainScreen} />
        <Drawer.Screen name="My Diary - 준비중" component={MainScreen} />
        <Drawer.Screen name="My Photo Album - 준비중" component={MainScreen} />
        <Drawer.Screen name="내가 만든 음원 - 준비중" component={MainScreen} /> */}
        <Drawer.Screen name="My Challenge" component={MyChallenge} />
        <Drawer.Screen
          name="My Challenge / 노래챌린지"
          component={MyChallengeSinging}
        />
        <Drawer.Screen
          name="My Challenge / 영상챌린지"
          component={MyChallengeVideo}
        />
        <Drawer.Screen
          name="My Challenge / 연주챌린지"
          component={MyChallegePlay}
        />
        <Drawer.Screen
          name="My Challenge / 편곡챌린지"
          component={MyChallengeComposing}
        />
        <Drawer.Screen name="Challenge" component={Challenge} />
        <Drawer.Screen name="PinappleMusic" component={PinappleMusic} />
        {/* <Drawer.Screen name="My BGM - 준비중" component={MainScreen} />
        <Drawer.Screen
          name="파인애플스튜디오 - 준비중"
          component={MainScreen}
        />
        <Drawer.Screen name="My List - 준비중" component={MainScreen} /> */}
      </Drawer.Navigator>
    </ImageBackground>
  );
}
export default MyDrawer;
