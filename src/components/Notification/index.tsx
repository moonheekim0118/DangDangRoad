import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { hideAlert } from 'action';
import {
  useNotificationState,
  useNotificationDispatch,
} from 'context/Notification';

const Notification = () => {
  const { notiType, notiMessage } = useNotificationState();
  const dispatch = useNotificationDispatch();

  useEffect(() => {
    if (notiType) {
      setTimeout(function () {
        dispatch(hideAlert());
      }, 5000);
    }
  }, [notiType]);

  return notiType ? (
    <Container>
      <NotiBox type={notiType}>{notiMessage}</NotiBox>
    </Container>
  ) : null;
};

const Container = styled.div`
  position: absolute;
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
  z-index: 50000;
`;

const NotiBox = styled.div<{ type: 'error' | 'noti' }>`
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

export default Notification;
