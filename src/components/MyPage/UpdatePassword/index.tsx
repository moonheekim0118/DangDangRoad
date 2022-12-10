import useApiFetch, { REQUEST } from 'hooks/common/useApiFetch';
import { Input, Button } from 'components/UI';
import { usePasswordCheck } from 'hooks';
import { useNotificationDispatch } from 'context/Notification';
import { inputId } from 'common/constant/input';
import { SAVE_CAPTION } from 'common/constant/string';
import { updatePassword } from 'api/user';
import { UPDATE_MESSAGE, NOT_FULL_INFO_ERROR } from 'common/constant/string';
import { passwordValidator, conditionValidator } from 'util/validations';
import * as Action from 'action';
import Form from '../style';

interface Props {
  userId: string;
}

const UpdatePassword = ({ userId }: Props): React.ReactElement => {
  const notiDispatch = useNotificationDispatch();

  const [
    passwordRef,
    passwordCheckRef,
    passwordCheckValidator,
  ] = usePasswordCheck();
  const [result, dispatch, setDefault] = useApiFetch(updatePassword, {
    onSuccess: () => {
      notiDispatch(Action.showSuccess(UPDATE_MESSAGE));
      setDefault();
    },
    onFailure: (response) => {
      notiDispatch(Action.showError(response.error));
      setDefault();
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
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

    if (passwordError) {
      return notiDispatch(Action.showError(NOT_FULL_INFO_ERROR));
    }
    const isFullPassword = conditionValidator(
      password.length > 0,
      passwordFocus
    );
    const isCorrectPassword = conditionValidator(
      password === passwordCheck,
      passwordCheckFoucs
    );
    if (!isFullPassword || !isCorrectPassword) return;
    dispatch({
      type: REQUEST,
      params: [{ id: userId, password }],
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
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
      <Button type="submit" theme="primary" size="large" width="100%">
        {SAVE_CAPTION}
      </Button>
    </Form>
  );
};
export default UpdatePassword;
