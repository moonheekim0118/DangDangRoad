export interface ReqResult {
  isError: boolean;
  errorMessage?: string;
}

export interface AuthResult {
  isLoggedIn: boolean;
  userId: string;
  nickname: string;
  email: string;
  profilePic: string;
}
