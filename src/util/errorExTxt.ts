import * as MESSAGE from 'common/constant/string';

/** transform error code to Korean Message */
const errorExTxt = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return MESSAGE.EMAIL_ALREADY_IN_USE_ERROR;
    case 'auth/wrong-password':
      return MESSAGE.WRONG_PASSWORD_ERROR;
    case 'auth/user-not-found':
      return MESSAGE.USER_NOT_FOUND_ERROR;
    case 'Not verfied':
      return MESSAGE.NOT_VERIFIED_ERROR;
    case 'Not exists data':
      return MESSAGE.NOT_EXISTS_DATA;
    case 'Not treat as an Error':
      return '';
    default:
      return MESSAGE.DEFAULT_ERROR;
  }
};

export default errorExTxt;
