import React from 'react';
import Signin from '../../components/common/Login';
import { JiranFullLogoIcon } from '../../components/common/JiranIcon';
import * as ENDPOINT from '../../constants/apiEndpoints';

const Login = () => {
  return (
    <Signin
      logo={<JiranFullLogoIcon width='370px' height='50px' />}
      loginEndpoint={ENDPOINT.USER_LOGIN}
      redirectEndpoint={ENDPOINT.USER_DASHBOARD}
      role='user'
    />
  );
};

export default Login;
