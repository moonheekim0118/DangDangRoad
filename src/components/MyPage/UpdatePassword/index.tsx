import React from 'react';
import { Input, Button } from 'atoms';
import { saveBtnStyle } from 'common/style/baseStyle';
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
        onChange={data.NewPasswordChangeHandler}
      />
      <Input
        type="password"
        id={inputId['PASSWORDCHECK']}
        error={!data.passwordMatch}
        required={true}
        value={data.passwordCheck}
        onChange={data.PasswordCheckChangeHandler}
      />
      <Button
        className="saveBtn"
        css={saveBtnStyle}
        type="button"
        onClick={data.SubmitHanlder}>
        {SAVE_CAPTION}
      </Button>
    </S.ContentsContainer>
  );
};
export default UpdatePassword;
