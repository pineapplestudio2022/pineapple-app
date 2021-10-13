// My Challenge View

import React, {useContext} from 'react';

import {UserDispatch} from '../../../Commons/UserDispatchProvider';
import {defaultAlertMessage} from '../../../Commons/CommonUtil';
import MyChallengeListPresenter from './MyChallengeListPresenter';

const MyChallengeListContainer = props => {
  const {userId} = useContext(UserDispatch);
  const loginChecktoMove = navigation => {
    if (userId === '' || userId === undefined) {
      defaultAlertMessage('로그인 후 사용가능합니다.');
      return;
    }
    props.navigation.navigate(navigation);
  };

  return (
    <MyChallengeListPresenter {...props} loginChecktoMove={loginChecktoMove} />
  );
};

export default MyChallengeListContainer;
