import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 500px) {
    height: 200px;
    border-radius: 0;
    padding: 25px 0;
  }
`;

export const Name = styled.span`
  margin: 20px 0 10px 0;
  font-size: 1.2rem;
`;

export const Email = styled.span`
  color: #aeaeae;
  fotn-size: 0.3rem;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  display: inline-block;
`;
