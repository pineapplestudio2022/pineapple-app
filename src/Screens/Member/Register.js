import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {HStack, ScrollView} from 'native-base';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import {Radio, RadioGroup} from 'react-radio-group';
import {
  heightPersentage,
  widthPersentage,
} from '../../Commons/DeviceWHPersentage';
import MenuComponent from '../../Components/MenuComponent';

//import FontAwesomeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
//fontawesome 뒤 특정 페이지 아이콘을 임포트할 경우 react-native-icons/뒤에 요소만 바꿔준다.

const Register = props => {
  return (
    <View style={styles.mainBody}>
      <MenuComponent
        name={'Agreement'}
        titleName={'회원가입'}
        navigation={props.navigation}
        notGB
      />
      <ScrollView>
        <View style={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../Assets/Image/member/SignUp-1.png')}
              style={styles.imgStyle}
            />
          </View>
          <View style={styles.SectionStyle1}>
            <Text style={styles.Txtstyle}>계정정보</Text>
          </View>

          <View style={styles.SectionStyle2}>
            <Image
              source={require('../../Assets/Image/member/0224Email.png')}
              style={styles.buttonImageIconStyle}
            />
            <TextInput
              style={{flex: 1}}
              placeholder="Email"
              placeholderTextColor="#a5a8ae"
            />
          </View>

          <View style={styles.SectionStyle2}>
            <Image
              source={require('../../Assets/Image/member/key.png')}
              style={styles.buttonImageIconStyle}
            />
            <TextInput
              style={{flex: 1}}
              placeholder="PW"
              placeholderTextColor="#a5a8ae"
              keyboardType="default"
              secureTextEntry={true}
              underlineColorIos="transparent"
            />
          </View>

          <View style={styles.SectionStyle2}>
            <Image
              source={require('../../Assets/Image/member/key.png')}
              style={styles.buttonImageIconStyle}
            />
            <TextInput
              style={{flex: 1}}
              placeholder="PW check"
              placeholderTextColor="#a5a8ae"
              keyboardType="default"
              secureTextEntry={true}
              underlineColorIos="transparent"
            />
          </View>

          <View style={styles.SectionStyle1}>
            <Text style={styles.Txtstyle}>본인 인증</Text>
          </View>

          <View style={styles.SectionStyle2}>
            <Image
              source={require('../../Assets/Image/member/0224call.png')}
              style={styles.buttonImageIconStyle}
            />
            <TextInput
              style={{flex: 1}}
              placeholder="전화번호"
              placeholderTextColor="#a5a8ae"
              autoCapitalize="sentences"
              underlineColorIos="transparent"
            />
            <TouchableOpacity style={styles.InbtnStyle}>
              <Text style={styles.IntxtStyle}>인증번호</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.SectionStyle2}>
            <Image
              source={require('../../Assets/Image/member/0224lock.png')}
              style={styles.buttonImageIconStyle}
            />
            <TextInput
              style={{flex: 1}}
              placeholder="인증번호"
              placeholderTextColor="#a5a8ae"
              autoCapitalize="sentences"
              underlineColorIos="transparent"
            />
            <TouchableOpacity style={styles.InbtnStyle}>
              <Text style={styles.IntxtStyle}>확인</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.SectionStyle1}>
            <Text style={styles.Txtstyle}>회원 구분</Text>
          </View>

          <View style={styles.SectionStyle3}>
            <TouchableOpacity onPress={() => {}} style={styles.radioButton}>
              <View style={styles.radioButtonIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.radioButtonText}>일반인</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.radioButton}>
              <View style={styles.radioButtonIcon2} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.radioButtonText}>실연자</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.radioButton}>
              <View style={styles.radioButtonIcon2} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.radioButtonText}>퍼포먼서</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.SectionStyle4}>
            <TouchableOpacity onPress={() => {}} style={styles.radioButton}>
              <View style={styles.radioButtonIcon2} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.radioButtonText}>작사가</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.radioButton}>
              <View style={styles.radioButtonIcon2} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.radioButtonText}>연습생</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.radioButton}>
              <View style={styles.radioButtonIcon2} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.radioButtonText}>엔지니어</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.SectionStyle5}>
            <TouchableOpacity onPress={() => {}} style={styles.radioButton}>
              <View style={styles.radioButtonIcon2} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.radioButtonText}>작곡가</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={styles.radioButton}>
              <View style={styles.radioButtonIcon2} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.radioButtonText}>인플루언서</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default Register;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
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
    marginTop: 70,
  },

  txt2: {
    marginRight: 12,
  },

  SectionStyle1: {
    flexDirection: 'row',
    margin: 25,
    marginLeft: 63,
  },

  SectionStyle2: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 45,
    marginRight: 45,
    margin: 8,
    backgroundColor: '#fafafab3',
    borderRadius: 8,
  },

  SectionStyle3: {
    flexDirection: 'row',
    marginLeft: 53,
    justifyContent: 'flex-start',
    margin: 8,
  },

  SectionStyle4: {
    flexDirection: 'row',
    marginLeft: 53,
    justifyContent: 'flex-start',
    margin: 8,
  },
  SectionStyle5: {
    flexDirection: 'row',
    marginLeft: 53,
    justifyContent: 'flex-start',
    margin: 8,
  },

  buttonStyle: {
    color: 'white',
    width: responsiveWidth(widthPersentage(250)), //'70%',
    height: responsiveHeight(heightPersentage(43)), //40,
    alignItems: 'center',
    marginLeft: 65,
    marginRight: 45,
    borderRadius: 6,
    marginTop: 16,
    backgroundColor: '#0fefbd',
  },

  buttonTextStyle: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '600',
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#dadae8',
    borderRadius: 10,
    backgroundColor: '#fafafab3',
  },
  InbtnStyle: {
    width: 70,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#0fefbd',
    margin: 3,
    marginRight: 9,
  },
  IntxtStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 26,
    textAlign: 'center',
    color: '#ffffff',
  },

  imgStyle: {
    width: responsiveWidth(widthPersentage(370)), //'90%',
    height: responsiveHeight(heightPersentage(750)), //650,
    resizeMode: 'cover',
    position: 'absolute',
    borderRadius: 20,
  },

  buttonImageIconStyle: {
    padding: 8,
    margin: 4,
  },
  radioButton: {
    width: responsiveWidth(widthPersentage(20)), //20,
    height: responsiveHeight(heightPersentage(20)), //20,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#a5a8ae',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 7,
    marginLeft: 10,
  },
  radioButtonIcon: {
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: '#a4ffd8fd',
  },
  radioButtonIcon2: {
    height: 13,
    width: 13,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    shadowColor: '#a5a8ae',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
  },

  radioButtonText: {
    fontSize: 15,
    marginLeft: 11,
    color: 'grey',
  },

  Txtstyle: {
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: -0.11,
  },
});
