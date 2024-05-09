import React from 'react';
import moment from 'moment';
import { Tooltip } from '@mui/material';

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

  return (
    workInfo?.startTime &&
    workInfo?.endTime && (
      <Tooltip
        title={`      
      ${workTime}분`}
        placement='top'
      >
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