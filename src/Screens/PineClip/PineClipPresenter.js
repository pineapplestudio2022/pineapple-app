import React from 'react';
import {Box, FlatList, HStack} from 'native-base';

import MenuComponent from '../../Components/MenuComponent';
import Gbutton from '../../Components/GbuttonComponent';
import VideoBox from '../../Components/VideoBoxComponent';

const PineClipPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'PineClip'}
        navigation={props.navigation}
      />
      <Box flex={1} bgColor={'#fafafacc'} rounded={16}>
        <HStack space={2} justifyContent={'center'} mt={6}>
          <Gbutton
            wp={56}
            hp={26}
            disable={props.category === 1 ? false : true}
            onPressActive
            text={'세탁기'}
            fs={13}
            fw={'500'}
            rounded={4}
            onPress={() => props.setCategory(1)}
          />
          <Gbutton
            wp={70}
            hp={26}
            disable={props.category === 2 ? false : true}
            onPressActive
            text={'PineDoll'}
            fs={13}
            fw={'500'}
            rounded={4}
            onPress={() => props.setCategory(2)}
          />
          <Gbutton
            wp={130}
            hp={26}
            disable={props.category === 3 ? false : true}
            onPressActive
            text={'PineDoll Interview'}
            fs={13}
            fw={'500'}
            rounded={4}
            onPress={() => props.setCategory(3)}
          />
        </HStack>
        <FlatList
          mt={2}
          data={props.videoList}
          //   onEndReached={props.handleLoadMore}
          //   onEndReachedThreshold={0.2}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={3}
          renderItem={({item, index}) => (
            <Box my={3} alignItems={'center'}>
              <VideoBox
                id={item.id}
                title={item.title}
                participant={item.category}
                videoUrl={item.url}
                onPress={() => {}}
                wp={320}
                hp={230}
              />
            </Box>
          )}
          keyExtractor={item => item.id}
        />
      </Box>
    </Box>
  );
};

export default PineClipPresenter;
