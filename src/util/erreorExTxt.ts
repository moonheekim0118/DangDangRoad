/** transform error code to Korean Message */
const errorExTxt = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return '이미 사용중인 이메일 입니다';
    case 'auth/wrong-password':
      return '잘못된 비밀번호 입니다.';
    case 'auth/user-not-found':
      return '존재하지 않는 이메일 입니다.';
    case 'Not verfied':
      return '이메일 인증을 완료해주세요';
    default:
      return '잠시후 다시 시도해주세요';
  }
};

export default errorExTxt;
