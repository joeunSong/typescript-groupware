import { Outlet } from 'react-router-dom';
import SideBarLayout from '../common/SideBar';

const UserDefaultLayout = (props: any) => {
  const { children } = props;
  return (
    <div className='flex w-full h-full'>
      {/* 공용 사이드바 */}
      {/* <SideBarLayout /> */}
      <div className='flex flex-col w-full h-full'>
        {/* 헤더 */}
        <span>사용자 헤더입니다</span>
        {/* 메인 콘텐츠 */}
        <div className='flex w-full h-full'>{children || <Outlet />}</div>
      </div>
    </div>
  );
};

export default UserDefaultLayout;
