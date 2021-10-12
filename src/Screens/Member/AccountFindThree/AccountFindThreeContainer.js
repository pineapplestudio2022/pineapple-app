import React, {useState} from 'react';

import {defaultAlertMessage} from '../../../Commons/CommonUtil';
import APIKit from '../../../API/APIkit';
import AccountFindThreePresenter from './AccountFindThreePresenter';

const AccountFindThreeContainer = props => {
  const {email} = props.route.params;

  const [phoneNum, setPhoneNum] = useState(); //핸드폰번호
  const [authNum, setAuthNum] = useState(); //인증번호
  const [authPhone, setAuthPhone] = useState(false); //번호인증 완료 체크
  const [getAuthNum, setGetAuthNum] = useState(false); //인증번호 전송 체크
  const [nextBtn, setNextBtn] = useState(false);

  //인증번호 요청
  const onAuthRequest = async () => {
    setGetAuthNum(true);
    const payload = {phoneNo: '+82' + phoneNum.substring(1)};
    try {
      APIKit.post('/auth/getAuthNo', payload)
        .then(response => {
          if (__DEV__) {
            console.log(response.data);
          }
        })
        .catch(error => {
          if (__DEV__) {
            console.log(error);
          }
        });
    } catch (e) {
      if (__DEV__) {
        console.log(e);
      }
    }
  };

  //인증번호 유효성 체크
  const onAuthCheck = async () => {
    const payload = {authNo: authNum, phone: '+82' + phoneNum.substring(1)};
    if (phoneNum === '') {
      defaultAlertMessage('전화번호를 입력해주세요.');
      return;
    }
    if (authNum === '') {
      defaultAlertMessage('인증번호를 입력해주세요.');
      return;
    }
    if (__DEV__) {
      console.log(payload);
    }
    APIKit.post('/auth/submitAuthNo', payload)
      .then(({data}) => {
        if (__DEV__) {
          console.log(data);
        }
        if (data.IBcode === '1000') {
          defaultAlertMessage('인증되었습니다');
          setAuthPhone(true);
          setNextBtn(true);
        } else if (data.IBdetail) {
          defaultAlertMessage(data.IBdetail);
        }
      })
      .catch(error => {
        if (__DEV__) {
          console.log(error);
        }
      });
  };
  return (
    <AccountFindThreePresenter
      {...props}
      phoneNum={phoneNum}
      nextBtn={nextBtn}
      setPhoneNum={setPhoneNum}
      getAuthNum={getAuthNum}
      onAuthRequest={onAuthRequest}
      authNum={authNum}
      setAuthNum={setAuthNum}
      onAuthCheck={onAuthCheck}
      email={email}
    />
  );
};
export default AccountFindThreeContainer;
