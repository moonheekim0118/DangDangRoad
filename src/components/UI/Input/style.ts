import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  height: 100px;
`;

export const Label = styled.label<{ required: boolean }>`
  padding: 10px 0;
  font-weight: bold;

  &::after {
    content: ${(props) => (props.required ? "' *'" : "' (optional)'")};
    color: ${(props) => (props.required ? 'red' : '#aeaeae')};
  }
`;

export const InputField = styled.input`
  padding: 10px 15px;
  border: 2px solid #f4f4f4;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const Error = styled.span`
  padding: 10px 0;
  color: red;
  font-size: 0.9rem;
`;
