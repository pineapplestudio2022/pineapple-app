import React, {useState} from 'react';
import {Alert} from 'react-native';

import {
  defaultAlertMessage,
  emailRegex,
  passwordRegex,
} from '../../../Commons/CommonUtil';
import APIKit from '../../../API/APIkit';

import RegisterPresenter from './RegisterPresenter';

const RegisterContainer = props => {
  const [email, setEmail] = useState(''); //이메일 주소
  const [password, setPassword] = useState(''); //첫번째 비밀번호
  const [rePassword, setRePassword] = useState(''); //두번째 비밀번호
  const [pMessage, setpMessage] = useState(''); //유효성 체크 메시지

  const [authEmail, setAuthEmail] = useState(false); //이메일 유효성 체크
  const [authPW, setAuthPW] = useState(false); //비밀번호 유효성 체크
  const [authPhone, setAuthPhone] = useState(false); //번호인증 유효성 체크

  const [phoneNum, setPhoneNum] = useState(''); //핸드폰 번호
  const [authNo, setAuthNo] = useState(''); //인증번호
  const [getAuthNum, setGetAuthNum] = useState(false); //인증번호 전송 체크
  const [job, setJob] = useState('0'); //default = 일반인

  const [authBtn, setAuthBtn] = useState(false); //인증번호 요청 버튼 활성화
  const [authCheckBtn, setAuthCheckBtn] = useState(false); //인증번호 확인 버튼 활성화

  const {marketing} = props.route.params; //마케팅 동의 여부

  const payload = {
    email: email.toString(),
    password: password.toString(),
    phone: '+82' + phoneNum.substring(1),
    uType: job.toString(),
    marketingPolicy: marketing.toString(),
    authNo: authNo.toString(),
  };

  const onSuccess = response => {
    // Set JSON Web Token on success
    if (__DEV__) {
      console.log(response);
    }
    if (response.data.IBcode === '1000') {
      Alert.alert('회원가입 완료', '로그인 화면으로 이동합니다', [
        {
          text: '확인',
          onPress: () => props.navigation.navigate('LoginNavigation'),
        },
      ]);
    }
  };
  const onFailure = error => {
    if (__DEV__) {
      console.log(error && error.response);
    }
  };
  //회원가입 api 요청
  const submit = async () => {
    if (__DEV__) {
      console.log(payload);
    }
    APIKit.post('/login/signup', payload).then(onSuccess).catch(onFailure);
  };

  //인증번호 전송 버튼 활성화
  const handleAuthButoon = value => {
    if (value === '' || value === undefined || value === null) {
      setAuthBtn(false);
    } else {
      setAuthBtn(true);
    }
    setPhoneNum(value);
  };

  //인증번호 요청
  const onAuthRequest = async () => {
    //인증번호 확인 버튼 활성화
    setAuthCheckBtn(true);
    setGetAuthNum(true);
    const payl = {phoneNo: '+82' + phoneNum.substring(1)};
    try {
      APIKit.post('/auth/getAuthNo', payl)
        .then(response => {
          if (__DEV__) {
            console.log(response.data);
          }
        })
        .catch(error => {
          setGetAuthNum(false);
          if (__DEV__) {
            console.log(error);
          }
        });
    } catch (e) {
      setGetAuthNum(false);
      if (__DEV__) {
        console.log(e);
      }
    }
  };

  //인증번호 유효성 체크
  const onAuthCheck = async () => {
    const payl = {authNo: authNo, phone: '+82' + phoneNum.substring(1)};
    if (__DEV__) {
      console.log(payl);
    }
    APIKit.post('/auth/submitAuthNo', payl)
      .then(response => {
        if (__DEV__) {
          console.log(response.data);
        }
        if (response.data.IBcode === '1000') {
          setAuthPhone(true);
          defaultAlertMessage('인증되었습니다.');
        }
      })
      .catch(error => {
        if (__DEV__) {
          console.log(error);
        }
      });
  };

  //email valid check
  const handleEmail = value => {
    setEmail(value);
    if (value === '' || value === undefined || value === null) {
      setpMessage('');
      setAuthEmail(false);
    } else if (emailRegex(value)) {
      setpMessage('');
      setAuthEmail(true);
    } else {
      setpMessage('올바른 이메일 형식을 입력해주세요');
      setAuthEmail(false);
    }
  };

  //password valid check
  const handlePassword = value => {
    setPassword(value);
    if (value === '' || value === undefined || value === null) {
      setpMessage('');
      setAuthPW(false);
    } else if (passwordRegex(value)) {
      setpMessage('');
    } else {
      setpMessage('영문,숫자,특수문자 1개 이상 포함');
      setAuthPW(false);
    }
  };

  //password check
  const handleRePassword = value => {
    setRePassword(value);
    if (value === '' || value === undefined || value === null) {
      setpMessage('');
      setAuthPW(false);
    } else if (value !== password) {
      setpMessage('비밀번호가 일치하지 않습니다.');
      setAuthPW(false);
    } else if (!passwordRegex(value)) {
      setpMessage('영문,숫자,특수문자 1개 이상 포함');
      setAuthPW(false);
    } else {
      setpMessage('');
      setAuthPW(true);
    }
  };

  return (
    <RegisterPresenter
      {...props}
      email={email}
      handleEmail={handleEmail}
      password={password}
      handlePassword={handlePassword}
      rePassword={rePassword}
      handleRePassword={handleRePassword}
      pMessage={pMessage}
      handleAuthButoon={handleAuthButoon}
      phoneNum={phoneNum}
      authBtn={authBtn}
      onAuthRequest={onAuthRequest}
      getAuthNum={getAuthNum}
      setAuthNo={setAuthNo}
      authNo={authNo}
      authCheckBtn={authCheckBtn}
      onAuthCheck={onAuthCheck}
      authPhone={authPhone}
      job={job}
      setJob={setJob}
      authEmail={authEmail}
      authPW={authPW}
      submit={submit}
    />
  );
};
export default RegisterContainer;
