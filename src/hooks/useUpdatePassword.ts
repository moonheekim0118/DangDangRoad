import { useCallback } from 'react';
import { useAlert, useValidation, useMatch, useInput } from 'hooks';
import { passwordValidator } from 'util/signUpValidations';
import { updatePassword } from 'api/user';

/** user password update logic */

const useUpdatePassword = (userId: string) => {
  /** alert */
  const {
    alertMessage,
    setAlertMessage,
    alertType,
    setAlertType,
    closeAlertHandler,
  } = useAlert();

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
        setAlertType('error');
        setAlertMessage('정보를 올바르게 입력하세요!');
        return;
      }
      const response = await updatePassword(userId, newPassword);
      if (!response.isError) {
        setAlertType('noti');
        setAlertMessage('수정 되었습니다.');
      } else {
        setAlertType('error');
        setAlertMessage(response.errorMessage || '잠시후 다시 시도해주세요');
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
    alertType,
    alertMessage,
    closeAlertHandler,
    SubmitHanlder,
  };
};

export default useUpdatePassword;
