import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Badge, Box, Button, Input, Pressable, Spinner, Text} from 'native-base';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../../Commons/CommonUtil';
import Gbutton from '../../Components/GbuttonComponent';
import MenuComponent from '../../Components/MenuComponent';

import KeywordIcon from '../../Assets/Image/icon_mybgm_keyword.png';
import DropdownIcon from '../../Assets/Image/icon_dropdown_green.png';

const BgmStudioPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'BGM STUDIO'}
        navigation={props.navigation}
      />
      <Box flex={1} bgColor={'#fafafacc'} rounded={16}>
        <ScrollView width={'100%'}>
          <Text
            fontSize={responsiveFontSize(fontSizePersentage(18))}
            color={'#1a1b1c'}
            bold
            mt={responsiveHeight(heightPersentage(46))}
            alignSelf={'center'}>
            AI가 만드는 맞춤형 BGM 만들기
          </Text>
          <Box
            style={{
              width: responsiveWidth(widthPersentage(320)),
              height: responsiveHeight(heightPersentage(180)),
            }}
            alignSelf={'center'}
            mt={responsiveHeight(heightPersentage(29))}>
            <ImageBackground
              resizeMode="cover"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#a5a8ae',
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
              source={props.image ? props.image : null}>
              {!props.image ? (
                <Button onPress={props.imageUpload}>
                  <Text color={'white'} bold>
                    image upload
                  </Text>
                </Button>
              ) : null}
            </ImageBackground>
          </Box>
          <Box
            alignSelf={'center'}
            mt={responsiveHeight(heightPersentage(20))}
            width={responsiveWidth(widthPersentage(320))}>
            <FlatList
              data={props.keywordList}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => (
                <Box mx={1} rounded={4} overflow="hidden">
                  <Badge colorScheme={'info'} px={2}>
                    <Text color={'white'}>{item}</Text>
                  </Badge>
                </Box>
              )}
              keyExtractor={item => item.index}
            />
          </Box>
          <Input
            alignSelf={'center'}
            width={responsiveWidth(widthPersentage(320))}
            backgroundColor={'#fafafab3'}
            borderWidth={0}
            borderBottomWidth={1}
            borderBottomColor={'#0fefbd'}
            placeholder={'키워드를 입력해주세요'}
            fontSize={responsiveFontSize(fontSizePersentage(16))}
            mt={responsiveHeight(heightPersentage(5))}
            value={props.keyword}
            onChangeText={props.setKeyword}
            InputLeftElement={
              <Image
                alt={' '}
                source={KeywordIcon}
                resizeMode={'contain'}
                style={{
                  width: responsiveWidth(widthPersentage(25)),
                }}
              />
            }
            InputRightElement={
              <Gbutton
                wp={60}
                hp={30}
                fs={16}
                fw={800}
                text={'등록'}
                rounded={8}
                onPress={props.addKeyword}
              />
            }
          />
          <Input
            alignSelf={'center'}
            width={responsiveWidth(widthPersentage(320))}
            backgroundColor={'#fafafab3'}
            borderWidth={0}
            borderBottomWidth={1}
            borderBottomColor={'#0fefbd'}
            placeholder={'사용처를 입력해주세요'}
            fontSize={responsiveFontSize(fontSizePersentage(16))}
            mt={responsiveHeight(heightPersentage(47))}
            //   value={props.password}
            //   onChangeText={props.handlePassword}
          />
          {/* <Select
            mt={responsiveHeight(heightPersentage(69))}
            alignSelf={'center'}
            selectedValue={props.whereUse}
            width={responsiveWidth(widthPersentage(320))}
            borderWidth={0}
            borderBottomWidth={1}
            borderBottomColor={'#0fefbd'}
            accessibilityLabel="Please select where to use"
            placeholder="사용처를 선택해주세요"
            fontSize={responsiveFontSize(fontSizePersentage(16))}
            onValueChange={props.setWhereUse}
            dropdownIcon={
              <Image source={DropdownIcon} width={24} height={24} alt={' '} />
            }
            _selectedItem={{
              bg: 'cyan.600',
              endIcon: <CheckIcon size={4} />,
            }}>
            <Select.Item label="JavaScript" value="js" />
            <Select.Item label="TypeScript" value="ts" />
          </Select> */}
          <Box
            alignSelf={'center'}
            mt={responsiveHeight(heightPersentage(100))}
            alignItems={'center'}>
            {props.loading ? (
              <Box
                position={'absolute'}
                top={-65}
                bottom={0}
                alignItems={'center'}>
                <Spinner />
                <Text>생성중....</Text>
              </Box>
            ) : null}
            <Gbutton
              wp={220}
              hp={40}
              fs={18}
              fw={800}
              text={props.bgmResult ? 'BGM 확인하기' : 'AI BGM 생성'}
              disable={props.loading}
              rounded={8}
              onPress={
                props.bgmResult ? props.handleMovetoMyBGM : props.handlerCreate
              }
            />
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default BgmStudioPresenter;
