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
  // * 부서 생성
  const department_create = async (companyId: any, title: string) => {
    baseURLChange();
    return await axios.instance.post(`/companies/${companyId}/departments`, { title: title });
  };

  // * 부서 삭제
  const department_delete = async (companyId: any, departmentId: string) => {
    baseURLChange();
    return await axios.instance.delete(`/companies/${companyId}/departments/${departmentId}`);
  };

  // * 부서 내 근태관리자 변경
  const department_manager_edit = async (companyId: any, departmentId: any, userId: any) => {
    baseURLChange();
    return await axios.instance.patch(`/companies/${companyId}/departments/${departmentId}/leader`, { user_id: userId });
  };

  // * 계정 상세 조회
  const account_detail = async (companyId: number, userId: number) => {
    baseURLChange();
    return await axios.instance.get(`/companies/${companyId}/users/${userId}`);
  };

  // * 부서별 평균 근무시간 조회 (Bar 차트)
  const statistics_department = async (companyId: any) => {
    baseURLChange();
    return await axios.instance.get(`/companies/${companyId}/statistics/departments`);
  };

  // * 특정 부서의 근무 유형별 비율 (Pie 차트)
  const statistics_department_workType = async (companyId: any, workType: any, department_id: any) => {
    baseURLChange();
    return await axios.instance.get(`/companies/${companyId}/statistics/work-types/percentage`, {
      params: { type: workType, department_id: department_id },
    });
  };

  // * 전체 부서의 특정 데이터 랭킹 (Top 5)
  const statistics_ranking = async (companyId: any) => {
    baseURLChange();
    return await axios.instance.get(`/companies/${companyId}/statistics/rankings`, {});
  };

  return {
    admin_login,
    organization,
    department_create,
    department_delete,
    department_manager_edit,
    account_detail,
    statistics_department,
    statistics_department_workType,
    statistics_ranking,
  };
};

export default ADMIN_API();
