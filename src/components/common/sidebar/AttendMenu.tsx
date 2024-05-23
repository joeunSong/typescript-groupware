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

interface AttendMenuProps {
  userInfo?: any; //유저의 정보
  todayWorkInfo?: any; //당일 출퇴근 정보
  setTodayWorkInfo?: any; //당일 출퇴근 정보 변경 함수
  todayWorkInfoList: any; //당일 출퇴근 정보 리스트
  setTodayWorkInfoList: any; //당일 출퇴근 정보 리스트 변경 함수
  onWork?: boolean; //출근 여부
  setOnWork?: any; //출근 여부 상태 변경 함수
}

const AttendMenu = ({ userInfo, todayWorkInfo, setTodayWorkInfo, todayWorkInfoList, setTodayWorkInfoList, onWork, setOnWork }: AttendMenuProps) => {
  const [startTime, setStartTime] = useState<any>(todayWorkInfo?.startAt);
  const [endTime, setEndTime] = useState<any>(todayWorkInfo?.endAt);

  //근태 유형
  const [attendTypeList, setAttendTypeList] = useState([]);
  const [attendType, setAttendType] = useState<any>(null);

  //Dropdown 조작
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
      setStartTime(curTime);
      setTodayWorkInfo({ ...todayWorkInfo, startAt: curTime });
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

      setEndTime(curTime);
      setTodayWorkInfo({ ...todayWorkInfo, endTime: curTime });
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
    if (!startTime) {
      //API 통신을 통해서 출근 시간 전송
      console.log(type);
      postStartTime(type);
    }
  };

  const handleLeaveWorkClick = () => {
    //퇴근 기록이 없을 경우 등록
    // if (todayWorkInfo && !endTime) {
    if (todayWorkInfo && !todayWorkInfo.isNormal) {
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
    if (startTime && endTime) {
      let diff = moment.duration(moment(endTime).diff(moment(startTime))).asMinutes();
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
    setStartTime(todayWorkInfo?.startAt);
    setEndTime(todayWorkInfo?.endAt);
  }, [todayWorkInfo]);

  useEffect(() => {
    //TODO 근무 유형 리스트 받아오기
    getCommuteType();
  }, []);

  // 자정에 데이터를 불러오는 함수
  function postDataAtMidnight() {
    // 현재 시간을 가져옴
    const now = moment();

    // 다음 자정을 계산
    const midnight = now.clone().endOf('day');

    // 다음 자정까지의 시간 차이 계산 (밀리초 단위)
    const timeUntilMidnight = midnight.diff(now);

    // 다음 자정에 데이터를 불러오는 작업 예약
    setTimeout(() => {
      // 데이터를 불러오는 작업 실행
      if (!endTime) {
        postEndTime();
      }
      // 다음 자정까지의 시간 차이가 있으므로 다시 함수 호출
      postDataAtMidnight();
    }, timeUntilMidnight);
  }

  // 페이지가 처음 로드될 때 한 번 실행
  //postDataAtMidnight();

  return (
    <div className='flex w-full justify-center'>
      {/* 근무시간 */}
      {/* {startTime && endTime && ( */}
      {startTime && todayWorkInfo.isNormal && (
        <div className='flex flex-col justify-between w-[250px] h-[95px] p-[10px] rounded-[5px] bg-white border-[1px] border-solid border-primary'>
          <div className='flex justify-between items-center content-between'>
            <span className='font-h2 text-primary'>{moment(endTime).format('MM월 DD일')}</span>
            <div className='flex w-[60px] h-[20px] rounded-[50px] bg-primary text-white items-center justify-center'>종료</div>
          </div>
          <div className='font-body1'>{`${formattedTime(startTime)} - ${formattedTime(endTime)}`}</div>
        </div>
        // <div className='flex w-full h-[50px] items-center justify-center bg-white rounded-[5px] text-primary'>{`오늘 한 근무 ${getWorkTime()}`}</div>
      )}
      {/* {startTime && !endTime ? ( */}
      {startTime && !todayWorkInfo.isNormal ? (
        //출근 상태일 경우
        <div className='flex flex-col justify-between w-[250px] h-[153px] p-[10px] rounded-[5px] bg-white border-[1px] border-solid border-primary'>
          <div className='flex justify-between items-center content-between'>
            <span className='font-h2 text-primary'>{todayWorkInfo?.workType?.title}</span>
            <div className='flex w-[60px] h-[20px] rounded-[50px] bg-primary text-white items-center justify-center'>진행중</div>
          </div>
          <div className='font-body1'>{`${formattedTime(startTime)} 부터 진행중`}</div>
          <CustomButton onClick={handleLeaveWorkClick} variant='contained' size='md' color='primary'>
            퇴근하기
          </CustomButton>
        </div>
      ) : (
        !startTime && (
          <>
            {/* <CustomButton onClick={() => handleGoWorkClick(null)} variant='contained' size='md' color='primary'>
              출근하기
            </CustomButton> */}
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
      )}
    </div>
  );
};

export default AttendMenu;
