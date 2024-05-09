import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

interface ProfileMenuProps {
  userInfo: any;
}

const ProfileMenu = ({ userInfo }: ProfileMenuProps) => {
  const navigate = useNavigate();
  const handleMovePage = () => {
    //profile 페이지 이동
    //navigate('/user/profile');
  };

  return (
    <div onClick={handleMovePage} className='flex w-full p-[10px] pl-[25px] gap-[10px] items-center'>
      <Avatar src={userInfo?.src || ''} sx={{ width: 36, height: 36 }} />
      <span className='font-h2'>{userInfo?.name || '김지란'}</span>
    </div>
  );
};

export default ProfileMenu;
