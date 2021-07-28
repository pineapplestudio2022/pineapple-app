import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {
  widthPersentage,
  heightPersentage,
} from '../../Commons/DeviceWHPersentage';
import {Divider, HStack} from 'native-base';
import MenuComponent from '../../Components/MenuComponent';

const Agreement = props => {
  return (
    <View style={styles.mainBody}>
      <MenuComponent
        name={'Agreement'}
        titleName={'회원가입'}
        navigation={props.navigation}
        notGB
      />
      {/*처음 접속시에는 스플래시 화면만->로그인 버튼을 클릭한 뒤에 로그인 화면이 나타난다. 챌린지는 Guest상태로는 불가-> 회원가입요청*/}
      {/*챌린지감상하기는 검색바 해시태그 4개 {노래,영상,편곡,연주}*/}
      <View style={styles.bgimg1} alignItems={'center'}>
        <View>
          <Text style={styles.TextStyle}>
            어쨌든 간에 약관 동의를 요청하는 말
          </Text>
        </View>

        <View>
          <Text style={styles.TextStyle2}>
            <Image
              source={require('../../Assets/Image/member/02Icons24CheckmarkCircle.png')}
              style={styles.imgsize}
            />{' '}
            약관에 전체 동의합니다
          </Text>
        </View>

        <Divider
          width={responsiveWidth(widthPersentage(355))}
          height={responsiveHeight(heightPersentage(1))}
          bordercolor={'#1a1b1c'}
          borderStyle={'solid'}
          borderWidth={0.2}
        />

        <View padding={40}>
          <Text style={styles.txt}>
            {' '}
            <Image
              source={require('../../Assets/Image/member/02Icons24CheckmarkCircleCopy.png')}
            />
            &nbsp; 개인정보 수집.이용 동의 (필수)
            <Image
              source={require('../../Assets/Image/member/02Icons24ExternalLink.png')}
            />{' '}
            {'\n'}
          </Text>

          <Text style={styles.txt}>
            {' '}
            <Image
              source={require('../../Assets/Image/member/02Icons24CheckmarkCircleCopy.png')}
            />
            &nbsp; 서비스 이용약관 동의 (필수)
            <Image
              source={require('../../Assets/Image/member/02Icons24ExternalLink.png')}
            />{' '}
            {'\n'}{' '}
          </Text>

          <Text style={styles.txt}>
            {' '}
            <Image
              source={require('../../Assets/Image/member/02Icons24CheckmarkCircleCopy.png')}
            />
            &nbsp; 광고.마케팅 수신 동의 (선택){' '}
            <Image
              source={require('../../Assets/Image/member/02Icons24ExternalLink.png')}
            />{' '}
            {'\n'}{' '}
          </Text>
        </View>

        <View></View>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => props.navigation.navigate('Register')}>
          <Text style={styles.btntxt}> 동의 </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Agreement;

const styles = StyleSheet.create({
  mainBody: {
    justifyContent: 'center',
  },

  bgimg1: {
    height: responsiveHeight(heightPersentage(620)),
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.14)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 1,
    marginLeft: 17,
    marginRight: 18,
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
    marginLeft: 109,
  },
  imgsize: {
    width: responsiveWidth(widthPersentage(36)),
    height: responsiveHeight(heightPersentage(36)),
  },

  iconsize: {
    width: responsiveWidth(widthPersentage(24)),
    height: responsiveHeight(heightPersentage(24)),
  },

  txt: {
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: -0.1,
    color: '#a5a8ae',
  },

  TextStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: -0.15,
    color: '#1a1b1c',
    marginTop: 67,
    marginBottom: 95,
    marginLeft: 20,
  },

  TextStyle2: {
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: -0.15,
    color: '#1a1b1c',
    marginBottom: 40,
  },

  buttonStyle: {
    width: responsiveWidth(widthPersentage(220)),
    height: responsiveHeight(heightPersentage(40)),
    borderRadius: 8,
    backgroundColor: '#a5a8ae',
    alignItems: 'center',
    marginTop: 8,
  },

  btntxt: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0,
    color: 'white',
    marginTop: 9,
  },
});
