import axios from '../utils/axios';

interface LoginProps {
  email: string;
  password: string;
}

interface CommuteInProps {
  startAt: string;
  date: string;
  workType: string;
}

interface CommuteOutProps {
  commuteId: string;
  endAt: string;
}

const USER_API = () => {
  const baseURLChange = () => {
    axios.setBaseURL(process.env.REACT_APP_USER_LOCAL_SERVER);
  };

  const login = async ({ email, password }: LoginProps) => {
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

  const commute_in = async ({ startAt, date, workType }: CommuteInProps) => {
    baseURLChange();
    return await axios.instance.post('/commutes/in', { startAt, date, workType });
  };

  const commute_out = async ({ commuteId, endAt }: CommuteOutProps) => {
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

  return { login, profile, commute_in, commute_out, commute_today_info, commute_log, commute_type };
};

export default USER_API();
