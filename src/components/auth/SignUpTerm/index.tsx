import React, {
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
} from 'react';
import { SHOW_TERMS_CAPTION } from 'common/constant/string';
import Modal from 'components/ui/Modal';
import { Button, Close } from 'atoms';
import { RefType } from 'types/Ref';
import { useToggle, useModal } from 'hooks';
import * as S from './style';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  /** label for checkbox */
  label: string;
  /** term detail contetns to show in Modal*/
  termContents: string;
}

const SignUpTerm = (props: Props, ref: React.Ref<RefType<boolean>>) => {
  const { id, label, termContents, ...rest } = props;
  const [checked, checkHanlder] = useToggle();
  const [showModal, modalHanlder] = useModal(false);

  useImperativeHandle(
    ref,
    () => ({
      value: checked,
    }),
    [checked]
  );

  return (
    <S.Container>
      <S.Label htmlFor={id}>{label}</S.Label>
      <input
        type="checkbox"
        id={id}
        onChange={checkHanlder}
        checked={checked}
        {...rest}
      />
      <Button
        className="termDetailBtn"
        type="button"
        css={S.buttonStyle}
        onClick={modalHanlder}>
        {SHOW_TERMS_CAPTION}
      </Button>
      <Modal showModal={showModal} modalHandler={modalHanlder}>
        <S.DetailContainer>
          <S.CloseContainer>
            <Close onClick={modalHanlder} />
          </S.CloseContainer>
          <S.Contents>{termContents}</S.Contents>
        </S.DetailContainer>
      </Modal>
    </S.Container>
  );
};

export default forwardRef(SignUpTerm);
