// My Challenge > 노래챌린지 화면

import React from 'react';
import {Box, Center, FlatList} from 'native-base';
import MenuComponent from '../../../Components/MenuComponent';
import MySingingCardComponent from '../../../Components/MySingingCardComponent';

const MyChallengeSingingPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'My Challenge/노래챌린지'}
        navigation={props.navigation}
      />
      <Center flex={1}>
        <FlatList
          data={props.myChallengeList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={7}
          // onEndReached={handleLoadMore}
          // onEndReachedThreshold={1}
          renderItem={({item, index}) => (
            <Box my={2}>
              <MySingingCardComponent
                navigation={props.navigation}
                id={item.id}
                originalWorkId={item.originalWorkId}
                title={item.title}
                genre={item.genre}
                detail={item.detail}
                setRefresh={props.setRefresh}
              />
            </Box>
          )}
          keyExtractor={item => item.id}
        />
      </Center>
    </Box>
  );
};

export default MyChallengeSingingPresenter;
