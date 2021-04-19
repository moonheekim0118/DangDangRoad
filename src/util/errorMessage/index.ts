import * as MESSAGE from 'common/constant/string';

/** transform error code to Korean Message */
const errorMessage = {
  'auth/email-already-in-use': MESSAGE.EMAIL_ALREADY_IN_USE_ERROR,
  'auth/wrong-password': MESSAGE.WRONG_PASSWORD_ERROR,
  'auth/user-not-found': MESSAGE.USER_NOT_FOUND_ERROR,
  'Not verfied': MESSAGE.NOT_VERIFIED_ERROR,
  'Not exists data': MESSAGE.NOT_EXISTS_DATA,
  'Not treat as an Error': '',
  default: MESSAGE.DEFAULT_ERROR,
};

export default errorMessage;
