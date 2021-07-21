//파인애플 뮤직 화면
import {Box, Pressable, Slide, Text} from 'native-base';
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

function PineappleMusic(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isBottom, setIsBottom] = React.useState(true);
  const [scroll, setScroll] = React.useState(true);
  const HandlerScroll = bool => setScroll(bool);

  let btnStr = `${isOpen ? 'hide' : 'show'}`;

  return (
    <Box flex={1}>
      <MenuComponent name={props.route.name} navigation={props.navigation} />
      <Pressable
        width={responsiveWidth(widthPersentage(145))}
        height={responsiveHeight(heightPersentage(145))}
        backgroundColor={'red'}
        onPress={() => setIsOpen(!isOpen)}>
        <Text>{btnStr}</Text>
      </Pressable>
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
