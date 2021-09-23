//My Challenge > 영상 챌린지 화면

import React, {useContext, useEffect, useState} from 'react';
import {Box, Center, FlatList, Image, Input, Text} from 'native-base';
import MenuComponent from '../../Components/MenuComponent';
import LinkIcon from '../../Assets/Image/challenge/icon_challenge_link.png';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../../Commons/DeviceWHPersentage';
import APIKit from '../../API/APIkit';
import Gbutton from '../../Components/GbuttonComponent';
import {UserDispatch} from '../../Commons/UserDispatchProvider';
function MyChallengeVideo(props) {
  const {userId, email} = useContext(UserDispatch);
  const [originalVideoList, setOriginalVideoList] = useState();
  const [selected, setSelected] = useState();
  const [inputValue, setInputValue] = useState({
    originalWorkId: '',
    shareLink: '',
  });

  useEffect(() => {
    const getAllOriginalVideo = () => {
      APIKit.post('originalWorks/getAllOriginalVideo').then(({data}) => {
        if (data.IBcode === '1000') {
          setOriginalVideoList(data.IBparams.rows);
        }
      });
    };

    getAllOriginalVideo();

    return () => {
      if (__DEV__) {
        console.log('unmount');
      }
    };
  }, []);

  const submitVideo = () => {
    const payload = {
      shareLink: inputValue.shareLink.toString(),
      userId: userId.toString(),
      owner: email.toString(),
      originalWorkId: inputValue.originalWorkId.toString(),
    };

    APIKit.post('challenge/updateMyChallengeVideo', payload)
      .then(({data}) => {
        if (__DEV__) {
          console.log(data);
        }
      })
      .catch(error => {
        if (__DEV__) {
          console.log(error);
        }
      });
  };

  const handlerValue = (text, id) => {
    setInputValue({originalWorkId: id, shareLink: text});
    if (__DEV__) {
      console.log(inputValue);
    }
  };
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'My Challenge/영상챌린지'}
        navigation={props.navigation}
      />
      <Box flex={1}>
        <Text
          textAlign={'center'}
          fontSize={responsiveFontSize(fontSizePersentage(20))}
          bold
          color={'#1a1b1c'}
          mt={20}>
          개인 YouTube에 등록 된 {'\n'} 챌린지 영상의 링크를 등록해 주세요
        </Text>
        <FlatList
          data={originalVideoList}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // onEndReached={handleLoadMore}
          // onEndReachedThreshold={1}
          renderItem={({item, index}) => (
            <Center>
              <Box
                width={responsiveWidth(widthPersentage(320))}
                height={responsiveHeight(heightPersentage(48))}
                justifyContent={'center'}
                mt={8}>
                <Text
                  fontSize={responsiveFontSize(fontSizePersentage(20))}
                  bold
                  textAlign={'center'}
                  color={'#858c92'}>
                  {item.title}
                </Text>
              </Box>
              <Box>
                <Input
                  width={responsiveWidth(widthPersentage(320))}
                  backgroundColor={selected === index ? '#ffffff' : '#1a1b1c80'}
                  placeholder="링크를 등록해주세요"
                  placeholderTextColor="#a5a8ae"
                  onFocus={() => setSelected(index)}
                  fontSize={responsiveFontSize(fontSizePersentage(16))}
                  fontWeight={600}
                  color={selected === index ? '#1a1b1c' : '#1a1b1c'}
                  onChangeText={text => handlerValue(text, item.id)}
                  value={
                    inputValue.originalWorkId === item.id
                      ? inputValue.shareLink
                      : ''
                  }
                  InputLeftElement={
                    <Image
                      source={LinkIcon}
                      style={{width: responsiveWidth(widthPersentage(24))}}
                      ml={3}
                      alt={' '}
                    />
                  }
                  InputRightElement={
                    <Box mr={3}>
                      <Gbutton
                        wp={70}
                        hp={24}
                        text={'등 록'}
                        fs={12}
                        fw={800}
                        rounded={4}
                        onPress={() => submitVideo()}
                      />
                    </Box>
                  }
                />
              </Box>
              <Box
                mt={6}
                width={responsiveWidth(widthPersentage(350))}
                height={responsiveHeight(heightPersentage(20))}>
                <Text
                  fontSize={responsiveFontSize(fontSizePersentage(12))}
                  bold
                  textAlign={'center'}
                  color={'#a5a8ae'}>
                  등록이 완료 되었습니다. 감사합니다.
                </Text>
              </Box>
            </Center>
          )}
          keyExtractor={item => item.id}
        />
      </Box>
    </Box>
  );
}

export default MyChallengeVideo;
