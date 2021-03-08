import styled from '@emotion/styled';
import { colorCode } from 'common/style/color';

export const Title = styled.a<{ color: 'blue' | 'white' }>`
  position: relative;
  color: ${(props) => colorCode[props.color]};
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
    background-color: ${(props) => colorCode[props.color]};
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
