import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

interface AttendMenuProps {
  userInfo?: any; //유저의 정보
  todayWorkInfo?: any; //당일 출퇴근 정보
  setTodayWorkInfo?: any; //당일 출퇴근 정보 변경 함수
  onWork?: boolean; //출근 여부
  setOnWork?: any; //출근 여부 상태 변경 함수
}

const AttendMenu = ({ userInfo, todayWorkInfo, setTodayWorkInfo, onWork, setOnWork }: AttendMenuProps) => {
  const [startTime, setStartTime] = useState<any>(todayWorkInfo?.startTime || null);
  const [endTime, setEndTime] = useState<any>(todayWorkInfo?.endTime || null);

  const handleGoWorkClick = () => {
    //출근 기록이 없을 경우 등록
    if (!startTime) {
      let curTime = new Date();
      //출근 시간 등록 API
      const data = {
        email: 'sample@email.com',
        startTime: curTime.toISOString(),
        endTime: null,
      };
      //API 통신을 통해서 출근 시간 전송
      // axios
      //   .post('/api/attend', data)
      //   .then((res) => {
      //     console.log(res.data);
      //   })
      //   .catch((err) => console.log(err));
      setStartTime(curTime);
      setOnWork(true);
    }
  };

  const handleLeaveWorkClick = () => {
    //퇴근 기록이 없을 경우 등록
    if (!endTime) {
      let curTime = new Date();
      //퇴근 시간 등록 API
      const data = {
        email: 'sample@email.com',
        endTime: curTime.toISOString(),
      };
      //API 통신을 통해서 퇴근 시간 전송
      // axios
      //   .post('/api/home', data)
      //   .then((res) => {
      //     console.log(res.data);
      //   })
      //   .catch((err) => console.log(err));
      setEndTime(curTime);
      setOnWork(false);
    }
  };

  //시간 format 변환
  const formattedTime = (startTime: any) => {
    let time = moment(startTime).format('A hh시 mm분');
    time = time.replace('AM', '오전').replace('PM', '오후');
    return time;
  };

  // 근무 시간 구하기
  const getWorkTime = () => {
    if (startTime && endTime) {
      let diff = moment.duration(moment(endTime).diff(moment(startTime))).asMinutes();
      diff = Math.floor(diff);
      return diff;
    }
  };

  console.log(startTime, endTime);

  return (
    <div className='flex w-full justify-center'>
      {/* 근무시간 */}
      {/* <div>{getWorkTime()}</div> */}
      {onWork ? (
        //출근 상태일 경우
        <div className='flex flex-col justify-between w-[250px] h-[153px] p-[10px] rounded-[5px] bg-white border-solid border-primary'>
          <div className='flex justify-between items-center content-between'>
            <span className='font-h2 text-primary'>근무</span>
            <span className='w-[60px] h-[20px] rounded-[50px] bg-primary text-white text-center'>진행중</span>
          </div>

          <div className='font-body1'>{`${formattedTime(startTime)}부터 진행중`}</div>
          <button
            onClick={handleLeaveWorkClick}
            className='text-white w-[230px] h-[45px] bg-primary rounded-[5px] font-body1-bold border-transparent'
          >
            퇴근하기
          </button>
        </div>
      ) : (
        //퇴근 상태일 경우
        <button onClick={handleGoWorkClick} className='text-white w-[230px] h-[45px] bg-primary rounded-[5px] font-body1-bold border-transparent'>
          출근하기
        </button>
      )}
    </div>
  );
};

export default AttendMenu;
