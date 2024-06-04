// lib
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';

// Components
import SideBarLayout from '../common/SideBar';
import AttendMenu from '../common/sidebar/AttendMenu';
import ProfileMenu from '../common/sidebar/ProfileMenu';

// icons
import { Home } from '@mui/icons-material';
import DraftsIcon from '@mui/icons-material/Drafts';
import WorkIcon from '@mui/icons-material/Work';
import { Button } from '@mui/material';

// etc
import USER_API from '../../services/user';
import * as ENDPOINT from '../../constants/apiEndpoints';
import { WorkRecord } from '../../types/interface';

const UserDefaultLayout = (props: any) => {
  const { children } = props;
  const navigate = useNavigate();

  //사용자 정보
  const [userInfo, setUserInfo] = useState<any>();
  //출근 여부
  const [onWork, setOnWork] = useState<boolean>(false);
  //당일 근무 정보 리스트
  const [todayWorkInfoList, setTodayWorkInfoList] = useState<WorkRecord[]>([]);
  //당일 근무 정보
  const [todayWorkInfo, setTodayWorkInfo] = useState<WorkRecord | null>(null);
  // 메뉴 정보
  const [selectItem, setSelectItem] = useState<any>(null);
  const [items, setItems] = useState<any>([
    {
      icon: Home,
      label: 'HOME',
      open: false,
      path: ENDPOINT.USER_MAIN,
      items: [],
      explan: '한 달동안 내 근무를 한 눈에 볼 수 있어요.',
    },
    {
      icon: WorkIcon,
      label: '근무',
      open: false,
      path: ENDPOINT.USER_DASHBOARD,
      items: [],
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
      if (userInfo.isLeader) {
        setItems([
          {
            icon: Home,
            label: 'HOME',
            open: false,
            path: ENDPOINT.USER_MAIN,
            items: [],
            explan: '한 달동안 내 근무를 한 눈에 볼 수 있어요.',
          },
          {
            icon: WorkIcon,
            label: '근무',
            open: false,
            items: [
              { icon: null, label: '근무 조회', path: ENDPOINT.USER_DASHBOARD, explan: '한 주동안 내 근무를 한 눈에 볼 수 있어요.' },
              { icon: null, label: '근무 승인', path: ENDPOINT.USER_WORK_APPROVAL, explan: '부서원이 보낸 조정요청을 조회, 승인할 수 있습니다.' },
            ],
          },
        ]);
      } else {
        setItems([
          {
            icon: Home,
            label: 'HOME',
            open: false,
            path: ENDPOINT.USER_MAIN,
            items: [],
            explan: '한 달동안 내 근무를 한 눈에 볼 수 있어요.',
          },
          {
            icon: WorkIcon,
            label: '근무',
            open: false,
            path: ENDPOINT.USER_DASHBOARD,
            items: [],
            explan: '한 주동안 내 근무를 한 눈에 볼 수 있어요.',
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

  const setSubtitle = (subtitle: string | undefined) => {
    if (subtitle === 'HOME') {
      return '대시보드';
    }
    if (subtitle === '근무') {
      return '내 근무';
    }
    return subtitle;
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
      <SideBarLayout headerTemplate={headerTemplate} items={items} setItems={setItems} selectItem={selectItem} setSelectItem={setSelectItem} />
      <Button className='bg-wihte h-12 w-60 absolute left-4 bottom-2' onClick={handleLogout}>
        로그아웃
      </Button>
      <div className='flex flex-col w-full h-full'>
        {/* 헤더 */}
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
        {/* <div className='flex p-6 px-10 bg-gray-100'>
          <span className='text-2xl font-bold'>{_.isEmpty(selectItem) ? '근무' : selectItem?.label}</span>
        </div> */}
        {/* 소제목 */}
        <div className='flex w-full bg-white'>
          <div className='flex w-full bg-white'>
            {_.isEmpty(selectItem?.icon) ? (
              <div className='flex flex-col w-full mx-3 py-2 gap-2 bg-white border-solid border-b-[1px] border-[#777777]'>
                <span className='text-[24px] font-bold font-noto-sans'>{selectItem?.label}</span>
                <span className='text-[18px] text-[#777777] font-noto-sans'>{selectItem?.explan}</span>
              </div>
            ) : (
              <div className='flex flex-col w-full mx-3 py-2 gap-2 bg-white border-solid border-b-[1px] border-[#777777]'>
                <span className='text-[24px] font-bold font-noto-sans'>{setSubtitle(selectItem?.label)}</span>
                <span className='text-[18px] text-[#777777] font-noto-sans'>{selectItem?.explan}</span>
              </div>
            )}
          </div>
          {/* {selectItem?.icon ? (
            <div className='flex flex-col w-full mx-3 py-2 gap-2 bg-white border-solid border-b-[1px] border-[#777777]'>
              <span className='text-[24px] font-bold font-noto-sans'>{selectItem?.label === 'HOME' ? '대시보드' : selectItem?.label}</span>
              <span className='text-[18px] text-[#777777] font-noto-sans'>{selectItem?.explan}</span>
            </div>
          ) : null} */}
        </div>
        {/* 메인 콘텐츠 */}
        {children?.type?.name === 'UserDashBoard' || 'UserMain' ? (
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
