import React from 'react';
import AccountFindTwoPresenter from './AccountFindTwoPresenter';

const AccountFindTwoContainer = props => {
  const email = props.route.params.email;
  return <AccountFindTwoPresenter {...props} email={email} />;
};
export default AccountFindTwoContainer;
