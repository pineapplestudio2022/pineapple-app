import {HStack, Image, Pressable, Text} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';
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
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        ...Platform.select({
          ios: {
            shadowColor: '#8799a45b',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 4,
            shadowOpacity: 1,
          },
          android: {
            elevation: 5,
          },
        }),
        width: responsiveWidth(widthPersentage(props.wp)),
        height: responsiveWidth(widthPersentage(props.hp)),
        backgroundColor: props.disable ? '#a5a8ae' : props.bgColor,
        borderWidth: props.bwidth,
        borderRadius: props.rounded,
        borderColor: '#0fefbd',
      }}>
      <HStack flex={1} alignItems={'center'}>
        {props.imgName ? (
          <Image
            ml={1}
            pl={2}
            flex={1}
            maxHeight={'90%'}
            source={
              props.imgrvs
                ? props.getImage(props.imgName + '-reverse')
                : props.getImage(props.imgName)
            }
            resizeMode={'contain'}
            alt={' '}
          />
        ) : (
          <></>
        )}
        <Text
          flex={6}
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
