import { StringObject } from './../types/interface';
import axios from '../utils/axios';

const USER_API = () => {
  const baseURLChange = () => {
    axios.setBaseURL(process.env.REACT_APP_USER_LOCAL_SERVER);
  };

  const login = async ({ email, password }: StringObject) => {
    baseURLChange();
    return await axios.instance.post('/auth/login', {
      email,
      password,
    });
  };

  const profile = async () => {
    baseURLChange();
    return await axios.instance.get('users');
  };

  const commute_in = async ({ startAt, date, workType }: StringObject) => {
    baseURLChange();
    return await axios.instance.post('/commutes/in', { startAt, date, workType });
  };

  const commute_out = async ({ commuteId, endAt }: StringObject) => {
    baseURLChange();
    return await axios.instance.post(`/commutes/${commuteId}/out`, { endAt });
  };

  const commute_today_info = async (today: string) => {
    baseURLChange();
    return await axios.instance.get('commutes/status?date=' + today);
  };

  const commute_log = async (startDay: string, endDay: string) => {
    baseURLChange();
    return await axios.instance.get('commutes?startAt=' + startDay + '&endAt=' + endDay);
  };

  const commute_type = async () => {
    baseURLChange();
    return await axios.instance.get('/commutes/work-type');
  };

  const commute_edit = async ({ id, startAt, endAt, workTypeId }: StringObject) => {
    baseURLChange();
    return await axios.instance.put('/commutes/' + id, { startAt, endAt, workTypeId });
  };

  const is_editable = async (id: number) => {
    baseURLChange();
    return await axios.instance.get('/commutes/pendings/' + id);
  };

  // * 근태 신청 조회
  const commute_pendings = async () => {
    baseURLChange();
    return await axios.instance.get('/commutes/pendings');
  };

  // * 근태 신청 상세 조회
  const commute_pending_detail = async (pendingId: number) => {
    baseURLChange();
    return await axios.instance.get(`/commutes/pendings/${pendingId}`);
  };

  return {
    login,
    profile,
    commute_in,
    commute_out,
    commute_today_info,
    commute_log,
    commute_type,
    commute_edit,
    is_editable,
    commute_pendings,
    commute_pending_detail,
  };
};

export default USER_API();
