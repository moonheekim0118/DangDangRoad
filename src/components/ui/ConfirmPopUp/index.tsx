import React from 'react';
import {
  CLOSE_BUTTON_CAPTION,
  KEEP_BUTTON_CAPTION,
} from 'common/constant/string';
import * as S from './style';

interface Props {
  /** contents of pop up */
  contents: string;
  /** close button handler */
  closeHandler: () => void;
  /** yes button handler  */
  submitHandler: () => void;
}

/** confrim pop up atom */
const ConfirmPopUp = ({ contents, closeHandler, submitHandler }: Props) => {
  return (
    <S.Container>
      <S.Title>{contents}</S.Title>
      <S.ButtonContainer>
        <S.Button title="close" onClick={closeHandler}>
          {CLOSE_BUTTON_CAPTION}
        </S.Button>
        <S.Button title="keep" onClick={submitHandler}>
          {KEEP_BUTTON_CAPTION}
        </S.Button>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default ConfirmPopUp;
