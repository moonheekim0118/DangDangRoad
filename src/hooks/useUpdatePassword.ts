import { useCallback } from 'react';
import { useValidation, useMatch, useInput } from 'hooks';
import { passwordValidator } from 'util/signUpValidations';
import { useNotificationDispatch } from 'context/Notification';
import * as Action from 'action';
import api from 'api';

/** user password update logic */

const useUpdatePassword = (userId: string) => {
  const dispatch = useNotificationDispatch();

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

  /** submit handler */
  const SubmitHanlder = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (
        newPassword.length === 0 ||
        passwordCheck.length === 0 ||
        newPasswordError ||
        !passwordMatch
      ) {
        return dispatch(Action.showError('정보를 올바르게 입력해주세요'));
      }
      const response = await api.updatePassword({ id: userId, newPassword });
      if (!response.isError) {
        return dispatch(Action.showNoti('수정되었습니다'));
      } else {
        return dispatch(Action.showError(response.error));
      }
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
