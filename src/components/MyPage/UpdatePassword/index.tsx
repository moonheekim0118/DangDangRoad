import React, { useCallback, useEffect } from 'react';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { Input, Button } from 'atoms';
import { usePasswordCheck } from 'hooks';
import { useNotificationDispatch } from 'context/Notification';
import { saveBtnStyle } from 'common/style/baseStyle';
import { inputId } from 'common/constant/input';
import { SAVE_CAPTION } from 'common/constant/string';
import { updatePassword } from 'api/user';
import { UPDATE_MESSAGE, NOT_FULL_INFO_ERROR } from 'common/constant/string';
import { passwordValidator } from 'util/signUpValidations';
import * as Action from 'action';
import * as S from '../style';

interface Props {
  userId: string;
}

const UpdatePassword = ({ userId }: Props): React.ReactElement => {
  const dispatch = useNotificationDispatch();

  const [
    passwordRef,
    passwordCheckRef,
    passwordCheckValidator,
  ] = usePasswordCheck();
  const [fetchResult, fetchDispatch, setDefault] = useApiFetch(updatePassword);

  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
        dispatch(Action.showNoti(UPDATE_MESSAGE));
        setDefault();
        break;
      case FAILURE:
        dispatch(Action.showError(fetchResult.error));
        setDefault();
        break;
    }
  }, [fetchResult]);

  const SubmitHanlder = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const {
        value: password,
        error: passwordError,
        focus: passwordFocus,
      } = passwordRef.current;

      const {
        value: passwordCheck,
        focus: passwordCheckFoucs,
      } = passwordCheckRef.current;
      if (
        password.length === 0 ||
        passwordError ||
        passwordCheck.length === 0 ||
        password !== passwordCheck
      ) {
        password.length === 0 && passwordFocus && passwordFocus();
        password !== passwordCheck &&
          passwordCheckFoucs &&
          passwordCheckFoucs();
        return dispatch(Action.showError(NOT_FULL_INFO_ERROR));
      }
      fetchDispatch({ type: REQUEST, params: [{ id: userId, password }] });
    },
    [passwordRef, passwordCheckRef]
  );

  return (
    <S.ContentsContainer>
      <Input
        type="password"
        id={inputId['NEWPASSWORD']}
        required={true}
        ref={passwordRef}
        validator={passwordValidator}
      />
      <Input
        type="password"
        id={inputId['PASSWORDCHECK']}
        required={true}
        ref={passwordCheckRef}
        validator={passwordCheckValidator}
      />
      <Button
        type="submit"
        theme="primary"
        size="large"
        width="100%"
        onClick={SubmitHanlder}>
        {SAVE_CAPTION}
      </Button>
    </S.ContentsContainer>
  );
};
export default UpdatePassword;
