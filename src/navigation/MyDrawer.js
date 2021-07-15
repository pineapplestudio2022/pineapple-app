//Drawer Navigation

import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Box, Center, Pressable, Text, View, VStack} from 'native-base';
import MainScreen from '../Screens/MainScreen';
import Challenge from '../Screens/Challenge';
import Singing from '../Screens/Singing';
import LyricsView from '../Screens/ChallengeLyricsView';
import ListeningView from '../Screens/ChallengeListening';
import {ImageBackground} from 'react-native';
import MainBackground from '../Assets/Image/bg_main.png';
import {borderWidth} from 'styled-system';

const Drawer = createDrawerNavigator();

// 햄버거메뉴 활성화시 보여지는 컨텐츠
function CustomDrawerContent(props) {
  return (
    <Box safeAreaTop flex={1}>
      <VStack space={5} {...props} flex={1} mt={20}>
        {props.state.routeNames.map((name, index) =>
          index > 0 ? (
            <Pressable w="100%" onPress={() => props.navigation.navigate(name)}>
              <Center>
                <Text color={'#fafafa'} bold fontSize={18}>
                  {name}
                </Text>
              </Center>
            </Pressable>
          ) : null,
        )}
      </VStack>
      <VStack space={5} alignItems={'center'} safeAreaBottom mb={4}>
        <Pressable onPress={null} w="100%">
          <Center>
            <Text color={'#fafafa'} bold fontSize={18}>
              ACCOUNT
            </Text>
          </Center>
        </Pressable>
        <Pressable onPress={null} w="100%">
          <Center>
            <Text color={'#fafafa'} bold fontSize={18}>
              로그아웃
            </Text>
          </Center>
        </Pressable>
      </VStack>
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
          borderRadius: 8,
        }}
        overlayColor={'transparent'}
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="MainScreen" component={MainScreen} />
        <Drawer.Screen name="Singing" component={Singing} />
        <Drawer.Screen name="LyricsView" component={LyricsView} />
        <Drawer.Screen name="ListeningView" component={ListeningView} />
        {/* <Drawer.Screen name="About" component={MainScreen} />
        <Drawer.Screen name="Price - 준비중" component={MainScreen} />
        <Drawer.Screen name="My Diary - 준비중" component={MainScreen} />
        <Drawer.Screen name="My Photo Album - 준비중" component={MainScreen} />
        <Drawer.Screen name="내가 만든 음원 - 준비중" component={MainScreen} /> */}
        <Drawer.Screen name="My Challenge" component={Challenge} />
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
