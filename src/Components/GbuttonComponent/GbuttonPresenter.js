import {Box, Center, HStack, Image, Pressable, Text, VStack} from 'native-base';
import React from 'react';
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

const GbuttonPresenter = props => {
  return (
    <Pressable
      onPress={
        props.disable
          ? props.onPressActive
            ? props.onPress
            : () => {}
          : props.onPress
      }
      onPressIn={props.pressIn}
      onPressOut={props.pressOut}
      style={{
        width: responsiveWidth(widthPersentage(props.wp)),
        height: responsiveHeight(heightPersentage(props.hp)),
        backgroundColor: props.disable ? '#a5a8ae' : props.bgColor,
        borderWidth: props.bwidth,
        borderRadius: props.rounded,
        borderColor: '#0fefbd',
        shadowColor: '#00000033',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 4,
        shadowOpacity: 1,
      }}>
      <HStack flex={1} alignItems={'center'}>
        {props.imgName ? (
          <Image
            pl={4}
            flex={1}
            position={'absolute'}
            left={2}
            source={
              props.imgrvs
                ? props.getImage(props.imgName + '-reverse')
                : props.getImage(props.imgName)
            }
            style={{
              height: responsiveHeight(heightPersentage(props.hp)) / 1.6,
              width: responsiveHeight(heightPersentage(props.hp)) / 1.6,
            }}
            resizeMode={'contain'}
            alt={' '}
          />
        ) : (
          <></>
        )}
        <Text
          flex={5}
          textAlign={'center'}
          fontWeight={props.fw}
          style={{
            color: props.textColor,
            fontSize: responsiveFontSize(fontSizePersentage(props.fs)),
          }}>
          {props.text}
        </Text>
      </HStack>
    </Pressable>
  );
};

GbuttonPresenter.defaultProps = {
  fs: 20, //font size
  fw: 'normal', //font weight
  text: '', //텍스트
  wp: 390, //width
  hp: 843, //height
  rounded: 0, //borderRadius
  disable: false, //disalbe
  onPressActive: false, //onPress 활성화
};

export default GbuttonPresenter;
