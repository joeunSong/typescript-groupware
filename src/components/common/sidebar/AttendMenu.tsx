import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { CustomButton } from '../Components';
import ApiClient from '../../../utils/axios';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import USER_API from '../../../services/user';
import { useHoliday } from '../../../hooks/useHoliday';
import { checkAttendTime } from '../../../utils/dateUtil';

interface AttendMenuProps {
  userInfo?: any; //유저의 정보
  todayWorkInfo?: any; //당일 출퇴근 정보
  setTodayWorkInfo?: any; //당일 출퇴근 정보 변경 함수
  todayWorkInfoList: any; //당일 출퇴근 정보 리스트
  setTodayWorkInfoList: any; //당일 출퇴근 정보 리스트 변경 함수
  onWork?: boolean; //출근 여부
  setOnWork?: any; //출근 여부 상태 변경 함수
}

const AttendMenu = ({ userInfo, todayWorkInfoList, setTodayWorkInfoList, onWork, setOnWork }: AttendMenuProps) => {
  // const [startTime, setStartTime] = useState<any>(todayWorkInfo?.startAt);
  // const [endTime, setEndTime] = useState<any>(todayWorkInfo?.endAt);
  const [todayWorkInfo, setTodayWorkInfo] = useState<any>(null);

  //근태 유형
  const [attendTypeList, setAttendTypeList] = useState([]);
  const [attendType, setAttendType] = useState<any>(null);

  //Dropdown 조작
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [isAttendTime, setIsAttendTime] = useState<boolean>(true);

  //공휴일 파악
  const { getHolidayList } = useHoliday();
  const holidayList = getHolidayList();

  const handleOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (type: any) => {
    setAnchorEl(null);

    // //근태 유형 설정
    if (type) {
      setAttendType(type);
      handleGoWorkClick(type?.id);
    }
  };

  const getTodayWorkTInfo = async () => {
    //API통신을 통해서 출근 상태 및 시간 확인
    const today = moment().format('YYYY-MM-DD');

    try {
      const response = await USER_API.commute_today_info(today);
      const data = response.data;
      const len = data.length;

      if (len > 0) {
        //최근 근무 설정
        setTodayWorkInfo(data[len - 1]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postStartTime = async (type: string) => {
    let curTime = moment().toISOString();
    let today = moment(curTime).format('YYYY-MM-DD');

    //출근 시간 등록 API
    const data = {
      startAt: curTime,
      date: today,
      workType: type,
    };

    try {
      const response = await USER_API.commute_in(data);

      await getTodayWorkTInfo();
      setOnWork(true);
    } catch (error) {
      // 요청이 실패하면 여기에서 에러 처리
      console.log(error);
    }
  };

  const postEndTime = async () => {
    let curTime = moment().toISOString();
    //퇴근 시간 등록 API
    const data = {
      endAt: curTime,
    };

    try {
      const response = await USER_API.commute_out({
        commuteId: todayWorkInfo.id,
        endAt: curTime,
      });

      await getTodayWorkTInfo();
      setOnWork(false);
    } catch (error) {
      // 요청이 실패하면 여기에서 에러 처리
      console.log(error);
    }
  };

  //근무 타입 목록 받아오기
  const getCommuteType = async () => {
    try {
      const response = await USER_API.commute_type();

      setAttendTypeList(response.data);
    } catch (error) {
      // 요청이 실패하면 여기에서 에러 처리
      console.log(error);
    }
  };

  const handleGoWorkClick = (type: string) => {
    //출근 기록이 없을 경우 등록
    if (!todayWorkInfo?.startAt) {
      //API 통신을 통해서 출근 시간 전송
      console.log(type);
      postStartTime(type);
    }
  };

  const handleLeaveWorkClick = () => {
    //퇴근 기록이 없을 경우 등록
    // if (todayWorkInfo && !endTime) {
    if (todayWorkInfo && !todayWorkInfo?.isNormal) {
      //API 통신을 통해서 퇴근 시간 전송
      if (todayWorkInfo.id) {
        postEndTime();
      }
    }
  };

  //시간 format 변환
  const formattedTime = (startTime: any) => {
    let time = moment(startTime).format('A hh:mm');
    time = time.replace('AM', '오전').replace('PM', '오후');
    return time;
  };

  // 근무 시간 구하기
  const getWorkTime = () => {
    if (todayWorkInfo.startAt && todayWorkInfo.endAt) {
      let diff = moment.duration(moment(todayWorkInfo.endAt).diff(moment(todayWorkInfo.startAt))).asMinutes();
      diff = Math.floor(diff);

      if (diff >= 60) {
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        return `${hours}시간 ${minutes}분`;
      } else {
        return `${diff}분`;
      }
    }
  };

  useEffect(() => {
    getTodayWorkTInfo();
  }, []);

  useEffect(() => {
    //TODO 근무 유형 리스트 받아오기
    getCommuteType();
  }, []);

  useEffect(() => {
    //근무 가능 여부 받아오기
    const flag = checkAttendTime(holidayList);
    setIsAttendTime(flag);
  }, [holidayList]);

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
    <div className='flex flex-col w-full justify-center'>
      {isAttendTime ? (
        todayWorkInfo?.startAt ? (
          todayWorkInfo?.isNormal ? (
            // 근무 내역
            <div className='flex flex-col justify-between  h-[95px] p-[10px] rounded-[5px] bg-white border-[1px] border-solid border-primary'>
              <div className='flex justify-between items-center content-between'>
                <span className='font-h2 text-primary'>{moment(todayWorkInfo?.endAt).format('MM월 DD일')}</span>
                <div className='flex w-[60px] h-[20px] rounded-[50px] bg-primary text-white items-center justify-center'>종료</div>
              </div>
              <div className='font-body1'>{`${formattedTime(todayWorkInfo?.startAt)} - ${formattedTime(todayWorkInfo?.endAt)}`}</div>
            </div>
          ) : (
            // 퇴근 버튼
            <div className='flex flex-col justify-between h-[153px] p-[10px] rounded-[5px] bg-white border-[1px] border-solid border-primary'>
              <div className='flex justify-between items-center content-between'>
                <span className='font-h2 text-primary'>{todayWorkInfo?.workType?.title}</span>
                <div className='flex w-[60px] h-[20px] rounded-[50px] bg-primary text-white items-center justify-center'>진행중</div>
              </div>
              <div className='font-body1'>{`${formattedTime(todayWorkInfo?.startAt)} 부터 진행중`}</div>
              <div className='flex items-center'>
                <CustomButton onClick={handleLeaveWorkClick} variant='contained' size='md' color='primary'>
                  퇴근하기
                </CustomButton>
              </div>
            </div>
          )
        ) : (
          <>
            {/*  출근 버튼 */}
            <CustomButton onClick={handleOpenMenu} variant='contained' size='md' color='primary'>
              출근하기
            </CustomButton>
            <Menu
              className='border-[1px] border-solid border-primary'
              id='dropdown-menu'
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleCloseMenu(null)}
            >
              {attendTypeList.length > 0 &&
                attendTypeList.map((_it: any) => (
                  <MenuItem
                    className='text-primary flex items-center justify-center'
                    sx={{
                      width: '14.375rem',
                    }}
                    onClick={() => handleCloseMenu(_it)}
                  >
                    {_it?.title}
                  </MenuItem>
                ))}
            </Menu>
          </>
        )
      ) : (
        <>
          {/* <div className='flex flex-col justify-between w-[250px] p-[10px] rounded-[5px] bg-white border-[1px] border-solid border-primary'>
            <span className=' text-primary'>근무가능한 시간이 아닙니다</span>
          </div> */}
        </>
      )}
    </div>
  );
};

export default AttendMenu;
