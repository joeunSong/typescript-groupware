import { Button, TextField } from '@mui/material';
import _ from 'lodash';
import { useState } from 'react';
import { Navigate, redirect, useNavigate } from 'react-router-dom';
import * as ENDPOINT from '../../constants/apiEndpoints';
import React from 'react';

const AdminLoginLayout = (props: any) => {
  const {} = props;

  const navigate = useNavigate();
  // TODO 아이디 일치, 비밀번호 일치 따로 온다면 message로 아니라면 하나의 변수로 체크
  const [inputs, setInputs] = useState([
    { type: 'id', value: '', isCheck: false, message: '', placeholder: '아이디' },
    { type: 'password', value: '', isCheck: false, message: '', placeholder: '비밀번호' },
  ]);

  // * 사용자 페이지로 이동
  const handleLoginPage = () => {
    navigate(ENDPOINT.USER_LOGIN);
  };

  // * 사용자에게 입력 값 받기
  const handleInputValue = (e: any, input: any) => {
    setInputs((prevs: any) => {
      return _.map(prevs, (prev: any) => {
        return input?.type === prev?.type ? { ...prev, value: e.target.value } : prev;
      });
    });
  };

  const handleLogin = () => {};

  return (
    <div className='flex flex-col w-full h-full'>
      {/* 사용자 로그인 이동 */}
      <div className='absolute right-0 p-5 px-10'>
        <span className='font-noto-sans text-base font-light text-primary underline underline-offset-4 cursor-pointer' onClick={handleLoginPage}>
          사용자 로그인
        </span>
      </div>
      <div className='flex flex-col h-full items-center justify-center gap-8'>
        {/* 헤더 제목 */}
        <div className='flex w-full justify-center'>
          <span className='font-noto-sans text-4xl font-extrabold text-primary '>지란지교 소프트 Admin</span>
        </div>
        {/* 내용 */}
        <div className='flex flex-col w-[300px] gap-3'>
          <div className='flex w-full'>
            <span className='font-noto-sans text-3xl font-semibold'>로그인</span>
          </div>
          <div className='flex flex-col w-full gap-4'>
            {_.map(inputs, (input: any) => {
              return (
                <TextField
                  key={input?.type}
                  className='w-full'
                  type={input?.type}
                  label={input?.placeholder}
                  placeholder={input?.placeholder}
                  required
                  onChange={(e: any) => handleInputValue(e, input)}
                />
              );
            })}
            <span hidden={false} className='text-[10px] font-thin text-[#ff0000]'>
              *아이디 또는 비밀번호가 일치하지 않습니다
            </span>
            <Button className='w-full p-0' onClick={handleLogin}>
              <div className='w-full bg-primary p-1'>
                <span className='font-noto-sans text-white font-semibold'>로그인</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginLayout;
