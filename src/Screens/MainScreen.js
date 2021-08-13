import React from 'react';
import {
  Box,
  Center,
  Input,
  SearchIcon,
  Stack,
  HStack,
  VStack,
  Text,
  Pressable,
  Image,
} from 'native-base';
import {ScrollView} from 'react-native';
import {
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {
  widthPersentage,
  fontSizePersentage,
} from '../Commons/DeviceWHPersentage';
import MusicAlbumComponent from '../Components/MusicAlbumComponent';
import MenuComponent from '../Components/MenuComponent';
import ChallengeIcon from '../Assets/Image/btn_main_speaker.png';
import MagazineIcon from '../Assets/Image/btn_main_magazine.png';
import PhotoIcon from '../Assets/Image/btn_main_photo.png';
import BgmStudioIcon from '../Assets/Image/btn_main_bgm_studio.png';
import WriteMusicIcon from '../Assets/Image/btn_main_write_music.png';
import MusicNoteIcon from '../Assets/Image/btn_main_music_note.png';
import APIKit from '../API/APIkit';
import {useEffect} from 'react';
import {useContext} from 'react/cjs/react.development';
import {UserDispatch} from '../Commons/UserDispatchProvider';
import {useState} from 'react';

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
      await APIKit.get('/challenge/getRankedChallenges')
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
                  badge={rows.index}
                  nextView={'Ranking'}
                />
              ))}
          </ScrollView>
        </Box>
        {/* 가로스크롤 뷰 시작, 인기 음원 순위 end*/}

        <Box>
          {/* Search Box start */}
          <Center backgroundColor="#fafafa80" marginBottom={14}>
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
          </Center>
          {/* Search Box end */}
          {/* 버튼 메뉴 start */}
          <Box w="100%">
            <Stack>
              <VStack space={responsiveWidth(widthPersentage(28))}>
                <HStack
                  space={responsiveWidth(widthPersentage(28))}
                  justifyContent={'center'}>
                  {/* Challenge 버튼 start */}
                  <Pressable
                    onPress={() => props.navigation.navigate('ChallengeScreen')}
                    borderWidth={1}
                    w={responsiveWidth(widthPersentage(140))}
                    h={responsiveWidth(widthPersentage(140))}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderColor="#0fefbd"
                    backgroundColor="#fafafa80"
                    rounded={8}>
                    <Image
                      source={ChallengeIcon}
                      resizeMode={'contain'}
                      style={{width: responsiveWidth(widthPersentage(48))}}
                      alt={''}
                    />
                    <Text
                      marginTop="2"
                      fontSize={responsiveFontSize(fontSizePersentage(14))}
                      color="#0fefbd"
                      bold>
                      Challenge
                    </Text>
                  </Pressable>
                  {/* Challenge 버튼 end */}
                  {/* 가사 쓰기 버튼 start */}
                  <Pressable
                    onPress={() => props.navigation.navigate('LyricsScreen')}
                    borderWidth={1}
                    w={responsiveWidth(widthPersentage(140))}
                    h={responsiveWidth(widthPersentage(140))}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderColor="#0fefbd"
                    backgroundColor="#fafafa80"
                    rounded={8}>
                    <Image
                      source={WriteMusicIcon}
                      resizeMode={'contain'}
                      style={{width: responsiveWidth(widthPersentage(48))}}
                      alt={''}
                    />
                    <Text
                      marginTop="2"
                      fontSize={responsiveFontSize(fontSizePersentage(14))}
                      color="#0fefbd"
                      bold>
                      가사 쓰기
                    </Text>
                  </Pressable>
                  {/* 가사 쓰기 버튼 end */}
                </HStack>
                <HStack
                  space={responsiveWidth(widthPersentage(28))}
                  justifyContent={'center'}>
                  {/* 추억의 사진으로 노래 만들기 버튼 start */}
                  <Pressable
                    onPress={() => {
                      console.log(musicList);
                    }}
                    borderWidth={1}
                    w={responsiveWidth(widthPersentage(140))}
                    h={responsiveWidth(widthPersentage(140))}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderColor="#0fefbd"
                    backgroundColor="#fafafa80"
                    rounded={8}>
                    <Text
                      marginBottom="2"
                      color="#858c92"
                      fontSize={responsiveFontSize(fontSizePersentage(14))}
                      bold>
                      준비중
                    </Text>
                    <Image
                      source={PhotoIcon}
                      resizeMode={'contain'}
                      style={{width: responsiveWidth(widthPersentage(48))}}
                      alt={''}
                    />
                    <Text
                      marginTop="2"
                      fontSize={responsiveFontSize(fontSizePersentage(14))}
                      color="#0fefbd"
                      bold
                      textAlign={'center'}>
                      추억의 사진으로 {'\n'} 노래만들기
                    </Text>
                  </Pressable>
                  {/* 추억의 사진으로 노래 만들기 버튼 end */}
                  {/* BGM Studio 버튼 start */}
                  <Pressable
                    borderWidth={1}
                    w={responsiveWidth(widthPersentage(140))}
                    h={responsiveWidth(widthPersentage(140))}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderColor="#0fefbd"
                    backgroundColor="#fafafa80"
                    rounded={8}>
                    <Text
                      marginBottom="2"
                      color="#858c92"
                      fontSize={responsiveFontSize(fontSizePersentage(14))}
                      bold>
                      준비중
                    </Text>
                    <Image
                      source={BgmStudioIcon}
                      resizeMode={'contain'}
                      style={{width: responsiveWidth(widthPersentage(48))}}
                      alt={''}
                    />
                    <Text
                      marginTop="2"
                      fontSize={responsiveFontSize(fontSizePersentage(14))}
                      color="#0fefbd"
                      bold
                      textAlign={'center'}>
                      BGM Studio
                    </Text>
                  </Pressable>
                  {/* BGM Studio 버튼 end */}
                </HStack>
                <HStack
                  space={responsiveWidth(widthPersentage(28))}
                  justifyContent={'center'}>
                  {/* 매거진 버튼 start */}
                  <Pressable
                    borderWidth={1}
                    w={responsiveWidth(widthPersentage(140))}
                    h={responsiveWidth(widthPersentage(140))}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderColor="#0fefbd"
                    backgroundColor="#fafafa80"
                    rounded={8}>
                    <Text
                      marginBottom="2"
                      color="#858c92"
                      fontSize={responsiveFontSize(fontSizePersentage(14))}
                      bold>
                      준비중
                    </Text>
                    <Image
                      source={MagazineIcon}
                      resizeMode={'contain'}
                      style={{width: responsiveWidth(widthPersentage(48))}}
                      alt={''}
                    />
                    <Text
                      marginTop="2"
                      fontSize={responsiveFontSize(fontSizePersentage(14))}
                      color="#0fefbd"
                      bold
                      textAlign={'center'}>
                      매거진
                    </Text>
                  </Pressable>
                  {/* 매거진 버튼 end */}
                  {/* 함께 만드는 우리의 Music 버튼 start */}
                  <Pressable
                    borderWidth={1}
                    w={responsiveWidth(widthPersentage(140))}
                    h={responsiveWidth(widthPersentage(140))}
                    justifyContent={'center'}
                    alignItems={'center'}
                    borderColor="#0fefbd"
                    backgroundColor="#fafafa80"
                    rounded={8}>
                    <Text
                      marginBottom="2"
                      color="#858c92"
                      fontSize={responsiveFontSize(fontSizePersentage(14))}
                      bold>
                      준비중
                    </Text>
                    <Image
                      source={MusicNoteIcon}
                      resizeMode={'contain'}
                      style={{width: responsiveWidth(widthPersentage(48))}}
                      alt={''}
                    />
                    <Text
                      marginTop="2"
                      fontSize={responsiveFontSize(fontSizePersentage(14))}
                      color="#0fefbd"
                      bold
                      textAlign={'center'}>
                      함께 만드는 {'\n'} 우리의 Music
                    </Text>
                  </Pressable>
                  {/* 함께 만드는 우리의 Music 버튼 end */}
                </HStack>
              </VStack>
            </Stack>
          </Box>
          {/* 버튼 메뉴 end */}
        </Box>
      </ScrollView>
    </Box>
  );
}
export default MainScreen;
