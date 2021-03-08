import React, { useEffect } from 'react';
import { hideAlert } from 'action';
import {
  useNotificationState,
  useNotificationDispatch,
} from 'context/Notification';
import { NOTI_TIME } from 'common/constant/number';
import * as S from './style';

const Notification = () => {
  const { notiType, notiMessage } = useNotificationState();
  const dispatch = useNotificationDispatch();

  useEffect(() => {
    if (notiType) {
      setTimeout(function () {
        dispatch(hideAlert());
      }, NOTI_TIME);
    }
  }, [notiType]);

  return notiType ? (
    <S.Container>
      <S.NotiBox type={notiType}>{notiMessage}</S.NotiBox>
    </S.Container>
  ) : null;
};

export default Notification;
