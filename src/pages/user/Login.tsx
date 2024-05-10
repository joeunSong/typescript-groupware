import { default as CommonLogin } from '../../components/common/Login';
import { JiranFullLogoIcon } from '../../components/common/JiranIcon';
import React from 'react';

const UserLoginLayout = () => {
  return <CommonLogin logo={<JiranFullLogoIcon width='370px' height='50px' />} role='user' />;
};

export default UserLoginLayout;
