import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import USER_API from '../../../services/user';
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

  const handleMovePage = () => {
    setIsProfileModalOpen(true);
  };

  // * 사용자 프로필 조회
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <div onClick={handleMovePage} className='flex w-full p-[10px] pl-[25px] gap-[10px] items-center cursor-pointer'>
        <Avatar src={userInfo?.src || ''} sx={{ width: 36, height: 36 }} />
        <span className='font-h2'>{userInfo?.name || '김지란'}</span>
      </div>
      {isProfileModalOpen && (
        <ProfileModal isProfileModalOpen={isProfileModalOpen} setIsProfileModalOpen={setIsProfileModalOpen} profile={userInfo} />
      )}
    </>
  );
};

export default ProfileMenu;
