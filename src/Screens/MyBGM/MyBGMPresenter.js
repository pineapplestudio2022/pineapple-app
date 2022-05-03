import React from 'react';
import moment from 'moment';
import {Box, FlatList} from 'native-base';

import MyBGMCard from '../../Components/MyBGMCard';
import MenuComponent from '../../Components/MenuComponent';

const MyBGMPresenter = props => {
  const {
    route,
    navigation,
    myBGMList,
    refreshing,
    handleRefresh,
    handleLoadMore,
    handlerDeleteItem,
    ARPlayer,
    handlePlayId,
    playId,
  } = props;

  return (
    <Box flex={1}>
      <MenuComponent
        name={route.name}
        titleName={'My BGM'}
        navigation={navigation}
      />
      <FlatList
        data={myBGMList}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={8}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0}
        renderItem={({item, index}) => (
          <Box my={2} alignItems="center">
            <MyBGMCard
              bgmStudioId={item.id}
              navigation={navigation}
              createdAt={moment(item.createdAt).format('YYYY-MM-DD')}
              keyword={item.keyword?.split(',')}
              whereUse={item.whereUse}
              url={item.url}
              handlerDeleteItem={handlerDeleteItem}
              ARPlayer={ARPlayer}
              handlePlayId={handlePlayId}
              playId={playId}
            />
          </Box>
        )}
        keyExtractor={item => item.id}
      />
    </Box>
  );
};
export default MyBGMPresenter;
