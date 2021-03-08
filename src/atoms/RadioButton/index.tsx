import React from 'react';
import * as S from './style';

interface Props {
  /** id for input */
  id: string;
  /** value for input */
  value: string;
  /** change Hanlder function */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** to know if this radio button is selected one */
  isSelected: boolean;
}
const RadioButton = ({ id, value, onChange, isSelected }: Props) => {
  return (
    <S.Label htmlFor={id}>
      {value}
      <S.Input
        type="radio"
        id={id}
        value={value}
        onChange={onChange}
        checked={isSelected}
      />
      <S.CheckMark />
    </S.Label>
  );
};

export default RadioButton;
