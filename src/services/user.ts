import axios from '../utils/axios';

interface LoginProps {
  email: string;
  password: string;
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

  return { login, profile };
};

export default USER_API();
