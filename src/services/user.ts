import axios from '../utils/axios';

interface LoginProps {
  email: string;
  password: string;
}

interface CommuteInProps {
  startAt: string;
  date: string;
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

  const commute_in = async ({ startAt, date }: CommuteInProps) => {
    baseURLChange();
    return await axios.instance.post('/commutes/in', { startAt, date });
  };

  const commute_out = async ({ commuteId, endAt }: CommuteOutProps) => {
    baseURLChange();
    return await axios.instance.post(`/commutes/${commuteId}/out`, { endAt });
  };

  const commute_info = async () => {
    baseURLChange();
    return await axios.instance.get('', {});
  };

  return { login, profile, commute_in, commute_out };
};

export default USER_API();
