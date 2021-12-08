import {Box, CheckIcon, Input, Pressable, Select, Text} from 'native-base';
import React from 'react';
import {Image, ImageBackground, ScrollView} from 'react-native';
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
          <Pressable
            style={{
              width: responsiveWidth(widthPersentage(320)),
              height: responsiveHeight(heightPersentage(180)),
            }}
            alignSelf={'center'}
            mt={responsiveHeight(heightPersentage(29))}>
            <ImageBackground
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#a5a8ae',
                borderRadius: 8,
              }}
            />
          </Pressable>
          <Input
            alignSelf={'center'}
            width={responsiveWidth(widthPersentage(320))}
            backgroundColor={'#fafafab3'}
            borderWidth={0}
            borderBottomWidth={1}
            borderBottomColor={'#0fefbd'}
            placeholder={'키워드를 입력해주세요'}
            fontSize={responsiveFontSize(fontSizePersentage(16))}
            mt={responsiveHeight(heightPersentage(47))}
            //   value={props.password}
            //   onChangeText={props.handlePassword}
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
          />
          <Select
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
          </Select>
          <Box
            alignSelf={'center'}
            mt={responsiveHeight(heightPersentage(100))}>
            <Gbutton
              wp={220}
              hp={40}
              fs={18}
              text={'AI BGM 생성'}
              rounded={8}
            />
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default BgmStudioPresenter;
