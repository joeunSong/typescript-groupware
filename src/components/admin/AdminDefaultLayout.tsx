// * basic
import { useEffect, useState } from 'react';
// * install libraries\
import _ from 'lodash';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// * components
import SideBarLayout from '../common/SideBar';
import { Button } from '@mui/material';
import { HomeRounded } from '@mui/icons-material';
import WorkIcon from '@mui/icons-material/Work';
// * constants
import * as ENDPOINT from '../../constants/apiEndpoints';
import { LogoutButton } from '../common/LogoutButton';
// * apis

const AdminDefaultLayout = (props: any) => {
  const { children } = props;
  const navigate = useNavigate();
  // * 사이드 바 선택, 사이드 바 폼
  const [selectItem, setSelectItem] = useState<any>(null);
  const [items, setItems] = useState([
    {
      icon: HomeRounded,
      label: '홈',
      open: false,
      path: ENDPOINT.ADMIN_DASHBOARD,
      items: [],
    },
    {
      icon: 'OrganizationIcon',
      label: '조직도 관리',
      open: false,
      items: [
        { path: ENDPOINT.ADMIN_DEPARTMENT, icon: null, label: '부서 관리', explan: '부서를 등록하고 관리할 수 있습니다.' },
        { path: ENDPOINT.ADMIN_ACCOUNT, icon: null, label: '계정 관리', explan: '계정을 등록하고 관리할 수 있습니다.' },
      ],
    },
    {
      icon: WorkIcon,
      label: '근무 관리',
      open: false,
      items: [
        { path: ENDPOINT.ADMIN_WORKTIME, icon: null, label: '근무 시간 설정', explan: '회사의 기본 근무 시간 설정' },
        { path: ENDPOINT.ADMIN_WORK_APPROVE, icon: null, label: '근태 조회', explan: '회사 전체 출근한 사용자의 정보를 조회' },
      ],
    },
    // {
    //   icon: InboxIcon,
    //   label: '휴가 관리',
    //   open: false,
    //   items: [
    //     { icon: null, label: '휴가 신청 조회', explan: '휴가 신청을 관리할 수 있습니다.' },
    //     { icon: null, label: '휴가 유형 관리', explan: '휴가 유형을 등록하고 관리할 수 있습니다.' },
    //   ],
    // },
  ]);

  // * 관리자 로그아웃
  const handleLogout = () => {
    localStorage.clear();
    navigate(ENDPOINT.ADMIN_LOGIN);
  };

  return (
    <div className='flex w-full h-full min-w-[1200px]'>
      {/* 공용 사이드바 */}
      <SideBarLayout items={items} setItems={setItems} selectItem={selectItem} setSelectItem={setSelectItem} />

      <LogoutButton handleLogout={handleLogout} />
      <div className='flex flex-col w-full h-full pb-10 pr-4 bg-gray-100'>
        {/* 헤더 */}
        <div className='flex flex-col'>
          {/* 큰제목 */}
          <div className='flex p-6 bg-gray-100'>
            <span className='font-noto-sans text-[30px] font-bold'>
              {_.isEmpty(selectItem)
                ? null
                : _.isEmpty(selectItem?.icon)
                  ? _.find(items, (item) => {
                      return item.items && _.some(item.items, { label: selectItem?.label });
                    })?.label
                  : selectItem?.label}
            </span>
          </div>
          {/* 소제목 */}
          <div className='flex w-full bg-white'>
            {_.isEmpty(selectItem?.icon) ? (
              <div className='flex flex-col w-full mx-3 py-2 gap-2 bg-white border-solid border-b-[1px] border-[#777777]'>
                <span className='text-[24px] font-bold font-noto-sans'>{selectItem?.label}</span>
                <span className='text-[18px] text-[#777777] font-noto-sans'>{selectItem?.explan}</span>
              </div>
            ) : null}
          </div>
        </div>
        {/* 메인 콘텐츠 */}
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default AdminDefaultLayout;
