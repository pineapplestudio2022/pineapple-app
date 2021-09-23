// My Challenge > 노래챌린지 화면

import React, {useContext, useState, useEffect} from 'react';
import {Box, Center, FlatList} from 'native-base';
import MenuComponent from '../../Components/MenuComponent';
import MySingingCardComponent from '../../Components/MySingingCardComponent';
import APIKit from '../../API/APIkit';
import {UserDispatch} from '../../Commons/UserDispatchProvider';

function MyChallengeSinging(props) {
  const [myChallengeList, setMyChallengeList] = useState();
  // const [offset, setOffset] = useState(10);
  const {userId} = useContext(UserDispatch);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getMyChallengeSongs = () => {
      const payload = {userId: userId.toString()};
      APIKit.post('challenge/getMyChallengeSongs', payload)
        .then(({data}) => {
          if (__DEV__) {
            console.log(data);
          }
          if (data.IBcode === '1000') {
            setMyChallengeList(data.IBparams.rows);
          }
          setRefresh(false);
        })
        .catch(error => {
          if (__DEV__) {
            console.log(error);
          }
        });
    };
    getMyChallengeSongs();
    return () => {
      if (__DEV__) {
        console.log('unmount');
      }
    };
  }, [userId, refresh]);

  // const handleLoadMore = async () => {
  //   const payload = {userId: userId.toString()};
  //   await APIKit.post('/challenge/getMyChallengeSongs', payload)
  //     .then(({data}) => {
  //       setMyChallengeList([...myChallengeList, ...data.IBparams.rows]);
  //       setOffset(offset + 10);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

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
                setRefresh={setRefresh}
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
