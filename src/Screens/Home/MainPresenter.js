import React from 'react';
import {Box, FlatList, HStack, VStack} from 'native-base';
import {ScrollView} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {widthPersentage} from '../../Commons/CommonUtil';
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
                  onPress={() =>
                    props.navigation.navigate('ChallengeNavigation')
                  }
                />
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
};
export default MainPresenter;
