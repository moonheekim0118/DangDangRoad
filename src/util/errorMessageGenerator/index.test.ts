import errorMessageGenerator from '.';
import * as MESSAGE from 'common/constant/string';

describe('should return correct ErrorMessage', () => {
  test('email already in use Error', () => {
    expect(errorMessageGenerator('auth/email-already-in-use')).toBe(
      MESSAGE.EMAIL_ALREADY_IN_USE_ERROR
    );
  });
  test('wrong password Error', () => {
    expect(errorMessageGenerator('auth/wrong-password')).toBe(
      MESSAGE.WRONG_PASSWORD_ERROR
    );
  });
  test('user not found Error', () => {
    expect(errorMessageGenerator('auth/user-not-found')).toBe(
      MESSAGE.USER_NOT_FOUND_ERROR
    );
  });
  test('not verified Error', () => {
    expect(errorMessageGenerator('Not verfied')).toBe(
      MESSAGE.NOT_VERIFIED_ERROR
    );
  });
  test('not exists data Error', () => {
    expect(errorMessageGenerator('Not exists data')).toBe(
      MESSAGE.NOT_EXISTS_DATA
    );
  });
  test('not treated as an Error', () => {
    expect(errorMessageGenerator('Not treat as an Error')).toBe('');
  });
  test('default Error', () => {
    expect(errorMessageGenerator('this is error')).toBe(MESSAGE.DEFAULT_ERROR);
  });
});
