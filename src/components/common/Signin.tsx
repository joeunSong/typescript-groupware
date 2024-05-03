import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { JiranFullLogoIcon } from '../JiranIcon';
import ApiClient from '../../utils/axios';
import * as ENDPOINT from '../../constants/apiEndpoints';
import { ACCESS_TOKEN } from '../../constants/constant';
import { redirect } from 'react-router-dom';

const Signin = () => {
  const [isError, setIsError] = useState<boolean>(false);

  const handleLogin = async () => {
    const { instance } = ApiClient;
    const response = await instance.get(ENDPOINT.USER_LOGIN);
    // 임시 구성
    if (response.status === 200) {
      const _localStorageJson = JSON.stringify({
        value: response.data.access_token,
        expiry: new Date().getTime() + 60 * 1000 * 1000 * 2,
      });
      localStorage.setItem(ACCESS_TOKEN, _localStorageJson);

      if (response.data.role === 'manager') {
        return redirect(ENDPOINT.MANAGER_DASHBOARD);
      } else {
        return redirect(ENDPOINT.USER_DASHBOARD);
      }
    } else {
      setIsError(true); // axios에서 에러처리 논의
    }
  };

  return (
    <div className='flex flex-col gap-[17px] items-center justify-center h-screen'>
      <JiranFullLogoIcon width='370px' height='50px' />
      <h1 className='font-h1'>로그인</h1>
      <TextField
        label='아이디'
        variant='outlined'
        size='medium'
        className='w-[300px]'
        placeholder='아이디'
        required
      />
      <TextField
        label='비밀번호'
        variant='outlined'
        size='medium'
        className='w-[300px]'
        type='password'
        autoComplete='current-password'
        placeholder='비밀번호'
        required
      />
      <span hidden={!isError} className='text-[#ff0000] font-placeholder'>
        아이디 또는 비밀번호가 일치하지 않습니다.
      </span>
      <Button className='text-white w-[300px] bg-primary' onClick={handleLogin}>
        로그인
      </Button>
    </div>
  );
};

export default Signin;
