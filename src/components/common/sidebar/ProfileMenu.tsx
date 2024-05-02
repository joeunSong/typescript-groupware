import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';

const ProfileMenu = () => {
  const [name, setName] = useState<string>('김지란');
  const [src, setSrc] = useState<string>('');

  useEffect(() => {
    //API로 User 정보 받기
  }, []);

  const handleMovePage = () => {
    //profile 페이지 이동
  };

  return (
    <button onClick={handleMovePage} className='w-52 h-11 flex flex-row items-center gap-2.5'>
      <Avatar src={src} sx={{ width: 36, height: 36 }} />
      <span className='text-2xl'>{name}</span>
    </button>
  );
};

export default ProfileMenu;
