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
