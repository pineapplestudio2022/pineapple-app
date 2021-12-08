import React from 'react';
import BgmStudioPresenter from './BgmStudioPresenter';

const BgmStudioContainer = props => {
  const [whereUse, setWhereUse] = React.useState('');
  return (
    <BgmStudioPresenter
      {...props}
      whereUse={whereUse}
      setWhereUse={setWhereUse}
    />
  );
};

export default BgmStudioContainer;
