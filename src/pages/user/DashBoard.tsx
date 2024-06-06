import { useEffect, useState } from 'react';
import TimelineBar from '../../components/user/dashboard/TimelineBar';
import TodayWorkBar from '../../components/user/dashboard/TodayWorkBar';
import WorkBar from '../../components/user/dashboard/WorkBar';
import moment from 'moment';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIoNewIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';
import USER_API from '../../services/user';
import { useHoliday } from '../../hooks/useHoliday';
import findWorkStatus from '../../utils/findWorkStatus';
import { isSameDate, isToday } from '../../utils/dateUtil';
import { DayWork, WorkRecord } from '../../types/interface';
import CustomChip from '../../components/user/Customchip';

interface UserDashBoardProps {
  userInfo?: any;
  onWork?: boolean;
  setOnWork?: any;
  todayWorkInfoList?: DayWork[]; //오늘근무 정보 리스트
  todayWorkInfo: DayWork;
  setTodayWorkInfo?: React.Dispatch<DayWork>;
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
    //let startDay = moment(`${currentWeek[0]} 00:00:00`, 'YYYY-MM-DD HH:mm:ss').toISOString();
    //let endDay = moment(`${currentWeek[6]} 23:59:59.999`, 'YYYY-MM-DD HH:mm:ss').toISOString();
    let startDay = moment(currentWeek[0]).startOf('day').toISOString();
    let endDay = moment(currentWeek[6]).endOf('day').toISOString();

    try {
      const response = await USER_API.commute_log(startDay, endDay);
      const data = response.data;
      //console.log(data);
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

  //공휴일인지 판단
  const isHoliday = (day: string) => {
    const holiday = holidayList.find((holiday) => moment(holiday.date).isSame(day, 'date'));
    return holiday?.name;
  };

  //
  const findDayWork = (day: string) => {
    const todayInfo = weekWorkInfo.find((_info: DayWork) => isSameDate(day, _info.startAt));
    return todayInfo ? todayInfo : null;
    // if (todayInfo) {
    //   return findWorkStatus(todayInfo);
    // }
    // return null;
  };

  const foramttedDay = (day: string) => {
    return moment(day, 'YYYY.MM.DD').date();
  };

  // 근무 시간 구하기
  const getWorkTime = (day: string) => {
    const workInfo = weekWorkInfo.find((_info: DayWork) => isSameDate(day, _info.startAt));

    if (!workInfo) {
      return;
    }

    const { startAt, endAt, isNormal, date } = workInfo;

    //이상근무
    if (isNormal === false) {
      //당일근무
      if (isToday(date)) {
        return '근무중';
      } else {
        return '퇴근 미등록';
      }
    }

    // const start = moment(startAt);
    // const end = moment(endAt);
    // // 출근부터 퇴근까지의 시간 계산
    // let workTime = moment.duration(end.diff(start)).asMinutes();
    // let diff = Math.floor(workTime);

    // moment 객체로 변환하고 초 단위를 제거
    const start = moment(startAt, 'YYYY-MM-DD HH:mm:ss').startOf('minute');
    const end = moment(endAt, 'YYYY-MM-DD HH:mm:ss').startOf('minute');

    // 시간 차이 계산 (분 단위)
    let diff = end.diff(start, 'minutes');

    //console.log(diff);
    if (diff >= 60) {
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;
      return `${hours}시간 ${minutes}분`;
    } else {
      return `${diff}분`;
    }
  };

  return (
    <div className='flex flex-col w-full h-full p-[10px] font-body1'>
      <div className='flex'>
        <div className='flex items-center mb-[10px] rounded-[10px] font-body1-bold border border-solid border-[#e0e1e2]'>
          <IconButton className='flex items-center justify-center' onClick={handlePreviousWeek}>
            <ArrowBackIosNewIcon onClick={handlePreviousWeek} />
          </IconButton>
          {/* <button onClick={handlePreviousWeek}>{'<'}</button> */}
          <div className='p-[10px] h-[100%] border-solid border-[#e0e1e2] border-l-[1px] border-r-[1px]'>{`${currentWeek[0]} - ${currentWeek[6]}`}</div>
          <IconButton onClick={handleNextWeek}>
            <ArrowForwardIoNewIcon className='flex items-center justify-center' onClick={handlePreviousWeek} />
          </IconButton>
          {/* <button onClick={handleNextWeek}>{'>'}</button> */}
        </div>
      </div>

      <TimelineBar />
      <div className='flex flex-col h-full'>
        {currentWeek.map((_day: string, idx: number) => (
          // // <div key={idx} className='flex-1 flex border-solid border-t-[1px] border-[#e0e1e2] hover:bg-[#f6f7f7]'>
          <div key={idx} className='flex-1 flex border-solid border-t-[1px] border-[#e0e1e2]'>
            <div className='flex gap-[10px] p-[10px] items-center w-[200px] min-h-[60px] border-solid border-r-[1px] relative border-[#e0e1e2] font-body1-bold'>
              {idx === 5 || idx === 6 || isHoliday(_day) ? (
                <div className='text-red text-[16px]'>{workDays[idx]} </div>
              ) : (
                <div className='text text-[16px]'>{workDays[idx]} </div>
              )}

              {isToday(_day) ? (
                <div className='flex bg-primary items-center justify-center text-white rounded-[50%] w-[25px] h-[25px]'>{foramttedDay(_day)}</div>
              ) : (
                <div className='flex items-center justify-center w-[25px]'>{foramttedDay(_day)}</div>
              )}

              {/* 공휴일 표시 */}
              {/* {isHoliday(_day) && <div className='absolute left-2.5 bottom-2 text-[12px] text-[red]'>{isHoliday(_day)}</div>} */}

              <div className='flex-1 flex flex-col items-center justify-center gap-[10px]'>
                <>
                  {/* 커스텀 칩 사용 */}
                  {findDayWork(_day) && <CustomChip workInfo={findDayWork(_day)} />}
                  {/* //근무 시간 */}
                  {getWorkTime(_day) && (
                    <div className='flex text-[10px] min-w-[60px] h-[20px] rounded-[5px]  text-[#777777] border border-solid border-[#777777]  items-center justify-center'>
                      {getWorkTime(_day)}
                    </div>
                  )}
                </>
              </div>
            </div>
            <div className={`flex flex-1 items-center relative ${isHoliday(_day) ? 'bg-[#F5F5F5]' : ''}`}>
              {/* //해당 날짜에 해당하는 workInfo 추출 */}
              {weekWorkInfo
                .filter((_info: WorkRecord) => isSameDate(_day, _info.startAt))
                .map((_it: WorkRecord) => {
                  //console.log(_it);
                  return isToday(_day) ? <TodayWorkBar todayWorkInfo={_it} /> : <WorkBar workInfo={_it} />;
                })}

              {/* 퇴근 시간을 기록하지 않은 오늘 근무 */}
              {/* {isToday(_day) && todayWorkInfo && !todayWorkInfo.endAt && <TodayWorkBar todayWorkInfo={todayWorkInfo} />} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashBoard;
