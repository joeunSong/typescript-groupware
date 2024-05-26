import moment from 'moment';
import { isToday } from './dateUtil';

const findWorkStatus = (attendInfo: any) => {
  const { isLate, isOver, isNormal, date } = attendInfo;

  if (isNormal === false && !isToday(date)) {
    return '비정상';
  }
  if (isLate === true) {
    return '지각';
  }
  if (isOver === true) {
    return '초과';
  }
  return '정상';
};

export default findWorkStatus;
