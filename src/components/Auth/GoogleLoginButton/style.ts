import styled from '@emotion/styled';

export const Container = styled.button`
  width: 250px;
  background-color: #fff;
  border-radius: 5px;
  border: none;
  padding: 18px 20px;
  text-align: center;
  cursor: pointer;
  color: var(--colors-deep-gray);
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
  transition: all 0.3s ease;

  &:hover {
    color: var(--colors-blue);
    box-shadow: 0px 0px 5px 0px rgba(2, 19, 188, 0.75);
  }

  &:focus {
    outline: none;
  }
`;

export const Logo = styled.div`
  position: absolute;
  left: 0px;
  top: 60%;
  transform: translateY(-50%);
`;

export const Title = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  margin-left: 15px;
`;
