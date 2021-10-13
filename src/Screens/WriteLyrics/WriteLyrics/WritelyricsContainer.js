import React, {useEffect, useState} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import WriteLyricsPresenter from './WritelyricsPresenter';

const WriteLyricsContainer = props => {
  const [lyrics, setLyrics] = useState({
    title: '',
    content: '',
  });

  const writeFiletoLocal = () => {
    const dirs = RNFetchBlob.fs.dirs.DocumentDir;
    const filename = props.route.params.filename;
    let path;
    if (filename === '' || filename === undefined || filename === null) {
      path = `${dirs}/lyrics/${lyrics.title}_${new Date()
        .getTime()
        .toString()}.text`;
    } else {
      path = `${dirs}/lyrics/${filename}`;
    }
    RNFetchBlob.fs.writeFile(path, JSON.stringify(lyrics), 'utf8').then(() => {
      if (__DEV__) {
        console.log(`path: ${path}`);
        console.log(JSON.stringify(lyrics));
      }
      props.navigation.goBack();
    });
  };

  useEffect(() => {
    const readFiletoLocal = async () => {
      const filename = props.route.params.filename;
      if (filename === '' || filename === undefined || filename === null) {
        return;
      }
      const dirs = RNFetchBlob.fs.dirs.DocumentDir;
      const path = `${dirs}/lyrics/${filename}`;
      RNFetchBlob.fs.exists(path).then(async exist => {
        if (!exist) {
          return;
        }
        RNFetchBlob.fs.readFile(path, 'utf8').then(data => {
          const {title, content} = JSON.parse(data);
          setLyrics({title: title, content: content});
          if (__DEV__) {
            console.log(JSON.parse(data));
          }
        });
      });
    };

    readFiletoLocal();

    return () => {
      if (__DEV__) {
        console.log('unmount');
      }
    };
  }, [props.route.params.filename]);

  return (
    <WriteLyricsPresenter
      {...props}
      writeFiletoLocal={writeFiletoLocal}
      lyrics={lyrics}
      setLyrics={setLyrics}
    />
  );
};
export default WriteLyricsContainer;
