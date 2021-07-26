import React from 'react';
import {
  Box,
  VStack,
  Text,
  Divider,
  Center,
  HStack,
  Image,
  Button,
  TextArea,
  ScrollView,
  View,
} from 'native-base';
import {StyleSheet, ImageBackground} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  widthPersentage,
  heightPersentage,
} from '../../Commons/DeviceWHPersentage';
import Glassbox from '../../Assets/Image/GlassboxTextbox.png';

function Wlyrics(props) {
  return (
    <View>
      <ScrollView>
        <Box flex={1} safeArea alignItems={'center'} justifyContent={'center'}>
          <ImageBackground
            source={Glassbox}
            style={{
              width: responsiveWidth(widthPersentage(356)),
              height: responsiveHeight(heightPersentage(664)),
            }}>
            <Box>
              <VStack>
                <Text style={styles.txt2}>
                  <TextArea>
                    {'\n'}
                    울지 마 이미 지난 일이야{'\n'}
                    삶의 반직선 위에 점일 뿐이야 살아가면서 누구나 겪는 일이야
                    어른이 되는 단지 과정일뿐이야 Uh 단지 과정일뿐이야
                    {'\n'}
                    울지 마 이미 지난 일이야
                    {'\n'}
                    삶의 반직선 위에 점일 뿐이야 살아가면서 누구나 겪는 일이야
                    어른이 되는
                    {'\n'}
                    울지 마 이미 지난 일이야{'\n'}
                    삶의 반직선 위에 점일 뿐이야 살아가면서 누구나 겪는 일이야
                    어른이 되는 단지 과정일뿐이야 Uh 단지 과정일뿐이야
                    {'\n'}
                    울지 마 이미 지난 일이야
                    {'\n'}
                    삶의 반직선 위에 점일 뿐이야 살아가면서 누구나 겪는 일이야
                    어른이 되는
                  </TextArea>
                </Text>
              </VStack>
            </Box>

            <Box alignItems="center">
              <HStack space={10}>
                <Button style={styles.btn}>
                  <HStack>
                    <Image source={require('../../Assets/Image/Close.png')} />
                    <Text style={styles.txts}> AI작곡-준비중 </Text>
                  </HStack>
                </Button>
                <Button style={styles.btn}> X 닫기 </Button>
              </HStack>
            </Box>
          </ImageBackground>
        </Box>
      </ScrollView>
    </View>
  );
}
``;
export default Wlyrics;

const styles = StyleSheet.create({
  icons: {
    width: responsiveWidth(widthPersentage(3)),
    height: responsiveHeight(heightPersentage(3)),
  },

  txt1: {
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.11,
    textAlign: 'center',
    color: '#1a1b1c',
    marginBottom: 32,
    margin: 0,
  },

  txt2: {
    width: responsiveWidth(widthPersentage(180)),
    height: responsiveHeight(heightPersentage(190)),
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.8,
    color: '#000000',
    marginTop: 130,
    marginLeft: 85,
    marginRight: 53,
  },
  btn: {
    width: responsiveWidth(widthPersentage(130)),
    height: responsiveHeight(heightPersentage(50)),
    borderRadius: 6,
    backgroundColor: '#0fefbd',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    marginTop: 250,
    fontWeight: '700',
  },

  txts: {
    color: '#fafafa',
    fontWeight: '700',
  },
});
