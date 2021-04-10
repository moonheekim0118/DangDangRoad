import styled from '@emotion/styled';

export const Label = styled.label`
  font-family: var(--font-special);
  font-size: 1.2rem;
`;

export const Description = styled.div`
  width: 100%;
`;

export const LengthCounter = styled.span<{ error: boolean }>`
  margin-left: 10px;
  color: ${(props) =>
    props.error ? 'var(--colors-red)' : 'var(--colors-green)'};
  font-weight: bold;
`;

export const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  margin-top: 0.7rem;
  padding: 1.3rem;
  height: 100px;
  font-size: 1rem;
  background-color: #fff;
  border: none;
  border-radius: 25px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
  &:focus {
    outline: none;
  }
`;
