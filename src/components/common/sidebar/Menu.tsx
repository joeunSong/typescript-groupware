import { useState } from 'react';
import Category from './Category';

//menu 포맷
const userMenuList = [
  {
    category: '근무',
    icon: '',
    sub: [
      { name: '근무', url: '/user/' },
      { name: '근무 승인', url: '/user/work/approval' }, // '근무 승인'에 대한 경로를 구체화합니다.
    ],
  },
  {
    category: '휴가',
    icon: '',
    sub: [
      { name: '휴가 신청', url: '/user/vacation/request' }, // '휴가 신청'에 대한 경로를 구체화합니다.
      { name: '휴가 기록', url: '/user/vacation/records' }, // '휴가 기록'에 대한 경로를 명확하게 합니다.
      { name: '휴가 현황', url: '/user/vacation/status' }, // '휴가 현황'을 확인 할 수 있는 경로를 제공합니다.
      { name: '휴가 승인', url: '/user/vacation/approval' }, // '휴가 승인'에 대한 구체적인 경로를 설정합니다.
    ],
  },
];

export interface MainMenu {
  category: string;
  icon: string;
  sub: { name: string; url: string }[];
}

const Menu = () => {
  const [menuList, setMenuList] = useState<MainMenu[]>(userMenuList);

  return (
    <div className='w-52'>
      {menuList.map((it) => (
        <Category key={it.category} menu={it}></Category>
      ))}
    </div>
  );
};

export default Menu;
