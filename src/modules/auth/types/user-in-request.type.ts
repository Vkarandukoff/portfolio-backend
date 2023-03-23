import { GoogleUserType } from './google.type';

export type GoogleUserInRequestType = {
  user: GoogleUserType;
};

export type UserType = {
  userId: number;
  username: string;
};
export type UserInRequest = {
  user: UserType;
};
