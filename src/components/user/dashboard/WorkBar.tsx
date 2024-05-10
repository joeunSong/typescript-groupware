import React from 'react';
import moment from 'moment';
import { Tooltip } from '@mui/material';

interface workBarProps {
  workInfo: any;
}

function WorkBar({ workInfo }: workBarProps) {
  // 출근 시간과 퇴근 시간
  const startTime = moment(workInfo?.startAt);
  const endTime = moment(workInfo?.endAt);

  // 출근부터 퇴근까지의 시간 계산
  let workTime = moment.duration(endTime.diff(startTime)).asMinutes();
  workTime = Math.floor(workTime);

  // 하루 시작부터 출근까지의 시간 계산
  const startOfDay = startTime.clone().startOf('day');
  const startPlace = startTime.diff(startOfDay, 'minutes');

  // 근무 시간 구하기
  const getWorkTime = (diff: number) => {
    if (diff >= 60) {
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;
      return `${hours}시간 ${minutes}분`;
    } else {
      return `${diff}분`;
    }
  };

  return (
    workInfo?.startAt &&
    workInfo?.endAt && (
      <Tooltip title={getWorkTime(workTime)} placement='top'>
        <div
          className='bg-primary w-0 h-[30px]'
          style={{
            marginLeft: `calc(100%/1440 * ${startPlace})`,
            width: `calc(100%/1440 * ${workTime})`,
            transition: 'all 0.5s ease',
          }}
        />
      </Tooltip>
    )
  );
}

export default WorkBar;
