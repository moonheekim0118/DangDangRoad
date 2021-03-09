import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 10px 25px;
`;

export const Title = styled.span`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.2rem;
  margin-bottom: 15px;
`;

export const CheckMark = styled.span`
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

export const Input = styled.input`
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

export const Label = styled.label`
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
