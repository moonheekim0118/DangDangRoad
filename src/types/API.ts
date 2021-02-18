export interface ReqResult {
  isError: boolean;
  errorMessage?: string;
}

export interface AuthResult {
  userId: string;
  isLoggedIn: boolean;
}
