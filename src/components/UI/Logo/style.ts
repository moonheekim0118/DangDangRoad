import styled from '@emotion/styled';

export const Title = styled.a<{ color: 'blue' | 'white' }>`
  position: relative;
  color: ${(props) => (props.color === 'blue' ? 'var(--colors-blue)' : '#fff')};
  text-decoration: none;
  font-family: var(--font-special);
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
    background-color: ${(props) =>
      props.color === 'blue' ? 'var(--colors-blue)' : '#fff'};
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
