import React, { InputHTMLAttributes } from 'react';
import * as S from './style';

/**extends InputHTMLAttributes<HTMLInputElement> */
interface Props {
  /** id for input */
  id: string;
  /** value for input */
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}
const RadioButton = (props: Props) => {
  const { id, value, onChange, checked, ...rest } = props;

  return (
    <S.Label htmlFor={id}>
      {value}
      <S.Input
        type="radio"
        value={value}
        onChange={onChange}
        checked={checked}
      />
      <S.CheckMark />
    </S.Label>
  );
};

export default RadioButton;
