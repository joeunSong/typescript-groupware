import { useEffect, useState } from 'react';
import TimelineBar from '../../components/user/dashboard/TimelineBar';
import TodayWorkBar from '../../components/user/dashboard/TodayWorkBar';
import WorkBar from '../../components/user/dashboard/WorkBar';
import moment from 'moment';
import ApiClient from '../../utils/axios';
import axios from 'axios';
import { ACCESS_TOKEN } from '../../constants/constant';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

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
    // {
    //   startTime: new Date('2024-05-01 10:00:00'),
    //   endTime: new Date('2024-05-01 11:00:00'),
    // },
    // {
    //   startTime: new Date('2024-05-02 10:20:00'),
    //   endTime: new Date('2024-05-02 10:40:00'),
    // },
    // {
    //   startTime: new Date('2024-05-03 10:20:00'),
    //   endTime: new Date('2024-05-03 10:40:00'),
    // },
    // {
    //   startTime: new Date('2024-05-04 10:20:00'),
    //   endTime: new Date('2024-05-04 10:40:00'),
    // },
    // {
    //   startTime: new Date('2024-05-05 10:20:00'),
    //   endTime: new Date('2024-05-05 10:40:00'),
    // },
    // {
    //   startTime: new Date('2024-05-06 10:20:00'),
    //   endTime: new Date('2024-05-06 10:40:00'),
    // },
    // {
    //   startTime: new Date('2024-05-07 10:20:00'),
    //   endTime: new Date('2024-05-07 10:40:00'),
    // },
  ]);
  const { instance, setBaseURL } = ApiClient;

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

  //TODO :일주일 근무 정보 받아오기
  const getWeekWorkInfo = async () => {
    let startDay = moment(`${currentWeek[0]} 00:00:00`, 'YYYY-MM-DD HH:mm:ss').toISOString();
    let endDay = moment(`${currentWeek[6]} 23:59:59`, 'YYYY-MM-DD HH:mm:ss').toISOString();

    try {
      setBaseURL('http://localhost:8080/api/');
      const response = await instance.get('commutes?startAt=' + startDay + '&endAt=' + endDay);
      const data = response.data;
      console.log(data);
      setWeekWorkInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  // 이번 주의 정보 가져오기
  useEffect(() => {
    const currentDate = moment();
    getWeekDates(currentDate);
  }, []);

  useEffect(() => {
    if (currentWeek[0] && currentWeek[6]) {
      getWeekWorkInfo();
    }
  }, [currentWeek]);

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
  const isToday = (day: string) => {
    const currentDate = moment().format('YYYY-MM-DD');
    return moment(day, 'YYYY.MM.DD').isSame(currentDate, 'day');
  };

  const isSameDate = (day: string, day2: any) => {
    const currentDate = moment(day2).format('YYYY-MM-DD');
    //console.log(moment(day, 'YYYY.MM.DD').isSame(currentDate, 'day'));
    return moment(day, 'YYYY.MM.DD').isSame(currentDate, 'day');
  };

  return (
    <div className='flex flex-col w-full h-full p-[10px] font-body1'>
      <div className='mb-[10px] font-body1-bold'>
        <IconButton onClick={handlePreviousWeek}>
          <ArrowBackIosIcon />
        </IconButton>
        {/* <button onClick={handlePreviousWeek}>{'<'}</button> */}
        {`${currentWeek[0]} - ${currentWeek[6]}`}
        <IconButton onClick={handleNextWeek}>
          <ArrowForwardIosIcon />
        </IconButton>
        {/* <button onClick={handleNextWeek}>{'>'}</button> */}
      </div>

      <TimelineBar />
      <div className='flex flex-col h-full'>
        {currentWeek.map((_day: string, idx: number) => (
          <div key={idx} className='flex-1 flex border-solid border-t-[1px] border-primary'>
            <div className='flex justify-between p-[10px] items-center w-[200px] border-solid border-r-[1px] border-primary font-body1-bold'>
              {isToday(_day) ? (
                <div className='text-primary'>{workDays[idx]} </div>
              ) : idx === 5 || idx === 6 ? (
                <div className='text-red'>{workDays[idx]} </div>
              ) : (
                <div>{workDays[idx]} </div>
              )}{' '}
              {_day}
            </div>
            <div className='flex flex-1 items-center'>
              {isToday(_day) ? (
                <TodayWorkBar todayWorkInfo={todayWorkInfo} />
              ) : (
                <WorkBar workInfo={weekWorkInfo.find((_info: any) => isSameDate(_day, _info.startAt))} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashBoard;
