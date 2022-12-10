import {
  CLOSE_BUTTON_CAPTION,
  KEEP_BUTTON_CAPTION,
} from 'common/constant/string';
import * as S from './style';

export interface Props {
  /** contents of pop up */
  contents: string;
  /** close button handler */
  onCloseConfirm: () => void;
  /** yes button handler  */
  onSubmitConfirm: () => void;
}

/** confrim pop up atom */
const ConfirmPopUp = ({
  contents,
  onCloseConfirm,
  onSubmitConfirm,
}: Props): React.ReactElement => {
  return (
    <S.Container>
      <S.Title>{contents}</S.Title>
      <S.ButtonContainer>
        <S.Button title="close" onClick={onCloseConfirm}>
          {CLOSE_BUTTON_CAPTION}
        </S.Button>
        <S.Button title="keep" onClick={onSubmitConfirm}>
          {KEEP_BUTTON_CAPTION}
        </S.Button>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default ConfirmPopUp;
