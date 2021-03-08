import React from 'react';
import { RadioButton } from 'atoms';
import * as S from './style';

interface listType {
  id: string;
  value: string;
}

interface Props {
  /** now selected value */
  selectedValue: string;
  /** select hanlder function */
  selectHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** title of radio box */
  title: string;
  /** raido buttons list */
  list: listType[];
}

const RadioBox = ({ selectedValue, selectHandler, title, list }: Props) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      {list.map((v, i) => (
        <RadioButton
          id={v.id}
          key={i}
          value={v.value}
          onChange={selectHandler}
          isSelected={v.value === selectedValue}
        />
      ))}
    </S.Container>
  );
};

export default RadioBox;
