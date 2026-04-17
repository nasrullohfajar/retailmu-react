interface IUser {
  _id: string;
  username: string;
  name: string;
  role: string;
}

export interface IAuth {
  username: string;
  password: string;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
}

export interface IAuthResponseLogin extends IAuthResponse {
  data: IUser;
}
