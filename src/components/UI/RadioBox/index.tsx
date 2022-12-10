import { forwardRef, useImperativeHandle } from 'react';
import { useInput } from 'hooks';
import { InputRef } from 'types/Ref';
import * as S from './style';

interface listType {
  id: string;
  value: string;
}

export interface Props {
  /** title of radio box */
  title: string;
  /** raido buttons list */
  list: listType[];
  /** initial value */
  initValue: string;
}

const RadioBox = (
  { title, list, initValue }: Props,
  ref: React.Ref<InputRef>
): React.ReactElement => {
  const [value, valueChangeHanlder] = useInput(initValue);

  useImperativeHandle(ref, () => ({ value }), [value]);

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      {list.map((v, i) => (
        <S.Label htmlFor={v.id} key={i}>
          {v.value}
          <S.Input
            id={v.id}
            type="radio"
            value={v.value}
            onChange={valueChangeHanlder}
            checked={v.value === value}
          />
          <S.CheckMark />
        </S.Label>
      ))}
    </S.Container>
  );
};

export default forwardRef(RadioBox);
