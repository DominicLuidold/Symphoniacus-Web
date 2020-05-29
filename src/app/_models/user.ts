export interface User {
  username: string;
  userType: UserType;
  fullName: string;
  jwtToken?: string;
}

export enum UserType {
  DOMAIN_MUSICIAN
}
