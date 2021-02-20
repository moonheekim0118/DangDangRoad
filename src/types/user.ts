export interface UserType {
  isLoggedIn: boolean;
  userId: string;
  email: string;
  nickname: string;
  profilePic: string;
}

export type MutateType = (
  data?: any,
  shouldRevalidate?: boolean | undefined
) => Promise<any>;
