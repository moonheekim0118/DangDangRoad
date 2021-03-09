import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { useInput } from 'hooks';
import { RadioButton } from 'atoms';
import { inputRef } from 'types/Input';
import * as S from './style';

interface listType {
  id: string;
  value: string;
}

interface Props {
  /** title of radio box */
  title: string;
  /** raido buttons list */
  list: listType[];
}
// 여기에 initial props로 받아와서 input inital 값으로 넣어주기

const RadioBox = ({ title, list }: Props, ref: React.Ref<inputRef>) => {
  const [value, valueChangeHanlder] = useInput();

  useImperativeHandle(ref, () => ({ value }), [value]);

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      {list.map((v, i) => (
        <RadioButton
          id={v.id}
          key={i}
          value={v.value}
          onChange={valueChangeHanlder}
          checked={v.value === value}
        />
      ))}
    </S.Container>
  );
};

export default forwardRef(RadioBox);
