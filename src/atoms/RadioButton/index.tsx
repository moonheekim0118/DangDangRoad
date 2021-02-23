import React from 'react';
import styled from '@emotion/styled';

interface Props {
  id: string;
  value: string;
  changed: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSelected: boolean;
}
const RadioButton = ({ id, value, changed, isSelected }: Props) => {
  return (
    <Label htmlFor={id}>
      {value}
      <Input
        type="radio"
        id={id}
        value={value}
        onChange={changed}
        checked={isSelected}
      />
      <CheckMark />
    </Label>
  );
};

const CheckMark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;

  &:after {
    content: '';
    position: absolute;
    display: none;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;
  height: 0;
  width: 0;

  &:checked ~ ${CheckMark} {
    background-color: #2196f3;
  }

  &:checked ~ ${CheckMark}:after {
    display: block;
  }
`;

const Label = styled.label`
  display: block;
  padding-left: 35px;
  margin-bottom: 12px;
  user-select: none;
  cursor: pointer;
  font-family: 'Do Hyeon', sans-serif;

  &:hover ${Input} ~ ${CheckMark} {
    background-color: #ccc;
  }
`;

export default RadioButton;
