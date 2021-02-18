import React from 'react';
import { Input, Button, Alert } from 'atoms';
import { inputId } from 'types/Input';
import { useUpdatePassword } from 'hooks';
import * as S from '../style';

interface Props {
  userId: string;
}

const UpdatePassword = ({ userId }: Props): React.ReactElement => {
  const data = useUpdatePassword(userId);

  return (
    <S.ContentsContainer>
      {data.alertMessage !== '' && (
        <Alert type={data.alertType} closeAlertHandler={data.closeAlertHandler}>
          {data.alertMessage}
        </Alert>
      )}
      <Input
        type="password"
        id={inputId['NEWPASSWORD']}
        error={data.newPasswordError}
        required={true}
        value={data.newPassword}
        inputChangeHandler={data.NewPasswordChangeHandler}
      />
      <Input
        type="password"
        id={inputId['PASSWORDCHECK']}
        error={!data.passwordMatch}
        required={true}
        value={data.passwordCheck}
        inputChangeHandler={data.PasswordCheckChangeHandler}
      />
      <Button
        color="blue"
        hoverColor="light-blue"
        type="button"
        onClick={data.SubmitHanlder}>
        UPDATE
      </Button>
    </S.ContentsContainer>
  );
};

export default UpdatePassword;
