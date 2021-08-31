import React from 'react';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  fontSizePersentage,
  heightPersentage,
  widthPersentage,
} from '../../Commons/DeviceWHPersentage';
import {Box, HStack, Image, Input, ScrollView, Text, VStack} from 'native-base';
import MenuComponent from '../../Components/MenuComponent';
import {BlurView} from '@react-native-community/blur';
import CharacterIcon from '../../Assets/Image/member/icon_login_character.png';
import EmailIcon from '../../Assets/Image/member/icon_login_email_gray.png';
import KeyIcon from '../../Assets/Image/member/icon_login_key_gray.png';
import Gbutton from '../../Components/GbuttonComponent';
import {TouchableOpacity} from 'react-native';
import APIKit, {cleanClientToken, setClientToken} from '../../API/APIkit';
import {UserDispatch} from '../../Commons/UserDispatchProvider';
import {useContext} from 'react';

const Login = props => {
  const [signInEmail, setSignInEmail] = React.useState('');
  const [signInPassword, setSignInPassword] = React.useState('');

  const payload = {
    email: signInEmail,
    password: signInPassword,
  };

  const {userId, dispatch} = useContext(UserDispatch);

  const onSuccess = ({data}) => {
    if (data.IBcode == '2001') {
      //db data 없음
      console.log('회원정보 없음');
      return;
    }
    if (data.IBcode == '2001') {
      //db data 없음
      console.log('회원정보 틀림');
      return;
    }
    // Set JSON Web Token on success
    setClientToken(data.IBparams.token);
    dispatch({
      type: 'SIGN_IN',
      userId: data.IBparams.userId,
      token: data.IBparams.token,
    });
    props.navigation.navigate('MainScreen');
  };
  const onFailure = error => {
    console.log(error && error.response);
  };

  const submit = async () => {
    await APIKit.post('/login/signIn', payload)
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <Box flex={1}>
      <MenuComponent
        name={'Login'}
        titleName={'파인애플스튜디오'}
        navigation={props.navigation}
        notGB
      />
      <ScrollView>
        <Box
          alignItems={'center'}
          style={{
            marginTop: 50,
            shadowColor: '#858c9233',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 4,
            shadowOpacity: 1,
          }}>
          <Box
            style={{
              width: responsiveWidth(widthPersentage(350)),
              height: responsiveHeight(heightPersentage(500)),
              borderRadius: 20,
              overflow: 'hidden',
            }}>
            <BlurView
              style={{
                width: '100%',
                height: '100%',
              }}
              blurType="xlight"
              blurAmount={100}
              reducedTransparencyFallbackColor="white">
              <VStack alignItems={'center'} space={6}>
                <Image
                  source={CharacterIcon}
                  resizeMode={'contain'}
                  style={{width: responsiveWidth(widthPersentage(50))}}
                  alt={' '}
                  mt={8}
                />
                <Text
                  textAlign={'center'}
                  fontSize={responsiveFontSize(fontSizePersentage(17))}
                  color={'#000000'}>
                  당신만의 음악세상을 {'\n'} 선물합니다.
                </Text>
                <Input
                  width={responsiveWidth(widthPersentage(300))}
                  rounded={8}
                  backgroundColor={'#fafafab3'}
                  borderWidth={0}
                  placeholder={'Email'}
                  autoFocus
                  onChangeText={text => setSignInEmail(text)}
                  value={signInEmail}
                  InputLeftElement={
                    <Image
                      alt={' '}
                      source={EmailIcon}
                      resizeMode={'contain'}
                      style={{
                        width: responsiveWidth(widthPersentage(25)),
                        marginLeft: 13,
                      }}
                    />
                  }
                />
                <Input
                  width={responsiveWidth(widthPersentage(300))}
                  rounded={8}
                  backgroundColor={'#fafafab3'}
                  borderWidth={0}
                  type={'password'}
                  placeholder={'PW'}
                  onChangeText={text => setSignInPassword(text)}
                  value={signInPassword}
                  InputLeftElement={
                    <Image
                      alt={' '}
                      source={KeyIcon}
                      resizeMode={'contain'}
                      style={{
                        width: responsiveWidth(widthPersentage(25)),
                        marginLeft: 13,
                      }}
                    />
                  }
                />
                <Gbutton
                  wp={220}
                  hp={40}
                  fs={18}
                  fw={600}
                  rounded={8}
                  text={'LOG IN'}
                  onPress={submit}
                />
              </VStack>
              <HStack justifyContent={'space-around'} mt={4} mx={10}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('MemberScreen')}>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(16))}
                    fontWeight={600}
                    color={'#0fefbd'}>
                    회원가입 →
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('FindAccount1')}>
                  <Text
                    fontSize={responsiveFontSize(fontSizePersentage(16))}
                    fontWeight={600}
                    color={'#0fefbd'}>
                    계정찾기 →
                  </Text>
                </TouchableOpacity>
              </HStack>
            </BlurView>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};
export default Login;
