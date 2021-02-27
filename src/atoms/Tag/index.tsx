import React from 'react';
import colorGenerator from 'util/colorGenerator';
import styled from '@emotion/styled';

enum fontSize {
  'normal' = 1,
  'large' = 1.5,
}

interface Props {
  /** inner Text */
  children: React.ReactNode;
  /** font size*/
  size: 'normal' | 'large';
}

const Tag = ({ children, size }: Props) => {
  return (
    <Container color={colorGenerator()} fontSize={fontSize[size]}>
      #{children}
    </Container>
  );
};

const Container = styled.div<{ color: string; fontSize: number }>`
  display: inline-block;
  min-width: 100px;
  padding: 10px 15px;
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
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
  }
`;

export default Tag;
