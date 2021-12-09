import React from 'react';
import {Box, FlatList, Text} from 'native-base';
import MenuComponent from '../../Components/MenuComponent';
import MyBGMCard from '../../Components/MyBGMCard';

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
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={7}
        // onEndReached={handleLoadMore}
        // onEndReachedThreshold={1}
        renderItem={({item, index}) => (
          <Box my={2} alignItems="center">
            <MyBGMCard
              navigation={props.navigation}
              createdAt={item.createdAt}
              keyword={item.keyword}
              whereUse={item.whereUse}>
              <Text>asdasd</Text>
            </MyBGMCard>
          </Box>
        )}
        keyExtractor={item => item.id}
      />
    </Box>
  );
};
export default MyBGMPresenter;
