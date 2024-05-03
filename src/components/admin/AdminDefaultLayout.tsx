import { Outlet } from 'react-router-dom';
import SideBarLayout from '../common/SideBar';
import { useState } from 'react';

import SendIcon from '@mui/icons-material/Send';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import _ from 'lodash';

const AdminDefaultLayout = (props: any) => {
  const { children } = props;
  const [selectItem, setSelectItem] = useState<any>(null);
  const [items, setItems] = useState([
    {
      icon: SendIcon,
      label: '조직도 관리',
      open: false,
      items: [
        { icon: DraftsIcon, label: '부서 관리', explan: '' },
        { icon: DraftsIcon, label: '계정 관리', explan: '계정을 등록하고 관리할 수 있습니다.' },
      ],
    },
    {
      icon: DraftsIcon,
      label: '근무 관리',
      open: false,
      items: [
        { icon: DraftsIcon, label: '기념일/공휴일 관리', explan: '' },
        { icon: DraftsIcon, label: '근무 유형 관리', explan: '' },
      ],
    },
    {
      icon: InboxIcon,
      label: '휴가 관리',
      open: false,
      items: [
        { icon: DraftsIcon, label: '휴가 신청 조회', explan: '' },
        { icon: DraftsIcon, label: '휴가 유형 관리', explan: '' },
      ],
    },
  ]);

  return (
    <div className='flex w-full h-full'>
      {/* 공용 사이드바 */}
      <SideBarLayout items={items} setItems={setItems} setSelectItem={setSelectItem} />
      <div className='flex flex-col w-full h-full bg-gray-100 '>
        {/* 헤더 */}
        <div className='flex flex-col'>
          <div className='flex p-6 px-10 bg-gray-100'>
            <span className='text-2xl font-bold'>
              {_.isEmpty(selectItem)
                ? '???'
                : _.find(items, (item) => {
                    return item.items && _.some(item.items, { label: selectItem?.label });
                  })?.label}
            </span>
          </div>
          <div className='flex flex-col p-5 bg-white border-b-2'>
            <span className=''></span>
          </div>
        </div>
        {/* 메인 콘텐츠 */}
        <div className='flex w-full h-full p-5 bg-white'>{children || <Outlet />}</div>
      </div>
    </div>
  );
};

export default AdminDefaultLayout;
