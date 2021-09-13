import React, {useEffect, useContext, useState} from 'react';
import {Box, HStack, VStack} from 'native-base';
import {ScrollView} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {widthPersentage} from '../Commons/DeviceWHPersentage';
import MusicAlbumComponent from '../Components/MusicAlbumComponent';
import MenuComponent from '../Components/MenuComponent';
import APIKit from '../API/APIkit';
import {UserDispatch} from '../Commons/UserDispatchProvider';
import Wbutton from '../Components/WbuttonComponent';

function MainScreen(props) {
  //랭킹 음원 10개 가져오기
  const [musicList, setMusicList] = useState();
  const {userId} = useContext(UserDispatch);
  //로그인, 로그아웃시에 api호출
  useEffect(() => {
    console.log('api get');

    const onSuccess = response => {
      setMusicList(response.data.IBparams.rows);
    };

    const onFailure = error => {
      console.log(error && error.response);
    };

    const getRankedChallenges = async () => {
      await APIKit.post('/challenge/getRankedChallenges')
        .then(onSuccess)
        .catch(onFailure);
    };
    getRankedChallenges();
    return () => {
      console.log('api unmount');
    };
  }, [userId]);

  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'파인애플스튜디오'}
        navigation={props.navigation}
      />
      <ScrollView>
        {/* 가로스크롤 뷰 && 인기 음원 순위 start */}
        <Box>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false} //가로 스크롤바 표시 여부
            contentContainerStyle={{
              alignItems: 'center',
              paddingStart: 5,
              paddingEnd: 5,
            }}>
            {/* 음원 리스트 보여주는 로직 수정 필요*/}
            <MusicAlbumComponent
              navigation={props.navigation}
              nextView={'Ranking'}
              title={'인기음원'}
              subtitle={'전체보기'}
              badge={11}
              cover={11}
            />
            {musicList &&
              musicList.map((rows, index) => (
                <MusicAlbumComponent
                  key={rows.id}
                  id={rows.id}
                  cover={index + 1}
                  navigation={props.navigation}
                  title={rows.title}
                  subtitle={rows.participant}
                  nextView={'Ranking'}
                />
              ))}
          </ScrollView>
        </Box>
        {/* 가로스크롤 뷰 시작, 인기 음원 순위 end*/}

        <Box>
          {/* Search Box start */}
          {/* 검색기능 추후 추가 예정 */}
          {/* <Center backgroundColor="#fafafa80" marginBottom={14}>
            <Box w={responsiveWidth(widthPersentage(300))}>
              <Input
                InputLeftElement={<SearchIcon size="4" color="#a5a8ae" />}
                size="md"
                m={2}
                variant="underlined"
                placeholder="Search"
                fontSize={responsiveFontSize(fontSizePersentage(16))}
                borderBottomColor="#0fefbd"
              />
            </Box>
          </Center> */}
          {/* Search Box end */}
          {/* 버튼 메뉴 start */}
          <Box w="100%" mt={4}>
            <VStack space={responsiveWidth(widthPersentage(28))}>
              <HStack
                space={responsiveWidth(widthPersentage(28))}
                justifyContent={'center'}>
                <Wbutton
                  wp={140}
                  hp={140}
                  fs={14}
                  fw={600}
                  imgName={'challenge'}
                  rounded={8}
                  text={'Challenge'}
                  onPress={() => props.navigation.navigate('ChallengeScreen')}
                />
                <Wbutton
                  wp={140}
                  hp={140}
                  fs={14}
                  fw={600}
                  imgName={'lyrics'}
                  rounded={8}
                  text={'가사 쓰기'}
                  onPress={() => props.navigation.navigate('LyricsScreen')}
                />
              </HStack>
              <HStack
                space={responsiveWidth(widthPersentage(28))}
                justifyContent={'center'}>
                <Wbutton
                  wp={140}
                  hp={140}
                  fs={14}
                  fw={600}
                  imgName={'photo'}
                  rounded={8}
                  text={'추억의 사진으로' + '\n' + '노래만들기'}
                  ready={'준비중'}
                  disable
                  onPress={() => {}}
                />
                <Wbutton
                  wp={140}
                  hp={140}
                  fs={14}
                  fw={600}
                  imgName={'bgm'}
                  rounded={8}
                  text={'BGM Studio'}
                  ready={'준비중'}
                  disable
                  onPress={() => {}}
                />
              </HStack>
              <HStack
                space={responsiveWidth(widthPersentage(28))}
                justifyContent={'center'}>
                <Wbutton
                  wp={140}
                  hp={140}
                  fs={14}
                  fw={600}
                  imgName={'magazine'}
                  rounded={8}
                  text={'매거진'}
                  ready={'준비중'}
                  disable
                  onPress={() => {}}
                />
                <Wbutton
                  wp={140}
                  hp={140}
                  fs={14}
                  fw={600}
                  imgName={'musicNote'}
                  rounded={8}
                  text={'함께 만드는' + '\n' + '우리의 Music'}
                  ready={'준비중'}
                  disable
                  onPress={() => {}}
                />
              </HStack>
            </VStack>
          </Box>
          {/* 버튼 메뉴 end */}
        </Box>
      </ScrollView>
    </Box>
  );
}
export default MainScreen;
