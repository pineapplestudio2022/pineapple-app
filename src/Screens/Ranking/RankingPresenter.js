//파인애플 뮤직 화면
import {Box, Center, FlatList} from 'native-base';
import React from 'react';

import {responsiveHeight} from 'react-native-responsive-dimensions';
import {heightPersentage} from '../../Commons/DeviceWHPersentage';

import MenuComponent from '../../Components/MenuComponent';
import SlidingUpPanel from 'rn-sliding-up-panel';
import MusicPlayer from '../../Components/MusicPlayer';
import MusicBox from '../../Components/MusicBoxComponent';

const RankingPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'Ranking'}
        navigation={props.navigation}
      />
      {/* 앨범 리스트 start  */}
      <Center
        flex={1}
        style={{paddingBottom: responsiveHeight(heightPersentage(157))}}>
        <FlatList
          numColumns={2}
          data={props.musicList}
          showsVerticalScrollIndicator={false}
          initialNumToRender={8}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <Box m={3}>
              <MusicBox
                id={item.id}
                badge={index + 1}
                cover={index + 1}
                music={item.title}
                owner={item.participant}
                onPress={() => props.openMusicPlayer(index)}
              />
            </Box>
          )}
          keyExtractor={item => item.id}
        />
      </Center>
      {/* 앨범 리스트 end */}

      <SlidingUpPanel
        ref={props.musicPanel}
        allowDragging={props.scroll}
        friction={0.2}
        draggableRange={{
          top: responsiveHeight(heightPersentage(740)),
          bottom: responsiveHeight(heightPersentage(157)),
        }}
        onMomentumDragStart={() => props.setIsBottom(false)}
        onBottomReached={() => props.setIsBottom(true)}
        showBackdrop={false}>
        <MusicPlayer
          onScroll={props.HandlerScroll}
          onNextMusic={props.handlerNextMusic}
          onPreviousMusic={props.handlerPreviousMusic}
          id={props.id}
          playerSize={props.isBottom ? false : true}
        />
      </SlidingUpPanel>
    </Box>
  );
};

export default RankingPresenter;
