import { useEffect, useState } from 'react';
import TimelineBar from '../../components/user/dashboard/TimelineBar';
import TodayWorkBar from '../../components/user/dashboard/TodayWorkBar';
import WorkBar from '../../components/user/dashboard/WorkBar';
import moment from 'moment';

interface UserDashBoardProps {
  userInfo?: any;
  onWork?: boolean;
  setOnWork?: any;
  todayWorkInfo?: any;
  setTodayWorkInfo?: any;
}

const UserDashBoard = ({ userInfo, onWork, setOnWork, todayWorkInfo, setTodayWorkInfo }: UserDashBoardProps) => {
  const [currentWeek, setCurrentWeek] = useState<string[]>([]);
  const workDays = ['월', '화', '수', '목', '금', '토', '일'];
  const [weekWorkInfo, setWeekWorkInfo] = useState<any>([
    {
      startTime: new Date('2024-05-01 10:00:00'),
      endTime: new Date('2024-05-01 11:00:00'),
    },
    {
      startTime: new Date('2024-05-02 10:20:00'),
      endTime: new Date('2024-05-02 10:40:00'),
    },

    {
      startTime: new Date('2024-05-03 10:20:00'),
      endTime: new Date('2024-05-03 10:40:00'),
    },
    {
      startTime: new Date('2024-05-04 10:20:00'),
      endTime: new Date('2024-05-04 10:40:00'),
    },
    {
      startTime: new Date('2024-05-05 10:20:00'),
      endTime: new Date('2024-05-05 10:40:00'),
    },
    {
      startTime: new Date('2024-05-06 10:20:00'),
      endTime: new Date('2024-05-06 10:40:00'),
    },
    {
      startTime: new Date('2024-05-07 10:20:00'),
      endTime: new Date('2024-05-07 10:40:00'),
    },
  ]);

  // 해당 주의 정보를 가져오는 함수
  const getWeekDates = (date: moment.Moment) => {
    const dates = [];
    for (let i = 1; i <= 7; i++) {
      const day = date
        .clone()
        .startOf('isoWeek')
        .add(i - 1, 'days');
      dates.push(day.format('YYYY.MM.DD'));
    }

    setCurrentWeek(dates);
  };

  // 이번 주의 정보 가져오기
  useEffect(() => {
    const currentDate = moment();
    getWeekDates(currentDate);
  }, []);

  useEffect(() => {
    //TODO :일주일 근무 정보 받아오기
  }, [onWork]);

  // 이전 주로 이동하는 함수
  const handlePreviousWeek = () => {
    const prevMonday = moment(currentWeek[0], 'YYYY.MM.DD').subtract(1, 'week');
    getWeekDates(prevMonday);
  };

  // 다음 주로 이동하는 함수
  const handleNextWeek = () => {
    const nextMonday = moment(currentWeek[0], 'YYYY.MM.DD').add(1, 'week');
    getWeekDates(nextMonday);
  };

  // 같은 날짜인지 확인하는 함수
  const isSameDate = (day: string) => {
    const currentDate = moment().format('YYYY-MM-DD');
    return moment(day, 'YYYY.MM.DD').isSame(currentDate, 'day');
  };

  return (
    <div className='flex flex-col w-full h-full p-[10px] gap-[10px]'>
      <div>
        <button onClick={handlePreviousWeek}>{'<'}</button>
        {`${currentWeek[0]} - ${currentWeek[6]}`}
        <button onClick={handleNextWeek}>{'>'}</button>
      </div>

      <TimelineBar />

      {currentWeek.map((_day: string, idx: number) => (
        <div key={idx} className='flex h-[70px]'>
          <div className='w-[200px]'>
            {workDays[idx]} {_day}
          </div>
          <div className='flex flex-1'>{isSameDate(_day) ? <TodayWorkBar todayWorkInfo={todayWorkInfo} /> : <WorkBar workInfo={null} />}</div>
        </div>
      ))}
    </div>
  );
};

export default UserDashBoard;
