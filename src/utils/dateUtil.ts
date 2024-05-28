import moment from 'moment';

// 오늘인지 확인하는 함수
export const isToday = (day: string) => {
  const currentDate = moment().format('YYYY-MM-DD');
  return moment(day, 'YYYY.MM.DD').isSame(currentDate, 'day');
};

// 같은 날짜인지 확인하는 함수
export const isSameDate = (day: string, day2: any) => {
  const currentDate = moment(day2).format('YYYY-MM-DD');
  return moment(day, 'YYYY.MM.DD').isSame(currentDate, 'day');
};

//근무 가능여부 확인
export const checkAttendTime = (holidayList: any) => {
  const givenDate = moment();

  // 주말인지 확인 (0: 일요일, 6: 토요일)
  const isWeekend = givenDate.day() === 0 || givenDate.day() === 6;

  // 공휴일인지 확인

  const isHoliday = holidayList?.find((holiday: any) => moment(holiday.date).isSame(givenDate, 'date'));
  //const isHoliday = holidays.includes(givenDate.format('YYYY-MM-DD'));

  // 새벽 12시부터 4시 사이인지 확인
  const hour = givenDate.hour();
  const isEarlyMorning = hour >= 0 && hour < 4;

  // console.log(isWeekend);
  // console.log(holidayList);
  // console.log(isHoliday);
  // console.log(isEarlyMorning);

  return !isWeekend && !isHoliday && !isEarlyMorning;
};
