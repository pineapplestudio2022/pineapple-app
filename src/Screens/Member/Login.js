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

const Findch = props => {
  return (
    <View>
      <View>
        <MenuComponent
          name={'Login'}
          titleName={'파인애플스튜디오'}
          navigation={props.navigation}
          notGB
        />
        <ImageBackground
          source={require('../../Assets/Image/member/NewLogin.png')}
          style={styles.bgimg1}>
          <View style={styles.bgimg1}>
            <Image
              source={require('../../Assets/Image/member/ppap.png')}
              style={styles.bgimg2}
            />
            <HStack>
              <Text style={styles.TextStyle}>
                {' '}
                당신만의 음악세상을 {'\n'} 선물합니다{' '}
              </Text>
            </HStack>

            <View style={styles.SectionStyle}>
              <Image
                source={require('../../Assets/Image/member/0224Email.png')}
                style={styles.buttonImageIconStyle}
              />
              <TextInput
                style={{flex: 1}}
                placeholder="Email"
                placeholderTextColor="#a5a8ae"
                autoCapitalize="none"
                underlineColorIos="transparent"
              />
            </View>
            <View style={styles.SectionStyle}>
              <Image
                source={require('../../Assets/Image/member/key.png')}
                style={styles.buttonImageIconStyle}
              />
              <TextInput
                style={{flex: 1}}
                placeholder="PW check"
                placeholderTextColor="#a5a8ae"
                autoCapitalize="none"
                secureTextEntry={true}
                underlineColorIos="transparent"
              />
            </View>
            <SafeAreaView>
              <TouchableOpacity style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}> LogIn </Text>
              </TouchableOpacity>
            </SafeAreaView>

            <HStack padding={5}>
              <Text style={styles.Tbtn1}> 회원가입 </Text>
              <Image
                source={require('../../Assets/Image/member/grRightArrow.png')}
                style={styles.aimg}
              />

              <TouchableOpacity
                onPress={() => props.navigation.navigate('FindAccount1')}>
                <Text style={styles.Tbtn2}>계정찾기</Text>
              </TouchableOpacity>
              <Image source={require('../../Assets/Image/member/fill.png')} />
            </HStack>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};
export default Findch;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
  },

  bgimg1: {
    width: responsiveWidth(widthPersentage(350)),
    height: responsiveHeight(heightPersentage(500)),
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    shadowColor: 'rgba(133, 140, 146, 0.2)',
    shadowRadius: 10,
    shadowOpacity: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },

  bgimg2: {
    alignContent: 'center',
  },

  txt1: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.11,
    marginTop: 70,
    marginLeft: 109,
    marginBottom: 100,
  },

  SectionStyle: {
    width: responsiveWidth(widthPersentage(290)),
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 12,
    borderRadius: 6,
    backgroundColor: '#fafafab3',
  },

  TextStyle: {
    flexDirection: 'row',
    marginTop: 50,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: -0.11,
  },

  buttonImageIconStyle: {
    padding: 12,
    margin: 7,
    width: responsiveWidth(widthPersentage(20)), //20,
    height: 2,
    alignItems: 'center',
  },

  buttonStyle: {
    width: responsiveWidth(widthPersentage(240)),
    height: 40,
    borderRadius: 8,
    backgroundColor: '#0fefbd',
    marginTop: 20,
  },

  buttonTextStyle: {
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 2,
    textAlign: 'center',
    color: '#fafafa',
    paddingVertical: 10,
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

  Tbtn1: {
    color: '#0fefbd',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'right',
    color: '#0fefbd',
  },
  Tbtn2: {
    color: 'grey',
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'right',
  },

  aimg: {
    marginRight: 92,
  },
});
