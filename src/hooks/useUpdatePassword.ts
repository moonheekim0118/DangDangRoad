import { useEffect, useCallback } from 'react';
import { useValidation, useMatch, useInput } from 'hooks';
import useApiFetch, { REQUEST, SUCCESS, FAILURE } from 'hooks/useApiFetch';
import { passwordValidator } from 'util/signUpValidations';
import { useNotificationDispatch } from 'context/Notification';
import { updatePassword } from 'api/user';
import * as Action from 'action';

/** user password update logic */

const useUpdatePassword = (userId: string) => {
  const dispatch = useNotificationDispatch();
  const [fetchResult, fetchDispatch, setDefault] = useApiFetch(updatePassword);

  /** new Password */
  const {
    value: newPassword,
    error: newPasswordError,
    valueChangeHanlder: NewPasswordChangeHandler,
  } = useValidation({
    characterCheck: passwordValidator,
  });

  /** password check */
  const [passwordCheck, PasswordCheckChangeHandler] = useInput();

  /** password match checker*/
  const passwordMatch = useMatch({ value: passwordCheck, target: newPassword });

  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
        dispatch(Action.showNoti('수정되었습니다'));
        setDefault();
        break;
      case FAILURE:
        dispatch(Action.showError(fetchResult.error));
        break;
    }
  }, [fetchResult]);

  /** submit handler */
  const SubmitHanlder = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (
        newPassword.length === 0 ||
        passwordCheck.length === 0 ||
        newPasswordError ||
        !passwordMatch
      ) {
        return dispatch(Action.showError('정보를 올바르게 입력해주세요'));
      }
      fetchDispatch({ type: REQUEST, params: [{ id: userId, newPassword }] });
    },
    [newPassword, passwordCheck, newPasswordError, passwordMatch]
  );

  return {
    newPassword,
    NewPasswordChangeHandler,
    newPasswordError,
    passwordCheck,
    PasswordCheckChangeHandler,
    passwordMatch,
    SubmitHanlder,
  };
};

export default useUpdatePassword;
