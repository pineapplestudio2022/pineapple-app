// My Challenge > 노래챌린지 화면

import React, {useContext, useState} from 'react';
import {Box, Center, FlatList} from 'native-base';
import MenuComponent from '../../Components/MenuComponent';
import MySingingCardComponent from '../../Components/MySingingCardComponent';
import {useEffect} from 'react/cjs/react.development';
import APIKit from '../../API/APIkit';
import {UserDispatch} from '../../Commons/UserDispatchProvider';

function MyChallengeSinging(props) {
  const [myChallengeList, setMyChallengeList] = useState();
  const {userId} = useContext(UserDispatch);

  useEffect(() => {
    const getMyChallengeSongs = () => {
      const payload = {userId: userId.toString()};
      APIKit.post('challenge/getMyChallengeSongs', payload)
        .then(({data}) => {
          console.log(data);
          if (data.IBcode === '1000') {
            setMyChallengeList(data.IBparams.rows);
          }
        })
        .catch(error => {
          console.log(error);
        });
    };
    getMyChallengeSongs();
    return () => {
      console.log('unmount');
    };
  }, [userId]);

  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'My Challenge/노래챌린지'}
        navigation={props.navigation}
      />
      <Center flex={1}>
        <FlatList
          data={myChallengeList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
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
              />
            </Box>
          )}
          keyExtractor={item => item.id}
        />
      </Center>
    </Box>
  );
}

export default MyChallengeSinging;
