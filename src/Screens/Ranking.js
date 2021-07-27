//파인애플 뮤직 화면
import {Box, HStack, ScrollView, Slide, VStack} from 'native-base';
import React from 'react';

import {responsiveHeight} from 'react-native-responsive-dimensions';
import {heightPersentage} from '../Commons/DeviceWHPersentage';

import MenuComponent from '../Components/MenuComponent';
import SlidingUpPanel from 'rn-sliding-up-panel';
import MusicPlayerFull from '../Components/MusicPlayerFull';
import MusicPlayerSmall from '../Components/MusicPlayerSmall';
import MusicBox from '../Components/MusicBoxComponent';
function MusicRacking(props) {
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
        titleName={'Ranking'}
        navigation={props.navigation}
      />
      <ScrollView>
        {/* 앨범 리스트 start  */}
        <VStack space={8} alignItems={'center'} my={4}>
          <HStack space={8}>
            <MusicBox
              badge={1}
              music={'버터'}
              owner={'bts'}
              onPress={HandlerOpen}
            />
            <MusicBox
              badge={2}
              music={'음원제목'}
              owner={'소유자'}
              onPress={HandlerOpen}
            />
          </HStack>
          <HStack space={8}>
            <MusicBox
              badge={3}
              music={'버터'}
              owner={'bts'}
              onPress={HandlerOpen}
            />
            <MusicBox
              badge={4}
              music={'음원제목'}
              owner={'소유자'}
              onPress={HandlerOpen}
            />
          </HStack>
          <HStack space={8}>
            <MusicBox
              badge={5}
              music={'버터'}
              owner={'bts'}
              onPress={HandlerOpen}
            />
            <MusicBox
              badge={6}
              music={'음원제목'}
              owner={'소유자'}
              onPress={HandlerOpen}
            />
          </HStack>
          <HStack space={8}>
            <MusicBox
              badge={7}
              music={'버터'}
              owner={'bts'}
              onPress={HandlerOpen}
            />
            <MusicBox
              badge={8}
              music={'음원제목'}
              owner={'소유자'}
              onPress={HandlerOpen}
            />
          </HStack>
          <HStack space={8}>
            <MusicBox
              badge={9}
              music={'버터'}
              owner={'bts'}
              onPress={HandlerOpen}
            />
            <MusicBox
              badge={10}
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

export default MusicRacking;
