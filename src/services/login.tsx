import axios from '../utils/axios';

// 관리자 로그인
export const ADMIN_LOGIN = async (userName: string, password: string) => {
  return await axios.instance.post('/api/v1/auth/login', { email: userName, password: password });
};
