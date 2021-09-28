// 노래부르기 화면
import React, {useEffect, useState} from 'react';
import {Box, FlatList} from 'native-base';
import MenuComponent from '../../Components/MenuComponent';
import SingingCardComponent from '../../Components/SingingCardComponent';
import APIKit from '../../API/APIkit';

function Singing(props) {
  const [AISongList, setAISongList] = useState(); //AI 음원 리스트

  useEffect(() => {
    if (__DEV__) {
      console.log('api get');
    }

    const getAllOriginalSong = () => {
      APIKit.post('/originalWorks/getAllOriginalSong')
        .then(({data}) => {
          if (__DEV__) {
            console.log(data.IBparams);
          }
          if (data.IBcode === '1000') {
            setAISongList(data.IBparams.rows);
          }
        })
        .catch(error => {
          if (__DEV__) {
            console.log(error && error.response);
          }
        });
    };
    getAllOriginalSong();

    return () => {
      if (__DEV__) {
        console.log('api unmount');
      }
    };
  }, []);

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
        data={AISongList}
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
}

export default Singing;
