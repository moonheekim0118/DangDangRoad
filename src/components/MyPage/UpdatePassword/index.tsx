import React from 'react';
import { Input, Button } from 'atoms';
import { inputId } from 'common/constant/input';
import { useUpdatePassword } from 'hooks';
import { SAVE_CAPTION } from 'common/constant/string';
import * as S from '../style';

interface Props {
  userId: string;
}

const UpdatePassword = ({ userId }: Props): React.ReactElement => {
  const data = useUpdatePassword(userId);

  return (
    <S.ContentsContainer>
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
        {SAVE_CAPTION}
      </Button>
    </S.ContentsContainer>
  );
};

export default UpdatePassword;
