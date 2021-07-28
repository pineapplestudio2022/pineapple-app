//파인애플 뮤직 화면
import {
  Box,
  Center,
  HStack,
  Image,
  Input,
  Pressable,
  ScrollView,
  Slide,
  Text,
  VStack,
} from 'native-base';
import React from 'react';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../../Commons/DeviceWHPersentage';

import MenuComponent from '../../Components/MenuComponent';
import SlidingUpPanel from 'rn-sliding-up-panel';
import MusicPlayerFull from '../../Components/MusicPlayerFull';
import MusicPlayerSmall from '../../Components/MusicPlayerSmall';
import SearchIcon from '../../Assets/Image/icon_main_search.png';
import MusicBox from '../../Components/MusicBoxComponent';
import {TouchableOpacity} from 'react-native';

function ChallengeEnjoy(props) {
  const [scroll, setScroll] = React.useState(true);
  const HandlerScroll = bool => setScroll(bool);

  const [isBottom, setIsBottom] = React.useState(true);
  const [playerOpen, setPlayerOpen] = React.useState(false);

  const openFullPlayer = () => {
    setPlayerOpen(true);
    setIsBottom(false);
    this._panel.show();
  };

  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'모두의 챌린지'}
        navigation={props.navigation}
      />
      <ScrollView>
        {/* Search Box start */}
        <VStack>
          <Center>
            <Box
              style={{
                width: responsiveWidth(widthPersentage(300)),
                height: responsiveHeight(heightPersentage(35)),
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 10,
                paddingRight: 10,
                backgroundColor: '#fafafa80',
                borderRadius: 8,
                marginBottom: 5,
              }}>
              <Input
                variant="underlined"
                placeholder="Search"
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                borderBottomColor="#0fefbd"
                InputLeftElement={
                  <Image
                    source={SearchIcon}
                    resizeMode={'contain'}
                    style={{
                      width: responsiveWidth(widthPersentage(25)),
                      height: responsiveHeight(heightPersentage(24)),
                    }}
                  />
                }
              />
            </Box>
          </Center>
        </VStack>
        {/* Search Box end */}
        <VStack>
          {/* HashTag start */}
          <Box>
            <HStack justifyContent={'center'} space={2}>
              <Pressable
                style={{
                  paddingLeft: 11,
                  paddingRight: 11,
                  height: responsiveHeight(heightPersentage(26)),
                  borderRadius: 4,
                  backgroundColor: '#0fefbd',
                  justifyContent: 'center',
                }}>
                <Text
                  fontSize={responsiveFontSize(fontSizePersentage(13))}
                  fontWeight={500}
                  color={'#fafafa'}
                  textAlign={'center'}>
                  # 노래
                </Text>
              </Pressable>
              <Pressable
                style={{
                  paddingLeft: 11,
                  paddingRight: 11,
                  height: responsiveHeight(heightPersentage(26)),
                  borderRadius: 4,
                  backgroundColor: '#0fefbd',
                  justifyContent: 'center',
                }}>
                <Text
                  fontSize={responsiveFontSize(fontSizePersentage(13))}
                  fontWeight={500}
                  color={'#fafafa'}
                  textAlign={'center'}>
                  # 영상
                </Text>
              </Pressable>
              <Pressable
                style={{
                  paddingLeft: 11,
                  paddingRight: 11,
                  height: responsiveHeight(heightPersentage(26)),
                  borderRadius: 4,
                  backgroundColor: '#0fefbd',
                  justifyContent: 'center',
                }}>
                <Text
                  fontSize={responsiveFontSize(fontSizePersentage(13))}
                  fontWeight={500}
                  color={'#fafafa'}
                  textAlign={'center'}>
                  # 연주
                </Text>
              </Pressable>
              <Pressable
                style={{
                  paddingLeft: 11,
                  paddingRight: 11,
                  height: responsiveHeight(heightPersentage(26)),
                  borderRadius: 4,
                  backgroundColor: '#0fefbd',
                  justifyContent: 'center',
                }}>
                <Text
                  fontSize={responsiveFontSize(fontSizePersentage(13))}
                  fontWeight={500}
                  color={'#fafafa'}
                  textAlign={'center'}>
                  # 편곡
                </Text>
              </Pressable>
            </HStack>
          </Box>
        </VStack>
        {/* HashTag end */}
        {/* 앨범 리스트 start  */}
        <VStack space={8} alignItems={'center'} my={4}>
          <HStack space={8}>
            <MusicBox
              badge={true}
              music={'버터'}
              owner={'bts'}
              onPress={openFullPlayer}
            />
            <MusicBox
              badge={false}
              music={'음원제목'}
              owner={'소유자'}
              onPress={openFullPlayer}
            />
          </HStack>
        </VStack>
        {/* 앨범 리스트 end */}
      </ScrollView>

      <SlidingUpPanel
        ref={c => (this._panel = c)}
        allowDragging={scroll}
        friction={0.2}
        draggableRange={{
          top: responsiveHeight(heightPersentage(740)),
          bottom: responsiveHeight(heightPersentage(157)),
        }}
        onMomentumDragStart={() => setIsBottom(false)}
        onBottomReached={() => setIsBottom(true)}
        animatedValue={this._draggedValue}
        showBackdrop={false}>
        {isBottom ? (
          <MusicPlayerSmall />
        ) : (
          <MusicPlayerFull onScroll={HandlerScroll} />
        )}
      </SlidingUpPanel>
    </Box>
  );
}

export default ChallengeEnjoy;
