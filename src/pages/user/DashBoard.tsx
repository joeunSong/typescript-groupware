import { useEffect, useState } from 'react';
import TimelineBar from '../../components/user/dashboard/TimelineBar';
import TodayWorkBar from '../../components/user/dashboard/TodayWorkBar';
import WorkBar from '../../components/user/dashboard/WorkBar';
import moment from 'moment';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import USER_API from '../../services/user';
import { useHoliday } from '../../hooks/useHoliday';

interface UserDashBoardProps {
  userInfo?: any;
  onWork?: boolean;
  setOnWork?: any;
  todayWorkInfo?: any;
  setTodayWorkInfo?: any;
  todayWorkInfoList?: any; //오늘근무 정보 리스트
}

const UserDashBoard = ({ userInfo, onWork, setOnWork, todayWorkInfo, setTodayWorkInfo, todayWorkInfoList }: UserDashBoardProps) => {
  const [currentWeek, setCurrentWeek] = useState<string[]>([]);
  const workDays = ['월', '화', '수', '목', '금', '토', '일'];
  const [weekWorkInfo, setWeekWorkInfo] = useState<any>([]);

  const { getHolidayList } = useHoliday();
  const holidayList = getHolidayList();

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
      //setBaseURL('http://localhost:8080/api/');
      //const response = await instance.get('commutes?startAt=' + startDay + '&endAt=' + endDay);
      const response = await USER_API.commute_log(startDay, endDay);
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
  }, [currentWeek, onWork]);

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

  //공휴일인지 판단
  const isHoliday = (day: string) => {
    const holiday = holidayList.find((holiday) => moment(holiday.date).isSame(day, 'date'));
    return holiday?.name;
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
                <div className='flex text-primary gap-[10px]'>
                  {workDays[idx]} <CheckCircleIcon />
                </div>
              ) : idx === 5 || idx === 6 || isHoliday(_day) ? (
                <div className='text-red'>{workDays[idx]} </div>
              ) : (
                <div>{workDays[idx]} </div>
              )}
              <div>
                {_day}
                {/* 공휴일 표시 */}
                <div className='text-red'>{isHoliday(_day)}</div>
              </div>
            </div>
            <div className='flex flex-1 items-center relative'>
              {/* //해당 날짜에 해당하는 workInfo 추출 */}
              {weekWorkInfo
                .filter((_info: any) => isSameDate(_day, _info.startAt))
                .map((_it: any) => {
                  return <WorkBar workInfo={_it} />;
                })}

              {/* 퇴근 시간을 기록하지 않은 오늘 근무 */}
              {isToday(_day) && todayWorkInfo && !todayWorkInfo.endAt && <TodayWorkBar todayWorkInfo={todayWorkInfo} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashBoard;
