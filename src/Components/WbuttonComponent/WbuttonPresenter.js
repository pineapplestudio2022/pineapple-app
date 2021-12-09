import React from 'react';
import {Box, Center, HStack, Image, Pressable, Text} from 'native-base';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {fontSizePersentage, widthPersentage} from '../../Commons/CommonUtil';

const WbuttonPresenter = props => {
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
        height: responsiveWidth(widthPersentage(props.hp)),
        backgroundColor: props.disable ? '#fafafa80' : props.bgColor,
        borderWidth: 1,
        borderRadius: props.rounded,
        borderColor: '#0fefbd',
      }}>
      <Box>
        <Center h={'100%'}>
          {props.ready ? (
            <Text
              position={'absolute'}
              top={2}
              color="#858c92"
              fontSize={responsiveFontSize(fontSizePersentage(14))}
              bold>
              {props.ready}
            </Text>
          ) : (
            <></>
          )}

          {props.imgName ? (
            <Image
              source={props.handlerGetImage}
              style={{
                width: responsiveWidth(widthPersentage(48)),
                marginBottom: 8,
              }}
              resizeMode={'contain'}
              alt={' '}
            />
          ) : (
            <></>
          )}
          <HStack alignItems={'center'} justifyContent={'center'} w={'100%'}>
            {props.leftImgName ? (
              <Image
                source={props.handlerGetImageLeft}
                style={{
                  width: responsiveWidth(widthPersentage(40)),
                  marginRight: responsiveWidth(widthPersentage(16)),
                }}
                resizeMode={'contain'}
                alt={' '}
              />
            ) : (
              <></>
            )}
            <Text
              fontWeight={props.fw}
              style={{
                color: props.textColor,
                fontSize: responsiveFontSize(fontSizePersentage(props.fs)),
                textAlign: 'center',
              }}>
              {props.text}
            </Text>
          </HStack>
        </Center>
      </Box>
    </Pressable>
  );
};

WbuttonPresenter.defaultProps = {
  fs: 20, //font size
  fw: 'normal', //font weight
  text: '', //텍스트
  wp: 390, //width
  hp: 843, //height
  rounded: 0, //borderRadius
  disable: false, //disalbe
  onPressActive: false, //onPress 활성화
};

export default WbuttonPresenter;
