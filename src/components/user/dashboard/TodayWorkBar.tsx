import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Tooltip } from '@mui/material';

interface TodayWorkBarProps {
  todayWorkInfo: any;
}

function TodayWorkBar({ todayWorkInfo }: TodayWorkBarProps) {
  const [workTime, setWorkTime] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    //작업 시간 업데이트
    const updateWorkTime = () => {
      const start = moment(todayWorkInfo.startTime);
      const end = todayWorkInfo.endTime ? moment(todayWorkInfo.endTime) : moment();
      const diff = moment.duration(end.diff(start)).asMinutes();

      setWorkTime(Math.floor(diff));
    };

    if (todayWorkInfo.startTime && !todayWorkInfo.endTime) {
      updateWorkTime(); // 초기 작업 시간 업데이트
      intervalId = setInterval(updateWorkTime, 6000); // endTime이 없을 때만 반복
    } else if (todayWorkInfo.endTime) {
      updateWorkTime(); // endTime이 있을 경우 최종 작업 시간 업데이트
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [todayWorkInfo.startTime, todayWorkInfo.endTime]);

  //TodayWorkBar 위치 조정

  const startPlace = todayWorkInfo.startTime
    ? moment(moment(todayWorkInfo.startTime).toLocaleString()).diff(
        moment(moment(todayWorkInfo.startTime).toLocaleString()).clone().startOf('day'),
        'minutes',
      )
    : 0;

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
    todayWorkInfo.startTime && (
      <Tooltip title={getWorkTime(workTime)} placement='top'>
        <div
          className='bg-primary w-0 h-[30px]'
          style={{
            marginLeft: `calc(100%/1440 * ${startPlace})`,
            width: `calc(100%/1440 * ${workTime})`,
            minWidth: 1,
            //transition: 'all 0.5s ease',
          }}
        />
      </Tooltip>
    )
  );
}

export default TodayWorkBar;
