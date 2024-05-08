import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { CustomButton } from '../Components';

interface AttendMenuProps {
  userInfo?: any; //유저의 정보
  todayWorkInfo?: any; //당일 출퇴근 정보
  setTodayWorkInfo?: any; //당일 출퇴근 정보 변경 함수
  onWork?: boolean; //출근 여부
  setOnWork?: any; //출근 여부 상태 변경 함수
}

const AttendMenu = ({ userInfo, todayWorkInfo, setTodayWorkInfo, onWork, setOnWork }: AttendMenuProps) => {
  const [startTime, setStartTime] = useState<any>();
  const [endTime, setEndTime] = useState<any>();

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
      setTodayWorkInfo({ ...todayWorkInfo, startTime: curTime });
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
      setTodayWorkInfo({ ...todayWorkInfo, endTime: curTime });
      setOnWork(false);
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
  }, [onWork]);

  return (
    <div className='flex w-full justify-center'>
      {/* 근무시간 */}
      {endTime && (
        <div className='flex w-full h-[50px] items-center justify-center bg-white rounded-[5px] text-primary'>{`오늘 한 근무 ${getWorkTime()}`}</div>
      )}
      {onWork ? (
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
