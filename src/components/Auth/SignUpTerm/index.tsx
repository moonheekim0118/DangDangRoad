import { forwardRef, useImperativeHandle } from 'react';
import { SHOW_TERMS_CAPTION } from 'common/constant/string';
import { Button, CloseBtn } from 'components/UI';
import { RefType } from 'types/Ref';
import { useToggle, useModal } from 'hooks';
import dynamic from 'next/dynamic';
import * as S from './style';

const Modal = dynamic(() => import('components/UI/Modal'));

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
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
  const [checked, handleChecked] = useToggle();
  const [showModal, handleModal] = useModal(false);

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
        onChange={handleChecked}
        checked={checked}
        {...rest}
      />
      <Button
        type="button"
        theme="outlinedInfo"
        size="small"
        width="80px"
        onClick={handleModal}>
        {SHOW_TERMS_CAPTION}
      </Button>
      {showModal && (
        <Modal onClick={handleModal}>
          <S.DetailContainer>
            <CloseBtn onClick={handleModal} />
            <S.Contents>{termContents}</S.Contents>
          </S.DetailContainer>
        </Modal>
      )}
    </S.Container>
  );
};

export default forwardRef(SignUpTerm);
