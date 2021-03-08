import styled from '@emotion/styled';

export const Container = styled.div`
  position: fixed;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
  z-index: 50000;
`;

export const NotiBox = styled.div<{ type: 'error' | 'noti' }>`
  width: 300px;
  padding: 25px 20px;
  border-radius: 15px;
  color: #fff;
  background-color: ${(props) =>
    props.type === 'error' ? '#ff4d4d' : '#00e673'};
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;
