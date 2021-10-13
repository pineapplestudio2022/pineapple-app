// 노래부르기 화면
import React from 'react';
import {Box, FlatList} from 'native-base';
import MenuComponent from '../../../Components/MenuComponent';
import SingingCardComponent from '../../../Components/SingingCardComponent';

const ChallengeSingingPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'노래부르기'}
        navigation={props.navigation}
      />
      <FlatList
        padding={3}
        numColumns={1}
        data={props.AISongList}
        onEndReachedThreshold={0.2}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <SingingCardComponent
            id={item.id}
            title={item.title}
            detail={item.detail}
            genre={item.genre}
            navigation={props.navigation}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Box>
  );
};

export default ChallengeSingingPresenter;
