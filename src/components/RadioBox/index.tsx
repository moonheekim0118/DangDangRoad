import React from 'react';
import { RadioButton } from 'atoms';
import styled from '@emotion/styled';

interface listType {
  id: string;
  value: string;
}

interface Props {
  selectedValue: string;
  selectHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  list: listType[];
}

const RadioBox = ({ selectedValue, selectHandler, title, list }: Props) => {
  return (
    <Container>
      <Title>{title}</Title>
      {list.map((v, i) => (
        <RadioButton
          id={v.id}
          key={i}
          value={v.value}
          changed={selectHandler}
          isSelected={v.value === selectedValue}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 10px 25px;
`;

const Title = styled.span`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 15px;
`;

export default RadioBox;
