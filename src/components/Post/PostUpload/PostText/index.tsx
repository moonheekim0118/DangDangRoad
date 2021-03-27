import React, {
  forwardRef,
  useImperativeHandle,
  TextareaHTMLAttributes,
} from 'react';
import { useValidation } from 'hooks';
import { freeTextLengthCheck } from 'util/reviewTextValidation';
import { InputRef } from 'types/Ref';
import { FREE_TEXT_LABEL } from 'common/constant/string';
import { FREE_TEXT_LIMIT } from 'common/constant/number';
import * as S from './style';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  initValue: string;
}

const PostText = (
  props: Props,
  ref: React.Ref<InputRef>
): React.ReactElement => {
  const { value, error, valueChangeHanlder } = useValidation({
    initialValue: props.initValue,
    validator: freeTextLengthCheck,
  });

  useImperativeHandle(
    ref,
    () => ({
      value,
      error,
    }),
    [value, error]
  );
  return (
    <S.Description>
      <S.Label htmlFor="description">{FREE_TEXT_LABEL}</S.Label>
      <S.LengthCounter error={error}>
        {value.length}/{FREE_TEXT_LIMIT}
      </S.LengthCounter>
      <S.TextArea
        id="description"
        value={value}
        onChange={valueChangeHanlder}
        {...props}
      />
    </S.Description>
  );
};

export default forwardRef(PostText);
