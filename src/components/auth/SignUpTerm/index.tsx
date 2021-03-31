import React, {
  forwardRef,
  InputHTMLAttributes,
  useImperativeHandle,
} from 'react';
import { SHOW_TERMS_CAPTION } from 'common/constant/string';
import { Button, CloseBtn } from 'components/UI';
import { RefType } from 'types/Ref';
import { useToggle, useModal } from 'hooks';
import dynamic from 'next/dynamic';
import * as S from './style';

const Modal = dynamic(() => import('components/UI/Modal'));

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  /** label for checkbox */
  label: string;
  /** term detail contetns to show in Modal*/
  termContents: string;
}

const SignUpTerm = (
  props: Props,
  ref: React.Ref<RefType<boolean>>
): React.ReactElement => {
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
        type="button"
        theme="outlinedInfo"
        size="small"
        width="80px"
        onClick={modalHanlder}>
        {SHOW_TERMS_CAPTION}
      </Button>
      {showModal && (
        <Modal modalHandler={modalHanlder}>
          <S.DetailContainer>
            <CloseBtn onClick={modalHanlder} />
            <S.Contents>{termContents}</S.Contents>
          </S.DetailContainer>
        </Modal>
      )}
    </S.Container>
  );
};

export default forwardRef(SignUpTerm);
