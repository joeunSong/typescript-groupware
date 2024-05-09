import axios from '../utils/axios';

// 관리자 로그인
export const API_ORGANIZATION = async (companyId: any) => {
  return await axios.instance.get(`/api/v1/companies/${companyId}/organizations`);
};
