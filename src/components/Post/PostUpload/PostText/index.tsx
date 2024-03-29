import { forwardRef, useImperativeHandle } from 'react';
import { useValidation } from 'hooks';
import { checkFreeTextLength } from 'util/reviewTextValidations';
import { InputRef } from 'types/Ref';
import { FREE_TEXT_LABEL } from 'common/constant/string';
import { FREE_TEXT_LIMIT } from 'common/constant/number';
import * as S from './style';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  initValue: string;
}

const PostText = (
  props: Props,
  ref: React.Ref<InputRef>
): React.ReactElement => {
  const { value, error, handleChangeValue } = useValidation({
    initialValue: props.initValue,
    validator: checkFreeTextLength,
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
        onChange={handleChangeValue}
        {...props}
      />
    </S.Description>
  );
};

export default forwardRef(PostText);
