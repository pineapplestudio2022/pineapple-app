import React from 'react';
import {Box, FlatList, HStack} from 'native-base';
import {ScrollView} from 'react-native';
import MusicAlbumComponent from '../../Components/MusicAlbumComponent';
import MenuComponent from '../../Components/MenuComponent';
import Wbutton from '../../Components/WbuttonComponent';

const MainPresenter = props => {
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
          <FlatList
            horizontal
            numColumns={1}
            data={props.musicList}
            // onEndReached={handleLoadMore}
            onEndReachedThreshold={0.2}
            initialNumToRender={3}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <>
                {index === 0 ? (
                  <MusicAlbumComponent
                    ml={5}
                    navigation={props.navigation}
                    nextView={'Ranking'}
                    title={'인기음원'}
                    subtitle={'전체보기'}
                    badge={11}
                    cover={11}
                  />
                ) : (
                  <></>
                )}
                <MusicAlbumComponent
                  id={item.id}
                  cover={index + 1}
                  badge={index + 1}
                  navigation={props.navigation}
                  title={item.title}
                  subtitle={item.participant}
                  nextView={'Ranking'}
                />
              </>
            )}
            keyExtractor={item => item.id}
          />
        </Box>
        {/* 가로스크롤 뷰 시작, 인기 음원 순위 end*/}
        <Box mb={20}>
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
          <HStack mt={4} flexWrap={'wrap'} h={'100%'} justifyContent="center">
            <Box m={4}>
              <Wbutton
                wp={140}
                hp={140}
                fs={14}
                fw={600}
                imgName={'challenge'}
                rounded={8}
                text={'Challenge'}
                onPress={() => props.navigation.navigate('ChallengeNavigation')}
              />
            </Box>
            <Box m={4}>
              <Wbutton
                wp={140}
                hp={140}
                fs={14}
                fw={600}
                imgName={'lyrics'}
                rounded={8}
                text={'가사 쓰기'}
                onPress={() => props.navigation.navigate('LyricsNavigation')}
              />
            </Box>
            <Box m={4}>
              <Wbutton
                wp={140}
                hp={140}
                fs={14}
                fw={600}
                imgName={'coar'}
                rounded={8}
                text={'작곡 / 편곡 매칭'}
                onPress={() => props.navigation.navigate('CoArHome')}
              />
            </Box>
            <Box m={4}>
              <Wbutton
                wp={140}
                hp={140}
                fs={14}
                fw={600}
                imgName={'bgm'}
                rounded={8}
                text={'BGM Studio'}
                onPress={props.handlerMoveToBGMStudio}
              />
            </Box>
            <Box m={4} mr={188}>
              <Wbutton
                wp={140}
                hp={140}
                fs={14}
                fw={600}
                imgName={'pineclip'}
                rounded={8}
                text={'PineClip'}
                onPress={() => props.navigation.navigate('PineClip')}
              />
            </Box>
          </HStack>
          {/* 버튼 메뉴 end */}
        </Box>
      </ScrollView>
    </Box>
  );
};
export default MainPresenter;
