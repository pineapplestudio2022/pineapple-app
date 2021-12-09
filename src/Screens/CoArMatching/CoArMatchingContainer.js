import React from 'react';
import {useState} from 'react';
import CoArMatchingPresenter from './CoArMatchingPresenter';

const CoArMatchingContainer = props => {
  const [title, setTitle] = useState('');
  const [singer, setSinger] = useState('');
  const [genre, setGenre] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [preferredGenre, setPreferredGenre] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <CoArMatchingPresenter
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
    />
  );
};

export default CoArMatchingContainer;
