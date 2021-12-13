import React from 'react';
import {useState} from 'react';
import {Alert} from 'react-native';
import CompositionMatchingPresenter from './CompositionMatchingPresenter';

const CompositionMatchingContainer = props => {
  const [title, setTitle] = useState('');
  const [singer, setSinger] = useState('');
  const [genre, setGenre] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [preferredGenre, setPreferredGenre] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const Comatching = () => {
    Alert.alert('Pineapple', '매칭 신청이 완료되었습니다', [
      {
        text: '확인',
        onPress: () =>
          props.navigation.reset({
            index: 0,
            routes: [{name: 'DrawerNavigation'}],
          }),
      },
    ]);
  };
  return (
    <CompositionMatchingPresenter
      {...props}
      title={title}
      setTitle={setTitle}
      singer={singer}
      setSinger={setSinger}
      genre={genre}
      setGenre={setGenre}
      age={age}
      setAge={setAge}
      sex={sex}
      setSex={setSex}
      preferredGenre={preferredGenre}
      setPreferredGenre={setPreferredGenre}
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      Comatching={Comatching}
    />
  );
};

export default CompositionMatchingContainer;
