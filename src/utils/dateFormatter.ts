import moment from 'moment';

const KSTtoMMDD = (date: string) => {
  return moment(date).format('M월 D일');
};

const period = (startTime: string, endTime: string) => {
  const startMoment = moment(startTime);
  const endMoment = moment(endTime);

  const diff = moment.duration(endMoment.diff(startMoment));

  const hours = Math.floor(diff.asHours());
  const minutes = diff.minutes();

  return `${hours}시간 ${minutes}분`;
};

export { KSTtoMMDD, period };
