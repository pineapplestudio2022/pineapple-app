//Challenge -> 가사보기 뷰

import React from 'react';
import {Box, Center, Text, VStack, HStack, TextArea, Icon} from 'native-base';
import {ImageBackground, TouchableOpacity} from 'react-native';
import MenuComponent from '../../Components/MenuComponent';
import LyricsViewBackground from '../../Assets/Image/challenge/bg_lyricsView_glassbox.png';
import XIcon from 'react-native-vector-icons/MaterialCommunityIcons';

function LyricsView(props) {
  return (
    <Box flex={1}>
      <MenuComponent name={props.route.name} navigation={props.navigation} />
      <Box safeAreaBottom alignItems="center">
        <VStack space={2} w="80%">
          <Center>
            <Text
              fontSize={20}
              bold
              color={'#1a1b1c'}
              lineHeight={28}
              px={2}
              noOfLines={1}>
              곡 제목 들어갈 공간
            </Text>
            <Text></Text>
          </Center>
          <HStack space={10} justifyContent={'center'} p={2}>
            <HStack>
              <Text color={'#4be3ac'} fontSize={17} bold>
                작곡가 :{'  '}
              </Text>
              <Text color={'#1a1b1c'} fontSize={17} bold>
                뮤지아
              </Text>
            </HStack>
            <HStack>
              <Text color={'#4be3ac'} fontSize={17} bold>
                작사가 :{'  '}
              </Text>
              <Text color={'#1a1b1c'} fontSize={17} bold>
                김하나
              </Text>
            </HStack>
          </HStack>
          <Box
            h="75%"
            style={{
              shadowColor: '#858c9233',
              shadowOffset: {width: 0, height: 2},
              shadowRadius: 4,
              shadowOpacity: 1,
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
                  <Box bg={'#fafafa80'} w="70%" h="90%" my={5} rounded={16}>
                    <TextArea
                      h="100%"
                      fontSize={13}
                      lineHeight={18}
                      textAlign={'center'}
                      borderWidth={0}
                      editable={false}
                      px={8}
                      pt={2}>
                      If you’ve ever been in love before {'\n'}I know you feel
                      this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}
                      If you’ve ever been in love before {'\n'}I know you feel
                      this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}If you’ve ever been in love
                      before {'\n'}I know you feel this beat {'\n'}
                      If you know it {'\n'}
                      Don’t be shy and sing along {'\n'}
                      울지 마 이미 지난 일이야 {'\n'}
                    </TextArea>
                  </Box>
                </Center>
              </ImageBackground>
            </Box>
            <HStack space={5} justifyContent={'space-around'} mt={4}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#0fefbd',
                  borderRadius: 6,
                  shadowColor: '#00000033',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowRadius: 4,
                  shadowOpacity: 1,
                  justifyContent: 'center',
                  width: '40%',
                  padding: 12,
                }}>
                <HStack space={4} justifyContent={'center'}>
                  <Icon
                    as={<XIcon name="file-excel-box" />}
                    size="xs"
                    color={'white'}
                  />
                  <Text fontSize={13} fontWeight={800} color={'white'}>
                    닫 기
                  </Text>
                </HStack>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#0fefbd',
                  borderRadius: 6,
                  shadowColor: '#00000033',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowRadius: 4,
                  shadowOpacity: 1,
                  justifyContent: 'center',
                  width: '40%',
                  padding: 12,
                }}>
                <HStack space={4} justifyContent={'center'}>
                  <Icon
                    as={<XIcon name="checkbox-marked" />}
                    size="xs"
                    color={'white'}
                  />
                  <Text fontSize={13} fontWeight={800} color={'white'}>
                    참 여
                  </Text>
                </HStack>
              </TouchableOpacity>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

export default LyricsView;
