import React, {useState} from 'react';
import {passwordRegex} from '../../../Commons/CommonUtil';
import APIKit from '../../../API/APIkit';
import AccountFindFourPresenter from './AccountFindFourPresenter';

const AccountFindFourContainer = props => {
  const {email} = props.route.params;
  const [password, setPassword] = useState(''); //첫번째 비밀번호
  const [rePassword, setRePassword] = useState(''); //두번째 비밀번호
  const [pMessage, setpMessage] = useState(''); //유효성 체크 메시지
  const [authPW, setAuthPW] = useState(false); //비밀번호 유효성 체크

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
  const payload = {
    email: email,
    password: password,
  };

  const onSuccess = response => {
    if (__DEV__) {
      console.log(response);
    }
    if (response.data.IBcode === '1000') {
      props.navigation.navigate('FindAccount5');
    }
  };
  const onFailure = error => {
    if (__DEV__) {
      console.log(error && error.response);
    }
  };
  const resetPassword = () => {
    APIKit.post('/login/resetPassword', payload)
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <AccountFindFourPresenter
      {...props}
      password={password}
      handlePassword={handlePassword}
      rePassword={rePassword}
      handleRePassword={handleRePassword}
      pMessage={pMessage}
      authPW={authPW}
      resetPassword={resetPassword}
    />
  );
};
export default AccountFindFourContainer;
