// 노래부르기 화면
import React, {useEffect, useState} from 'react';
import {Box, ScrollView} from 'native-base';
import MenuComponent from '../../Components/MenuComponent';
import SingingCardComponent from '../../Components/SingingCardComponent';
import APIKit from '../../API/APIkit';

function Singing(props) {
  const [AISongList, setAISongList] = useState(); //AI 음원 리스트

  useEffect(() => {
    console.log('api get');

    const onSuccess = response => {
      console.log(response.data.IBparams);
      if (response.data.IBcode === '1000') {
        setAISongList(response.data.IBparams);
      }
    };
    const onFailure = error => {
      console.log(error && error.response);
    };

    const getAllOriginalSong = () => {
      APIKit.post('/originalWorks/getAllOriginalSong')
        .then(onSuccess)
        .catch(onFailure);
    };
    getAllOriginalSong();

    return () => {
      console.log('api unmount');
    };
  }, []);

  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'노래부르기'}
        navigation={props.navigation}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        _contentContainerStyle={{
          alignItems: 'center',
        }}>
        {AISongList &&
          AISongList.rows.map(rows => (
            <SingingCardComponent
              key={rows.id}
              id={rows.id}
              title={rows.title}
              detail={rows.detail}
              genre={rows.genre}
              navigation={props.navigation}
            />
          ))}
      </ScrollView>
    </Box>
  );
}

export default Singing;
