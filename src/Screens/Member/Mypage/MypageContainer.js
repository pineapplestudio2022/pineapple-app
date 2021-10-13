import React, {useContext, useEffect, useState} from 'react';

import {passwordRegex} from '../../../Commons/CommonUtil';
import APIKit from '../../../API/APIkit';
import {UserDispatch} from '../../../Commons/UserDispatchProvider';
import MypagePresenter from './MypagePresenter';
import {Alert} from 'react-native';

const MypageContainer = props => {
  const {userId} = useContext(UserDispatch);
  const [email, setEmail] = useState('');
  const [uType, setUType] = useState('1');
  const [marketingPolicy, setMarketingPolicy] = useState(['1', '2']);

  const [password, setPassword] = useState(''); //첫번째 비밀번호
  const [rePassword, setRePassword] = useState(''); //두번째 비밀번호
  const [pMessage, setpMessage] = useState(''); //유효성 체크 메시지
  const [authPW, setAuthPW] = useState(false); //비밀번호 유효성 체크

  useEffect(() => {
    const getAccountInfo = async () => {
      const payload = {userId: userId.toString()};
      await APIKit.post('login/getAccountInfo', payload)
        .then(({data}) => {
          if (data.IBcode === '1000') {
            setEmail(data.IBparams.user.email);
            setUType(data.IBparams.user.uType.toString());
            if (data.IBparams.user.marketing_policy.toString() === '1') {
              setMarketingPolicy(['1', '2', '3']);
            }
          }
        })
        .catch(error => {
          if (__DEV__) {
            console.log(error);
          }
        });
    };

    getAccountInfo();
    return () => {
      if (__DEV__) {
        console.log('unmount');
      }
    };
  }, [userId]);

  const modifyAccountInfo = () => {
    const payload = {
      email: email.toString(),
      uType: uType.toString(),
      marketingPolicy: marketingPolicy.indexOf('3') === -1 ? '0' : '1',
      password: password,
    };
    if (__DEV__) {
      console.log(payload);
    }
    APIKit.post('/login/modifyAccountInfo', payload)
      .then(({data}) => {
        if (__DEV__) {
          console.log(data);
        }
        Alert.alert('Pineapple', '변경이 완료되었습니다.', [
          {
            text: '확인',
            onPress: () =>
              props.navigation.reset({
                index: 0,
                routes: [{name: 'DrawerNavigation'}],
              }),
          },
        ]);
      })
      .catch(error => {
        if (__DEV__) {
          console.log(error);
        }
      });
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
    <MypagePresenter
      {...props}
      email={email}
      password={password}
      handlePassword={handlePassword}
      rePassword={rePassword}
      handleRePassword={handleRePassword}
      pMessage={pMessage}
      uType={uType}
      setUType={setUType}
      marketingPolicy={marketingPolicy}
      setMarketingPolicy={setMarketingPolicy}
      authPW={authPW}
      modifyAccountInfo={modifyAccountInfo}
    />
  );
};

export default MypageContainer;
