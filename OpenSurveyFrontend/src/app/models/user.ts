export interface UserForLogin {
  email: string;
  password?: string;
  userName?: string;
  token?: string;
  refreshToken?: string;
}

export interface UserInfo {
  email: string;
  userName?: string;
  isActive: boolean;
}

export interface UserInfoCom {
  user: {
    email: string;
    userName?: string;
    isActive: boolean;
  };
  userGroups: number;
}

export interface UserRegister {
  Email: string;
  Password?: string;
  Username: string;
}
