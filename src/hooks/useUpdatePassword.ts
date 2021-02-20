import { useCallback } from 'react';
import { useValidation, useMatch, useInput } from 'hooks';
import { passwordValidator } from 'util/signUpValidations';
import { useNotificationDispatch } from 'context/Notification';
import { updatePassword } from 'api/user';

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
        return dispatch({
          type: 'show',
          data: { notiType: 'error', message: '정보를 올바르게 입력해주세요' },
        });
      }
      const response = await updatePassword(userId, newPassword);
      if (!response.isError) {
        return dispatch({
          type: 'show',
          data: { notiType: 'noti', message: '수정 되었습니다' },
        });
      } else {
        return dispatch({
          type: 'show',
          data: {
            notiType: 'noti',
            message: response.errorMessage || '잠시후 다시 시도해주세요',
          },
        });
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
