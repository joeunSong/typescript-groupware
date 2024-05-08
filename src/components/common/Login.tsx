import React, { FormEvent, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import ApiClient from '../../utils/axios';
import * as ENDPOINT from '../../constants/apiEndpoints';
import { ACCESS_TOKEN } from '../../constants/constant';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginProps {
  logo?: React.JSX.Element; // 사용자 로고
  loginEndpoint: string; // api 호출 경로
  redirectEndpoint: string; //
  role: 'admin' | 'user';
}

const Login = ({ logo, loginEndpoint, redirectEndpoint, role }: LoginProps) => {
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();

  // * 로그인 로직 (동기적)
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { instance } = ApiClient;

    try {
      const data = new FormData(e.currentTarget);
      // 로그인 API 호출
      const response = await instance.get(loginEndpoint, {
        data: {
          email: data.get('email'),
          password: data.get('pw'),
        },
      });

      localStorage.setItem(ACCESS_TOKEN, response.data.access_token);

      if (response.data.role === 'manager') {
        navigate(ENDPOINT.ADMIN_DEPARTMENT);
      } else {
        navigate(ENDPOINT.USER_DASHBOARD);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === '401' || error.code === '403') {
          setIsError(true);
        } else {
          console.log('login error: ' + error);
        }
      }
    }
  };

  // * 페이지 리다이렉트
  const handleToggleLogin = () => {
    navigate(role === 'user' ? ENDPOINT.ADMIN_LOGIN : ENDPOINT.USER_LOGIN);
  };

  return (
    <div className='flex w-full h-screen justify-center content-center'>
      <span className='font-body1 text-primary underline underline-offset-2 absolute right-14 top-7 cursor-pointer' onClick={handleToggleLogin}>
        {role === 'admin' ? '사용자 로그인' : '관리자 로그인'}
      </span>
      <div className='flex flex-col items-center justify-center gap-9'>
        {logo}

        <Box component='form' onSubmit={handleLogin} noValidate sx={{ mt: 1 }} className='flex flex-col items-center gap-[17px] m-0'>
          <h1 className='font-h1 self-start'>로그인</h1>
          <TextField
            label='아이디'
            variant='outlined'
            size='medium'
            className='w-[300px]'
            placeholder='아이디'
            required
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            label='비밀번호'
            variant='outlined'
            size='medium'
            className='w-[300px]'
            type='password'
            autoComplete='current-password'
            placeholder='비밀번호'
            name='pw'
            required
          />
          <span hidden={!isError} className='text-[#ff0000] font-placeholder'>
            아이디 또는 비밀번호가 일치하지 않습니다.
          </span>
          <Button className='text-white w-[300px] bg-primary' type='submit'>
            로그인
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Login;
