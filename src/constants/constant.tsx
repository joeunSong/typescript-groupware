import { StringObject } from '../types/interface';

// * Global
export const ACCESS_TOKEN = 'access_token';
export const COMPANY_ID = 'company_id';
export const USER_ID = 'user_id';
export const LOGIN_AUTH = 'login_auth';

// * Chart
export const BAR_CHART_BORDER = 12;
export const RANK_LABELS: any = { top_hour: '근무시간', top_late: '지각 데이터', top_not_normal: '이상근무 데이터' };
export const CHART_COLORS = [
  '#1A16F3',
  '#FCAA0B',
  '#343C6A',
  '#ffd1a8',
  '#ffe6b1',
  '#c4ffb5',
  '#a8ffd1',
  '#acdfe0',
  '#ceb6ff',
  '#b5e2ff',
  '#f6b2a2',
  '#ffc9de',
  '#ffdea8',
  '#e1ffac',
  '#acd7f6',
  '#d1ffea',
  '#b1e4ff',
  '#f6e0ac',
  '#b8a8ff',
  '#ffacd7',
];

// * WorkType
export const WORKTYPE_ID = {
  근무: '1',
  외근: '2',
  '재택 근무': '3',
} as StringObject;
