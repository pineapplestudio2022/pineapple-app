import React from 'react';
import {Box, Button, CheckIcon, Image,  Input,  Select, Text} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
import DatePickerModal from '../../Components/DatePickerModal';

import DropdownIcon from '../../Assets/Image/icon_dropdown_green.png';
import NoteIcon from '../../Assets/Image/icon_note_gray.png';
import {ImageBackground} from 'react-native';

const ArrangementMatchingPresenter = props => {
  return (
    <Box flex={1}>
      <MenuComponent
        name={props.route.name}
        titleName={'편곡 매칭'}
        navigation={props.navigation}
      />
      <Box flex={1} bgColor={'#fafafacc'} rounded={16}>
        <KeyboardAwareScrollView
          width={'100%'}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Text
            mt={responsiveHeight(heightPersentage(46))}
            fontSize={responsiveFontSize(fontSizePersentage(18))}
            color={'#1a1b1c'}
            bold
            alignSelf={'center'}>
            Referrence 파일 등록
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
                <>
                  <Button onPress={props.imageUpload}>
                    <Text color={'white'} bold>
                      File Upload
                    </Text>
                  </Button>
                </>
              ) : null}
            </ImageBackground>
          </Box>
          <Text
            mt={responsiveHeight(heightPersentage(50))}
            fontSize={responsiveFontSize(fontSizePersentage(18))}
            color={'#1a1b1c'}
            bold
            alignSelf={'center'}>
            의뢰자 정보
          </Text>
          <Input
            mt={responsiveHeight(heightPersentage(26))}
            alignSelf={'center'}
            width={responsiveWidth(widthPersentage(320))}
            backgroundColor={'#fafafab3'}
            borderWidth={0}
            borderBottomWidth={1}
            keyboardType={'numeric'}
            borderBottomColor={'#0fefbd'}
            placeholder={'나이를 입력해주세요'}
            fontSize={responsiveFontSize(fontSizePersentage(16))}
            value={props.age}
            onChangeText={props.setAge}
          />
          <Select
            mt={responsiveHeight(heightPersentage(10))}
            alignSelf={'center'}
            selectedValue={props.sex}
            width={responsiveWidth(widthPersentage(320))}
            borderWidth={0}
            borderBottomWidth={1}
            borderBottomColor={'#0fefbd'}
            accessibilityLabel="Please select where to use"
            placeholder="성별을 선택해주세요"
            fontSize={responsiveFontSize(fontSizePersentage(16))}
            onValueChange={props.setSex}
            dropdownIcon={
              <Image
                source={DropdownIcon}
                width={responsiveWidth(widthPersentage(25))}
                alt={' '}
                resizeMode={'contain'}
              />
            }
            _selectedItem={{
              bg: 'cyan.600',
              endIcon: <CheckIcon size={4} />,
            }}>
            <Select.Item label="남자" value="male" />
            <Select.Item label="여자" value="female" />
          </Select>
          <Select
            mt={responsiveHeight(heightPersentage(10))}
            alignSelf={'center'}
            selectedValue={props.preferredGenre}
            width={responsiveWidth(widthPersentage(320))}
            borderWidth={0}
            borderBottomWidth={1}
            borderBottomColor={'#0fefbd'}
            accessibilityLabel="Please select where to use"
            placeholder="선호 장르를 선택해주세요"
            fontSize={responsiveFontSize(fontSizePersentage(16))}
            onValueChange={props.setPreferredGenre}
            dropdownIcon={
              <Image
                source={DropdownIcon}
                width={responsiveWidth(widthPersentage(25))}
                alt={' '}
                resizeMode={'contain'}
              />
            }
            _selectedItem={{
              bg: 'cyan.600',
              endIcon: <CheckIcon size={4} />,
            }}>
            <Select.Item label="Rock" value="rock" />
            <Select.Item label="Pop" value="pop" />
            <Select.Item label="New age" value="newage" />
            <Select.Item label="Hip hop" value="hiphop" />
            <Select.Item label="Accoustic" value="accoustic" />
            <Select.Item label="Old pop" value="oldpop" />
            <Select.Item label="Ballad" value="ballad" />
            <Select.Item label="Elec" value="elec" />
          </Select>
          <Input
            alignSelf={'center'}
            width={responsiveWidth(widthPersentage(320))}
            backgroundColor={'#fafafab3'}
            borderWidth={0}
            borderBottomWidth={1}
            borderBottomColor={'#0fefbd'}
            placeholder={'작업기간을 지정해주세요'}
            fontSize={responsiveFontSize(fontSizePersentage(16))}
            mt={responsiveHeight(heightPersentage(10))}
            value={
              props.startDate ? `${props.startDate} ~ ${props.endDate}` : null
            }
            editable={false}
            InputRightElement={
              <DatePickerModal
                setStartDate={props.setStartDate}
                setEndDate={props.setEndDate}
              />
            }
          />
          <Box
            alignSelf={'center'}
            mt={responsiveHeight(heightPersentage(55))}
            mb={20}>
            <Gbutton
              wp={220}
              hp={40}
              fs={18}
              text={'매칭 신청'}
              rounded={8}
              onPress={props.Armatching}
            />
          </Box>
        </KeyboardAwareScrollView>
      </Box>
    </Box>
  );
};

export default ArrangementMatchingPresenter;
