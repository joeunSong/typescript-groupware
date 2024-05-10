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

  const department_create = async (companyId: any, title: string) => {
    baseURLChange();
    return await axios.instance.post(`/companies/${companyId}/departments`, { title: title });
  };

  const department_manager_edit = async (companyId: any, departmentId: any, userId: any) => {
    baseURLChange();
    return await axios.instance.patch(`/companies/${companyId}/departments/${departmentId}/leader`, { user_id: userId });
  };

  return { admin_login, organization, department_create, department_manager_edit };
};

export default ADMIN_API();
