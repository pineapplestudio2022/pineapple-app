//Challenge > 작곡 참여안의 카드 컴포넌트
import React from 'react';
import {ImageBackground} from 'react-native';
import {Box, Pressable, Text} from 'native-base';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../Commons/CommonUtil';
import DumpImage from '../Assets/Image/challenge/bg_challenge_ai_1.jpg';

const AIMusicBoxComponent = props => {
  const handlerNavigation = () => {
    props.navigation.navigate(props.nextView);
  };
  return (
    <Box
      style={{
        shadowColor: '#00000080',
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowRadius: 3,
        shadowOpacity: 1,
      }}>
      <Pressable
        onPress={handlerNavigation}
        rounded={4}
        overflow={'hidden'}
        width={responsiveWidth(widthPersentage(149))}
        height={responsiveHeight(heightPersentage(130))}
        backgroundColor="#aaaaaa">
        <ImageBackground
          source={DumpImage}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Box
            style={{
              width: responsiveWidth(widthPersentage(125)),
              height: responsiveHeight(heightPersentage(109)),
              justifyContent: 'center',
            }}>
            <Text
              fontSize={responsiveFontSize(fontSizePersentage(16))}
              fontWeight={500}
              color={'#fafafa'}
              textAlign={'center'}>
              Innocent
            </Text>
          </Box>
        </ImageBackground>
      </Pressable>
    </Box>
  );
};
export default AIMusicBoxComponent;
