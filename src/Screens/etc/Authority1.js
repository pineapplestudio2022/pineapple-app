import React from 'react';
import {Box, VStack, Text, Divider, HStack, Image, Button} from 'native-base';
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
} from '../../Commons/DeviceWHPersentage';
import MicIcon from '../../Assets/Image/member/02Icons24MicFill.png';

//차지하고 싶은 크기를 알고싶으면 borderwidth .
// box 는 view / div 를 사용한다.
//base 지만 react코드와 섞어써도 상관없다
//vstack은 아래로 내려가는 방향
//최상단으로 글자가 뜨는것을 방지하기위해 safearea를 준다
//divider 로 선을 만들어 경계를 생성한다.
function MicPermission() {
  return (
    <Box flex={1} safeArea alignItems={'center'} justifyContent={'center'}>
      <Box
        width={responsiveWidth(widthPersentage(320))}
        height={responsiveHeight(heightPersentage(400))}
        style={styles.boximg}>
        <VStack>
          <Text style={styles.fosize}> 서비스 이용을 위한 권한안내 </Text>

          <Box alignItems={'center'}>
            <Divider
              width={responsiveWidth(widthPersentage(251))}
              bordercolor={'rgba(165,168,174,0.4)'}
            />
            <HStack alignItems={'center'} style={styles.boximg3}>
              <Box style={styles.imgs1}>
                <Image
                  source={MicIcon}
                  style={{
                    width: responsiveWidth(widthPersentage(26)),
                    height: responsiveHeight(heightPersentage(26)),
                  }}
                  alt={' '}
                  resizeMode={'contain'}
                />
              </Box>
              <VStack>
                <Text style={styles.txt}>
                  {' '}
                  마이크{'('} 선택{')'}{' '}
                </Text>
                <Text style={styles.txt1}> 노래부르기 서비스 이용 </Text>
              </VStack>
            </HStack>
            <Divider
              width={responsiveWidth(widthPersentage(251))}
              bordercolor={'rgba(165,168,174,0.4)'}
            />
          </Box>

          <Text style={styles.txt2}>
            • 선택적 접근권한의 허용을 동의하지 않으셨어도{'\n'}
            &nbsp;&nbsp; 해당 기능 외 서비스 이용은 가능합니다.{'\n'}
            {'\n'}• 접근권한은 기기 설정에서 변경 가능합니다.
          </Text>
        </VStack>
        <Box alignItems="center" style={styles.boximg2}>
          <HStack space={10}>
            <Button style={styles.btn1}> 다음에 </Button>
            <Button style={styles.btn}> 확인 </Button>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}
('');
export default MicPermission;

const styles = StyleSheet.create({
  boximg: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.20)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 1,
  },

  boximg2: {
    justifyContent: 'space-between',
  },

  boximg3: {
    margin: 12,
  },

  imgs1: {
    width: responsiveWidth(widthPersentage(36)),
    height: responsiveHeight(heightPersentage(36)),
    backgroundColor: '#e5e5ea',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  fosize: {
    fontSize: responsiveFontSize(fontSizePersentage(17)),
    margin: 38,
    fontWeight: 'bold',
    letterSpacing: -0.11,
    textAlign: 'center',
    fontStyle: 'normal',
    lineHeight: 22,
    color: '#000000',
  },
  txt: {
    margin: 30,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 22,
    letterSpacing: -0.09,
    marginBottom: 1,
  },

  txt1: {
    fontSize: 13,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.08,
    color: '#858c92',
    marginBottom: 20,
    marginLeft: 20,
  },

  txt2: {
    marginTop: 22,
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    color: '#595d62',
    marginLeft: 35,
  },

  btn: {
    width: responsiveWidth(widthPersentage(120)),
    height: responsiveHeight(heightPersentage(40)),
    borderRadius: 6,
    backgroundColor: '#0fefbd',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    marginTop: 25,
  },

  btn1: {
    width: responsiveWidth(widthPersentage(120)),
    height: responsiveHeight(heightPersentage(40)),
    borderRadius: 6,
    backgroundColor: '#a5a8ae',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    marginTop: 25,
  },
});
