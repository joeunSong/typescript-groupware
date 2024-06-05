export interface StringObject {
  [key: string]: string;
}

interface Company {
  id: number;
  name: string;
  address: string;
  tel: string;
}

interface Department {
  id: number;
  title: string;
  company: Company;
}

interface Rank {
  id: number;
  title: string;
  company: Company;
}

export interface User {
  id: number;
  address: string;
  birthday: string;
  country: string;
  email: string;
  employee_number: string;
  enter_date: string;
  is_admin: boolean;
  is_leader: boolean;
  name: string;
  sex: string;
  tel: string;
  company: Company;
  department: Department;
  rank: Rank;
  created_date: string;
}

export interface DayWork {
  id: number;
  date: string;
  startAt: string;
  endAt: string;
  isBreak: boolean;
  isLate: boolean;
  isNormal: boolean;
  isOver: boolean;
  workType: WorkType;
}

export interface WorkType {
  id: number;
  isDefault: boolean;
  isEnable: boolean;
  title: string;
}

export interface WorkRecord extends DayWork {
  user: User;
}
