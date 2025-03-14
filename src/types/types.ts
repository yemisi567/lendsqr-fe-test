
export interface ILoginDetails {
  email: string | null;
  password: string | null;
}
export type UserStatus = "Inactive" | "Pending" | "Active" | "Blacklisted"

export interface IUser {
  id: string;
  username: string;
  BVN: string;
  name: string;
  account_number: number;
  bank_name: string;
  email: string;
  phone: string;
  date_joined: string;
  status: UserStatus;
  monthly_income: string;
  repayment: string;
  company: string;
  facebook: string;
  twitter: string;
  instagram: string;
  education: string;
  children: string | number;
  employment: string;
  guarantors: {
    name: string;
    email: string;
    phone: string;
    relationship: string;
  }[];
  marital_status: string;
  office_email: string;
  residence: string;
  duration: number;
  sector: string;
  gender: string;
}

export interface UsersState {
  users: IUser[] | null,
  loading: boolean,
  error: string | null,
}

