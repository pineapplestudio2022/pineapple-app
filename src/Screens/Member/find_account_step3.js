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
    <View style={{flex: 1}}>
      <MenuComponent
        name={'Agreement'}
        titleName={'회원가입'}
        navigation={props.navigation}
        notGB
      />
      <View style={{alignItems: 'center'}}>
        <ImageBackground
          source={require('../../Assets/Image/member/Login3-1.png')}
          style={styles.bgimg1}>
          <View style={styles.dotView}>
            <HStack space={2}>
              <Text style={styles.dot}></Text>
              <Text style={styles.dot}></Text>
              <Text style={styles.dot1}></Text>
            </HStack>
          </View>
          <View>
            <Text style={styles.TextStyle}> 사용하실 암호를 입력해주세요 </Text>
          </View>

          <View style={styles.SectionStyle}>
            <Image
              source={require('../../Assets/Image/member/key.png')}
              style={styles.buttonImageIconStyle}
            />
            <TextInput
              style={{flex: 1}}
              placeholder="PW"
              placeholderTextColor="#a5a8ae"
              autoCapitalize="none"
              secureTextEntry={true}
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
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => props.navigation.navigate('MainScreen')}>
              <Text style={styles.buttonTextStyle}> 완 료 </Text>
            </TouchableOpacity>
          </SafeAreaView>
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
    borderRadius: 20,
    marginTop: 50,
    overflow: 'hidden',
    borderRadius: 20,
    overflow: 'hidden',
  },

  aimg: {
    marginTop: 62,
    marginLeft: 42,
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.11,
    margin: 55,
    flexDirection: 'row',
    margin: 60,
  },

  txt1: {
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.11,
    marginLeft: 60,
  },

  SectionStyle: {
    flexDirection: 'row',
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    margin: -20,
    borderRadius: 6,
    backgroundColor: '#fafafab3',
  },

  TextStyle: {
    flexDirection: 'row',
    margin: 60,
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: -0.11,
  },

  buttonImageIconStyle: {
    padding: 12,
    margin: 7,
    width: responsiveWidth(widthPersentage(20)), //20,
    height: 1,
    alignItems: 'center',
  },

  buttonStyle: {
    width: responsiveWidth(widthPersentage(240)),
    height: 40,
    borderRadius: 8,
    backgroundColor: '#0fefbd',
    marginTop: 90,
    margin: 50,
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
    marginTop: 30,
  },

  dot1: {
    width: 10,
    height: 10,
    backgroundColor: '#0fefbd',
    marginTop: 30,
    borderRadius: 6,
    overflow: 'hidden',
  },

  dotView: {
    marginLeft: 140,
    marginRight: 140,
  },
});
