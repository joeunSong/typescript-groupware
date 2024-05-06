import React from 'react';
import moment from 'moment';

interface workBarProps {
  workInfo: any;
}

function WorkBar({ workInfo }: workBarProps) {
  // 출근 시간과 퇴근 시간
  const startTime = moment(workInfo?.startTime);
  const endTime = moment(workInfo?.endTime);

  // 출근부터 퇴근까지의 시간 계산
  let workTime = moment.duration(endTime.diff(startTime)).asMinutes();
  workTime = Math.floor(workTime);

  // 하루 시작부터 출근까지의 시간 계산
  const startOfDay = startTime.clone().startOf('day');
  const startPlace = startTime.diff(startOfDay, 'minutes');
  console.log(startTime, startPlace);

  return (
    workInfo?.startTime &&
    workInfo?.endTime && (
      <div
        className='bg-primary w-0'
        style={{
          marginLeft: `calc(100%/1440 * ${startPlace})`, // 하루 중 시작 위치
          width: `calc(100%/1440 * ${workTime})`, // 근무 시간에 비례하는 너비
          transition: 'all 0.5s ease', // 부드러운 전환 효과
        }}
      >
        {workTime}분
      </div>
    )
  );
}

export default WorkBar;
