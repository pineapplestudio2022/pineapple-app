import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  heightPersentage,
  widthPersentage,
} from '../../Commons/DeviceWHPersentage';
import {HStack} from 'native-base';
import MenuComponent from '../../Components/MenuComponent';

const Fnnum2 = props => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  return (
    <View style={{flex: 1}}>
      <MenuComponent
        name={'Agreement'}
        titleName={'회원가입'}
        navigation={props.navigation}
        notGB
      />
      <View>
        <ImageBackground
          source={require('../../Assets/Image/member/Login3-1.png')}
          style={styles.bgimg1}>
          <HStack space={2}>
            <Text style={styles.dot1}></Text>
            <Text style={styles.dot}></Text>
            <Text style={styles.dot}></Text>
          </HStack>
          <View>
            <Text style={styles.TextStyle}>
              {' '}
              가입시 등록하신 연락처로{'\n'}
              {'   '} 본인인증을 진행합니다.{' '}
            </Text>
          </View>

          <View style={styles.SectionStyle}>
            <Image
              source={require('../../Assets/Image/member/24Call.png')}
              style={styles.buttonImageIconStyle}
            />
            <TextInput
              style={{flex: 1}}
              placeholder="전화번호"
              placeholderTextColor="#a5a8ae"
              autoCapitalize="none"
              underlineColorIos="transparent"
            />
            <TouchableOpacity style={styles.InbtnStyle}>
              <Text style={styles.IntxtStyle}> 인증번호</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.SectionStyle}>
            <Image
              source={require('../../Assets/Image/member/24Secure.png')}
              style={styles.buttonImageIconStyle}
            />
            <TextInput
              style={{flex: 1}}
              placeholder="인증번호"
              placeholderTextColor="#a5a8ae"
              autoCapitalize="none"
              secureTextEntry={true}
              underlineColorIos="transparent"
            />
            <TouchableOpacity style={styles.InbtnStyle}>
              <Text style={styles.IntxtStyle}>확인</Text>
            </TouchableOpacity>
          </View>

          <SafeAreaView>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => props.navigation.navigate('FindAccount2')}>
              <Text style={styles.buttonTextStyle}> 다 음 </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </View>
  );
};
export default Fnnum2;

const styles = StyleSheet.create({
  bgimg1: {
    width: responsiveWidth(widthPersentage(350)),
    height: responsiveHeight(heightPersentage(460)),
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 50,
    marginRight: 20,
    shadowColor: 'rgba(133, 140, 146, 0.2)',
    shadowRadius: 10,
    shadowOpacity: 1,
    borderRadius: 20,
    overflow: 'hidden',
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
    marginBottom: 88,
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    marginLeft: 20,
    marginRight: 25,
    margin: -20,
    borderRadius: 6,
    backgroundColor: '#fafafab3',
  },

  TextStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 15,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: -0.11,
  },

  fixbtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 12,
    marginTop: 40,
  },

  buttonImageIconStyle: {
    padding: 12,
    margin: 7,
    width: 20,
    height: 1,
    alignItems: 'center',
  },
  buttonStyle: {
    width: responsiveWidth(widthPersentage(220)),
    height: 43,
    margin: 90,
    marginLeft: 45,
    marginRight: 60,
  },

  buttonTextStyle: {
    width: '100%',
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 2,
    textAlign: 'center',
    backgroundColor: '#0fefbd',
    color: '#fff',
    paddingVertical: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },

  IntxtStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0.5,
    textAlign: 'center',
    color: 'white',
    marginTop: 4,
  },

  InbtnStyle: {
    width: responsiveWidth(widthPersentage(70)), //70,
    height: 26,
    marginRight: 10,
    borderRadius: 3,
    backgroundColor: '#0fefbd',
    marginTop: 6,
    textAlign: 'center',
  },

  btntext1: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    color: '#0fefbd',
  },
  btntext2: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    textAlign: 'right',
    color: '#a5a8ae',
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
