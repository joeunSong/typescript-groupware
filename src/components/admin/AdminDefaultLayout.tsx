import { Outlet, useLocation } from 'react-router-dom';
import SideBarLayout from '../common/SideBar';
import { useEffect, useState } from 'react';
import * as ENDPOINT from '../../constants/apiEndpoints';
import SendIcon from '@mui/icons-material/Send';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import _ from 'lodash';

const AdminDefaultLayout = (props: any) => {
  const { children } = props;
  const location = useLocation();
  const [items, setItems] = useState([
    {
      icon: SendIcon,
      label: '조직도 관리',
      open: false,
      items: [
        { path: ENDPOINT.ADMIN_DEPARTMENT, icon: DraftsIcon, label: '부서 관리', explan: '부서를 등록하고 관리할 수 있습니다.' },
        { path: ENDPOINT.ADMIN_ACCOUNT, icon: DraftsIcon, label: '계정 관리', explan: '계정을 등록하고 관리할 수 있습니다.' },
      ],
    },
    {
      icon: DraftsIcon,
      label: '근무 관리',
      open: false,
      items: [
        { icon: DraftsIcon, label: '기념일/공휴일 관리', explan: '기념일과 공휴일을 등록하고 관리할 수 있습니다.' },
        { icon: DraftsIcon, label: '근무 유형 관리', explan: '근무 유형을 등록하고 관리할 수 있습니다.' },
      ],
    },
    {
      icon: InboxIcon,
      label: '휴가 관리',
      open: false,
      items: [
        { icon: DraftsIcon, label: '휴가 신청 조회', explan: '휴가 신청을 관리할 수 있습니다.' },
        { icon: DraftsIcon, label: '휴가 유형 관리', explan: '휴가 유형을 등록하고 관리할 수 있습니다.' },
      ],
    },
  ]);
  const [selectItem, setSelectItem] = useState<any>(null);

  // * url로 접속한 경우 뎁스 open
  useEffect(() => {
    if (_.isEmpty(selectItem)) {
      setItems((prevs) => {
        return _.map(prevs, (prev: any) => {
          const updatedItems = _.map(prev.items, (subItem: any) => {
            if (subItem.path === location.pathname) {
              setSelectItem(subItem);
              return { ...subItem, open: true };
            }
            return subItem;
          });

          if (_.some(updatedItems, { path: location.pathname })) {
            return { ...prev, open: true, items: updatedItems };
          }
          return prev;
        });
      });
    }
  }, []);

  return (
    <div className='flex w-full h-full min-w-[1200px]'>
      {/* 공용 사이드바 */}
      <SideBarLayout items={items} setItems={setItems} selectItem={selectItem} setSelectItem={setSelectItem} />
      <div className='flex flex-col w-full h-full bg-gray-100 '>
        {/* 헤더 */}
        <div className='flex flex-col'>
          {/* 큰제목 */}
          <div className='flex p-6 bg-gray-100'>
            <span className='font-noto-sans text-[30px] font-bold'>
              {_.isEmpty(selectItem)
                ? 'Dashboard'
                : _.find(items, (item) => {
                    return item.items && _.some(item.items, { label: selectItem?.label });
                  })?.label}
            </span>
          </div>
          {/* 소제목 */}
          <div className='flex w-full bg-white'>
            <div className='flex flex-col w-full mx-3 py-2 gap-2 bg-white border-solid border-b-[1px] border-[#777777]'>
              <span className='text-[24px] font-bold font-noto-sans'>{selectItem?.label}</span>
              <span className='text-[18px] text-[#777777] font-noto-sans'>{selectItem?.explan}</span>
            </div>
          </div>
        </div>
        {/* 메인 콘텐츠 */}
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default AdminDefaultLayout;
