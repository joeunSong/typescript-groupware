import React, { useEffect, useState } from 'react';

const AttendMenu = () => {
  const [onWork, setOnWork] = useState<boolean>(false);

  useEffect(() => {
    //API통신을 통해서 출근 상태 확인
  }, [onWork]);

  const handleGoWorkClick = () => {
    //출근 시간 등록 API
    setOnWork(true);
  };

  const handleLeaveWorkClick = () => {
    //퇴근 시간 등록 API
    setOnWork(false);
  };

  return (
    <>
      {onWork ? (
        <div className='flex flex-col  gap-4 w-62 h-40 border-2 border-orange-500 p-2.5 rounded-md'>
          <div className=' text-2xl flex justify-between items-center font-bold text-orange-500 content-between'>
            근무
            <span className='w-16 h-5 rounded-lg bg-orange-500 text-xs text-white text-center text-base'>
              진행중
            </span>
          </div>

          <div className='text-lg'>오전 00:00부터 진행중</div>
          <button
            onClick={handleLeaveWorkClick}
            className='w-56 h-10 text-lg px-6 font-semibold rounded-md bg-orange-500 text-white'
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
