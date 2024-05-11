export interface User {
  id: number
  name: string
}

export interface StringObject {
  [key: string]: string;
}

export interface Account {
  id: number;
  address: string;
  birthday: string;
  country: string;
  email: string;
  employee_number: string;
  enter_date: string;
  is_admin: boolean;
  is_leader: false;
  name: string;
  sex: string;
  tel: string;
  company_name: string;
  rank_title: string;
  department_title: string;
  created_date: string;
}
