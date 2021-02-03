import React, { memo } from 'react';
import Link from 'next/Link';
import styled from '@emotion/styled';

interface Props {
  color?: 'blue' | 'white';
}

const Logo = ({ color = 'white' }: Props) => {
  return (
    <Link href="/">
      <Title color={color}>댕댕로드🐶</Title>
    </Link>
  );
};

const Title = styled.a<Props>`
  position: relative;
  color: ${(props) => (props.color === 'blue' ? '#0277bc' : '#fff')};
  text-decoration: none;
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.8rem;
  cursor: pointer;

  transition: all 0.2s ease-in-out;

  &:before,
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    width: 0px;
    height: 5px;
    margin: 5px 0 0;
    opacity: 0;
    transition: all 0.2s ease-in-out;
    transition-duration: 0.75s;
    background-color: ${(props) => props.color};
  }

  &:before {
    left: 50%;
  }
  &:after {
    right: 50%;
  }
  &:hover {
    &:before,
    &:after {
      width: 50%;
      opacity: 1;
    }
  }
`;

export default memo(Logo);
