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
} from '../Commons/DeviceWHPersentage';

import MenuComponent from '../Components/MenuComponent';
import SlidingUpPanel from 'rn-sliding-up-panel';
import MusicPlayerFull from '../Components/MusicPlayerFull';
import MusicPlayerSmall from '../Components/MusicPlayerSmall';
import SearchIcon from '../Assets/Image/icon_main_search.png';
import MusicBox from '../Components/MusicBoxComponent';
function PineappleMusic(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isBottom, setIsBottom] = React.useState(true);
  const [scroll, setScroll] = React.useState(true);
  const HandlerScroll = bool => setScroll(bool);
  const HandlerOpen = () => setIsOpen(!isOpen);
  let btnStr = `${isOpen ? 'hide' : 'show'}`;

  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'Pinapple Music'}
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
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false} //가로 스크롤바 표시 여부
            contentContainerStyle={{
              height: responsiveHeight(heightPersentage(26)),
              width: '100%',
              paddingStart: 35,
            }}>
            <Pressable
              style={{
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 5,
                paddingBottom: 5,
                borderRadius: 4,
                backgroundColor: '#0fefbd',
                marginLeft: 4,
                marginRight: 4,
              }}>
              <Text
                fontSize={responsiveFontSize(fontSizePersentage(13))}
                fontWeight={500}
                color={'#fafafa'}
                textAlign={'center'}>
                # Dance
              </Text>
            </Pressable>
          </ScrollView>
        </VStack>
        {/* HashTag end */}
        {/* 앨범 리스트 start  */}
        <VStack space={8} alignItems={'center'} my={4}>
          <HStack space={8}>
            <MusicBox
              badge={true}
              music={'버터'}
              owner={'bts'}
              onPress={HandlerOpen}
            />
            <MusicBox
              badge={false}
              music={'음원제목'}
              owner={'소유자'}
              onPress={HandlerOpen}
            />
          </HStack>
        </VStack>
        {/* 앨범 리스트 end */}
      </ScrollView>

      <Slide in={isOpen}>
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          allowDragging={scroll}
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
      </Slide>
    </Box>
  );
}

export default PineappleMusic;
