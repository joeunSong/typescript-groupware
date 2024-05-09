import { Outlet } from 'react-router-dom';
import SideBarLayout from '../common/SideBar';
import AttendMenu from '../common/sidebar/AttendMenu';
import ProfileMenu from '../common/sidebar/ProfileMenu';
import React, { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import WorkIcon from '@mui/icons-material/Work';
import _ from 'lodash';
import moment from 'moment';
import ApiClient from '../../utils/axios';

const UserDefaultLayout = (props: any) => {
  const { children } = props;

  //사용자 정보
  const [userInfo, setUserInfo] = useState<any>();

  //출근 여부
  const [onWork, setOnWork] = useState<boolean>(false);

  //당일 근무 정보
  const [todayWorkInfo, setTodayWorkInfo] = useState<any>({
    id: null,
    startTime: null,
    endTime: null,
  });

  // 메뉴 정보
  const [selectItem, setSelectItem] = useState<any>(null);
  const [items, setItems] = useState([
    {
      icon: WorkIcon,
      label: '근무',
      // open: false,
      // items: [
      //   { icon: DraftsIcon, label: '근무', url: '/user/dashboard' },
      //   { icon: DraftsIcon, label: '근무 승인', url: '/user/work/approval' },
      // ],
    },

    // {
    //   icon: InboxIcon,
    //   label: '휴가',
    //   open: false,
    //   items: [
    //     { icon: DraftsIcon, label: '휴가 신청', url: '/user/vacation/request' },
    //     { icon: DraftsIcon, label: '휴가 기록', url: '/user/vacation/records' },
    //     { icon: DraftsIcon, label: '휴가 현황', url: '/user/vacation/status' },
    //     { icon: DraftsIcon, label: '휴가 승인', url: '/user/vacation/approval' },
    //   ],
    // },
  ]);

  //헤더 템플릿
  const headerTemplate = {
    attendMenu: (
      <AttendMenu userInfo={userInfo} todayWorkInfo={todayWorkInfo} setTodayWorkInfo={setTodayWorkInfo} onWork={onWork} setOnWork={setOnWork} />
    ),
    profileMenu: <ProfileMenu userInfo={userInfo} />,
  };

  const { instance, setBaseURL } = ApiClient;

  const getTodayWorkTInfo = async () => {
    //API통신을 통해서 출근 상태 및 시간 확인
    const today = moment().format('YYYY-MM-DD');

    try {
      //const response = await ApiClient.instance.get(`http://localhost:8080/api/commutes/status?date=` + today);

      setBaseURL('http://localhost:8080/api/');
      const response = await instance.get(`commutes/status?date=` + today);
      const data = response.data;

      const { id, startAt, endAt } = data;

      //TODO
      setTodayWorkInfo({ id, startTime: startAt, endTime: endAt });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodayWorkTInfo();
  }, [onWork]);

  return (
    <div className='flex w-full h-full'>
      {/* 공용 사이드바 */}
      <SideBarLayout headerTemplate={headerTemplate} items={items} setItems={setItems} setSelectItem={setSelectItem} />
      <div className='flex flex-col w-full h-full'>
        {/* 헤더 */}
        <div className='flex p-6 px-10 bg-gray-100'>
          <span className='text-2xl font-bold'>{_.isEmpty(selectItem) ? '근무' : selectItem?.label}</span>
        </div>
        {/* 메인 콘텐츠 */}

        {children?.type?.name === 'UserDashBoard' ? (
          // UserDashBoard일 경우 props전달
          <div className='flex w-full h-full'>{React.cloneElement(children, { onWork, todayWorkInfo }) || <Outlet />}</div>
        ) : (
          children || <Outlet />
        )}
      </div>
    </div>
  );
};

export default UserDefaultLayout;
