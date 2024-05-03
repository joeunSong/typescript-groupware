import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AttendMenu = () => {
  const [onWork, setOnWork] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    //API통신을 통해서 출근 상태 및 시간 확인
    // axios.get('/api/get').then((res) => {
    //   console.log(res.data);
    // });
  }, [onWork]);

  const handleGoWorkClick = () => {
    //출근 시간 등록 API
    const data = {
      email: 'sample@email.com',
      startTime: new Date().toISOString(),
      endTime: null,
    };
    //API 통신을 통해서 출근 시간 전송
    // axios
    //   .post('/api/attend', data)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => console.log(err));
    setStartTime(new Date());
    setOnWork(true);
  };

  const handleLeaveWorkClick = () => {
    //퇴근 시간 등록 API

    const data = {
      email: 'sample@email.com',
      startTime: new Date().toISOString(),
    };

    //API 통신을 통해서 퇴근 시간 전송
    // axios
    //   .post('/api/home', data)
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => console.log(err));
    setOnWork(false);
  };

  // 12시간제 시간과 오전/오후 구분, 분을 얻기 위한 함수
  function formatAMPM(date: Date): string {
    let hours: number = date.getHours();
    let minutes: number = date.getMinutes();
    const ampm: string = hours >= 12 ? '오후' : '오전';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시는 12시로 표현
    const strMinutes: string = minutes < 10 ? '0' + minutes : minutes.toString();
    const formattedTime: string = `${ampm} ${hours}:${strMinutes}`;
    return formattedTime;
  }

  return (
    <>
      {onWork ? (
        <div className='flex flex-col  gap-4 w-62 h-40 border-2 border-orange-500 p-2.5 rounded-md bg-white'>
          <div className=' text-2xl flex justify-between items-center font-bold text-orange-500 content-between'>
            근무
            <span className='w-16 h-5 rounded-lg bg-orange-500 text-xs text-white text-center text-base'>
              진행중
            </span>
          </div>

          <div className='text-ml'>{startTime && `${formatAMPM(startTime)} 부터 진행중`}</div>
          <button
            onClick={handleLeaveWorkClick}
            className='w-30 h-10 text-lg px-6 font-semibold rounded-md bg-orange-500 text-white'
          >
            퇴근 기록
          </button>
        </div>
      ) : (
        <button
          onClick={handleGoWorkClick}
          className='w-56 h-10 text-lg px-6 font-semibold rounded-md bg-orange-500 text-white'
        >
          출근 기록
        </button>
      )}
    </>
  );
};

export default AttendMenu;
