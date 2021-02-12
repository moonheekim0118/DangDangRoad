export interface ReqResult {
  isError: boolean;
  errorMessage: string;
}

export interface AuthResult {
  authenticated: boolean;
  userId: string;
}
