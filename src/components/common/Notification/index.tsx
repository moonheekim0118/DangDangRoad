import React, { useEffect } from 'react';
import { hideAlert } from 'action';
import {
  useNotificationState,
  useNotificationDispatch,
} from 'context/Notification';
import { Toast } from 'atoms';
import { NOTI_TIME } from 'common/constant/number';

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
    <Toast theme={notiType} size="large" show={true} animation={true}>
      {notiMessage}
    </Toast>
  ) : null;
};

export default Notification;
