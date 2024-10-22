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

  // * 부서 조회
  const department = async (companyId: number) => {
    baseURLChange();
    return await axios.instance.get(`/companies/${companyId}/departments`);
  };

  // * 사용자 조회
  const users = async (companyId: number) => {
    baseURLChange();
    return await axios.instance.get(`/companies/${companyId}/users`);
  };

  // * 사용자 수정
  const user_edit = async (companyId: number, userId: number, data: any) => {
    baseURLChange();
    return await axios.instance.patch(`/companies/${companyId}/users/${userId}`, data);
  };

  // * 사용자 생성
  const user_create = async (companyId: number, data: any) => {
    baseURLChange();
    return await axios.instance.post(`/companies/${companyId}/users`, data);
  };

  // * 사용자 생성
  const user_delete = async (companyId: number, userId: number) => {
    baseURLChange();
    return await axios.instance.delete(`/companies/${companyId}/users/${userId}`);
  };

  // * 계정 상세 조회
  const account_detail = async (companyId: number, userId: number) => {
    baseURLChange();
    return await axios.instance.get(`/companies/${companyId}/users/${userId}`);
  };

  // * 근무 조회
  const getCommutes = async (companyId: number) => {
    baseURLChange();
    return await axios.instance.get(`/companies/${companyId}/commutes`);
  };

  // * 근무 상세 조회
  const getCommutes_detail = async (companyId: number, userId: number) => {
    baseURLChange();
    return await axios.instance.get(`/companies/${companyId}/commutes/${userId}`);
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

  // * 근무 시스템 조회
  const worksystem = async (companyId: any) => {
    baseURLChange();
    return await axios.instance.get(`/companies/${companyId}/worksystems`, {});
  };

  // * 근무 시스템 수정
  const edit_worksystem = async (companyId: any, workStartAt: any, workEndAt: any, BreakStartAt: any, BreakEndAt: any) => {
    baseURLChange();
    return await axios.instance.patch(`/companies/${companyId}/worksystems`, {
      work_start_at: workStartAt,
      work_end_at: workEndAt,
      break_start_at: BreakStartAt,
      break_end_at: BreakEndAt,
    });
  };

  return {
    admin_login,
    organization,
    department_create,
    department_delete,
    department_manager_edit,
    department,
    account_detail,
    users,
    user_edit,
    user_create,
    user_delete,
    getCommutes,
    getCommutes_detail,
    statistics_department,
    statistics_department_workType,
    statistics_ranking,
    worksystem,
    edit_worksystem,
  };
};

export default ADMIN_API();
