import React from 'react';
import colorGenerator from 'util/colorGenerator';
import styled from '@emotion/styled';

enum fontSize {
  'normal' = 1,
  'large' = 1.5,
}

interface Props {
  /** inner Text */
  text: string;
  /** font size*/
  size: 'normal' | 'large';
}

const Tag = ({ text, size }: Props) => {
  return (
    <Container color={colorGenerator()} fontSize={fontSize[size]}>
      #{text}
    </Container>
  );
};

const Container = styled.div<{ color: string; fontSize: number }>`
  display: inline-block;
  padding: 10px 15px;
  margin-right: 20px;
  background-color: ${(props) => props.color};
  color: #fff;
  font-size: ${(props) => props.fontSize}rem;
  font-weight: bold;
  border-radius: 50px;
  text-align: center;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  transition: all 0.2s ease;
  &:hover {
    font-size: ${(props) => props.fontSize + 0.3}rem;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  }
`;

export default Tag;
