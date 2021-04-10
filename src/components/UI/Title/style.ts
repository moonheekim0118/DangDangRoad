import styled from '@emotion/styled';

export const Container = styled.h2`
  font-family: var(--font-special);

  &::before {
    content: '';
    position: absolute;
    display: inline-block;
    top: 0px;
    left: -20px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: var(--colors-blue);
  }

  @media only screen and (max-width: 500px) {
    position: relative;
    top: 0;
    right: 0;
    margin: 20px 0;
  }
`;
