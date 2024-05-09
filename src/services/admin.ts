import axios from '../utils/axios';

const ADMIN_API = () => {
  const baseURLChange = () => {
    axios.setBaseURL(process.env.REACT_APP_ADMIN_LOCAL_SERVER);
  };

  // * 관리자 로그인
  const admin_login = async (userName: string, password: string) => {
    baseURLChange();
    return await axios.instance.post('/auth/login', { email: userName, password: password });
  };

  // * 조직도 조회
  const organization = async (companyId: any) => {
    baseURLChange();
    return await axios.instance.get(`/companies/${companyId}/organizations`);
  };

  return { admin_login, organization };
};

export default ADMIN_API();
