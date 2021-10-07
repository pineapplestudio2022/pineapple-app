import React from 'react';
import {
  Box,
  VStack,
  Text,
  Divider,
  HStack,
  Image,
  TextArea,
  ScrollView,
  Input,
  Center,
} from 'native-base';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {TouchableOpacity} from 'react-native';
import {
  widthPersentage,
  heightPersentage,
  fontSizePersentage,
} from '../../../Commons/CommonUtil';
import MenuComponent from '../../../Components/MenuComponent';
import AIIcon from '../../../Assets/Image/Close.png';
import CloseIcon from '../../../Assets/Image/icon_lyrics_close.png';

const WriteLyricsPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'가사 쓰기'}
        navigation={props.navigation}
        onSave={props.writeFiletoLocal}
      />
      <ScrollView>
        <Center>
          <Box
            style={{
              width: responsiveWidth(widthPersentage(350)),
              height: responsiveHeight(heightPersentage(664)),
            }}>
            <VStack
              space={5}
              alignItems={'center'}
              w={'100%'}
              h={'100%'}
              style={{
                borderRadius: 8,
                backgroundColor: '#f9f9f9',
                shadowColor: '#858c9233',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowRadius: 4,
                shadowOpacity: 1,
              }}>
              <Input
                placeholder={'제목을 적어주세요'}
                placeholderTextColor={'#4be3ac'}
                fontSize={responsiveFontSize(fontSizePersentage(34))}
                textAlign={'center'}
                borderWidth={0}
                bold
                color={'#4be3ac'}
                value={props.lyrics.title}
                onChangeText={text =>
                  props.setLyrics({...props.lyrics, title: text})
                }
              />
              <Divider
                bgColor={'#4be3ac'}
                w={responsiveWidth(widthPersentage(320))}
              />
              <Box
                style={{
                  width: responsiveWidth(widthPersentage(240)),
                  height: responsiveHeight(heightPersentage(440)),
                  padding: 6,
                }}>
                <TextArea
                  textAlign={'center'}
                  fontSize={responsiveFontSize(fontSizePersentage(16))}
                  color={'#000000'}
                  borderWidth={0}
                  w="100%"
                  h="100%"
                  value={props.lyrics.content}
                  onChangeText={text =>
                    props.setLyrics({...props.lyrics, content: text})
                  }
                />
              </Box>

              <HStack w={'100%'} justifyContent={'space-around'}>
                <TouchableOpacity
                  style={{
                    width: responsiveWidth(widthPersentage(120)),
                    height: responsiveHeight(heightPersentage(40)),
                    borderRadius: 6,
                    backgroundColor: '#0fefbd',
                    shadowColor: '#00000033',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowRadius: 4,
                    shadowOpacity: 1,
                  }}>
                  <HStack
                    justifyContent={'center'}
                    alignItems={'center'}
                    h="100%"
                    space={1}>
                    <Image
                      source={AIIcon}
                      style={{
                        width: responsiveWidth(widthPersentage(21)),
                        height: responsiveHeight(heightPersentage(20)),
                      }}
                      alt={' '}
                      resizeMode={'contain'}
                    />
                    <Text
                      color={'#ffffff'}
                      fontSize={responsiveFontSize(fontSizePersentage(13))}
                      fontWeight={800}>
                      AI 작곡-준비중
                    </Text>
                  </HStack>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                  style={{
                    width: responsiveWidth(widthPersentage(120)),
                    height: responsiveHeight(heightPersentage(40)),
                    borderRadius: 6,
                    backgroundColor: '#0fefbd',
                    shadowColor: '#00000033',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowRadius: 4,
                    shadowOpacity: 1,
                  }}>
                  <HStack
                    justifyContent={'center'}
                    alignItems={'center'}
                    h="100%"
                    space={3}>
                    <Image
                      source={CloseIcon}
                      style={{
                        width: responsiveWidth(widthPersentage(21)),
                        height: responsiveHeight(heightPersentage(20)),
                      }}
                      alt={' '}
                      resizeMode={'contain'}
                    />
                    <Text
                      color={'#ffffff'}
                      fontSize={responsiveFontSize(fontSizePersentage(13))}
                      fontWeight={800}>
                      닫 기
                    </Text>
                  </HStack>
                </TouchableOpacity>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </ScrollView>
    </Box>
  );
};
export default WriteLyricsPresenter;
