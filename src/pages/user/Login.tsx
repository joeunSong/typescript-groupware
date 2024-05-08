import React from 'react';
import SignIn from '../../components/common/Login';
import { JiranFullLogoIcon } from '../../components/common/JiranIcon';
import * as ENDPOINT from '../../constants/apiEndpoints';

const LoginLayout = () => {
  return (
    <SignIn
      logo={<JiranFullLogoIcon width='370px' height='50px' />}
      loginEndpoint={ENDPOINT.USER_LOGIN}
      redirectEndpoint={ENDPOINT.USER_DASHBOARD}
      role='user'
    />
  );
};

export default LoginLayout;
