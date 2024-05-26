import { Outlet, useNavigate } from 'react-router-dom';
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
import { Button } from '@mui/material';
import USER_API from '../../services/user';
import * as ENDPOINT from '../../constants/apiEndpoints';

const UserDefaultLayout = (props: any) => {
  const { children } = props;
  const navigate = useNavigate();

  //사용자 정보
  const [userInfo, setUserInfo] = useState<any>();
  //출근 여부
  const [onWork, setOnWork] = useState<boolean>(false);
  //당일 근무 정보 리스트
  const [todayWorkInfoList, setTodayWorkInfoList] = useState<any>([]);
  //당일 근무 정보
  const [todayWorkInfo, setTodayWorkInfo] = useState<any>(null);
  // 메뉴 정보
  const [selectItem, setSelectItem] = useState<any>(null);
  const [items, setItems] = useState<any>([
    {
      icon: WorkIcon,
      label: '근무',
      open: false,
      // items: [
      //   { icon: DraftsIcon, label: '근무', url: '/user/dashboard' },
      //   { icon: DraftsIcon, label: '근무 승인', url: '/user/work/approval' },
      // ],
    },
  ]);

  //헤더 템플릿
  const [headerTemplate, setHeaderTemplate] = useState({
    attendMenu: (
      <AttendMenu
        userInfo={userInfo}
        todayWorkInfo={todayWorkInfo}
        setTodayWorkInfo={setTodayWorkInfo}
        todayWorkInfoList={todayWorkInfoList}
        setTodayWorkInfoList={setTodayWorkInfoList}
        onWork={onWork}
        setOnWork={setOnWork}
      />
    ),
    profileMenu: <ProfileMenu userInfo={userInfo} />,
  });

  const getTodayWorkTInfo = async () => {
    //API통신을 통해서 출근 상태 및 시간 확인
    const today = moment().format('YYYY-MM-DD');

    try {
      const response = await USER_API.commute_today_info(today);
      const data = response.data;
      const len = data.length;

      //당일 근무 리스트 설정
      setTodayWorkInfoList(data);

      if (len > 0) {
        //최근 근무 설정
        setTodayWorkInfo(data[len - 1]);
      }

      //console.log(data);

      //const { id, startAt, endAt } = data[data.length - 1];
      //console.log(data);

      //TODO
      //setTodayWorkInfo({ id, startTime: startAt, endTime: endAt });

      //return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await USER_API.profile();
      setUserInfo(response.data);
    } catch (error) {
      // 요청이 실패하면 여기에서 에러 처리
      console.log(error);
    }
  };

  // * 권한에 따른 사이드바 항목 Set
  useEffect(() => {
    if (!_.isEmpty(userInfo)) {
      // 근태관리자
      if (userInfo?.isLeader) {
        setItems([
          {
            icon: WorkIcon,
            label: '근무',
            open: false,
            items: [
              { icon: DraftsIcon, label: '근무', url: ENDPOINT.USER_DASHBOARD },
              { icon: DraftsIcon, label: '근무 승인', url: ENDPOINT.USER_WORK_APPROVAL },
            ],
          },
        ]);
      } else {
        setItems([
          {
            icon: WorkIcon,
            label: '근무',
            open: false,
            url: ENDPOINT.USER_DASHBOARD,
            items: [],
          },
        ]);
      }
    }
  }, [userInfo]);

  useEffect(() => {
    getTodayWorkTInfo();
  }, [onWork]);

  // * 사용자 프로필 조회
  useEffect(() => {
    getUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // 자정에 데이터를 불러오는 함수
  function loadDataAtMidnight() {
    // 현재 시간을 가져옴
    const now = moment();

    // 다음 자정을 계산
    const midnight = now.clone().endOf('day');

    // 다음 자정까지의 시간 차이 계산 (밀리초 단위)
    const timeUntilMidnight = midnight.diff(now);

    // 다음 자정에 데이터를 불러오는 작업 예약
    setTimeout(() => {
      // 데이터를 불러오는 작업 실행
      getTodayWorkTInfo();
      // 다음 자정까지의 시간 차이가 있으므로 다시 함수 호출
      loadDataAtMidnight();
    }, timeUntilMidnight);
  }

  // 페이지가 처음 로드될 때 한 번 실행
  loadDataAtMidnight();

  return (
    <div className='flex w-full h-full'>
      {/* 공용 사이드바 */}
      <SideBarLayout headerTemplate={headerTemplate} items={items} setItems={setItems} setSelectItem={setSelectItem} />
      <Button className='bg-wihte h-12 w-60 absolute left-4 bottom-2' onClick={handleLogout}>
        로그아웃
      </Button>
      <div className='flex flex-col w-full h-full'>
        {/* 헤더 */}
        <div className='flex p-6 px-10 bg-gray-100'>
          <span className='text-2xl font-bold'>{_.isEmpty(selectItem) ? '근무' : selectItem?.label}</span>
        </div>
        {/* 메인 콘텐츠 */}

        {children?.type?.name === 'UserDashBoard' ? (
          // UserDashBoard일 경우 props전달
          <div className='flex w-full h-full'>{React.cloneElement(children, { onWork, todayWorkInfo, todayWorkInfoList }) || <Outlet />}</div>
        ) : (
          children || <Outlet />
        )}
      </div>
    </div>
  );
};

export default UserDefaultLayout;
