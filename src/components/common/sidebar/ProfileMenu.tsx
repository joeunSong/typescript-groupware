import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../../../utils/axios';

interface ProfileMenuProps {
  userInfo: any;
}

const ProfileMenu = ({}: ProfileMenuProps) => {
  const [userInfo, setUserInfo] = useState<any>();
  const { instance, setBaseURL } = ApiClient;

  const getUserInfo = async () => {
    setBaseURL('http://localhost:8080/api/');
    try {
      const response = await instance.get('users');
      const data = response.data;
      setUserInfo(data);
      // 요청이 성공하면 여기에서 응답 처리
      //return response; // 예를 들어, 서버에서 반환한 데이터를 반환할 수 있습니다.
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
  };

  return (
    <div onClick={handleMovePage} className='flex w-full p-[10px] pl-[25px] gap-[10px] items-center'>
      <Avatar src={userInfo?.src || ''} sx={{ width: 36, height: 36 }} />
      <span className='font-h2'>{userInfo?.name || '김지란'}</span>
    </div>
  );
};

export default ProfileMenu;
