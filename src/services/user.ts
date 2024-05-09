import axios from '../utils/axios';
import * as ENDPOINT from '../constants/apiEndpoints';

interface LoginProps {
  email: string;
  password: string;
}

const USER_API = () => {
  axios.setBaseURL(process.env.REACT_APP_USER_LOCAL_SERVER);

  const login = async ({ email, password }: LoginProps) => {
    return await axios.instance.post(ENDPOINT.USER_LOGIN, {
      email,
      password,
    });
  };

  return { login };
};

export default USER_API();
