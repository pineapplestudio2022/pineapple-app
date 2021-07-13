import React, {Component} from 'react';
import {
  Box,
  Center,
  Input,
  SearchIcon,
  Icon,
  Stack,
  HStack,
  VStack,
  Text,
  Pressable,
  Image,
} from 'native-base';
import {ImageBackground, ScrollView} from 'react-native';
import MusicAlbumComponent from '../Components/MusicAlbumComponent';
import MenuComponent from '../Components/MenuComponent';
import MainBackground from '../Assets/Image/main_background.png';
import ChallengeIcon from '../Assets/Image/btn_main_speaker.png';
import MagazineIcon from '../Assets/Image/btn_main_magazine.png';
import PhotoIcon from '../Assets/Image/btn_main_photo.png';
import BgmStudioIcon from '../Assets/Image/btn_main_bgm_studio.png';
import WriteMusicIcon from '../Assets/Image/btn_main_write_music.png';
import MusicNoteIcon from '../Assets/Image/btn_main_music_note.png';

function MainScreen(props) {
  return (
    <Box flex={1}>
      {/* 배경이미지 */}
      <ImageBackground
        source={MainBackground}
        resizeMode={'cover'}
        style={{width: '100%', height: '100%'}}>
        <MenuComponent name={props.route.name} navigation={props.navigation} />

        {/* 가로스크롤 뷰 && 인기 음원 순위 start */}
        <Box mt={2}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false} //가로 스크롤바 표시 여부
            contentContainerStyle={{
              alignItems: 'center',
              paddingStart: 5,
              paddingEnd: 5,
            }}>
            {/* 음원 리스트 보여주는 로직 수정 필요*/}
            <MusicAlbumComponent />
            <MusicAlbumComponent />
            <MusicAlbumComponent />
            <MusicAlbumComponent />
            <MusicAlbumComponent />
            <MusicAlbumComponent />
          </ScrollView>
        </Box>
        {/* 가로스크롤 뷰 시작, 인기 음원 순위 end*/}

        <Box>
          {/* Search Box start */}
          <Center backgroundColor="#fafafa80" marginBottom={14}>
            <Box w="76%">
              <Input
                InputLeftElement={<SearchIcon size="4" color="#a5a8ae" />}
                size="md"
                m={2}
                variant="underlined"
                placeholder="Search"
                fontSize="16"
                borderBottomColor="#0fefbd"
              />
            </Box>
          </Center>
          {/* Search Box end */}
          {/* 버튼 메뉴 start */}
          <Box w="100%">
            <Stack space={3} alignItems="center">
              <VStack space={5} alignItems="center">
                <HStack space={8} alignItems="center">
                  <Pressable>
                    <Center
                      size={140}
                      rounded="xl"
                      borderWidth="1"
                      borderColor="#0fefbd"
                      backgroundColor="#fafafa80">
                      <Image source={ChallengeIcon} resizeMode={'contain'} />
                      <Text marginTop="2" color="#0fefbd">
                        Challenge
                      </Text>
                    </Center>
                  </Pressable>
                  <Center
                    size={140}
                    rounded="xl"
                    borderWidth="1"
                    borderColor="#0fefbd"
                    backgroundColor="#fafafa80">
                    <Image source={WriteMusicIcon} resizeMode={'contain'} />
                    <Text marginTop="2" color="#0fefbd">
                      가사쓰기
                    </Text>
                  </Center>
                </HStack>
                <HStack space={8} alignItems="center">
                  <Center
                    size={140}
                    rounded="xl"
                    borderWidth="1"
                    borderColor="#0fefbd"
                    backgroundColor="#fafafa80">
                    <Text marginBottom="2" color="#a4acb4" bold>
                      준비중
                    </Text>
                    <Image source={PhotoIcon} resizeMode={'contain'} />
                    <Text marginTop="2" color="#0fefbd">
                      사진 + 음악
                    </Text>
                  </Center>
                  <Center
                    size={140}
                    rounded="xl"
                    borderWidth="1"
                    borderColor="#0fefbd"
                    backgroundColor="#fafafa80">
                    <Text marginBottom="2" color="#a4acb4" bold>
                      준비중
                    </Text>
                    <Image source={BgmStudioIcon} resizeMode={'contain'} />
                    <Text marginTop="2" color="#0fefbd">
                      BGM Studio
                    </Text>
                  </Center>
                </HStack>
                <HStack space={8} alignItems="center">
                  <Center
                    size={140}
                    rounded="xl"
                    borderWidth="1"
                    borderColor="#0fefbd"
                    backgroundColor="#fafafa80">
                    <Text marginBottom="2" color="#a4acb4" bold>
                      준비중
                    </Text>
                    <Image source={MagazineIcon} resizeMode={'contain'} />
                    <Text marginTop="2" color="#0fefbd">
                      매거진
                    </Text>
                  </Center>
                  <Center
                    size={140}
                    rounded="xl"
                    borderWidth="1"
                    borderColor="#0fefbd"
                    backgroundColor="#fafafa80">
                    <Text marginBottom="2" color="#a4acb4" bold>
                      준비중
                    </Text>
                    <Image source={MusicNoteIcon} resizeMode={'contain'} />
                    <Text marginTop="2" color="#0fefbd">
                      함께 만드는 Music
                    </Text>
                  </Center>
                </HStack>
              </VStack>
            </Stack>
          </Box>
          {/* 버튼 메뉴 end */}
        </Box>
      </ImageBackground>
    </Box>
  );
}
export default MainScreen;
