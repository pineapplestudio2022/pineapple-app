import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  heightPersentage,
  widthPersentage,
} from '../../Commons/DeviceWHPersentage';
import {HStack, Button} from 'native-base';

const Findpw = props => {
  return (
    <View style={styles.mainbody}>
      <View style={(styles.alignItems = 'center')}></View>
      <View>
        {/* 아이콘 텍스트 일자정렬 */}
        <HStack>
          <Image
            source={require('../../Assets/Image/member/Arrow1.png')}
            marginLeft={22}
          />
          <Text style={styles.txt1}>{'          '} 계정찾기 </Text>
        </HStack>

        <ImageBackground
          source={require('../../Assets/Image/member/Login3-1.png')}
          style={styles.bgimg1}>
          <View style={styles.Vstyle}>
            <HStack space={2}>
              <Text style={styles.dot1}></Text>
              <Text style={styles.dot}></Text>
              <Text style={styles.dot}></Text>
            </HStack>
            <Text style={styles.TextStyle}> 아이디는 아래와 같습니다.</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.TextStyle1}>user@gmail.com</Text>
          </View>
          <View>
            <Text style={styles.TextStyle2}>
              {' '}
              로그인 암호를 분실하셨다면,{'\n'} 메일 인증 절차를 진행해주세요.{' '}
            </Text>
          </View>

          <SafeAreaView>
            <HStack space={10}>
              <Button
                onPress={() => props.navigation.navigate('Login')}
                style={styles.buttonTextStyle}>
                로그인
              </Button>
              <Button
                onPress={() => props.navigation.navigate('FindAccount3')}
                style={styles.buttonTextStyle}>
                인증메일
              </Button>
            </HStack>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </View>
  );
};
export default Findpw;

const styles = StyleSheet.create({
  mainbody: {
    flex: 1,
    justifyContent: 'center',
  },

  txt1: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.11,
    color: '#1a1b1c',
    margin: 0,
    marginLeft: 90,
    marginBottom: 120,
  },

  aimg: {
    marginLeft: 22,
  },

  Vstyle: {
    alignItems: 'center',
    shadowColor: 'rgba(133, 140, 146, 0.2)',
  },

  bgimg1: {
    width: responsiveWidth(widthPersentage(350)),
    height: responsiveHeight(heightPersentage(500)),
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: -27,
    shadowColor: 'rgba(133, 140, 146, 0.2)',
    shadowRadius: 10,
    shadowOpacity: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },

  container: {
    width: responsiveWidth(widthPersentage(240)),
    height: 114,
    borderRadius: 8,
    backgroundColor: '#a5a8ae',
  },
  contxt: {
    color: 'white',
    margin: 0,
    fontWeight: 'bold',
  },

  TextStyle: {
    flexDirection: 'row',
    margin: 30,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -0.11,
  },

  TextStyle1: {
    fontSize: 17,
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.11,
    color: 'white',
    textAlign: 'center',
    padding: 42,
  },

  TextStyle2: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 26,
    letterSpacing: -0.11,
    padding: 22,
  },

  buttonTextStyle: {
    width: responsiveWidth(widthPersentage(130)),
    height: responsiveHeight(heightPersentage(45)),
    backgroundColor: '#0fefbd',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1.78,
    textAlign: 'center',
    color: '#fafafa',
    borderRadius: 6,
    marginTop: 72,
  },

  fixbtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  dot: {
    width: 10,
    height: 10,
    opacity: 0.3,
    backgroundColor: '#0fefbd',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 20,
  },

  dot1: {
    width: 10,
    height: 10,
    backgroundColor: '#0fefbd',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 20,
  },
});
