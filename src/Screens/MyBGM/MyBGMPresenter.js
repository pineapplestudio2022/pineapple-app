import React from 'react';
import moment from 'moment';
import {Box, FlatList} from 'native-base';

import MyBGMCard from '../../Components/MyBGMCard';
import MenuComponent from '../../Components/MenuComponent';

const MyBGMPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'My BGM'}
        navigation={props.navigation}
      />
      <FlatList
        data={props.myBGMList}
        refreshing={props.refreshing}
        onRefresh={props.handleRefresh}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={8}
        onEndReached={props.handleLoadMore}
        onEndReachedThreshold={0}
        renderItem={({item, index}) => (
          <Box my={2} alignItems="center">
            <MyBGMCard
              bgmStudioId={item.id}
              navigation={props.navigation}
              createdAt={moment(item.createdAt).format('YYYY-MM-DD')}
              keyword={item.keyword?.split(',')}
              whereUse={item.whereUse}
              url={item.url}
              handlerDeleteItem={props.handlerDeleteItem}
            />
          </Box>
        )}
        keyExtractor={item => item.id}
      />
    </Box>
  );
};
export default MyBGMPresenter;
