import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import USER_API from '../../../services/user';
import React from 'react';
import ProfileModal from '../../user/ProfileModal';

interface ProfileMenuProps {
  userInfo: any;
}

const ProfileMenu = ({}: ProfileMenuProps) => {
  const [userInfo, setUserInfo] = useState<any>();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const getUserInfo = async () => {
    try {
      const response = await USER_API.profile();
      setUserInfo(response.data);
    } catch (error) {
      // 요청이 실패하면 여기에서 에러 처리
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const navigate = useNavigate();

  const handleMovePage = () => {
    //profile 페이지 이동
    //navigate('/user/profile');

    // 임시
    setIsProfileModalOpen(true);
  };

  return (
    <div
      onClick={handleMovePage}
      className='flex w-full p-[10px] pl-[25px] gap-[10px] items-center cursor-pointer'
    >
      <Avatar src={userInfo?.src || ''} sx={{ width: 36, height: 36 }} />
      <span className='font-h2'>{userInfo?.name || '김지란'}</span>
      <ProfileModal
        isProfileModalOpen={isProfileModalOpen}
        setIsProfileModalOpen={setIsProfileModalOpen}
        profile={userInfo}
      />
    </div>
  );
};

export default ProfileMenu;
