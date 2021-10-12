import React, {useState, useContext} from 'react';
import {defaultAlertMessage} from '../../../Commons/CommonUtil';
import APIKit from '../../../API/APIkit';
import {UserDispatch} from '../../../Commons/UserDispatchProvider';
import LoginPresenter from './LoginPresenter';

const LoginContainer = props => {
  const {dispatch} = useContext(UserDispatch);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const payload = {
    email: signInEmail.toString(),
    password: signInPassword.toString(),
  };

  const submit = async () => {
    setLoading(true);
    await APIKit.post('/login/signIn', payload)
      .then(({data}) => {
        setLoading(false);
        if (data.IBcode === '2001') {
          defaultAlertMessage('존재하지 않는 이메일입니다.');
          return;
        }
        if (data.IBcode === '2002') {
          defaultAlertMessage('비밀번호가 맞지않습니다.');
          return;
        }
        dispatch({
          type: 'SIGN_IN',
          userId: data.IBparams.userId,
          email: data.IBparams.email,
          token: data.IBparams.token,
        });
        props.navigation.navigate('Home');
      })
      .catch(error => {
        setLoading(false);
        if (__DEV__) {
          console.log(error);
        }
      });
  };

  return (
    <LoginPresenter
      {...props}
      loading={loading}
      signInEmail={signInEmail}
      setSignInEmail={setSignInEmail}
      setSignInPassword={setSignInPassword}
      signInPassword={signInPassword}
      submit={submit}
    />
  );
};
export default LoginContainer;
