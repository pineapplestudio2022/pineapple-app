import {Box, Button, Divider, HStack, Image, Text, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {
  widthPersentage,
  heightPersentage,
  fontSizePersentage,
} from '../Commons/DeviceWHPersentage';
import MicIcon from '../Assets/Image/icon_main_mic.png';

function MicPermisson() {
  return (
    <Box flex={1} safeArea alignItems={'center'} justifyContent={'center'}>
      <Box
        width={responsiveWidth(widthPersentage(320))}
        height={responsiveHeight(heightPersentage(400))}
        style={styles.boximg}>
        <VStack>
          <Text style={styles.headerText}>서비스 이용을 위한 권한 안내</Text>
          <Box alignItems={'center'}>
            <Divider
              width={responsiveWidth(widthPersentage(251))}
              borderColor={'#a5a8ae66'}
            />
            <HStack alignItems={'center'}>
              <Box style={styles.micbg}>
                <Image
                  source={MicIcon}
                  resizeMode={'contain'}
                  style={{width: responsiveWidth(widthPersentage(24))}}
                />
              </Box>
              <VStack>
                <Text style={styles.micText}>
                  마이크{'('}선택{')'}
                </Text>
                <Text style={styles.micText2}>노래 부르기 서비스 이용</Text>
              </VStack>
            </HStack>
            <Divider width={responsiveWidth(widthPersentage(251))} />
          </Box>
          <Text style={styles.micText3}>
            • 선택적 접근권한의 허용을 동의하지 않으셨어도 해당 기능 외 서비스
            이용은 가능합니다.
          </Text>
          <Text style={styles.micText3}>
            • 접근권한은 기기 설정에서 변경 가능합니다.
          </Text>
          <HStack>
            <Button>다음에</Button>
            <Button>확인</Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({
  boximg: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.14)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 1,
  },
  headerText: {
    fontSize: responsiveFontSize(fontSizePersentage(17)),
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.11,
    textAlign: 'center',
    color: '#000000',
  },
  micText: {
    fontSize: responsiveFontSize(fontSizePersentage(14)),
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.09,
    color: '#000000',
  },
  micText2: {
    fontSize: responsiveFontSize(fontSizePersentage(13)),
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.08,
    color: '#858c92',
  },
  micText3: {
    fontSize: responsiveFontSize(fontSizePersentage(13)),
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    color: '#595d62',
  },
  micbg: {
    width: responsiveWidth(widthPersentage(36)),
    height: responsiveHeight(heightPersentage(36)),
    backgroundColor: '#e5e5ea',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
});
export default MicPermisson;
