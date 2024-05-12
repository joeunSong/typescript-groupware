import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { CustomButton } from '../Components';
import ApiClient from '../../../utils/axios';

interface AttendMenuProps {
  userInfo?: any; //유저의 정보
  todayWorkInfo?: any; //당일 출퇴근 정보
  setTodayWorkInfo?: any; //당일 출퇴근 정보 변경 함수
  onWork?: boolean; //출근 여부
  setOnWork?: any; //출근 여부 상태 변경 함수
}

const AttendMenu = ({ userInfo, todayWorkInfo, setTodayWorkInfo, onWork, setOnWork }: AttendMenuProps) => {
  const [startTime, setStartTime] = useState<any>(todayWorkInfo?.startTime);
  const [endTime, setEndTime] = useState<any>(todayWorkInfo?.endTime);
  const { instance, setBaseURL } = ApiClient;

  const postStartTime = async () => {
    let curTime = moment().toISOString();
    let today = moment(curTime).format('YYYY-MM-DD');

    //console.log(curTime);
    //출근 시간 등록 API
    const data = {
      startAt: curTime,
      date: today,
    };

    setBaseURL('http://localhost:8080/api/');
    try {
      const response = await instance.post('commutes/in', data);

      setStartTime(curTime);
      setTodayWorkInfo({ ...todayWorkInfo, startTime: curTime });
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
    setBaseURL('http://localhost:8080/api/');
    try {
      const response = await instance.post('commutes/' + todayWorkInfo.id + '/out', data);
      setEndTime(curTime);
      setTodayWorkInfo({ ...todayWorkInfo, endTime: curTime });
      setOnWork(false);
    } catch (error) {
      // 요청이 실패하면 여기에서 에러 처리
      console.log(error);
    }
  };
  const handleGoWorkClick = () => {
    //출근 기록이 없을 경우 등록
    if (!startTime) {
      //API 통신을 통해서 출근 시간 전송

      postStartTime();

      // setStartTime(curTime);
      // setTodayWorkInfo({ ...todayWorkInfo, startTime: curTime });
      // setOnWork(true);
    }
  };

  const handleLeaveWorkClick = () => {
    //퇴근 기록이 없을 경우 등록
    if (!endTime) {
      //API 통신을 통해서 퇴근 시간 전송
      if (todayWorkInfo.id) {
        postEndTime();
      }
      // setEndTime(curTime);
      // setTodayWorkInfo({ ...todayWorkInfo, endTime: curTime });
      // setOnWork(false);
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
    setStartTime(todayWorkInfo.startTime);
    setEndTime(todayWorkInfo.endTime);
  }, [todayWorkInfo]);

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
  postDataAtMidnight();

  return (
    <div className='flex w-full justify-center'>
      {/* 근무시간 */}
      {startTime && endTime && (
        <div className='flex flex-col justify-between w-[250px] h-[95px] p-[10px] rounded-[5px] bg-white border-[1px] border-solid border-primary'>
          <div className='flex justify-between items-center content-between'>
            <span className='font-h2 text-primary'>{moment(endTime).format('MM월 DD일')}</span>
            <div className='flex w-[60px] h-[20px] rounded-[50px] bg-primary text-white items-center justify-center'>종료</div>
          </div>
          <div className='font-body1'>{`${formattedTime(startTime)} - ${formattedTime(endTime)}`}</div>
        </div>
        // <div className='flex w-full h-[50px] items-center justify-center bg-white rounded-[5px] text-primary'>{`오늘 한 근무 ${getWorkTime()}`}</div>
      )}
      {startTime && !endTime ? (
        //출근 상태일 경우
        <div className='flex flex-col justify-between w-[250px] h-[153px] p-[10px] rounded-[5px] bg-white border-[1px] border-solid border-primary'>
          <div className='flex justify-between items-center content-between'>
            <span className='font-h2 text-primary'>근무</span>
            <div className='flex w-[60px] h-[20px] rounded-[50px] bg-primary text-white items-center justify-center'>진행중</div>
          </div>
          <div className='font-body1'>{`${formattedTime(startTime)} 부터 진행중`}</div>
          <CustomButton onClick={handleLeaveWorkClick} variant='contained' size='md' color='primary'>
            퇴근하기
          </CustomButton>
        </div>
      ) : (
        !startTime && (
          <CustomButton onClick={handleGoWorkClick} variant='contained' size='md' color='primary'>
            출근하기
          </CustomButton>
        )
      )}
    </div>
  );
};

export default AttendMenu;
