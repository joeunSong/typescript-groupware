import moment from 'moment';

const KSTtoMMDD = (date: string) => {
  return moment(date).format('M월 D일');
};

const period = (startTime: string, endTime: string) => {
  // const startMoment = moment(startTime);
  // const endMoment = moment(endTime);

  // const diff = moment.duration(endMoment.diff(startMoment));

  // const hours = Math.floor(diff.asHours());
  // const minutes = diff.minutes();

  // moment 객체로 변환하고 초 단위를 제거
  const start = moment(startTime, 'YYYY-MM-DD HH:mm:ss').startOf('minute');
  const end = moment(endTime, 'YYYY-MM-DD HH:mm:ss').startOf('minute');

  // 시간 차이 계산 (분 단위)
  let diff = end.diff(start, 'minutes');

  //console.log(diff);
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  return `${hours}시간 ${minutes}분`;
};

export { KSTtoMMDD, period };
