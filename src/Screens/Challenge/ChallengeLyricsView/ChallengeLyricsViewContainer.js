//Challenge -> 가사보기 뷰

import React, {useEffect, useState} from 'react';

import APIKit from '../../../API/APIkit';
import ChallengeLyricsViewPresenter from './ChallengeLyricsViewPresenter';

const ChallengeLyricsViewContainer = props => {
  const [title, setTitle] = useState();
  const [genre, setGenre] = useState();
  const [lyrics, setLyrics] = useState();

  useEffect(() => {
    if (__DEV__) {
      console.log('api get');
    }

    const onFailure = error => {
      if (__DEV__) {
        console.log(error && error.response);
      }
    };

    const getOriginalSong = () => {
      const payload = {id: props.route.params.id.toString()};

      APIKit.post('/originalWorks/getOriginalSong', payload)
        .then(({data}) => {
          if (data.IBcode === '1000') {
            setTitle(data.IBparams.rows[0].title);
            setGenre(data.IBparams.rows[0].genre);
            setLyrics(data.IBparams.rows[0].lyrics);
          }
        })
        .catch(onFailure);
    };
    getOriginalSong();

    return () => {
      if (__DEV__) {
        console.log('api unmount');
      }
    };
  }, [props.route.params.id]);

  return (
    <ChallengeLyricsViewPresenter
      {...props}
      title={title}
      genre={genre}
      lyrics={lyrics}
    />
  );
};

export default ChallengeLyricsViewContainer;
