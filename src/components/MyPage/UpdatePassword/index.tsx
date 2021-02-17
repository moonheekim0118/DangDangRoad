import React from 'react';
import { Input, Button } from 'atoms';
import { inputId } from 'types/Input';
import * as S from '../style';

const UpdatePassword = (): React.ReactElement => {
  function temp() {}
  return (
    <S.ContentsContainer>
      <Input
        type="password"
        id={inputId['NOWPASSWORD']}
        required={true}
        value={''}
        inputChangeHandler={temp}
      />
      <Input
        type="password"
        id={inputId['NEWPASSWORD']}
        required={true}
        value={''}
        inputChangeHandler={temp}
      />
      <Input
        type="password"
        id={inputId['PASSWORDCHECK']}
        required={true}
        value={''}
        inputChangeHandler={temp}
      />
      <Button color="blue" hoverColor="light-blue" type="button">
        UPDATE
      </Button>
    </S.ContentsContainer>
  );
};

export default UpdatePassword;
